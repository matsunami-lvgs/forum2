"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const index_1 = require("./routes/index");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use(cookie_parser_1.default());
//フロントエンドサーバのみCORSを許可
app.use(cors_1.default({
    origin: 'http://localhost:8080',
    credentials: true,
}));
app.use(express_session_1.default({
    store: new (connect_pg_simple_1.default(express_session_1.default))({
        conString: 'postgres://postgres:hoge@localhost/forum'
    }),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));
app.use('/', index_1.router);
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.status(err.status || 500);
    console.log(err.status);
    console.log(err);
    res.json(err);
});
