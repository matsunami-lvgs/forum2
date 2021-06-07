"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * makehash
 * ランダム文字列ともらったセッションIDをハッシュ関数にかけて返すだけ
 * ほとんどライブラリのテストだよな、テスト対象外にする
 */
/**
 * updatehash
 * ハッシュ関数と投稿IDを受け取って非同期でUpdateをかける
 * これもいるか？？？いらなさそう
 *
 */
/***
 * checkhash
 * これは必要、データの数が合わない場合にfalseを返す必要がある
 * 正常系異常系でやりたいけどどうしたもんだか
 */
/**
 * deleteseeeion
 * Logout処理と一緒にテストする
 */
/*
test('sessio',async ()=>{
  const hoge = await checkhash('hfmdsajk@');
  expect(hoge).toBe(false);
});*/ 
