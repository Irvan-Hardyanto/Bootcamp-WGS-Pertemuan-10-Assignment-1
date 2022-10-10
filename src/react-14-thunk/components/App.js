import React from 'react';
import PostList from './PostList'
function App(props) {
    return (
        <div className="ui one column grid padded" style={{height:"100%"}}>
            <div className='row' style={{height:"100%"}}>
                <div className='column' style={{height:"100%"}}>
                    <PostList></PostList>
                </div>
            </div>
        </div>
    );
}

export default App;