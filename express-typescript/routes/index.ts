import express from 'express';
import { db_cliant } from './db_cliant';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/write',function(req,res,next){
  const date = new Date;
  console.log(`[writer]:${req.body.postwriter} [body]:${req.body.postbody} [timestamp]:${date.toLocaleString("ja")}`);
  res.redirect('/');
});

export{router};
