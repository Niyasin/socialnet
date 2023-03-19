import { useEffect, useState } from "react"
import Profile from "./Profile"
export default function Home({user}){
    const [searchResult,setSearchResult]=useState([]);
    const [window,setWindow]=useState(null);
    const [searchKey,setSearchKey]=useState('');
    const [data,setData]=useState({
        username:'',
        displayname:'',
        friends:[],
        posts:[],
        image:[],
    });


    const search=()=>{
        if(searchKey && searchKey.length>3){
            let xhr=new XMLHttpRequest();
            xhr.open('GET',`/search?q=${searchKey}`);
            xhr.send();
            xhr.onload=()=>{
                if(searchKey.length){
                    if(xhr.status==200){
                        setSearchResult(JSON.parse(xhr.responseText));
                    }
                }
            }
        }else{
            setSearchResult([]);
        }
    }

    const loadData=()=>{
        let xhr=new XMLHttpRequest();
            xhr.open('POST','getUserData');
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(JSON.stringify({username:user.username}));
            xhr.onload=()=>{
                    if(xhr.status==200){
                        setData(JSON.parse(xhr.responseText));
                    }
                }
    }
    useEffect(()=>{
        loadData();
    },[]);
    return(<>
        <div className="container">

            <div className="nav">
                <div className="user">
                    <img src={data.image}/>
                    <span>{data.displayname}</span>
                </div>
                <div className="iconbtn" onClick={loadData}>
                    <svg viewBox="0 0 52 52"><path d="M30 29h16.5c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5H30c-.6 0-1-.4-1-1V5.5c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5V22c0 .6-.4 1-1 1H5.5c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5H22c.6 0 1 .4 1 1v16.5c0 .8.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5V30c0-.6.4-1 1-1z"/></svg>
                    New post
                </div>
            </div>
            <div className="feed">
                {
                    data.posts.map((e,i)=>{
                        return(
                            <div className="post">
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
            <div className="side">
                <h2>Friends</h2>
                <input className='inp2' placeholder='search' onChange={(e)=>{setSearchKey(e.target.value);search()}}/>
                <div className="list">
                {searchKey.length>3?<>
                    <span>Search Result For {searchKey}</span>
                        {
                            searchResult.map((e,i)=>{
                                if(user.username!=e.username){
                                    return(
                                        <User data={e} key={i} setWindow={setWindow} user={user}/>
                                    )
                            }
                            })
                        }
                    <span>Your Friends</span>
                    </>:<></>
                }

                    {
                        data.friends.map((e,i)=>{
                            return(
                                <User data={e} key={i} setWindow={setWindow} user={user}/>
                            )
                        })
                    }
                    <span>Suggested For You</span>
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

