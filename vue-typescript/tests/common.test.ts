import {inputCheck} from '../src/components/common';
const inp = new inputCheck;
test ('checkName',()=>{
  expext(inp.checkName('gagaga'),toBe(inp.getError()===false))
})