export  default class Auth{
  constructor(){
      this.isLogin = false; //是否登录
  }

  // 用户登录函数
  static login(username,password,callback){
      if (username==="1" && password==="1"){
          this.isLogin = true;
          callback(); //登录成功，调用回调函数
      }else {
          alert("登录失败");
      }
  }
//用户登出
static logout(callback){
    this.isLogin=false
    callback()
  }
}


