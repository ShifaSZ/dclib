import React from 'react';
import { EJSON } from 'meteor/ejson';
import { T } from '/imports/startup/both/promptmsg.js'
import ReactJson from 'react-json-view'
 
/*
    style={{"background-color": "#e3f2fd"}}>
        <li className="nav-item active" onClick = {props.handleClickLogin}>
          <a className="navbar-brand" href="#">
           {T("login")}
           <span className="sr-only">(current)</span>
          </a>
        </li>
*/
function MainMenu(props) {
  return (
  <nav className="navbar navbar-expand-sm navbar-light sm-light"
    style={{"backgroundColor": "#e3f2fd"}}>
    <button className="navbar-toggler" 
      type="button" 
      data-toggle="collapse" 
      data-target="#navbarNav" 
      aria-controls="navbarNav" 
      aria-expanded="false" 
      aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item" onClick = {props.handleClickSelfBorrow}>
          <a className="navbar-brand" href="#">
           {T("selfBorrow")}
           <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item" onClick = {props.handleClickBorrowBook}>
          <a className="navbar-brand" href="#">
           {T("borrowBook")}
           <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item" onClick = {props.handleClickReturnBook}>
          <a className="navbar-brand" href="#">
           {T("returnBook")}
           <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           {T("manager")}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#"
              onClick = {props.handleClickLogin}>
              {!props.loginState && T("login")}
              {props.loginState && T("logout")}
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">
              {T("timeoutBorrow")}
            </a>
            <a className="dropdown-item" href="#">
              {T("borrowHistory")}
            </a>
            <a className="dropdown-item" href="#">
              {T("bookManage")}
            </a>
            <a className="dropdown-item" href="#">
              {T("readerManage")}
            </a>
            <a className="dropdown-item" href="#">
              {T("classManage")}
            </a>
            <a className="dropdown-item" href="#">
              {T("roleManage")}
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">
              {T("databaseBackup")}
            </a>
            <a className="dropdown-item" href="#" onClick = {props.handleDbRestore}>
              {T("databaseRestore")}
            </a>
          </div>
        </li>
        <li className="nav-item" onClick = {props.handleClickOther}>
          <a className="navbar-brand" href="#">
           {T("other")}
           <span className="sr-only">(current)</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
  )
}

