

import axios, { AxiosResponse } from 'axios';
const postlist:string = '/api/postlist';
const login = '/api/login';

export const getposts=async():Promise<AxiosResponse<any>>=>{
  const hoge = await axios.get(postlist) 
  return(hoge)
}

export const postposts =async(name:string,body:string):Promise<AxiosResponse>=>{
  return(await axios.post(
  postlist,
  {
    postwriter: name,
    postbody: body,
  },
  {
    headers: { 'Content-Type': 'application/json' },
  }))
};

export const putposts =async(id:number,body:string):Promise<AxiosResponse>=> {
  return(await axios.put(
  postlist,
  {
    updateid: id,
    updatebody: body,
  },
  {
    headers: { 'Content-Type': 'application/json' },
  }))
};

export const deleteposts =async(id:number):Promise<AxiosResponse>=> {
  return(await axios.delete(
  postlist, {
  data: { deleteid: id },
  }
))};



export const postlogin =async(username:string,password:string):Promise<AxiosResponse>=>{
  return(await axios.post(login,
  {
    username: username,
    password: password,
    withCredentials: true,
  },
  {
    headers: { 'Content-Type': 'application/json' },
  }
))};

export const deletelogin =async():Promise<AxiosResponse>=> {
  return(await axios.delete(login))
};