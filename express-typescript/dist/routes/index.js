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
const LocalStrategy = passport_local_1.default.Strategy;
const router = express_1.default.Router();
exports.router = router;
//router.use(login.initialize());
const admin = {
    username: 'kai',
    password: 'kai'
};
const redilectNotAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
        return;
    }
    else {
        return res.redirect('failue');
    }
    ;
};
passport_1.default.use(new LocalStrategy((username, password, done) => {
    if (username !== admin.username) {
        console.log('name failue');
        return done(null, false);
    }
    else if (password !== admin.password) {
        console.log('password failue');
        return done(null, false);
    }
    else {
        console.log('login sucess');
        return done(null, { username: username, password: password });
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
/* GET home page. */
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fuga = yield db_cliant_1.selectAll();
        console.log(`send posts ${new Date()}`);
        //フロントエンドの実装につき一部Json化
        res.json(Object.values(fuga));
    });
});
router.get('/checklogin', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`check admin : ${req.isAuthenticated()} ${new Date()}`);
        if (req.isAuthenticated()) {
            res.status(200);
            res.json();
        }
        else {
            //試しにどちらも200を返してみる、認証系の実装時に401に戻す
            res.status(200);
            res.json();
        }
    });
});
router.post('/write', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${new Date()}`);
        console.log(req);
        yield db_cliant_1.insert(req.body.postwriter, req.body.postbody);
        res.json();
        ;
    });
});
router.post('/login', passport_1.default.authenticate('local', {
    failureRedirect: '/checklogin',
    successRedirect: '/checklogin',
}));
router.get('/logout', function (req, res, next) {
    req.logout();
    res.render('returnindex', {
        title: 'ログアウト',
        caption: 'ログアウトしました'
    });
});
router.get('/failue', function (req, res, next) {
    res.render('returnindex', {
        title: 'ログイン失敗',
        caption: '再度ログインしてください'
    });
});
router.get('/admin', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fuga = yield db_cliant_1.selectAll();
        console.log('req.user');
        console.log(req.user);
        console.log('req.session');
        console.log(req.session);
        console.log('req.isAuthenticated');
        console.table(req.isAuthenticated());
        redilectNotAuth(req, res, next);
        res.render('index', {
            title: 'けいじばん（管理用）',
            posts: fuga,
            isAdmin: true,
        });
    });
});
router.post('/login', passport_1.default.authenticate('local', {
    failureRedirect: '/failue',
    successRedirect: '/admin',
}));
router.get('/failue', function (req, res, next) {
    res.render('returnindex', {
        title: 'ログイン失敗',
        caption: '再度ログインしてください'
    });
});
router.get('/login', function (req, res, next) {
    res.render('login');
});
router.get('/logout', function (req, res, next) {
    req.logout();
    res.render('returnindex', {
        title: 'ログアウト',
        caption: 'ログアウトしました'
    });
});
//TODO
router.post('/admin/update', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        redilectNotAuth(req, res, next);
        console.log('アップデートID');
        console.log(req.body.updateid);
        const fuga = yield db_cliant_1.selectwhereID(req.body.updateid);
        console.log(fuga);
        res.render('update', {
            posts: fuga
        });
    });
});
router.post('/admin/updatesubmit', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        redilectNotAuth(req, res, next);
        console.log('アップデート本文');
        console.log(req.body.updateid, req.body.updatebname, req.body.updatebody);
        const fuga = yield db_cliant_1.updatewhereID(req.body.updateid, req.body.updatename, req.body.updatebody);
        console.log(fuga);
        res.redirect('/admin');
    });
});
//TODO
router.post('/admin/delete', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        redilectNotAuth(req, res, next);
        console.log(`[ID]:${req.body.deleteid}`);
        yield db_cliant_1.deletewhereID(req.body.deleteid);
        res.redirect('/admin');
    });
});
router.post('/admin/reset', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_cliant_1.resetTable();
        res.redirect('/admin');
    });
});