/*
        <li className="nav-item" onClick = {props.handleClickManager}>
          <a className="navbar-brand" href="#">
           {T("manager")}
           <span className="sr-only">(current)</span>
          </a>
        </li>
function ManagerMenu() {
  return(
    <ul>
      <li>{T("timeoutBorrow")}</li>
      <li>{T("borrowHistory")}</li>
      <li>{T("bookManage")}</li>
      <li>{T("readerManage")}</li>
      <li>{T("classManage")}</li>
      <li>{T("roleManage")}</li>
    </ul>
  )
}
*/
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password:"",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePswdChange = this.handlePswdChange.bind(this);
  }

  handlePswdChange(event) {
    this.setState({password:event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    if (!this.props.loginState)
      Meteor.call("login",this.props.userId,this.props.userName,
        this.state.password, (err,result)=>{
        if (err)
          alert(T("loginError")) //"Login error.")
        else if (result !== null)
          alert(result)
        else {
          this.props.handleLogin(true)
        }
      })
    else
      Meteor.call("logout",(err,result)=>{
        if (err)
          console.log("Logout error.")
        else if (result !== null)
          console.log(result)
        else {
          this.props.handleLogin(false)
        }
      })
  }

  render() {
    var LoginForm = 
      <div>
       <div className="form-group">
        <label htmlFor="enterBorId">{T("userId")}</label>
        <input type="text" 
          className="form-control" id="enterBorId"
          aria-describedby="borIdHelp" placeholder={T("enterUserId")}
          onChange={this.props.handleUserIdChange}
          value={this.props.userId} />
        <small id="borIdHelp" className="form-text text-muted">
           {T("userName")}: {this.props.userName}
        </small>
       </div>
       <div className="form-group">
        <label htmlFor="inputPassword">{T("password")}</label>
        <input type="password" className="form-control"
          id="inputPassword" placeholder={T("enterPassword")}
          onChange={this.handlePswdChange}
          value={this.state.password} 
        />
       </div>
        <button type="submit" className="btn btn-primary">{T("login")}</button>
      </div>
/*
         <input type="text" onChange={this.props.handleUserNameChange}
           value={this.props.userName} />
           <LoginForm handleUserIdChange={this.props.handleBorrowerIdChange}
             userId={this.props.borrowerId}
             userName={this.props.userName}/>
*/
    var LogoutForm = 
       <div className="form-group">
           <p>{T("userName")}: {this.props.userName}</p>
           <button type="submit" className="btn btn-primary">{T("logout")}</button>
       </div>
    return (
      <form onSubmit={this.handleSubmit}>
         {!this.props.loginState && 
           LoginForm
         }
         {this.props.loginState && 
           LogoutForm
         }
      </form>
    )
  }
}

class SelfBorrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId:"",
      userRec:null,
      bookId:"",
      bookRec:null,
    }

    this.handleBookIdChange = this.handleBookIdChange.bind(this)
    this.handleUserIdChange = this.handleUserIdChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault()
    const book = this.state.bookRec
    if ( book === null ) {
      alert(T("bookIdInvalid"))
      return
    }
    if (book.borrowed)
      Meteor.call("returnBook",this.state.bookId,
      (err,result)=>{
      if (err)
        alert(T("returnFail"))
      else if (result !== null)
        alert(result)
      else {
        alert(T("returnSuccess"))
        this.setState({
          bookId:"",
          bookRec:null,
          userId:"",
          userRec:null
        })
      }
      })
    else {
      const user=this.state.userRec
      if (user === null) {
        alert(T("enterUserId"))
        return
      }
      if (user.borrowNoAllowed === 0) {
        alert(T("userName")+":"+user.name+" "+T("borrowRestriction")+":0")
        return
      }
      Meteor.call("borrowBook",this.state.userId,this.state.bookId,
      (err,result)=>{
      if (err)
        alert(T("borrowFail"))
      else if (result !== null)
        alert(T(result))
      else {
        alert(T("borrowSuccess"))
        this.setState({
          userId:"",
          userRec:null,
          bookId:"",
          bookRec:null,
        })
      }
      })
    }
  }

  handleUserIdChange(event) {
    const userId = event.target.value;
    Meteor.call("getUserRecByUserId",userId, (err, result) => {
      if (err)
        return
      this.setState({userId:userId,userRec:result})
    })
  }

  handleBookIdChange(event) {
    const bookId = event.target.value;
    Meteor.call("getBookRecByBookId",bookId, (err,result) => {
      if (err) {
        console.log(err)
        return
      }
      if (result === null) {
        this.setState({bookId:bookId})
        return
      }
      this.setState({bookId:bookId,bookRec:result})
    })
  }

  render () {
    var userForm =""
    var confirmBtn="confirmReturn"
    if (this.state.bookRec !== null) 
      if (!this.state.bookRec.borrowed) {
       confirmBtn = "confirmBorrow"
       userForm = 
       <div className="form-group">
        <label htmlFor="enterUserId" className="h5">{T("userId")}</label>
        <input type="text" 
          className="form-control" id="enterUserId"
          aria-describedby="userIdHelp" placeholder={T("enterUserId")}
          onChange={this.handleUserIdChange}
          value={this.state.userId} />
        <small id="userIdHelp" className="form-text text-muted">
           {T("enterUserIdHelp")}
        </small>
        <UserInfo userRec={this.state.userRec} />
       </div>
      }
    return (
      <form onSubmit={this.handleSubmit}>
       <div className="form-group">
        <label htmlFor="enterBookId2" className="h5">{T("bookId")}</label>
        <input type="text" 
          className="form-control" id="enterBookId2"
          aria-describedby="bookIdHelp2" placeholder={T("enterBookId")}
          onChange={this.handleBookIdChange}
          value={this.state.BookId} />
        <small id="bookIdHelp2" className="form-text text-muted">
           {T("enterBookIdHelp")}
        </small>
        <BookInfo bookRec={this.state.bookRec} />
        {this.state.bookRec !== null && 
        <UserInfo userRec={this.state.bookRec.borrowUserRec} /> }
       </div>
       {userForm}
       <button type="submit" className="btn btn-primary">{T(confirmBtn)}</button>
      </form>
    )
  }
}

