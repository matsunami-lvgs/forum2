import {
  insert,
  selectAll,
  deletewhereID,
  updatewhereID,
  resetTable,
} from './db_cliant';


interface inputcheck {
  iscorrect: boolean
  status:number
  //できない
  //status:number 200|400|401
}
