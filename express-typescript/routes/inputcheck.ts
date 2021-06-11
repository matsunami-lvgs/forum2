
interface inputcheck {
  iscorrect: boolean
  status:number
  //できない
  //status:number 200|400|401
}
import {
  insert,
  selectAll,
  deletewhereID,
  updatewhereID,
  resetTable,
} from './db_cliant';


import {checkhash} from './sessiondb_cliant'


export class posttimeline{
  constructor(name:string,body:string){
    this.insert = new insert(name,body)
    this.iscorrect = x
  }
  iscorrect:boolean;
  insert;
}

class bodycheck{
  iscorrect:boolean;
  constructor(body:string){
    this.iscorrect=this.checklength(body)
  }
  private checklength =(body:string)=>{
    const maxlength=3000
    return(maxlength >= body.length && body.length !==0)
  }
}

class namecheck{
  iscorrect:boolean;
  constructor(name:string){
    this.iscorrect=this.checklength(name)
  }
  private checklength=(name:string)=>{
    const maxlength=30
    return(maxlength >= name.length)
  }
}

const hashcheck=(hash:string):inputcheck=>{
  if(checkhash(hash)){
    return{iscorrect:true,status:200}
  }
  return{iscorrect:false,status:401}
}
