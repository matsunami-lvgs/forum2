import express from 'express';
import { insert ,selectAll} from './db_cliant';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const fuga = selectAll;
  res.render('index', {
    title: 'けいじばん',
    posts: fuga,
    neko: 'にゃーん'
  });
  console.log('この下にkekka')
  console.log (fuga);
});

router.post('/write',function(req,res,next){
  const date = new Date;
  console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${date.toLocaleString("ja")}`);
  insert(req.body.postwriter,req.body.postbody);
  res.redirect('/');
});

export{router};
