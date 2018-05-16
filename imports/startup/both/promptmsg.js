msg={
login:"登录",
logout:"退出",
loginError:"登录错误",
"selfBorrow":"自助借阅",
borrowBook:"图书借阅",
returnBook:"图书归还",
manager:"管理员",
other:"其它",

enterBookId:"输入索书号",
bookId:"索书号",
restart:"重新开始",
confirmReturn:"确认还书",
returnSuccess:"还书成功",
enterUserNo:"输入读者索号",
confirmBorrow:"确认借书",
borrowSuccess:"借书成功",

enterUserId:"输入读者索号",
enterPassword:"输入密码",
password:"密码",
userId:"读者索号",
userName:"读者姓名",
userGender:"性别",
borrowRestriction:"剩余可借数量",
classInfo:"班级",
role:"身份",
male:"男",
female:"女",

enterUserIdHelp:"读者索号为借书证上面的号码",
enterBookIdHelp:"索书号为图书条码号码",

bookTitle:"书名",
bookDesc:"内容概述",
bookDonor:"捐赠人",
bookLocation:"存放位置",
bookStatus:"状态",
bookAuthor:"作者",
bookPrice:"价格",
bookPubDate:"出版日期",
bookPublisher:"出版商",
bookBorrowStatus:"借书状态",
bookBorrowed:"已借出",
bookAvailable:"可借",

timeoutBorrow:"超时查询",
borrowHistory:"借阅历史",
bookManage:"图书管理",
readerManage:"读者管理",
classManage:"班级管理",
roleManage:"身份管理",

databaseBackup:"数据库备份",
databaseRestore:"数据库恢复",
dbFiles:"数据库备份文件(.json)",
dbFilesHelp:"选择需要恢复的数据库文件, 可选多个",
dbRestore:"恢复数据库",

userNotExist:"用户不存在",
userTabCorrupt:"用户表崩溃",
createPassword:"请先创建密码再登录",
passwordWrong:"密码错误",

};

export function T(msgText) {
  if (msg[msgText] === undefined)
    return msgText
  else
    return msg[msgText]
}

