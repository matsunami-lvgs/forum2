import { Sequelize, Model, DataTypes } from 'sequelize';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
const sequelize = new Sequelize('postgres://postgres:hoge@localhost/forum');
const table_name: string = 'posts';
dayjs.extend(timezone);
dayjs.extend(utc);

class Posts extends Model {
  public id!: number;
  public name!: string | null;
  public body!: string;
  public showCreated!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Posts.init(
  {
    id: {
      type: new DataTypes.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: new DataTypes.STRING(30),
      allowNull: true,
    },
    body: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    showCreated: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    createdAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    updatedAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: table_name,
    sequelize,
  }
);

class insert {
  private inputname:string
  private inputbody:string
  constructor(inputname: string, inputbody: string){
    this.inputbody = inputbody
    this.inputname = inputname
  }
  execute =()=> Posts.create({
    name: this.inputname,
    body: this.inputbody,
    showCreated: formatTimestamp(new Date()),
  });
};

//テーブル作成用
const create = async function () {
  await Posts.sync();
};

const selectAll = async function (): Promise<object> {
  const result = await Posts.findAll({
    attributes: ['id', 'name', 'showCreated', 'body'],
    order: [['id', 'ASC']],
  });
  return result;
};

const deletewhereID = async function (postsID: number) {
  await Posts.destroy({
    where: {
      id: postsID,
    },
  });
};

const updatewhereID = async function (postID: number, postBody: string) {
  console.log(postBody);
  await Posts.update(
    { body: postBody },
    {
      where: {
        id: postID,
      },
    }
  );
};

const resetTable = async function () {
  await sequelize.query('TRUNCATE TABLE posts RESTART IDENTITY');
};
//TEST
const formatTimestamp = function (now: Date): string {
  const formatted: string = dayjs(now)
    .tz('Asia/Tokyo')
    .format('YYYY/MM/DD HH:mm:ss.SSS');
  console.log(`時間は${formatted}`);
  return formatted;
};

export { insert, selectAll, deletewhereID, updatewhereID, resetTable };
export { create };
