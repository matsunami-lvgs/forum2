import createError, { HttpError } from 'http-errors';
import express from 'express';
import session from 'express-session';
import connect_pg_simple from 'connect-pg-simple';
import { router as indexRouter} from './routes/index';
const app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
  store: new (connect_pg_simple(session))({
    conString:'postgres://postgres:hoge@localhost/forum'
  }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60 * 1000}
}));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



app.use(function(err:HttpError, req:express.Request, res:express.Response, next:express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  console.log(err.status);
  console.log(err);
  res.render('error', {err});
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
