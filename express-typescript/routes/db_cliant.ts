import { JSON } from 'sequelize';
import { Sequelize , Model, DataTypes } from 'sequelize';
const sequelize = new Sequelize(
    'postgres://postgres:hoge@localhost/forum'
);
const table_name :string= 'posts' 

class Posts extends Model {
    public id!:number;
    public name!:string|null;
    public body!:string;
    public createdAt!:string;
    public updatedAt!:string;
}


Posts.init(
    {
        id: {
            type: new DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name: {
            type: new DataTypes.STRING(25),
            allowNull: true,
        },
        body: {
            type: new DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: new DataTypes.DATE,
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
    await Posts.create({name:inputname,body:inputbody});
};

//テーブル作成用
const create = async function (inputname:string,inputbody:string) {
    await Posts.sync();
};

const selectAll  =async function ():Promise<object>{
    const hoge = await Posts.findAll();
    //TODO:あとで消す
    console.log('この下hoge');
    console.log(hoge);
    console.log('この下hogeMap');
    const hogeMap:object = await hoge.filter(Posts=>{
        Posts.id;
    });
    console.log (hogeMap);
    console.log('この下hogeの型とhogeMapの型');
    console.log(typeof hoge);
    console.log(typeof hogeMap); 
    //あとで消す
    return(hoge);
    //const hogeJson = JSON.key(hogeMap);
    //console.log (hogeJson)
    //いったん区切りで実装
    //おそらくはこいつSeledtAllを外に出して、文字列を返す用の関数を置いて実装という形になるのだろ
};

const selectID = async function (postsID:number):Promise<object>{
    const hoge = await Posts.findAll({
        where:{
            id:postsID
        }
    });
    return hoge;
};

const deleteID = async function (postsID:number) {
    await Posts.destroy({
        where:{
            id:postsID
        }
    });
};

const updateID = async function (postID:number,postName:string,postBody:string) {
    await Posts.update({name:postName,body:postBody},{
        where: {
            id : postID
        }
    });
};

export{insert, selectAll, deleteID,selectID};
