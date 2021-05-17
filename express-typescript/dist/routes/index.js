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
/* GET home page. */
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fuga = yield db_cliant_1.selectAll();
        console.log('Indexでのfugaの中身');
        console.log(fuga);
        res.render('index', {
            title: 'けいじばん',
            posts: fuga,
        });
    });
});
router.get('/admin', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fuga = yield db_cliant_1.selectAll();
        console.log('Indexでのfugaの中身');
        console.log(fuga);
        res.render('admin', {
            title: 'けいじばん（管理用）',
            posts: fuga,
        });
    });
});
//TODO
router.post('/admin/update', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body.updatepost);
        const fuga = yield db_cliant_1.selectID(req.body.updatepost);
        /*  res.render('update',{
            posts: fuga
          });*/
        res.redirect('/admin/');
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
//TODO
router.post('/delete', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const date = new Date;
        console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${date.toLocaleString("ja")}`);
        yield db_cliant_1.deleteID(req.body.deletepost);
        res.redirect('/');
    });
});