function UserInfo(props){
  const userRec=props.userRec
  if (userRec !== null)
    return (
       <div className="form-group">
         <label className="h5">{T("userName")}:{userRec.name}; </label>
         <label className="h5">{T("userGender")}:
           {userRec.gender === "0" ? T("male"):T("female")}; 
         </label>
         <label className="h5">{T("borrowRestriction")}:{userRec.borrowNoAllowed}; </label>
         <label className="h5">{T("classInfo")}:{userRec.classInfo}; </label>
         <label className="h5">{T("role")}:{userRec.role}</label>
       </div>
    )
  else
    return (
       <div className="form-group">
       </div>
    )
}

function BookInfo (props) {
  const bookRec = props.bookRec
  if (bookRec !== null)
    return(
       <div className="form-group">
         <label className="h5">{T("bookTitle")}:{bookRec.title};</label>
         <label className="h5">{T("bookDesc")}:{bookRec.description};</label>
         <label className="h5">{T("bookDonor")}:{bookRec.donor};</label>
         <label className="h5">{T("bookLocation")}:{bookRec.locationInfo};</label>
         <label className="h5">{T("bookStatus")}:{bookRec.statusInfo};</label>
         <label className="h5">ISBN:{bookRec.ISBN};</label>
         <label className="h5">{T("bookAuthor")}:{bookRec.author};</label>
         <label className="h5">{T("bookPrice")}:{bookRec.price};</label>
         <label className="h5">{T("bookPubDate")}:{bookRec.publishDate};</label>
         <label className="h5">{T("bookPublisher")}:{bookRec.publisher};</label>
         <label className="h5">{T("bookBorrowStatus")}:{bookRec.borrowed?T("bookBorrowed"):T("bookAvailable")}</label>
       </div>
    )
  else
    return (
       <div className="form-group">
       </div>
    )
}

export class BorrowBook extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userId:"",
      userRec:null,
      bookId:"",
      bookRec:null,
    }
    this.handleUserIdChange = this.handleUserIdChange.bind(this)
    this.handleBookIdChange = this.handleBookIdChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault()
    const user = this.state.userRec
    const book = this.state.bookRec
    var alert_msg=""
    if (user === null) {
      alert(T("enterUserId"))
      return
    }
    if (user.borrowNoAllowed === 0)
      alert_msg = T("userName")+":"+user.name+" "+T("borrowRestriction")+":0\n"
    if (book === null) {
      alert(T("enterBookId"))
      return
    }
    if (book.borrowed)
      alert_msg = alert_msg+T("bookTitle")+":"+book.title + " " +
        T("bookId") + this.state.bookId + T("bookBorrowed")
    if (alert_msg !== "") {
      alert(alert_msg)
      return
    }
    Meteor.call("borrowBook",this.state.userId,this.state.bookId,
      (err,result)=>{
      if (err)
        alert(T("borrowFail"))
      else if (result !== null)
        alert(T(result))
      else {
        alert(T("borrowSuccess"))
        this.setState({
          userId:"",
          userRec:null,
          bookId:"",
          bookRec:null,
        })
      }
    })
  }

  handleUserIdChange(event) {
    const userId = event.target.value;
    Meteor.call("getUserRecByUserId",userId, (err, result) => {
      if (err)
        return
      this.setState({userId:userId,userRec:result})
    })
  }

  handleBookIdChange(event) {
    const bookId = event.target.value;
    Meteor.call("getBookRecByBookId",bookId, (err,result) => {
      if (err)
        return
      this.setState({bookId:bookId,bookRec:result})
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
       <div className="form-group">
        <label htmlFor="enterUserId" className="h5">{T("userId")}</label>
        <input type="text" 
          className="form-control" id="enterUserId"
          aria-describedby="userIdHelp" placeholder={T("enterUserId")}
          onChange={this.handleUserIdChange}
          value={this.state.userId} />
        <small id="userIdHelp" className="form-text text-muted">
           {T("enterUserIdHelp")}
        </small>
       </div>
       <UserInfo userRec={this.state.userRec} />
       <div className="form-group">
        <label htmlFor="enterBookId1" className="h5">{T("bookId")}</label>
        <input type="text" 
          className="form-control" id="enterBookId1"
          aria-describedby="bookIdHelp1" placeholder={T("enterBookId")}
          onChange={this.handleBookIdChange}
          value={this.state.BookId} />
        <small id="bookIdHelp1" className="form-text text-muted">
           {T("enterBookIdHelp")}
        </small>
       </div>
       <BookInfo bookRec={this.state.bookRec} />
       <button type="submit" className="btn btn-primary">{T("confirmBorrow")}</button>
      </form>
    )
  }
}

