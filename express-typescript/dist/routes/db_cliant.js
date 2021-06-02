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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.resetTable = exports.updatewhereID = exports.selectwhereID = exports.deletewhereID = exports.selectAll = exports.insert = void 0;
const sequelize_1 = require("sequelize");
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const sequelize = new sequelize_1.Sequelize('postgres://postgres:hoge@localhost/forum');
const table_name = 'posts';
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(utc_1.default);
class Posts extends sequelize_1.Model {
}
Posts.init({
    id: {
        type: new sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(30),
        allowNull: true,
    },
    body: {
        type: new sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    showCreated: {
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
        yield Posts.create({ name: inputname, body: inputbody, showCreated: formatTimestamp() });
    });
};
exports.insert = insert;
//テーブル作成用
const create = function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield Posts.sync();
    });
};
exports.create = create;
const selectAll = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield Posts.findAll({
            attributes: ['id', 'name', 'showCreated', 'body'],
            order: [['id', 'ASC']]
        });
        return (result);
    });
};
exports.selectAll = selectAll;
const selectwhereID = function (postsID) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield Posts.findAll({
            attributes: ['id', 'name', 'showCreated', 'body'],
            where: {
                id: postsID
            }
        });
        return result;
    });
};
exports.selectwhereID = selectwhereID;
const deletewhereID = function (postsID) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Posts.destroy({
            where: {
                id: postsID
            }
        });
    });
};
exports.deletewhereID = deletewhereID;
const updatewhereID = function (postID, postBody) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(postBody);
        yield Posts.update({ body: postBody }, {
            where: {
                id: postID
            }
        });
    });
};
exports.updatewhereID = updatewhereID;
const resetTable = function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize.query('TRUNCATE TABLE posts RESTART IDENTITY');
    });
};
exports.resetTable = resetTable;
const formatTimestamp = function () {
    const formatted = dayjs_1.default().tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss.SSS');
    console.log(`時間は${formatted}`);
    return (formatted);
};
