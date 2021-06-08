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
exports.deletesession = exports.checkhash = exports.updatehash = exports.makehash = void 0;
const sequelize_1 = require("sequelize");
const crypto_1 = __importDefault(require("crypto"));
const sequelize = new sequelize_1.Sequelize('postgres://postgres:hoge@localhost/forum', {
    logging: console.log,
});
const table_name = 'session';
class Session extends sequelize_1.Model {
}
Session.init({
    sid: {
        type: new sequelize_1.DataTypes.STRING(),
        primaryKey: true,
    },
    sess: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: false,
    },
    expire: {
        type: new sequelize_1.DataTypes.DATE(),
        allowNull: false,
    },
    hashid: {
        type: new sequelize_1.DataTypes.STRING(),
        allowNull: true,
    },
}, {
    tableName: table_name,
    timestamps: false,
    sequelize,
});
//ハッシュ生成＆埋め込み
//生成したハッシュを返す
//TEST
const makehash = function (postsid) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = 'KHu4DPdn2vpBxKfqRJ2Fux9HwmVwX7Xy';
        const hash = yield crypto_1.default
            .createHash('sha256')
            .update(`${key}${postsid}`)
            .digest('hex');
        console.log(hash);
        console.log(postsid);
        return hash;
    });
};
exports.makehash = makehash;
const updatehash = function (postid, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('あっぷでーと！');
        yield Session.update({ hashid: hash }, {
            where: {
                sid: postid,
            },
        });
    });
};
exports.updatehash = updatehash;
//突合
//TEST
const checkhash = function (hash) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield Session.count({ where: { hashid: hash } });
        return (result === 1);
    });
};
exports.checkhash = checkhash;
const deletesession = function (hash) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Session.destroy({
            where: {
                hashid: hash,
            },
        });
    });
};
exports.deletesession = deletesession;
