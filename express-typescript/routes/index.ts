import express from 'express';
import { insert ,selectAll, deletewhereID, selectwhereID,updatewhereID,resetTable} from './db_cliant';
//import {login} from './authentication';
import passport from 'passport';
import passportLocal from 'passport-local';
import{makehash,updatehash, checkhash, deletesession} from './sessiondb_cliant';
import { token } from 'morgan';
import { EmptyResultError } from 'sequelize';

const LocalStrategy = passportLocal.Strategy;
const router = express.Router();
//router.use(login.initialize());

//ここから認証の設定

const admin = {
  username: 'kai',
  password: 'kai'
};

const redilectNotAuth = function(req:express.Request,res:express.Response,next:express.NextFunction){
  if (req.isAuthenticated()){
    return (true);
  }else{
    return (false);
  };
};


passport.use(new LocalStrategy(
  (username ,password ,done) => {
    if (username === admin.username && password === admin.password){
      console.log('Authentication Sucess');
      return done (null,{username: username, password: password});
    }else if (username !== admin.username || password !== admin.password){
      console.log('Authentication failue');
      return done(null,false);
    } 
  }
));

passport.serializeUser((user,done)=>{
  console.log('selialize...');
  done(null,user);
});

passport.deserializeUser((user:Express.User,done)=>{
  console.log('deselialize...');
  done(null,user);
});

router.use(passport.initialize());
router.use(passport.session());

//ここまで認証の設定



/* GET home page. */
router.get('/api/postlist', async function(req, res, next) {
  const posts:Object = await selectAll();
  console.log (`Received a request  ${new Date()}`);
  console.log(`req.usr: ${req.user}`);
  console.log(`req.isAuthenticated: ${req.isAuthenticated()}`);
  console.log(`req.cookies: ${req.cookies.sessID2 }`);
  //フロントエンドの実装につき一部Json化
  res.json(Object.values(posts));
});

router.post('/api/postlist',async function(req,res,next){
  console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${new Date()}`);
  console.log(req.body);
  await insert(req.body.postwriter,req.body.postbody);
  res.json();
});

router.put('/api/postlist', async function(req, res, next){
  //redilectNotAuth(req,res,next);
  //todo
  //if (selecthash('本当はここにcookieに保存した仮のセッションIDが入る')){
  if (checkhash(req.cookies.sessID2)){
    console.log('アップデート本文');
    console.log(req.body.updateid,req.body.updatebody);
    const fuga = await updatewhereID(req.body.updateid,req.body.updatebody);
    console.log(fuga);
    res.json();
  }else{
    res.status(401);
    res.json()
  }
});

//TODO
router.delete('/api/postlist',async function(req,res,next){
  //redilectNotAuth(req,res,next);
  //todo
  //if (selecthash('本当はここにcookieに保存した仮のセッションIDが入る')){
  console.log(`req.cookies: ${req.cookies.sessID2 }`);
  if (checkhash(req.cookies.sessID2)){
    console.log(`[ID]:${req.body.deleteid}`);
    await deletewhereID(req.body.deleteid);
    res.json();
  }else{
    res.status(401);
    res.json();
  }
});

//ここを抜けて初めて登録が走るのでは？？という
/***
 * Connect-pg-simpleとpassportの挙動がマジでわかんねえソース見せろ
 * 特にPassportおまじないが多すぎて引き渡し部分が全く見えない
 */
//Todo,Cookieの仕様が固まったらconsole.logをどうにかする
router.post('/api/login',
  passport.authenticate('local'),
  async function(req,res,next){
    console.log('これでどうだ');
    console.log(req.sessionID);
    console.log(req.isAuthenticated());
    const tokenhash:string = await makehash(req.sessionID);
    console.log(tokenhash);
    //const expires:string = responseExpireToString(req.session.cookie.expires);
    res.cookie('sessID2',tokenhash,{
      maxAge:10*60*1000,
      httpOnly:false,
    });
    res.json({});
    next ();
  }
);
router.post('/api/login',
  async function(req,res,next){
    const hash:string = await makehash(req.sessionID)
    await updatehash(req.sessionID,hash);
    //res.json(hoge);
    console.log(hash);
    console.log(res.header);
  }
);
const responseExpireToString = function(req:Date|undefined):string{
  if (req === undefined || req===null){
    return('')
  }else{
    return(req.toUTCString());
  }
};

router.delete('/api/login',function (req,res,next){
  deletesession(req.cookies.sessID2)
  req.logout();
  res.clearCookie('sessID2');
  //todo
  //deletesession('リクエストのcookieについてるハッシュ');
  res.json();
});

router.post('/admin/reset',async function(req,res,next){
  await resetTable();
  res.json();
});

export{router};


