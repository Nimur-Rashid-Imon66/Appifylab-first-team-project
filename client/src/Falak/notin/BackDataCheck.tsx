import axios from 'axios';
import React from 'react'
interface FormData {
    userid: string;
    id:string 
    title: string;
    description: string;
    priority: string;
    tags: string;
  }
  
export default function BackDataCheck() {
    // console.log('hello');
    // axios.get('http://127.0.0.1:3333/todos',)
    // .then(res => console.log(res.data))
    // .catch(err => console.log(err))

  return (
    <div>
      <h1>back end check mama wait hi </h1>
    </div>
  )
}
