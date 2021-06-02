import { Sequelize , Model, DataTypes } from 'sequelize';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from "dayjs/plugin/utc";
import { CreatedAt } from 'sequelize-typescript';
const sequelize = new Sequelize(
  'postgres://postgres:hoge@localhost/forum'
);
const table_name :string= 'posts' 
dayjs.extend(timezone);
dayjs.extend(utc);


class Posts extends Model {
  public id!:number;
  public name!:string|null;
  public body!:string;
  public showCreated!:string;
  public createdAt!:Date;
  public updatedAt!:Date;
}

Posts.init(
  {
    id: {
      type: new DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    name: {
      type: new DataTypes.STRING(30),
      allowNull: true,
    },
    body: {
      type: new DataTypes.TEXT,
      allowNull: false,
    },
    showCreated: {
      type: new DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: new DataTypes.DATE
      ,
      allowNull: false,
    },
    updatedAt: {
      type: new DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: table_name,
    sequelize,
  }
);

const insert = async function (inputname:string,inputbody:string) {
  await Posts.create({name:inputname,body:inputbody,showCreated:formatTimestamp()});
};

//テーブル作成用
const create = async function () {
  await Posts.sync();
};

const selectAll  =async function ():Promise<object>{
  const result = await Posts.findAll({
    attributes:['id', 'name', 'showCreated', 'body'],
    order:[['id','ASC']]
  });
  return(result);
};

const selectwhereID = async function (postsID:number):Promise<object>{
  const result = await Posts.findAll({
    attributes:['id', 'name', 'showCreated', 'body'],
    where:{
      id:postsID
    }
  });
  return result;
};

const deletewhereID = async function (postsID:number) {
  await Posts.destroy({
    where:{
      id:postsID
    }
  });
};

const updatewhereID = async function (postID:number,postBody:string) {
  console.log(postBody);
  await Posts.update({body:postBody},{
    where: {
      id : postID
    }
  });
};

const resetTable = async function () {
  await sequelize.query('TRUNCATE TABLE posts RESTART IDENTITY');
}

const formatTimestamp=function():string{
  const formatted:string = dayjs().tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss.SSS');
  console.log(`時間は${formatted}`)
  return(formatted);
};



export{insert, selectAll, deletewhereID,selectwhereID,updatewhereID,resetTable };
export{create};
