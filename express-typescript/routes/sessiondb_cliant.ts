import { Sequelize, Model, DataTypes } from 'sequelize';
import crypto from 'crypto';
const sequelize = new Sequelize('postgres://postgres:hoge@localhost/forum', {
  logging: console.log,
});
const table_name: string = 'session';

class Session extends Model {
  public sid!: string;
  public sess!: string;
  public expire!: string;
  public hashid!: string;
}

Session.init(
  {
    sid: {
      type: new DataTypes.STRING(),
      primaryKey: true,
    },
    sess: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    expire: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    hashid: {
      type: new DataTypes.STRING(),
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
//TEST
const makehash = async function (postsid: string) {
  const key: string = 'KHu4DPdn2vpBxKfqRJ2Fux9HwmVwX7Xy';
  const hash: string = await crypto
    .createHash('sha256')
    .update(`${key}${postsid}`)
    .digest('hex');
  console.log(hash);
  console.log(postsid);
  return hash;
};

const updatehash = async function (postid: string, hash: string) {
  console.log('あっぷでーと！');
  await Session.update(
    { hashid: hash },
    {
      where: {
        sid: postid,
      },
    }
  );
};

//突合
//TEST
const checkhash = async function (hash: string) {
  const result: number = await Session.count({ where: { hashid: hash } });
  return (result === 1);
};

const deletesession = async function (hash: string) {
  await Session.destroy({
    where: {
      hashid: hash,
    },
  });
};

export { makehash, updatehash, checkhash, deletesession };
