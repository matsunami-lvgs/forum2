
interface errorcheck{
  iscorrect:boolean,
  message:string
}


//コンストラクタとインターフェースを使うパターン(別にインターフェースはなくていいかもしれない)
export class bodyCheck implements errorcheck{
  message;
  iscorrect;
  private maxbody = 3000;
  
  constructor(body:string){
    this.iscorrect=this.checkempty(body)||this.checkempty(body);
    this.message=this.getMessage(body);
  };

  private checkmax=(body:string):boolean=>{
    return(this.maxbody>=[...body].length)
  };
  private checkempty=(body:string):boolean=>{
    return(body!=='')
  };
  private getMessage=(body:string):string=> {
    let ans = '';
    if (this.checkmax(body)===false){
      ans += `本文が${this.maxbody.toString()}字を超えています。`;
    };
    if (this.checkempty(body)===false){
      ans += `本文が空欄です。`;
    };
    return ans;
  }
  
}


export class nameCheck implements errorcheck{
  private maxname = 30;
  iscorrect;
  message;

  constructor(name:string){
    this.iscorrect=this.checkmax(name)
    this.message=this.getMessage(name)
  };
  
  private checkmax=(name:string):boolean=>{return(this.maxname>=[...name].length)}
  
  private getMessage=(name:string):string=>{
    let ans = '';
    if (this.checkmax(name)===false){
      ans = `名前が${this.maxname.toString()}字を超えています。`;
    }
    return ans;
  }
}

export class userNameCheck implements errorcheck{
  iscorrect;
  message;
  constructor (name:string){
    this.iscorrect = this.checkempty(name)
    this.message = this.getMessage(name)
  }
  private checkempty=(name:string):boolean=>{
    return(name!=='')
  };
  private getMessage=(name:string):string=>{
    let ans = '';
    if (this.checkempty(name)===false){
      ans = `ユーザー名が空欄です。`;
    }
    return ans;
  }
}

export class passCheck implements errorcheck{
  iscorrect;
  message;
  constructor (password:string){
    this.iscorrect = this.checkempty(password)
    this.message = this.getMessage(password)
  }
  private checkempty=(password:string):boolean=>{
    return(password!=='')
  };
  private getMessage=(name:string):string=>{
    let ans = '';
    if (this.checkempty(name)===false){
      ans = `パスワードが空欄です。`;
    }
    return ans;
  }
}