import {inputCheck} from '../common';
let inp = new inputCheck;
const number30:string = '123456789012345678901234567890'
const number31:string = '1234567890123456789012345678901';
const japanese30:string='あかねさすむらさきのいきしめのいきのもりはみずやきみがそでふ';
const japanese31:string='あかねさすむらさきのいきしめのいきのもりはみずやきみがそでふる';
const emozi30:string = '🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁';
const emozi31:string = '🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁🪁';
const karamozi:string= ''

test ('checkName',()=>{
  //30文字
  inp.checkName(number30);
  expect(inp.getError()).toBe(false);
  //31文字
  inp = new inputCheck;
  inp.checkName(number31)
  expect(inp.getError()).toBe(true);
  //30
  inp = new inputCheck;
  inp.checkName(japanese30)
  expect(inp.getError()).toBe(false);
  //31
  inp = new inputCheck;
  inp.checkName(japanese31)
  expect(inp.getError()).toBe(true);
  //30
  inp = new inputCheck;
  inp.checkName(emozi30)
  expect(inp.getError()).toBe(false);
  //31
  inp = new inputCheck;
  inp.checkName(emozi31)
  expect(inp.getError()).toBe(true);
  //kara
  inp = new inputCheck;
  inp.checkName(karamozi)
  expect(inp.getError()).toBe(false);
});

test ('checkBody',()=>{
  //30文字
  inp = new inputCheck;
  inp.checkBody(number30.repeat(100));
  expect(inp.getError()).toBe(false);
  //31文字
  inp = new inputCheck;
  inp.checkBody(number30.repeat(100)+'a');
  expect(inp.getError()).toBe(true);
  inp = new inputCheck;
  //30
  inp = new inputCheck;
  inp.checkBody(japanese30.repeat(100));
  expect(inp.getError()).toBe(false);
  //31
  inp = new inputCheck;
  inp.checkBody(japanese30.repeat(100)+'a');
  expect(inp.getError()).toBe(true);
  //30
  inp = new inputCheck;
  console.log([...emozi30.repeat(100)].length)
  inp.checkBody(emozi30.repeat(100));
  expect(inp.getError()).toBe(false);
  //31
  inp = new inputCheck;
  inp.checkBody(emozi30.repeat(100)+'a');
  expect(inp.getError()).toBe(true);
  //kara
  inp = new inputCheck;
  inp.checkBody(karamozi);
  expect(inp.getError()).toBe(true);
});

