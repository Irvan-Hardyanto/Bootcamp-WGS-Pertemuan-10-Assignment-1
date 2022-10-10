import React from 'react';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';

function PostList(props) {
    const posts = useSelector((state) => state.posts);
    const users = useSelector((state) => state.users);
    if(users.length===0){
        return(
            <h1>Waiting for response..</h1>
        )
    }
    // console.log("posts num: "+posts.length);
    // console.log("users is: "+JSON.stringify(users));
    return (
        <div className="ui divided list">
            {posts.map((post,idx)=>{
                {/* console.log("currrent post belongs to user with id: "+post.userId) */}
                return(
                    <div className="item">
                        <Post key={post.id} title={post.title} content={post.body} author={users.find(user=>user.id===post.userId) ? users.find(user=>user.id===post.userId).name: "anonymous"}></Post>
                    </div>
                )
            })}
        </div>
    );
}

export default PostList;