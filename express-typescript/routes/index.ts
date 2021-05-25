import express from 'express';
import { insert ,selectAll, deletewhereID, selectwhereID,updatewhereID,resetTable} from './db_cliant';
//import {login} from './authentication';
import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
const router = express.Router();
//router.use(login.initialize());


const admin = {
  username: 'kai',
  password: 'kai'
};

const redilectNotAuth = function(req:express.Request,res:express.Response,next:express.NextFunction){
  if (req.isAuthenticated()){
    return ;
  }else{
    return res.redirect('failue');
  };
};


passport.use(new LocalStrategy(
  (username ,password ,done) => {
    if (username !== admin.username ){
      console.log('name failue');
      return done(null,false);
    }else if (password !== admin.password){
      console.log('password failue');
      return done(null,false);
    } else{
      console.log('login sucess');
      return done (null,{username: username, password: password});
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


/* GET home page. */
router.get('/', async function(req, res, next) {
  const fuga:Object = await selectAll();
  console.log (new Date());
  //フロントエンドの実装につき一部Json化
  res.json(Object.values(fuga)); 
});

router.post('/write',async function(req,res,next){
  console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${Date.toLocaleString()}`);
  await insert(req.body.postwriter,req.body.postbody);
  res.redirect('/');
});

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
});

router.post('/login',
  passport.authenticate('local',{
    failureRedirect : '/failue',
    successRedirect: '/admin',
  }),
);

router.get('/failue',function (req,res,next){
  res.render('returnindex',{
    title: 'ログイン失敗',
    caption: '再度ログインしてください'
  });
});

router.get('/login',function (req,res,next){
  res.render('login');
});

router.get('/logout',function (req,res,next){
  req.logout();
  res.render('returnindex',{
    title: 'ログアウト',
    caption: 'ログアウトしました'
  });
});

//TODO
router.post('/admin/update', async function(req, res, next){
  redilectNotAuth(req,res,next);
  console.log('アップデートID')
  console.log(req.body.updateid);
  const fuga = await selectwhereID(req.body.updateid);
  console.log(fuga);
  res.render('update',{
    posts: fuga
  });
});

router.post('/admin/updatesubmit', async function(req, res, next){
  redilectNotAuth(req,res,next);
  console.log('アップデート本文')
  console.log(req.body.updateid,req.body.updatebname,req.body.updatebody);
  const fuga = await updatewhereID(req.body.updateid,req.body.updatename,req.body.updatebody);
  console.log(fuga);
  res.redirect('/admin');
});

//TODO
router.post('/admin/delete',async function(req,res,next){
  redilectNotAuth(req,res,next);
  console.log(`[ID]:${req.body.deleteid}`);
  await deletewhereID(req.body.deleteid);
  res.redirect('/admin');
});

router.post('/admin/reset',async function(req,res,next){
  await resetTable();
  res.redirect('/admin');
});

export{router};


