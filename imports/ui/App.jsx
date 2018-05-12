import React from 'react';
 
// App component - represents the whole app
/*
*/
msg={
login:"登录",
selfBorrow:"自助借阅",
borrowBook:"图书借阅",
returnBook:"图书归还",
manager:"管理员",
other:"其它",

enterBookNo:"输入索书号",
restart:"重新开始",
confirmReturn:"确认还书",
enterReaderNo:"输入用户号",
confirmBorrow:"确认借书",

enterBorrowerId:"输入读者索号",
enterPassword:"输入密码",
userId:"读者索号",
userName:"读者姓名",

timeoutBorrow:"超时查询",
borrowHistory:"借阅历史",
bookManage:"图书管理",
readerManage:"读者管理",
classManage:"班级管理",
roleManage:"身份管理",
};

function MainMenu1(props) {
  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home 
         <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
  </div>
</nav>
)}

/*
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
*/
function MainMenu0(props) {
  return (
<nav className="navbar navbar-expand-sm navbar-light sm-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home
          <span className="sr-only">(current)</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Features</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Pricing</a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
  </div>
</nav>
)}

/*
    style={{"background-color": "#e3f2fd"}}>
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
        <li className="nav-item active" onClick = {props.handleClickLogin}>
          <a className="navbar-brand" href="#">
           {msg.login}
           <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item" onClick = {props.handleClickSelfBorrow}>
          <a className="navbar-brand" href="#">
           {msg.selfBorrow}
           <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item" onClick = {props.handleClickBorrowBook}>
          <a className="navbar-brand" href="#">
           {msg.borrowBook}
           <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item" onClick = {props.handleClickReturnBook}>
          <a className="navbar-brand" href="#">
           {msg.returnBook}
           <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item" onClick = {props.handleClickManager}>
          <a className="navbar-brand" href="#">
           {msg.manager}
           <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item" onClick = {props.handleClickOther}>
          <a className="navbar-brand" href="#">
           {msg.other}
           <span className="sr-only">(current)</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
  )
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:"test",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    LoginForm = (props)=>{
      return (
      <div>
        <label>{msg.enterBorrowerId}</label>
        <input type="text" onChange={this.props.handleBorrowerIdChange} />
        { this.props.userName !== "" && 
           <label>{msg.userName}: {this.props.userName} </label>
        }
        <br />
        <label>{msg.enterPassword}</label>
        <input type="text" />
        <br />
        <input type="submit" value="Login" />
      </div>
      )
    }
/*
         <input type="text" onChange={this.props.handleUserNameChange}
           value={this.props.userName} />
*/
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
         {!this.props.loginState && 
           <LoginForm handleBorrowerIdChange={this.props.handleBorrowerIdChange}
             userName={this.props.userName}/>
         }
         {this.props.loginState && <input type="submit" value="Logout" /> }
        </form>
      </div>
    )
  }
}

function SelfBorrow () {
  return (
    <div>
       <p>To be developed</p>
    </div>
  )
}

export class BorrowBook extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
      <label>{msg.enterReaderNo}</label>
      <input type='text' />
      <p>Reader info</p>
      <p>Reader borrow info</p>
      <p>Book search view</p>
      <input type='button' value={msg.restart} />
      <input type='button' value={msg.confirmBorrow} />
      </div>
    )
  }
}

export class ReturnBook extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
      <label>{msg.enterBookNo}</label>
      <input type='text' />
      <p>Book info</p>
      <p>Borrower info</p>
      <input type='button' value={msg.restart} />
      <input type='button' value={msg.confirmReturn} />
      </div>
    )
  }
}

function ManagerMenu() {
  return(
    <ul>
      <li>{msg.timeoutBorrow}</li>
      <li>{msg.borrowHistory}</li>
      <li>{msg.bookManage}</li>
      <li>{msg.readerManage}</li>
      <li>{msg.classManage}</li>
      <li>{msg.roleManage}</li>
    </ul>
  )
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
  }
  render () {
    return (
      <div>
        <p>{msg.other}</p>
      </div>
    )
  }
}

export class DcLibApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:"test",
      currentPage:"login",
      userName:"test name",
      loginState:false,
    }
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickSelfBorrow = this.handleClickSelfBorrow.bind(this);
    this.handleClickBorrowBook = this.handleClickBorrowBook.bind(this);
    this.handleClickReturnBook = this.handleClickReturnBook.bind(this);
    this.handleClickManager = this.handleClickManager.bind(this);
    this.handleClickOther = this.handleClickOther.bind(this);

    this.handleBorrowerIdChange = this.handleBorrowerIdChange.bind(this);
  }

  handleClickLogin(event) {
    this.setState({data:"Mouse Clicked Login",
      currentPage:'login'})
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

  handleBorrowerIdChange(event) {
    Meteor.call("getUserName", event.target.value, (err,result)=>{
      if (err) {
        console.log(err)
        return;
      }
      this.setState({userName:result})
    })
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
        />
        {this.state.currentPage === 'login' && 
          <Login handleBorrowerIdChange={this.handleBorrowerIdChange} 
             userName={this.state.userName} /> }
        {this.state.currentPage === 'selfBorrow' && <SelfBorrow /> }
        {this.state.currentPage === 'borrowBook' && <BorrowBook /> }
        {this.state.currentPage === 'returnBook' && <ReturnBook /> }
        {this.state.currentPage === 'manager' && <Manager /> }
        {this.state.currentPage === 'other' && <Other /> }
      </div>
    );
  }
}
