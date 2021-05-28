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
exports.deletesession = exports.selecthash = exports.addhash = void 0;
const sequelize_1 = require("sequelize");
const crypto_js_1 = __importDefault(require("crypto-js"));
const sequelize = new sequelize_1.Sequelize('postgres://postgres:hoge@localhost/forum');
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
const addhash = function (postsid) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = "'" + (yield JSON.stringify(crypto_js_1.default.SHA256(postsid))) + "'";
        console.log(hash);
        console.log(typeof (hash));
        //const Qpostid = "'"+postsid+"'";
        //console.log(Qpostid);
        //postid = 
        yield Session.update({ hashid: hash }, {
            where: {
                sid: postsid
            }
        });
        return hash;
    });
};
exports.addhash = addhash;
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
