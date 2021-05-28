import express from 'express';
import { insert ,selectAll, deletewhereID, selectwhereID,updatewhereID,resetTable} from './db_cliant';
//import {login} from './authentication';
import passport from 'passport';
import passportLocal from 'passport-local';
import{addhash, selecthash, deletesession} from './sessiondb_cliant';

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
      console.log('sucess');
      return done (null,{username: username, password: password});
    }else if (username !== admin.username || password !== admin.password){
      console.log('failue');
      return done(null,false);
    } 
  }
));

passport.serializeUser((user,done)=>{
  console.log('selialize');
  done(null,user);
});

passport.deserializeUser((user:Express.User,done)=>{
  console.log('deselialize');
  done(null,user);
});

router.use(passport.initialize());
router.use(passport.session());

//ここまで認証の設定



/* GET home page. */
router.get('/', async function(req, res, next) {
  const fuga:Object = await selectAll();
  console.log (`send posts ${new Date()}`);
  console.log(req.headers);
  console.log(req.user);
  console.log(req.isAuthenticated());
  //フロントエンドの実装につき一部Json化
  res.json(Object.values(fuga)); 
});

router.get('/checklogin', async function(req, res, next) {
  console.log (`check admin : ${req.isAuthenticated()} ${new Date()}`);
  if (await req.isAuthenticated()){
    res.status(200);
    res.json();
  }else{
    //試しにどちらも200を返してみる、認証系の実装時に401に戻す
    res.status(401);
    res.json();
  }
});

router.post('/write',async function(req,res,next){
  console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${new Date()}`);
  console.log(req.body);
  await insert(req.body.postwriter,req.body.postbody);
  res.json();
});

router.post('/login',
  passport.authenticate('local'),
    async function (req,res,next){
      console.log('どないや');
      //console.log(req)
      console.log(req.sessionID);
      const tokenhash = await addhash(req.sessionID);
      console.log (tokenhash);
      res.json({token:tokenhash})
    }
);


/*
async function(req,res,next){
  await passport.authenticate('local'),(req,res)=>{

  }
  const hoge:boolean=await redilectNotAuth(req,res,next)
  if(hoge){
    console.log('seikou');
    res.status(200);
    res.json();
  }else{
    console.log('sippai');
    res.status(401);
    res.json()
  }
});*/


router.get('/logout',function (req,res,next){
  req.logout();
  res.json();
});

/*¥l
router.get('/admin', async function(req, res, next) {
  const fuga = await selectAll();
  console.log('req.user');
  console.log(req.user);
  console.log('req.session');
  console.log(req.session);
  console.log('req.isAuthenticated');
  console.table(req.isAuthenticated());
  redilectNotAuth(req,res,next);
  res.render('index', {
    title: 'けいじばん（管理用）',
    posts: fuga,
    isAdmin: true,
  });
});*/

router.post('/admin/updatesubmit', async function(req, res, next){
  //redilectNotAuth(req,res,next);
  console.log('アップデート本文');
  console.log(req.body.updateid,req.body.updatebody);
  const fuga = await updatewhereID(req.body.updateid,req.body.updatebody);
  console.log(fuga);
  res.json();
});

//TODO
router.post('/admin/delete',async function(req,res,next){
  //redilectNotAuth(req,res,next);
  console.log(`[ID]:${req.body.deleteid}`);
  await deletewhereID(req.body.deleteid);
  res.json();
});

router.post('/admin/reset',async function(req,res,next){
  await resetTable();
  res.json();
});

export{router};


