import {checkhash} from '../routes/sessiondb_cliant'

test('check hash',async ()=>{
  const hoge = await checkhash('hfmdsajk@');
  expect(hoge).toBe(false);
});