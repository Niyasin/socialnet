import { useRef, useState } from "react"

export default function Settings(){
    const data={
        displayname:'displayname',
        username:'username',
        email:'email',
        dob:'dd-mm-yyy',
    }
    const [displayname,setDisplayname]=useState(null);
    const [DOB,setDOB]=useState(null);
    const [email,setEmail]=useState(null);
    const [PWChange,setPWChange]=useState(false);
    const displaynameRef=useRef(null);
    const dobRef=useRef(null);
    const emailRef=useRef(null);

    const [passwords,setPasswords]=useState({
        current:'',
        pw1:'',
        pw2:''
    })
    return(
        <div className="settings">
            <div className="nav">
                <div className="user">
                    <img src="./images/unknown.jpg"/>
                    <span>{data.displayname}</span>
                </div>
                <div className="iconbtn">Back</div>
            
            </div>
            <div className="feed">
                <div className="prof">
                    <div>
                        <img className="profilePic sm" src="./images/post.jpg" />
                        <svg className="icon" viewBox='0 0 24 24' fill='none' stroke='#ddd'strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'><path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' /><path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' /></svg>
                    </div>
                    <div>
                        <h2>{data.displayname}</h2>
                        <span>{data.username}</span>
                    </div>
                </div>
                <div className="form left">
                    
                    <div>
                        <span>Display name</span>
                        <div className="inp3">
                            <input defaultValue={data.displayname} disabled={displayname==null} ref={displaynameRef} onChange={(e)=>{setDisplayname(e.target.value)}}/>
                            <svg onClick={()=>{setDisplayname(data.dob)}} className="icon" viewBox='0 0 24 24' fill='none' stroke='#ddd'strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'><path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' /><path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' /></svg>
                        </div>
                    </div>

                    <div>
                        <span>Date of Birth</span>
                        <div className="inp3">
                            <input type={"date"} defaultValue={data.dob} disabled={DOB==null} ref={dobRef} onChange={(e)=>{setDOB(e.target.value)}}/>
                            <svg onClick={()=>{setDOB(data.dob)}} className="icon" viewBox='0 0 24 24' fill='none' stroke='#ddd'strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'><path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' /><path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' /></svg>
                        </div>
                    </div>

                    <div>
                        <span>Email id</span>
                        <div className="inp3">
                            <input defaultValue={data.email} disabled={email==null} ref={emailRef} onChange={(e)=>{setEmail(e.target.value)}}/>
                            <svg onClick={()=>{setEmail(data.email)}} className="icon" viewBox='0 0 24 24' fill='none' stroke='#ddd'strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'><path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' /><path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' /></svg>
                        </div>
                    </div>
                    {(displayname||email||DOB)?
                        <div className="btngroup">
                        <div className="button">Apply</div>
                        <div className="button" onClick={()=>{
                            setDisplayname(null);
                            setEmail(null);
                            setDOB(null);
                            displaynameRef.current.value=data.displayname;
                            dobRef.current.value=data.dob;
                            emailRef.current.value=data.email;
                            }}>Cancel</div>
                    </div>
                    :<></>}

                </div>
            </div>
            <div className="side">
                {!PWChange?
                <div className="link" onClick={()=>{setPWChange(true)}}>Change Password</div>
                :<></>}
                {PWChange?
                <div className="form">
                    <div>
                        <span>Current Password</span>
                        <div className="inp3">
                            <input type={"password"}  onChange={e=>{setPasswords({...passwords,current:e.target.value})}}/>
                        </div>
                    </div>
                    <div>
                        <span>New Password</span>
                        <div className="inp3">
                            <input type={"password"} onChange={e=>{setPasswords({...passwords,pw1:e.target.value})}}/>
                        </div>
                    </div>
                    <div>
                        <span>Confirm New Password</span>
                        <div className="inp3">
                            <input type={"password"}  onChange={e=>{setPasswords({...passwords,pw2:e.target.value})}}/>
                        </div>
                    </div>
                    <div className="btngroup">
                        <div className="button">Apply</div>
                        <div className="button" onClick={()=>{
                            setPWChange(false);
                            setPasswords({current:'',pw1:'',pw2:''});
                            }}>Cancel</div>
                    </div>
                </div>
                :<></>}
            </div>
        </div>
    )
}