import express from 'express';
import { insert ,selectAll, deletewhereID, selectwhereID,updatewhereID,resetTable} from './db_cliant';
import {login} from './authentication';
const router = express.Router();
//router.use(login.initialize());


/* GET home page. */
router.get('/', async function(req, res, next) {
  const fuga = await selectAll();
  res.render('index', {
    title: 'けいじばん',
    posts: fuga,
    isAdmin: false,
  }); 
});

router.post('/write',async function(req,res,next){
  const date = new Date;
  console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${date.toLocaleString("ja")}`);
  await insert(req.body.postwriter,req.body.postbody);
  res.redirect('/');
});

router.get('/admin', async function(req, res, next) {
  const fuga = await selectAll();
  res.render('index', {
    title: 'けいじばん（管理用）',
    posts: fuga,
    isAdmin: true,
  });
});

router.post('/login',async function(req,res,next){
  //認証を呼び出す
  //ログイン済みの場合はパス
  //画面付きにする
  //adminにリダイレクト
});
router.get('/logout',async function (req,res,next){
  //認証を解除する
  //こちらも画面付き
  //ルートにリダイレクト
});

//TODO
router.post('/admin/update', async function(req, res, next){
  console.log('アップデートID')
  console.log(req.body.updateid);
  const fuga = await selectwhereID(req.body.updateid);
  console.log(fuga);
  res.render('update',{
    posts: fuga
  });
});

router.post('/admin/update/updatesubmit', async function(req, res, next){
  console.log('アップデート本文')
  console.log(req.body.updateid,req.body.updatebname,req.body.updatebody);
  const fuga = await updatewhereID(req.body.updateid,req.body.updatename,req.body.updatebody);
  console.log(fuga);
  res.redirect('../../admin');
});

//TODO
router.post('/admin/delete',async function(req,res,next){
  console.log(`[ID]:${req.body.deleteid}`);
  await deletewhereID(req.body.deleteid);
  res.redirect('/admin');
});

router.post('/admin/reset',async function(req,res,next){
  await resetTable();
  res.redirect('/admin');
});

export{router};


