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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <form>
          <h1>{message}</h1>
          <input 
              type="text" 
              name="username" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
            />
          <input 
              type="password" 
              name="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          <input type="submit" value="Login" onClick={submitForm}/>
        </form>
    </main>
  );
}
