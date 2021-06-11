
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

export class insertTimeline {
  iscorrect;
  //status;
  private name:string;
  private body:string;
  constructor(name:string,body:string){
    this.name = name;
    this.body = body;
    this.iscorrect = bodycheck(body).iscorrect&&namecheck(name).iscorrect
    //this.status = bodycheck
  }
  insertinput =()=>{
    if (this.iscorrect){
      insert(this.name,this.body)
      return true
    }else{
      return false 
    }
  };
}

const bodycheck=(body:string):inputcheck=>{
  const maxlength=3000
  if(maxlength >= body.length && body.length !==0){
    return{iscorrect:true,status:200}
  }else{
    return{iscorrect:false,status:400}
  }
}


const namecheck=(name:string):inputcheck=>{
  const maxlength=30
  if(maxlength >= name.length){
    return{iscorrect:true,status:200}
  }else{
    return{iscorrect:false,status:400}
  }
}


const hashcheck=(hash:string):inputcheck=>{
  if(checkhash(hash)){
    return{iscorrect:true,status:200}
  }
  return{iscorrect:false,status:401}
}
