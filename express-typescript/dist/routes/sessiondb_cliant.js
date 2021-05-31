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
exports.deletesession = exports.selecthash = exports.updatehash = exports.makehash = void 0;
const sequelize_1 = require("sequelize");
const crypto_1 = __importDefault(require("crypto"));
const sequelize = new sequelize_1.Sequelize('postgres://postgres:hoge@localhost/forum', { logging: console.log });
const table_name = 'session';
class Session extends sequelize_1.Model {
}
Session.init({
    sid: {
        type: new sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    sess: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    expire: {
        type: new sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    hashid: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: table_name,
    timestamps: false,
    sequelize,
});
//ハッシュ生成＆埋め込み
//生成したハッシュを返す
const makehash = function (postsid) {
    return __awaiter(this, void 0, void 0, function* () {
        //まずはエスケープ等を意識せずに使ってみる
        const hash = yield crypto_1.default.createHash('sha256').update(postsid).digest('hex');
        console.log(hash);
        console.log(postsid);
        console.log(typeof (hash));
        //const Qpostid = "'"+postsid+"'";
        //console.log(Qpostid);
        //postid = 
        let num = yield Session.count();
        console.log(num);
        /*
        await Session.update({hashid: hash},{
          where: {
            sid : postsid
          }
        });*/
        num = yield Session.count();
        console.log(num);
        return hash;
    });
};
exports.makehash = makehash;
const updatehash = function (postid, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('あっぷでーと！');
        yield Session.update({ hashid: hash }, {
            where: {
                sid: postid
            }
        });
        let num = yield Session.count();
        console.log(num);
    });
};
exports.updatehash = updatehash;
//突合
const selecthash = function (hash) {
    return __awaiter(this, void 0, void 0, function* () {
        const hoge = yield Session.count({
            where: { hashid: hash }
        });
        console.log(hoge);
        return hoge;
    });
};
exports.selecthash = selecthash;
const deletesession = function (hash) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Session.destroy({
            where: {
                hashid: hash
            }
        });
    });
};
exports.deletesession = deletesession;
