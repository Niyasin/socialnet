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
    },[]);
    const [mutual,setMutual]=useState([]);
    const [other,setOther]=useState([]);
    useEffect(()=>{
        let m=[];
        let o=[];
        data.friends.forEach(e=>{
            let flag=true;
            user.friends.forEach(f=>{
                if(e._id==f){
                    flag=false;
                    m.push(e);
                }
            });
            if(flag){
                o.push(e);
            }
        });
        setMutual(m);
        setOther(o);
    },[data])
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
                    {mutual.length} Mutual Friend{mutual.length>1?'s':''}
                    {
                        mutual.map((e,i)=>{
                            return(
                                <User data={e} key={i} setWindow={setWindow} user={user}/>
                            )
                        })
                    }
                    {mutual.length>0?'Other Friends':''}
                    {
                        other.map((e,i)=>{
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
    