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
exports.selectAll = exports.insert = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('postgres://postgres:hoge@localhost/forum');
class Posts extends sequelize_1.Model {
}
Posts.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(25)
    },
    body: {
        type: sequelize_1.DataTypes.STRING(800),
        allowNull: false
    },
}, {
    tableName: 'posts',
    sequelize,
});
const insert = function (inputname, inputbody) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Posts.create({
            name: inputname,
            body: inputbody,
        });
    });
};
exports.insert = insert;
//テーブル作成用
const create = function (inputname, inputbody) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Posts.sync();
    });
};
function selectAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const hoge = yield Posts.findAll({});
        console.log('この下hoge.name');
        console.log(hoge.map);
        return (hoge);
    });
}
exports.selectAll = selectAll;
const selectID = function (postsID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Posts.findAll({
            where: {
                id: postsID
            }
        });
    });
};
const deleteID = function (postsID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Posts.destroy({
            where: {
                id: postsID
            }
        });
    });
};
const updateID = function (postID, postName, postBody) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Posts.update({ name: postName, body: postBody }, {
            where: {
                id: postID
            }
        });
    });
};
