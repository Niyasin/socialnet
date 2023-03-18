export default function Profile(){
    const feed=[
        {
            image:'./images/post.jpg',
            text:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam corrupti repellendus maiores sequi voluptatibus, obcaecati praesentium quam est. Maiores perferendis magnam dignissimos consequuntur, odit inventore id corporis vel doloribus dolorem iusto labore assumenda quod beatae repellat iure quas magni. Accusamus quam aspernatur ipsa in fuga molestias recusandae dolorum quaerat consequatur!',
            user:{
                displayname:'Displayname',
                username:'Username',
                image:'./images/unknown.jpg',
            },
        },
    ]
    const mutual=[
        {
            displayname:'Displayname',
            username:'Username',
            image:'./images/unknown.jpg',
        },
    ]
    const friends=[
        {
            displayname:'Displayname',
            username:'Username',
            image:'./images/unknown.jpg',
        },
    ]
    return(
        <div className="container">
            <div className="nav">
                <div className="user">
                    <img src="./images/unknown.jpg"/>
                    <span>Displayname</span>
                </div>
                <div className="iconbtn">Back</div>
            </div>
            <div className="feed">
            {
                    feed.map((e,i)=>{
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
                <img src="./images/post.jpg" className='profilePic' />
                <h2>Username</h2>
                <div className="button wide">Add Friend</div>
                <div className="list">
                    {mutual.length} Mutual Friend{mutual.length>1?'s':''}
                    {
                        mutual.map((e,i)=>{
                            return(
                                <div className="user" key={i}>
                                    <img src={e.image}/>
                                    <div>
                                        <p className='lg'>{e.displayname}</p>
                                        <p className='sm'>@{e.username}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    Other Friends
                    {
                        friends.map((e,i)=>{
                            return(
                                <div className="user" key={i}>
                                    <img src={e.image}/>
                                    <div>
                                        <p className='lg'>{e.displayname}</p>
                                        <p className='sm'>@{e.username}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}