import React from 'react';

function Post(props) {
    return (
        <div style={{ display: "flex",alignItems: "center"}}>
            <div>
                <i className="user icon"></i>
            </div>
            <div>
                <div className="ui huge header">{props.title}</div>
                <br/>
                {/* <h1 className="ui header">{props.title}</h1> */}
                <p>{props.content}<br /><strong>{props.author}</strong></p>
            </div>
        </div>
    );
}

export default Post;