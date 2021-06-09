import  express from 'express';
import supertest from 'supertest';
const app = require('../app');
import cookieParser from 'cookie-parser';
const char30:string = '123456789012345678901234567890';
const char31:string = '1234567890123456789012345678901';
const char3000:string = char30.repeat(100);
const char3001:string = `${char30.repeat(100)}0`;
const truehash:string = 'testhash';


describe('ルーティングのテスト',()=>{
  /*
  test('get',async ()=>{
    app.get('/',
    async(
      req:express.Request,
      res:express.Response,
      next:express.NextFunction
    )=>{
      res.end()
    });
    const request = supertest(app);
    const response = await request.get('/api/postlist');
    expect(response.status).toBe(200);
  });

  test ('post200',async ()=>{
    app.post('/',
    async (
      req:express.Request,
      res:express.Response,
      next:express.NextFunction
    )=>{
      res.write(req.body.postwriter,req.body.postbody)
      res.end()
    });
    const request = supertest(app);
    const response = await request.post('/api/postlist').send({postwriter:char30,postbody:char3000});
    expect(response.status).toBe(200);
  });


  test ('post400kara',async ()=>{
    app.post('/',
    async (
      req:express.Request,
      res:express.Response,
      next:express.NextFunction
    )=>{
      res.write(req.body.postwriter,req.body.postbody)
      res.end()
    });
    const request = supertest(app);
    const response = await request.post('/api/postlist').send({postwriter:'',postbody:''});
    expect(response.status).toBe(400);
  });

  test ('post400nameOver',async ()=>{
    app.post('/',
    (
      req:express.Request,
      res:express.Response,
      next:express.NextFunction
    )=>{
      res.write(req.body.postwriter,req.body.postbody)
      res.end()
    });
    const request = supertest(app);
    const response = await request.post('/api/postlist').send({postwriter:char31,postbody:char3000});
    expect(response.status).toBe(400);
  });

  test ('post400bodyOver',async ()=>{
    app.post('/',
    (
      req:express.Request,
      res:express.Response,
      next:express.NextFunction
    )=>{
      res.write(req.body.postwriter,req.body.postbody)
      res.end()
    });
    const request = supertest(app);
    const response = await request.post('/api/postlist').send({postwriter:char30,postbody:char3001});
    expect(response.status).toBe(400);
  });
  */
  test ('putbody',async()=>{
    app.put('/',
    (
      req:express.Request,
      res:express.Response,
      next:express.NextFunction
    )=>{
      res.write(req.body.updatebody,req.body.updateid);
      res.end()
    });
    const request = supertest(app);
    const response = await request.put('/api/postlist').set('Cookie',`sessID2=${truehash}`).send({updatebody:char3000,updateid:50});
    expect(response.status).toBe(200);
  });
  test ('putbody',async()=>{
    app.put('/',
    (
      req:express.Request,
      res:express.Response,
      next:express.NextFunction
    )=>{
      res.write(req.body.updatebody,req.body.updateid);
      res.end()
    });
    const request = supertest(app);
    const response = await request.put('/api/postlist').set('Cookie',`sessID2=errorhash`).send({updatebody:char3000,updateid:50});
    expect(response.status).toBe(401);
  });
  test ('putbody',async()=>{
    app.delete('/',
    (
      req:express.Request,
      res:express.Response,
      next:express.NextFunction
    )=>{
      res.write(req.body.updatebody,req.body.updateid);
      res.end()
    });
    const request = supertest(app);
    const response = await request.delete('/api/postlist').set('Cookie',`sessID2=errorhash`).send({updatebody:char3000,updateid:50});
    expect(response.status).toBe(401);
  });
})
