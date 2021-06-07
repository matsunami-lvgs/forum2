import express from 'express';
import { insert ,selectAll, deletewhereID,updatewhereID,resetTable} from './db_cliant';
import passport from 'passport';
import passportLocal from 'passport-local';
import{makehash,updatehash, checkhash, deletesession} from './sessiondb_cliant';

const LocalStrategy = passportLocal.Strategy;
const router = express.Router();
//router.use(login.initialize());

//ここから認証の設定

const admin = {
  username: 'kai',
  password: 'kai'
};

//TEST??
passport.use(new LocalStrategy(
  (username ,password ,done) => {
    if (username === admin.username && password === admin.password){
      console.log('Authentication Sucess');
      return done (null,{username: username, password: password});
    }else if (username !== admin.username || password !== admin.password){
      console.log('Authentication failue');
      return done(null,false);
    };
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
  if (bodylengthcheck(req.body.postbody)===false||namelengthcheck(req.body.postwriter)===false){
    res.status(400);
    res.json();
    return;
  }
  console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${new Date()}`);
  console.log(req.body);
  await insert(req.body.postwriter,req.body.postbody);
  res.json();
});

//分岐はないがcheckhashで処理が分離している、この関数はテストやらなくてもいいんじゃないか
router.put('/api/postlist', async function(req, res, next){
  console.log(req.cookies.sessID2)
  console.log(req.body)
  if (await checkhash(req.cookies.sessID2)===false||bodylengthcheck(req.body.updatebody)===false){
    res.status(401);
    res.json()
    return
  }
  console.log('アップデート本文');
  console.log(req.body.updateid,req.body.updatebody);
  const fuga = await updatewhereID(req.body.updateid,req.body.updatebody);
  console.log(fuga);
  res.json();
});
//TEST
const bodylengthcheck=(body:string):boolean=>{
const maxlength = 3000;
  return(maxlength>=[...body].length&&[...body].length>0)
};
//TEST
const namelengthcheck=(name:string):boolean=>{
  const maxlength = 30;
  return(maxlength>=[...name].length)
};

router.delete('/api/postlist',async function(req,res,next){
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


//テストコードを書くべきかほんとわからん
//Jsonの中身で判定するほかないんでないの
//TEST
router.post('/api/login',
  passport.authenticate('local'),
  async function(req,res,next){
    console.log('これでどうだ');
    console.log(req.sessionID);
    console.log(req.isAuthenticated());
    const tokenhash:string = await makehash(req.sessionID);
    console.log(tokenhash);
    res.cookie('sessID2',tokenhash,{
      maxAge:10*60*1000,//10分
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

router.delete('/api/login',function (req,res,next){
  deletesession(req.cookies.sessID2)
  req.logout();
  res.clearCookie('sessID2');
  res.json();
});

router.post('/admin/reset',async function(req,res,next){
  await resetTable();
  res.json();
});

export{router};