export class ReturnBook extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      bookId:"",
      bookRec:null,
    }
    this.handleBookIdChange = this.handleBookIdChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault()
    const book = this.state.bookRec
    var alert_msg=""
    if ( book === null ) {
      alert(T("bookIdInvalid"))
      return
    }
    if (!book.borrowed) {
      alert(T("bookNotBorrowed"))
      return
    }
    Meteor.call("returnBook",this.state.bookId,
      (err,result)=>{
      if (err)
        alert(T("returnFail"))
      else if (result !== null)
        alert(result)
      else {
        alert(T("returnSuccess"))
        this.setState({
          bookId:"",
          bookRec:null,
        })
      }
    })
  }

  handleBookIdChange(event) {
    const bookId = event.target.value;
    Meteor.call("getBookRecByBookId",bookId, (err,result) => {
      if (err) {
        console.log(err)
        return
      }
      if (result === null) {
        this.setState({bookId:bookId})
        return
      }
      this.setState({bookId:bookId,bookRec:result})
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
       <div className="form-group">
        <label htmlFor="enterBookId2" className="h5">{T("bookId")}</label>
        <input type="text" 
          className="form-control" id="enterBookId2"
          aria-describedby="bookIdHelp2" placeholder={T("enterBookId")}
          onChange={this.handleBookIdChange}
          value={this.state.BookId} />
        <small id="bookIdHelp2" className="form-text text-muted">
           {T("enterBookIdHelp")}
        </small>
       </div>
       <BookInfo bookRec={this.state.bookRec} />
       {this.state.bookRec !== null && 
       <UserInfo userRec={this.state.bookRec.borrowUserRec} /> }
       <button type="submit" className="btn btn-primary">{T("confirmReturn")}</button>
      </form>
    )
  }
}

export class Manager extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <ManagerMenu />
      </div>
    )
  }
}

export class Other extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curTab:"",
      json:[]
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const tab = event.target.value;
    Meteor.call("getTableData",tab,(err,result)=>{
      if (err)
        return
      this.setState({curTab: tab,json:result});
    })
  }

  render () {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="select-table">Current table:</label>
          <select id="select-table" value={this.state.curTab} onChange={this.handleChange}>
            <option value="User" key="User">User</option>
            <option value="Book" key="Book">Book</option>
            <option value="BookCopy" key="BookCopy">BookCopy</option>
            <option value="android_metadata" key="android_metadata">android_metadata</option>
            <option value="BorrowedBy" key="BorrowedBy">BorrowedBy</option>
            <option value="BorrowRestriction" key="BorrowRestriction">BorrowRestriction</option>
            <option value="Class" key="Class">Class</option>
            <option value="Library" key="Library">Library</option>
            <option value="sqlite_sequence" key="sqlite_sequence">sqlite_sequence</option>
            <option value="UploadHistory" key="UploadHistory">UploadHistory</option>
          </select>
        </div>
        <ReactJson src = {this.state.json} 
         collapsed = {true} collapseStringsAfterLength={40} />
      </form>
    )
  }
}

export class DbRestore extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    if (this.props.dbFiles === null) {
      alert("No DB files to restore")
      return
    }
    let file=[], tableName=[], reader=[];
    for (let i=0;i<this.props.dbFiles.length;i++) {
      file[i] = this.props.dbFiles[i]
      tableName[i]=file[i].name.replace(".json", "")
      reader[i] = new FileReader();

      reader[i].onload = (event) => {
        let data_str = reader[i].result;
        console.log(data_str);
        let data_json = EJSON.parse(data_str);
        console.log(data_json);
        Meteor.call("restoreTable",data_json, tableName[i], (err,result)=>{
          if (err) {
            alert("Restore table ",tableName[i], "error")
            return
          }
        })
      }
      reader[i].readAsText(file[i], 'UTF-8');
    }
    event.preventDefault()
  }

  render () {
    var fileList=""
    if (this.props.dbFiles !== null)
      //for(let i=0;i<this.props.dbFiles.length;i++) 
      //  fileList=fileList + this.props.dbFiles[i].name + " "
      fileList="" //this.props.dbFiles[0].name
    return (
      <form onSubmit={this.handleSubmit}>
       <div className="form-group">
        <label htmlFor="enterDbFiles">{T("dbFiles")}</label>
        <input type="file"
          directory="true" multiple
          className="form-control" id="enterDbFiles"
          aria-describedby="dbFilesHelp" 
          onChange={this.props.handleDbFilesChange}
          accept='.json'
        />
        <small id="dbFilesHelp" className="form-text text-muted">
           {T("dbFilesHelp")}
        </small>
       </div>
        <button type="submit" className="btn btn-primary">{T("dbRestore")}</button>
      </form>
    )
  }
}
/*
          webkitdirectory="true"
          value={fileList}
*/

