import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'

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

const usertable = new Mongo.Collection('User');
var user = usertable.findOne({generatedID:0});
if (user === undefined) {
  const myPassword='admin';
  var salt = bcrypt.genSaltSync(saltRounds);
  var pwd_hash = bcrypt.hashSync(myPassword, salt);
  usertable.insert({
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

Meteor.methods({
  getUserName(borrowerId) {
    var user = usertable.find({borrowerId:borrowerId})
    if (user == undefined)
      return "";
    let userName=""
    user.map((usr)=>{
      if (usr.delete_tag === undefined)
        userName=usr.name
    })
    return userName
  },

  login(userGeneratedID,password) {
    var user = usertable.findOne({generatedID:0});
    if (user === undefined)
      return ("User doesn't exist")
    pwd_hash = user.pwd_hash;
    if (pwd_hash === undefined)
      return ("Create a password for the user before login")
    if (!bcrypt.compareSync(password, pwd_hash))
      return ("Password incorrect.")
    this.setUserId(user.borrowerId)
  }
})
