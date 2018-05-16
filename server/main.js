import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import { T } from '/imports/startup/both/promptmsg.js'


var bcrypt = require('bcrypt');
const saltRounds = 10;

/*User Table example
{
        "borrowRestriction_id": "1",
        "borrowerId": "19920219",
        "classInfo_id": "1",
        "gender": "0",
        "generatedID": "1",
        "name": "Han Yi"
}
*/

const userTable = new Mongo.Collection('User');
const android_meta = new Mongo.Collection('android_metadata');
const bookTable = new Mongo.Collection('Book');
const bookCopyTable = new Mongo.Collection('BookCopy');
const borrowedByTable = new Mongo.Collection('BorrowedBy');
const BorrowRestrictionTable = new Mongo.Collection('BorrowRestriction');
const classTable = new Mongo.Collection('Class');
const libraryTable = new Mongo.Collection('Library');
const sqliteSeqTable = new Mongo.Collection('sqlite_sequence');
const uploadHisTable = new Mongo.Collection('UploadHistory');

const allTables={
User:userTable,
android_metadata:android_meta,
Book:bookTable,
BookCopy:bookCopyTable,
BorrowedBy:borrowedByTable,
BorrowRestriction:BorrowRestrictionTable,
Class:classTable,
Library:libraryTable,
sqlite_sequence:sqliteSeqTable,
UploadHistory:uploadHisTable,
}

var user = userTable.findOne({generatedID:0});
if (user === undefined) {
  const myPassword='admin';
  var salt = bcrypt.genSaltSync(saltRounds);
  var pwd_hash = bcrypt.hashSync(myPassword, salt);
  userTable.insert({
        generatedID:0, //key
        borrowRestriction_id: 0,
        borrowerId: "0", //secondary key
        classInfo_id: null,
        gender: null,
        name: "admin",
        password: pwd_hash,
        latestGeneratedID: 0,
  })
}

Meteor.startup(() => {
  // code to run on server at startup

});

function queryUserInfo(userId,userGeneratedID) {
    var tab = allTables["User"]
    var user
    if (userId !== null)
      user = tab.findOne({borrowerId:userId});
    else
      user = tab.findOne({generatedID:userGeneratedID});
    if (user == undefined)
      return null;
    tab = allTables["Class"]
    var classInfo = tab.findOne({id:user.classInfo_id});
    if (classInfo === undefined)
      classInfo = {}
    tab = allTables["BorrowRestriction"]
    var restrInfo = tab.findOne({id:user.borrowRestriction_id});
    if (restrInfo === undefined)
      restrInfo = {}
    tab = allTables["BorrowedBy"]
    const borrowRecs = tab.find({user_id:user.generatedID,isEnded:"0"});
    var borrowNoAllowed = restrInfo.quantity-borrowRecs.count()
    const result={
      name:user.name,
      userId:user.borrowerId,
      gender:user.gender,
      numOfDays:restrInfo.numOfDays,
      quantity:restrInfo.quantity,
      borrowNoAllowed:borrowNoAllowed,
      role:restrInfo.name,
      classInfo:classInfo.name,
      userGenId:user.generatedID
    }
    return result
}

function queryBookInfo(bookId) {
    var tab = allTables["BookCopy"]
    var bookCopy = tab.findOne({retrieveNumber:bookId});
    if (bookCopy == undefined)
      return null;
    tab = allTables["Book"]
    var book = tab.findOne({id:bookCopy.book_id});
    if (book === undefined)
      book = {}
    tab = allTables["BorrowedBy"]
    var borrowRec = tab.findOne({bookCopy_id:bookCopy.id,isEnded:"0"});
    var borrower = null
    const borrowed = (borrowRec !== undefined)
    if (borrowed)
      borrower = queryUserInfo(null,borrowRec.user_id)
    
    const bookRec = {
      donor:bookCopy.donor,
      locationInfo:bookCopy.location,
      statusInfo:bookCopy.status,
      ISBN:book.ISBN,
      author:book.author,
      description:book.description,
      price:book.price,
      publishDate:book.publishDate,
      publisher:book.publisher,
      title:book.title,
      borrowed:borrowed,
      borrowUserRec:borrower,
      copy_id:bookCopy.id
    }
    return bookRec
}