export class DcLibApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:"test",
      currentPage:"borrowBook",
      userId:"",
      userName:"",
      loginState:false,
      dbFiles:null,
    }
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickSelfBorrow = this.handleClickSelfBorrow.bind(this);
    this.handleClickBorrowBook = this.handleClickBorrowBook.bind(this);
    this.handleClickReturnBook = this.handleClickReturnBook.bind(this);
    this.handleClickManager = this.handleClickManager.bind(this);
    this.handleClickOther = this.handleClickOther.bind(this);

    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.handleDbRestore = this.handleDbRestore.bind(this);
    this.handleDbFilesChange = this.handleDbFilesChange.bind(this);
  }

  handleClickLogin(event) {
    if (this.state.loginState)
    {
      Meteor.call("logout",(err,result)=>{
        if (err)
          alert("Logout error.")
        else if (result !== null)
          alert(result)
      })
      this.setState({loginState:false})
    }
    else
      this.setState({currentPage:'login'})
  }

  handleClickSelfBorrow(event) {
    this.setState({data:"Mouse Clicked SelfBorrow",
      currentPage:'selfBorrow'})
  }

  handleClickBorrowBook(event) {
    this.setState({data:"Mouse Clicked BorrowBook",
      currentPage:'borrowBook'})
  }

  handleClickReturnBook(event) {
    this.setState({data:"Mouse Clicked ReturnBook",
      currentPage:'returnBook'})
  }

  handleClickManager(event) {
    this.setState({data:"Mouse Clicked Manager",
      currentPage:'manager'})
  }

  handleClickOther(event) {
    this.setState({data:"Mouse Clicked Other",
      currentPage:'other'})
  }

  handleUserIdChange(event) {
    Meteor.call("getUserName", event.target.value, (err,result)=>{
      if (err) {
        console.log(err)
        return;
      }
      this.setState({userName:result})
    })
    this.setState({userId:event.target.value})
  }

  handleLogin(state) {
    this.setState({loginState:state})
  }

  handleDbRestore(event) {
    this.setState({
      currentPage:'dbRestore'})
    
  }

  handleDbFilesChange(event) {
    this.setState({dbFiles:event.target.files})
  }

  render() {
    return (
      <div className="container">
        <MainMenu handleClickLogin={this.handleClickLogin}
          handleClickSelfBorrow={this.handleClickSelfBorrow}
          handleClickBorrowBook={this.handleClickBorrowBook}
          handleClickReturnBook={this.handleClickReturnBook}
          handleClickManager={this.handleClickManager}
          handleClickOther={this.handleClickOther}
          handleDbRestore={this.handleDbRestore}
          loginState={this.state.loginState}
        />
        {this.state.currentPage === 'login' && 
          <Login handleUserIdChange={this.handleUserIdChange} 
             userId={this.state.userId}
             userName={this.state.userName}
             handleLogin={this.handleLogin}
             loginState={this.state.loginState}
          /> }
        {this.state.currentPage === 'selfBorrow' && <SelfBorrow /> }
        {this.state.currentPage === 'borrowBook' && <BorrowBook /> }
        {this.state.currentPage === 'returnBook' && <ReturnBook /> }
        {this.state.currentPage === 'manager' && <Manager /> }
        {this.state.currentPage === 'other' && <Other /> }
        {this.state.currentPage === 'dbRestore' && 
          <DbRestore
            handleDbFilesChange={this.handleDbFilesChange}
            dbFiles={this.state.dbFiles}
          />
        }
      </div>
    );
  }
}
