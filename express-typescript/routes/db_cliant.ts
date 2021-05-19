import { Sequelize , Model, DataTypes } from 'sequelize';
import dayjs from 'dayjs';
const sequelize = new Sequelize(
  'postgres://postgres:hoge@localhost/forum'
);
const table_name :string= 'posts' 

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
  await Posts.create({name:inputname,body:inputbody,showCreated:formatTimestamp(new Date)});
};

//テーブル作成用
const create = async function () {
  await Posts.sync();
};

const selectAll  =async function ():Promise<object>{
  const hoge = await Posts.findAll({
    order:[['id','ASC']]
  });
  return(hoge);
};

const selectwhereID = async function (postsID:number):Promise<object>{
  const hoge = await Posts.findAll({
    where:{
      id:postsID
    }
  });
  return hoge;
};

const deletewhereID = async function (postsID:number) {
  await Posts.destroy({
    where:{
      id:postsID
    }
  });
};

const updatewhereID = async function (postID:number,postName:string,postBody:string) {
  await Posts.update({name:postName,body:postBody},{
    where: {
      id : postID
    }
  });
};

const resetTable = async function () {
  await sequelize.query('TRUNCATE TABLE posts RESTART IDENTITY');
}

const formatTimestamp=function(timestamp:Date){
  const formatted:string = dayjs(timestamp).format('YYYY/MM/DD HH:mm:ss.SSS')
  return(formatted);
};

export{insert, selectAll, deletewhereID,selectwhereID,updatewhereID,resetTable };
export{create};