function getDateTime(days) {

    var date = new Date();

    date.setDate(date.getDate()+days)

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}

Meteor.methods({
  getUserName(borrowerId) {
    var user = userTable.find({borrowerId:borrowerId})
    if (user == undefined)
      return "";
    let userName=""
    user.map((usr)=>{
      if (usr.delete_tag === undefined)
        userName=usr.name
    })
    return userName
  },

  login(borrowerId, userName, password) {
    var user = userTable.find({borrowerId:borrowerId});
    if (user === undefined)
      return (T("userNotExist"));//"User doesn't exist")
    let matchUser=null;
    user.map((usr)=>{
      if (usr.delete_tag === undefined)
        matchUser = usr
    })
    if (matchUser === null)
      return (T("userNotExist"));//"User doesn't exist")
    if (userName !== matchUser.name)
      return (T("userTabCorrupt"));//"The user table is corrupted")
    pwd_hash = matchUser.password;
    if (pwd_hash === undefined)
      return (T("createPassword"));//"Create a password for the user before login")
    if (!bcrypt.compareSync(password, pwd_hash))
      return (T("passwordWrong"));//"Password incorrect.")
    this.setUserId(borrowerId)
    return null
  },

  loginAdmin(password) {
    var user = userTable.findOne({borrowerId:"0"});
    if (user === undefined)
      return (T("userNotExist"));//"User doesn't exist")
    if (user.name !== "admin")
      return (T("Bad database configuration"));//"User doesn't exist")
    pwd_hash = user.password;
    if (pwd_hash === undefined)
      return (T("createPassword"));//"Create a password for the user before login")
    if (!bcrypt.compareSync(password, pwd_hash))
      return (T("passwordWrong"));//"Password incorrect.")
    this.setUserId("0")
    return null
  },

  logout() {
    this.setUserId(null)
    return null
  },

  checkAdminLogin() {
    if (this.userId === "0")
      return true
    return false
  },

  restoreTable(data_json,tableName) {
    if (this.userId !== "0")
      return(T("Login admin before restore"))
    const tab = allTables[tableName]
    if (tab === undefined)
      return(T("Table unknown"))
    data_json.map((entry)=>{
      const rec = tab.findOne(entry);
      if (rec === undefined)
        tab.insert(entry)
    })
    return null
  },

  getUserRecByUserId(userId) {
    return queryUserInfo(userId)
  },

  getBookRecByBookId(bookId) {
    return queryBookInfo(bookId)
  },

  borrowBook(userId,bookId) {
    const user=queryUserInfo(userId)
    const book=queryBookInfo(bookId)
    if (user === null)
      return (T("userNotExist"))
    if (book === null)
      return (T("bookNotExist"))
    if (user.borrowNoAllowed === 0)
      return (T("noMoreBorrowAllowed"))
    if (book.borrowed)
      return (T("bookBorrowed"))
    const tab = allTables["BorrowedBy"]
    if (tab === undefined)
      return("Table unknown")
    const cnt=tab.find().count()
    tab.insert({
      "bookCopy_id": book.copy_id,
      "borrowedTime": getDateTime(0),
      "dueTime": getDateTime(user.numOfDays),
      "id": cnt+1,
      "isEnded": "0",
      "user_id": user.userGenId
    })
    return null
  },

  returnBook(bookId){
    var tab = allTables["BookCopy"]
    const bookCopy = tab.findOne({retrieveNumber:bookId});
    if (bookCopy == undefined)
      return(T("BookNoExist"))
    tab = allTables["Book"]
    const book = tab.findOne({id:bookCopy.book_id});
    if (book === undefined)
      book = {}
    tab = allTables["BorrowedBy"]
    const borrowRec = tab.findOne({bookCopy_id:bookCopy.id,isEnded:"0"});
    if (borrowRec === undefined)
      return(T("BookNoBorrowed"))
    const updateCnt = tab.update({id:borrowRec.id},
      {$set: {isEnded:"1",returnTime:getDateTime(0)}})
    if (updateCnt !== 1)
      return(T("ReturnRecordUpdateError"))
    return null
  },

  getTableData (tab) {
    const db = allTables[tab]
    if (db === undefined)
      return []
    const cursor=db.find()
    const data = cursor.fetch()
    return data
  },
})
