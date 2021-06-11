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
    password: 'kai',
};
//TEST??
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
router.get('/api/timeline', function (req, res, next) {
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
router.post('/api/timeline', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (bodylengthcheck(req.body.postbody) === false ||
            namelengthcheck(req.body.postwriter) === false) {
            res.status(400);
            res.json();
            return;
        }
        console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${new Date()}`);
        console.log(req.body);
        yield db_cliant_1.insert(req.body.postwriter, req.body.postbody);
        res.json();
    });
});
//分岐はないがcheckhashで処理が分離している、この関数はテストやらなくてもいいんじゃないか
router.put('/api/timeline', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.cookies.sessID2);
        console.log(req.body);
        if ((yield sessiondb_cliant_1.checkhash(req.cookies.sessID2)) === false ||
            bodylengthcheck(req.body.updatebody) === false) {
            res.status(401);
            res.json();
            return;
        }
        console.log('アップデート本文');
        console.log(req.body.updateid, req.body.updatebody);
        const fuga = yield db_cliant_1.updatewhereID(req.body.updateid, req.body.updatebody);
        console.log(fuga);
        res.json();
    });
});
//TEST
const bodylengthcheck = (body) => {
    const maxlength = 3000;
    return maxlength >= body.length && body.length > 0;
};
//TEST
const namelengthcheck = (name) => {
    const maxlength = 30;
    return maxlength >= name.length;
};
router.delete('/api/timeline', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`req.cookies: ${req.cookies.sessID2}`);
        if (yield sessiondb_cliant_1.checkhash(req.cookies.sessID2)) {
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
//テストコードを書くべきかほんとわからん
//Jsonの中身で判定するほかないんでないの
//TEST
router.post('/api/login', passport_1.default.authenticate('local'), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('これでどうだ');
        console.log(req.sessionID);
        console.log(req.isAuthenticated());
        const tokenhash = yield sessiondb_cliant_1.makehash(req.sessionID);
        console.log(tokenhash);
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
router.delete('/api/login', function (req, res, next) {
    sessiondb_cliant_1.deletesession(req.cookies.sessID2);
    req.logout();
    res.clearCookie('sessID2');
    res.json();
});
router.post('/admin/reset', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_cliant_1.resetTable();
        res.json();
    });
});
