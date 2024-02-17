"use client"
import { useState } from "react";
import jwt from 'jsonwebtoken'


export default function Home() {

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [message, setMessage] = useState<string>("You are not logged in")

  async function submitForm(){
    const res = await fetch('/api/login', {
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({username,password})
    }).then(t => t.json())


    const token = res.token

    if(token){
      const json = jwt.decode(token) as  {[ key: string]: string}
      setMessage(`Welcome ${json.username} you are ${json.admin ? 'an admin' : " just a user"}`)
    }else{
      setMessage("There is an error")
    }

  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#CEF9F2]">
        <form className="flex flex-col bg-white rounded-md p-3 items-center w-[40%] h-[400px] justify-center">
          <h1 className="text-3xl mb-[30px]">{message}</h1>
          <input 
              type="text" 
              name="username"
              placeholder="username"
              className="text-2xl rounded-md mb-[30px]"
              value={username} 
              onChange={e => setUsername(e.target.value)}
            />
          <input 
              type="password" 
              name="password" 
              placeholder="password"
              className="text-2xl rounded-md mb-[30px]"

              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          <input type="submit" value="Login" className="rounded-full p-2 text-white bg-blue-700 text-2xl mt-[20px]" onClick={submitForm}/>
        </form>
    </main>
  );
}
