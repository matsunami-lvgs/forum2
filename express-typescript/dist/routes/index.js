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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const db_cliant_1 = require("./db_cliant");
//import {login} from './authentication';
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const sessiondb_cliant_1 = require("./sessiondb_cliant");
const LocalStrategy = passport_local_1.default.Strategy;
const router = express_1.default.Router();
exports.router = router;
//router.use(login.initialize());
//ここから認証の設定
const admin = {
    username: 'kai',
    password: 'kai'
};
const redilectNotAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
        return (true);
    }
    else {
        return (false);
    }
    ;
};
passport_1.default.use(new LocalStrategy((username, password, done) => {
    if (username === admin.username && password === admin.password) {
        console.log('Authentication Sucess');
        return done(null, { username: username, password: password });
    }
    else if (username !== admin.username || password !== admin.password) {
        console.log('Authentication failue');
        return done(null, false);
    }
}));
passport_1.default.serializeUser((user, done) => {
    console.log('selialize...');
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    console.log('deselialize...');
    done(null, user);
});
router.use(passport_1.default.initialize());
router.use(passport_1.default.session());
//ここまで認証の設定
/* GET home page. */
router.get('/api/postlist', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = yield db_cliant_1.selectAll();
        console.log(`Received a request  ${new Date()}`);
        console.log(`req.usr: ${req.user}`);
        console.log(`req.isAuthenticated: ${req.isAuthenticated()}`);
        console.log(`req.cookies: ${req.cookies.sessID2}`);
        //フロントエンドの実装につき一部Json化
        res.json(Object.values(posts));
    });
});
router.post('/api/postlist', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${new Date()}`);
        console.log(req.body);
        yield db_cliant_1.insert(req.body.postwriter, req.body.postbody);
        res.json();
    });
});
router.put('/api/postlist', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //redilectNotAuth(req,res,next);
        //todo
        //if (selecthash('本当はここにcookieに保存した仮のセッションIDが入る')){
        if (sessiondb_cliant_1.checkhash(req.cookies.sessID2)) {
            console.log('アップデート本文');
            console.log(req.body.updateid, req.body.updatebody);
            const fuga = yield db_cliant_1.updatewhereID(req.body.updateid, req.body.updatebody);
            console.log(fuga);
            res.json();
        }
        else {
            res.status(401);
            res.json();
        }
    });
});
//TODO
router.delete('/api/postlist', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //redilectNotAuth(req,res,next);
        //todo
        //if (selecthash('本当はここにcookieに保存した仮のセッションIDが入る')){
        console.log(`req.cookies: ${req.cookies.sessID2}`);
        if (sessiondb_cliant_1.checkhash(req.cookies.sessID2)) {
            console.log(`[ID]:${req.body.deleteid}`);
            yield db_cliant_1.deletewhereID(req.body.deleteid);
            res.json();
        }
        else {
            res.status(401);
            res.json();
        }
    });
});
//ここを抜けて初めて登録が走るのでは？？という
/***
 * Connect-pg-simpleとpassportの挙動がマジでわかんねえソース見せろ
 * 特にPassportおまじないが多すぎて引き渡し部分が全く見えない
 */
//Todo,Cookieの仕様が固まったらconsole.logをどうにかする
router.post('/api/login', passport_1.default.authenticate('local'), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('これでどうだ');
        console.log(req.sessionID);
        console.log(req.isAuthenticated());
        const tokenhash = yield sessiondb_cliant_1.makehash(req.sessionID);
        console.log(tokenhash);
        //const expires:string = responseExpireToString(req.session.cookie.expires);
        res.cookie('sessID2', tokenhash, {
            maxAge: 10 * 60 * 1000,
            httpOnly: false,
        });
        res.json({});
        next();
    });
});
router.post('/api/login', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield sessiondb_cliant_1.makehash(req.sessionID);
        yield sessiondb_cliant_1.updatehash(req.sessionID, hash);
        //res.json(hoge);
        console.log(hash);
        console.log(res.header);
    });
});
const responseExpireToString = function (req) {
    if (req === undefined || req === null) {
        return ('');
    }
    else {
        return (req.toUTCString());
    }
};
router.delete('/api/login', function (req, res, next) {
    sessiondb_cliant_1.deletesession(req.cookies.sessID2);
    req.logout();
    res.clearCookie('sessID2');
    //todo
    //deletesession('リクエストのcookieについてるハッシュ');
    res.json();
});
router.post('/admin/reset', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_cliant_1.resetTable();
        res.json();
    });
});
