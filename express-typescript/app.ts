import createError, { HttpError } from 'http-errors';
import express from 'express';
import session from 'express-session';
import connect_pg_simple from 'connect-pg-simple';
import { router as indexRouter} from './routes/index';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.set('views', 'views');
app.set('view engine', 'pug');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser())
//フロントエンドサーバのみCORSを許可
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
  
}));
app.use(session({
  store: new (connect_pg_simple(session))({
    conString:'postgres://postgres:hoge@localhost/forum'
  }),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err:HttpError, req:express.Request, res:express.Response, next:express.NextFunction) {
  res.locals.message = err.message;
  res.status(err.status || 500);
  console.log(err.status);
  console.log(err);
  res.json(err);
});


module.exports = app;
