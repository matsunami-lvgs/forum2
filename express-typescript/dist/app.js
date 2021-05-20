"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const index_1 = require("./routes/index");
const app = express_1.default();
// view engine setup
app.set('views', 'views');
app.set('view engine', 'pug');
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('public'));
app.use(express_session_1.default({
    store: new (connect_pg_simple_1.default(express_session_1.default))({
        conString: 'postgres://postgres:hoge@localhost/forum'
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 }
}));
// catch 404 and forward to error handler
app.use('/', index_1.router);
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    console.log(err.status);
    console.log(err);
    res.render('error', { err });
});
// error handler
//TODO
//引数の型がAnyになる問題が解決できないのでいったんコメントアウトして先に進める
/*const errHandler = function(err:Error,req:Request,res:Response,next:NextFunction){
  res.status
};*/
//app.use(errHandler(err:Error,req:Request,res:Response,next:NextFunction));
/*
app.use(function(err:express.error.HttpError,req:express.Request,res:express.Response,next:NextFunction) {
  // set locals, only providing error in development
  if (res.headersSent){
    return next(err)
  };
  res.locals.message = err.message;
  // render the error pages
  res.status(err.status || 500);
  console.log(res.status);
  console.log(err);
  res.render('error', {err});
});

*/
module.exports = app;
