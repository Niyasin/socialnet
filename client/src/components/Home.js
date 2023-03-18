export default function Home(){
    const friends=[
        {
            displayname:'Displayname',
            username:'Username',
            image:'./images/unknown.jpg',
        },
    ]

    const suggested=[
        {
            displayname:'Displayname',
            username:'Username',
            image:'./images/unknown.jpg',
        },
    ]

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
    return(
        <div className="container">
            <div className="nav">
                <div className="user">
                    <img src="./images/unknown.jpg"/>
                    <span>Displayname</span>
                </div>
                <div className="iconbtn">
                    <svg viewBox="0 0 52 52"><path d="M30 29h16.5c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5H30c-.6 0-1-.4-1-1V5.5c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5V22c0 .6-.4 1-1 1H5.5c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5H22c.6 0 1 .4 1 1v16.5c0 .8.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5V30c0-.6.4-1 1-1z"/></svg>
                    New post
                </div>
            </div>
            <div className="feed">
                {
                    feed.map((e,i)=>{
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
                <input className='inp2' placeholder='search'/>
                <div className="list">
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
                    <span>Suggested For You</span>
                    {
                        suggested.map((e,i)=>{
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

