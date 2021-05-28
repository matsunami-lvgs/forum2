import { Sequelize , Model, DataTypes } from 'sequelize';
import crypto from 'crypto-js'
const sequelize = new Sequelize(
  'postgres://postgres:hoge@localhost/forum',
  {logging:console.log}
);
const table_name :string= 'session' 

class Session extends Model {
  public sid!:string;
  public sess!:string;
  public expire!:string;
  public hashid!:string;
}



Session.init(
  { 
    sid:{
      type: new DataTypes.STRING,
      primaryKey:true,
    },
    sess:{
      type: new DataTypes.STRING,
      allowNull: false,
    },
    expire:{
      type: new DataTypes.DATE,
      allowNull: false,
    },
    hashid:{
      type: new DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: table_name,
    timestamps: false,
    sequelize,
  }
);

//ハッシュ生成＆埋め込み
//生成したハッシュを返す
const addhash = async function (postsid:string) {
  //まずはエスケープ等を意識せずに使ってみる
  const hash:string = await JSON.stringify(crypto.SHA256(postsid));
  console.log(hash);
  console.log(postsid);
  console.log(typeof(hash));
  //const Qpostid = "'"+postsid+"'";
  //console.log(Qpostid);
  //postid = 
  let num = await Session.count();
  console.log(num);
  await Session.update({hashid: hash},{
    where: {
      sid : postsid
    }
  });
  num = await Session.count();
  console.log(num);
  return hash;
};

//突合
const selecthash = async function (hash:string){
  const hoge = await Session.count({
    where:{hashid:hash}
  });
  console.log(hoge)
  return hoge;
};

const deletesession= async function (hash:string) {
  await Session.destroy({
    where:{
      hashid:hash
    }
  });
};

export{addhash, selecthash, deletesession};
