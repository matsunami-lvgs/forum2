import express from 'express';
import { insert ,selectAll, deleteID, selectID} from './db_cliant';
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const fuga = await selectAll();
  console.log('Indexでのfugaの中身')
  console.log(fuga);
  res.render('index', {
    title: 'けいじばん',
    posts: fuga,
  });
});

router.get('/admin', async function(req, res, next) {
  const fuga = await selectAll();
  console.log('Indexでのfugaの中身')
  console.log(fuga);
  res.render('admin', {
    title: 'けいじばん（管理用）',
    posts: fuga,
  });
});

//TODO
router.post('/admin/update', async function(req, res, next){
  console.log(req.body.updatepost);
  const fuga = await selectID(req.body.updatepost);
/*  res.render('update',{
    posts: fuga
  });*/
  res.redirect('/admin/')
});

router.post('/write',async function(req,res,next){
  const date = new Date;
  console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${date.toLocaleString("ja")}`);
  await insert(req.body.postwriter,req.body.postbody);
  res.redirect('/');
});

//TODO
router.post('/delete',async function(req,res,next){
  const date = new Date;
  console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${date.toLocaleString("ja")}`);
  await deleteID(req.body.deletepost);
  res.redirect('/');
});

export{router};
