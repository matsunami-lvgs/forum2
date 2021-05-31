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
        console.log('sucess');
        return done(null, { username: username, password: password });
    }
    else if (username !== admin.username || password !== admin.password) {
        console.log('failue');
        return done(null, false);
    }
}));
passport_1.default.serializeUser((user, done) => {
    console.log('selialize');
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    console.log('deselialize');
    done(null, user);
});
router.use(passport_1.default.initialize());
router.use(passport_1.default.session());
//ここまで認証の設定
/* GET home page. */
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fuga = yield db_cliant_1.selectAll();
        console.log(`send posts ${new Date()}`);
        console.log(`req.usr: ${req.user}`);
        console.log(`req.isAuthenticated: ${req.isAuthenticated()}`);
        //フロントエンドの実装につき一部Json化
        res.json(Object.values(fuga));
    });
});
router.get('/checklogin', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`check admin : ${req.isAuthenticated()} ${new Date()}`);
        if (yield req.isAuthenticated()) {
            res.status(200);
            res.json();
        }
        else {
            //試しにどちらも200を返してみる、認証系の実装時に401に戻す
            res.status(401);
            res.json();
        }
    });
});
router.post('/write', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${new Date()}`);
        console.log(req.body);
        yield db_cliant_1.insert(req.body.postwriter, req.body.postbody);
        res.json();
    });
});
//ここを抜けて初めて登録が走るのでは？？という
/***
 * Connect-pg-simpleとpassportの挙動がマジでわかんねえソース見せろ
 * 特にPassportおまじないが多すぎて引き渡し部分が全く見えない
 */
router.post('/login', passport_1.default.authenticate('local'), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('これでどうだ');
        console.log(req.sessionID);
        console.log(req.isAuthenticated());
        const tokenhash = yield sessiondb_cliant_1.makehash(req.sessionID);
        console.log(tokenhash);
        res.json({ sessionID: tokenhash });
        next();
    });
});
router.post('/login', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hoge = yield sessiondb_cliant_1.makehash(req.sessionID);
        yield sessiondb_cliant_1.updatehash(req.sessionID, hoge);
        //res.json(hoge);
        console.log(hoge);
    });
});
/*
  console.log('これでどうだ');
  console.log(req.sessionID);
  console.log(req.isAuthenticated());
  if (req.sessionID!==null){
    const tokenhash = await addhash(req.sessionID);
    console.log(tokenhash);
    res.json(tokenhash);
  }else{
    res.status(401);
    res.json;
  }
});
*/
/*
async function(req,res,next){
  await passport.authenticate('local'),(req,res)=>{

  }
  const hoge:boolean=await redilectNotAuth(req,res,next)
  if(hoge){
    console.log('seikou');
    res.status(200);
    res.json();
  }else{
    console.log('sippai');
    res.status(401);
    res.json()
  }
});*/
router.get('/logout', function (req, res, next) {
    req.logout();
    res.json();
});
/*¥l
router.get('/admin', async function(req, res, next) {
  const fuga = await selectAll();
  console.log('req.user');
  console.log(req.user);
  console.log('req.session');
  console.log(req.session);
  console.log('req.isAuthenticated');
  console.table(req.isAuthenticated());
  redilectNotAuth(req,res,next);
  res.render('index', {
    title: 'けいじばん（管理用）',
    posts: fuga,
    isAdmin: true,
  });
});*/
router.post('/admin/updatesubmit', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //redilectNotAuth(req,res,next);
        console.log('アップデート本文');
        console.log(req.body.updateid, req.body.updatebody);
        const fuga = yield db_cliant_1.updatewhereID(req.body.updateid, req.body.updatebody);
        console.log(fuga);
        res.json();
    });
});
//TODO
router.post('/admin/delete', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //redilectNotAuth(req,res,next);
        console.log(`[ID]:${req.body.deleteid}`);
        yield db_cliant_1.deletewhereID(req.body.deleteid);
        res.json();
    });
});
router.post('/admin/reset', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_cliant_1.resetTable();
        res.json();
    });
});
