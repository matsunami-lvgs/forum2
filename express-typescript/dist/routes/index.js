"use strict";
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
    const fuga = db_cliant_1.selectAll;
    res.render('index', {
        title: 'けいじばん',
        posts: fuga,
        neko: 'にゃーん'
    });
    console.log('この下にkekka');
    console.log(fuga);
});
router.post('/write', function (req, res, next) {
    const date = new Date;
    console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${date.toLocaleString("ja")}`);
    db_cliant_1.insert(req.body.postwriter, req.body.postbody);
    res.redirect('/');
});
