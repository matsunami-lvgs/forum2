import createError from 'http-errors';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { router as indexRouter} from './routes/index';
import { router as usersRouter }from './routes/users';
const app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
}));

app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
//TODO
//引数の型がAnyになる問題が解決できないのでいったんコメントアウトして先に進める
/*app.use(function(err,req,res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
