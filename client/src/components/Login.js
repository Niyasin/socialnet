import { useState } from "react"

export default function Login({setUser}){
    const [account,setAccount]=useState(false);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [password2,setPassword2]=useState('');


    const signup=()=>{
        if(username.length && password===password2){
            let xhr=new XMLHttpRequest();
            xhr.open('POST','/signup');
            xhr.setRequestHeader('Content-Type','application/json');
            let data=JSON.stringify({
                username,
                password,
            });
            xhr.send(data);
            xhr.onload=()=>{
                let res=JSON.parse(xhr.responseText);
                if(!res.error){
                    setUser(res.data);
                }else{

                }
            }
        }
    }

    return(
        <div className="loginContainer">
            <div className="main">
                <h1>Discover,Connect<br/>Explore</h1>
                <div className="form">
                    {account?<>
                        <h2>Login</h2>
                        <input placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>
                        <input placeholder='Password' type='password'  onChange={(e)=>{setPassword(e.target.value)}}/>
                        <span className='link' onClick={()=>{setAccount(false)}}>Dont Have An Account ?</span>
                        <div className="button">Login</div>
                    </>:<>
                        <h2>Signup</h2>
                        <input placeholder='Username'  onChange={(e)=>{setUsername(e.target.value)}}/>
                        <input placeholder='Password' type='password'  onChange={(e)=>{setPassword(e.target.value)}}/>
                        <input placeholder='Confirm Password' type='password' onChange={(e)=>{setPassword2(e.target.value)}}/>
                        <span className='link' onClick={()=>{setAccount(true)}} >Alredy Have An Account ?</span>
                        <div className="button" onClick={signup}>Signup</div>
                    </>}
                </div>
            </div>
            <img src="./images/main.jpg" className='heroImg'/>
        </div>
    )
}