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
const router = express_1.default.Router();
exports.router = router;
//router.use(login.initialize());
/* GET home page. */
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fuga = yield db_cliant_1.selectAll();
        res.render('index', {
            title: 'けいじばん',
            posts: fuga,
            isAdmin: false,
        });
    });
});
router.post('/write', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const date = new Date;
        console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${date.toLocaleString("ja")}`);
        yield db_cliant_1.insert(req.body.postwriter, req.body.postbody);
        res.redirect('/');
    });
});
router.get('/admin', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fuga = yield db_cliant_1.selectAll();
        res.render('index', {
            title: 'けいじばん（管理用）',
            posts: fuga,
            isAdmin: true,
        });
    });
});
router.post('/login', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //認証を呼び出す
        //ログイン済みの場合はパス
        //画面付きにする
        //adminにリダイレクト
    });
});
router.get('/logout', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //認証を解除する
        //こちらも画面付き
        //ルートにリダイレクト
    });
});
//TODO
router.post('/admin/update', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('アップデートID');
        console.log(req.body.updateid);
        const fuga = yield db_cliant_1.selectwhereID(req.body.updateid);
        console.log(fuga);
        res.render('update', {
            posts: fuga
        });
    });
});
router.post('/admin/update/updatesubmit', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('アップデート本文');
        console.log(req.body.updateid, req.body.updatebname, req.body.updatebody);
        const fuga = yield db_cliant_1.updatewhereID(req.body.updateid, req.body.updatename, req.body.updatebody);
        console.log(fuga);
        res.redirect('../../admin');
    });
});
//TODO
router.post('/admin/delete', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
