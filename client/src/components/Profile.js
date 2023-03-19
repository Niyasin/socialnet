import { useContext, useEffect, useState } from "react";
import {UserContext} from './Home'
export default function Profile({username,close,user}){
    const [data,setData]=useState({
        username:'',
        displayname:'',
        friends:[],
        posts:[],
        image:[],
    });
    const [window,setWindow]=useState(null);
    const addFriend=()=>{
        let xhr=new XMLHttpRequest();
        xhr.open('POST','/addFriend');
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(JSON.stringify({username}));
            xhr.onload=()=>{
                    if(xhr.status==200){
                        loadData();
                    }
                }
    }
    const loadData=()=>{
        let xhr=new XMLHttpRequest();
            xhr.open('POST','getUserData');
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(JSON.stringify({username}));
            xhr.onload=()=>{
                    if(xhr.status==200){
                        let res=JSON.parse(xhr.responseText)
                        if(!res.error){
                            setData(res);
                        }
                    }
                }
    }
    useEffect(()=>{
        loadData();
    },[])
    return(<>
        <div className="container">
            <div className="nav">
                <div className="user">
                    <img src={user.image}/>
                    <span>{user.displayname}</span>
                </div>
                <div className="iconbtn" onClick={close}>Back</div>
            </div>
            <div className="feed">
            {
                data.posts.map((e,i)=>{
                    return(
                        <div className="post" key={i}>
                                {e.image?<img className='postImg' src={e.image}/>:<></>}
                                <div className="user" key={i}>
                                    <img src={e.image}/>
                                        <p className='lg'>{e.user.displayname}</p>
                                </div>
                                {e.text}
                            </div>
                        )
                    })
                }
            </div>
            <div className="side center">
                <img src={data.image} className='profilePic' />
                <h2>{data.username}</h2>
                <div className="button wide" onClick={addFriend}>Add Friend</div>
                <div className="list">
                    {data.friends.length} Mutual Friend{data.friends.length>1?'s':''}
                    {
                        data.friends.map((e,i)=>{
                            return(
                                <User data={e} key={i} setWindow={setWindow} user={user}/>
                            )
                        })
                    }
                    Other Friends
                    {
                        data.friends.map((e,i)=>{
                            return(
                                <User data={e} key={i} setWindow={setWindow} user={user}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    {window}
    </>
    )
}

const User=({data,key,setWindow,user})=>{
    return(
        <div className="user" key={key} onClick={()=>{setWindow(<Profile username={data.username} close={()=>{setWindow(null)}} user={user}/>)}}>
            <img src={data.image}/>
            <div>
                <p className='lg'>{data.displayname}</p>
                <p className='sm'>@{data.username}</p>
            </div>
        </div>
    )
    }
    