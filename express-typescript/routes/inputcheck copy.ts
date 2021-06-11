
interface inputcheck {
  iscorrect: boolean
  status:number
  //できない
  //status:number 200|400|401
}

/**
 * 本当はこう書きたい
 * statusが200,400,401のみ許容する
 * iscorrectはstatusの値を確認して真偽を判定する
 * 引数でstatusを決める
 * 結論：返り値iscorrectっていらないんじゃないの？？
 * 返り値代わりのメンバと関数一つしかもたない作りになっている
 * クラスにする意味とは？？？実務では今後の変更のためにクラスにするんだけどさ
 * 
 */


//判定結果とステータスのセットを返してそれを入れるようにしたが、ちょっと面倒臭いかもしれない
export class bodycheck implements inputcheck{
  iscorrect;
  status;
  
  constructor (body:string){
    this.iscorrect = this.hoge(body).iscorrect
    this.status = this.hoge(body).status;
  }
  hoge(body:string):inputcheck{
    const maxlength=3000
    if(maxlength >= body.length && body.length !==0){
      return{iscorrect:true,status:200}
    }else{
      return{iscorrect:false,status:400}
    }
  }
}

export class namecheck implements inputcheck{
  iscorrect;
  status;
  constructor (name:string){
    this.iscorrect = this.hoge(name).iscorrect
    this.status = this.hoge(name).status;
  }
  hoge(name:string):inputcheck{
    const maxlength=30
    if(maxlength >= name.length){
      return{iscorrect:true,status:200}
    }else{
      return{iscorrect:false,status:400}
    }
  }
}

import {checkhash} from './sessiondb_cliant'

export class hashcheck implements inputcheck{
  iscorrect;
  status;
  constructor (hash:string){
    this.iscorrect = this.hoge(hash).iscorrect
    this.status = this.hoge(hash).status;
  }
  hoge(hash:string):inputcheck{
    if(checkhash(hash)){
      return{iscorrect:true,status:200}
    }
    return{iscorrect:false,status:401}
  }
}