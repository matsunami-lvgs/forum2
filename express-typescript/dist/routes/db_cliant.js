"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectID = exports.deleteID = exports.selectAll = exports.insert = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('postgres://postgres:hoge@localhost/forum');
const table_name = 'posts';
class Posts extends sequelize_1.Model {
}
Posts.init({
    id: {
        type: new sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(25),
        allowNull: true,
    },
    body: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: new sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: new sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: table_name,
    sequelize,
});
const insert = function (inputname, inputbody) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Posts.create({ name: inputname, body: inputbody });
    });
};
exports.insert = insert;
//テーブル作成用
const create = function (inputname, inputbody) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Posts.sync();
    });
};
const selectAll = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const hoge = yield Posts.findAll();
        //TODO:あとで消す
        console.log('この下hoge');
        console.log(hoge);
        console.log('この下hogeMap');
        const hogeMap = yield hoge.filter(Posts => {
            Posts.id;
        });
        console.log(hogeMap);
        console.log('この下hogeの型とhogeMapの型');
        console.log(typeof hoge);
        console.log(typeof hogeMap);
        //あとで消す
        return (hoge);
        //const hogeJson = JSON.key(hogeMap);
        //console.log (hogeJson)
        //いったん区切りで実装
        //おそらくはこいつSeledtAllを外に出して、文字列を返す用の関数を置いて実装という形になるのだろ
    });
};
exports.selectAll = selectAll;
const selectID = function (postsID) {
    return __awaiter(this, void 0, void 0, function* () {
        const hoge = yield Posts.findAll({
            where: {
                id: postsID
            }
        });
        return hoge;
    });
};
exports.selectID = selectID;
const deleteID = function (postsID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Posts.destroy({
            where: {
                id: postsID
            }
        });
    });
};
exports.deleteID = deleteID;
const updateID = function (postID, postName, postBody) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Posts.update({ name: postName, body: postBody }, {
            where: {
                id: postID
            }
        });
    });
};
