

import axios, { AxiosResponse } from 'axios';
const timeline:string = '/api/timeline';
const login = '/api/login';

export const gettimeline=async():Promise<AxiosResponse<any>>=>{
  const hoge = await axios.get(timeline) 
  return(hoge)
}

export const posttimeline =async(name:string,body:string):Promise<AxiosResponse>=>{
  return(await axios.post(
  timeline,
  {
    postwriter: name,
    postbody: body,
  },
  {
    headers: { 'Content-Type': 'application/json' },
  }))
};

export const puttimeline =async(id:number,body:string):Promise<AxiosResponse>=> {
  return(await axios.put(
  timeline,
  {
    updateid: id,
    updatebody: body,
  },
  {
    headers: { 'Content-Type': 'application/json' },
  }))
};

export const deletetimeline =async(id:number):Promise<AxiosResponse>=> {
  return(await axios.delete(
  timeline, {
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