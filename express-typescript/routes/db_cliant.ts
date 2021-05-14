import { Sequelize , Model, DataTypes } from 'sequelize';
const sequelize = new Sequelize(
    'postgres://postgres:hoge@localhost/forum'
);
const table_name :string= 'posts' 

class Posts extends Model {
    public id!:number;
    public name!:string|null;
    public body!:string;
}


Posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true
        },
        name: {
            type: new DataTypes.STRING(25),
            allowNull: true,
        },
        body: {
            type: new DataTypes.STRING,
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

async function selectAll (){
    const hoge = await Posts.findAll();
    console.log('この下hogu.name');
    console.log(hoge);
    return(hoge);
};


const selectID = async function (postsID:number) {
    await Posts.findAll({
        where:{
            id:postsID
        }
    });
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

export{insert, selectAll};
