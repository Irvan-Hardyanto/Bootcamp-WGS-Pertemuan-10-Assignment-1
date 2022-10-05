//import module React dan React DOM
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import youtube from './Youtube';

//2)  memanggil reference ke div dengan id root
const el = document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root = ReactDOM.createRoot(el);

//Function Component SearchBar, yang menerima masukan berupa kata kunci video yang ingin dicari oleh pengguna
const SearchBar = (props) => {
    const [term, setTerm] = useState('');

    const onFormSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(term);//passing value yang diketikan
    }

    return (
        <div className="ui segment" height={props.height} style={{ margin: "0px" }}>
            <form onSubmit={onFormSubmit} className="ui form">
                <div className="field">
                    <label>Video Search</label>
                    <input type="text" value={term} onChange={(e) => setTerm(e.target.value)}></input>
                </div>
            </form>
        </div>
    )
}

//Komponen yang merepresentasikan video utama yang ingin ditonton
const Video = (props) => {
    if (!props.video) {
        return (<div className="ten wide column"><div className="ui message">Please choose a video</div></div>)
    }
    return (
        <div className="ten wide column">
            <div className="ui card" style={{ width: "100%", height: "100%" }}>
                <div className="image" style={{ height: "80%" }}>
                    {/*Kalo pengguna belum nge search video, tampilin loading */}
                    <iframe title={props.video.title} src={"https://www.youtube.com/embed/" + props.video.id.videoId} allowFullScreen style={{ height: "100%", width: "100%" }} />
                </div>
                <div className="content" style={{ height: "20%" }}>
                    <span className="header"><strong>{props.video.snippet.title}</strong></span>
                    <div className="description">
                        <h3>{props.video.snippet.description}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

//komponen yang menampilkan daftar video yang diperoleh dari API
const VideoList = (props) => {
    if (!props.mainVideo && props.videos.length === 0) {
        return (
            <div className='video-list' style={{ height: props.height }}>
                <div className="ui internally celled middle aligned grid" style={{ height: "100%" }}>
                    <div className="row" style={{ height: "100%" }}>
                        <div className="column" style={{ height: "50%" }}>
                            <div className="ui message">
                                <div className="header"><h1>Welcome!</h1></div>
                                <p>Please type in the input field with video you want to watch</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='video-list' style={{ height: props.height }}>
            <div className="ui internally celled grid" style={{ height: "100%" }}>
                <div className="row" style={{ height: "100%" }}>
                    <Video video={props.mainVideo}></Video>
                    <div className="six wide column" style={{ height: "100%" }}>
                        <div className="ui grid" style={{ maxHeight: "100%", overflow: "auto" }}>
                            <div className="ui internally celled grid">
                                {props.videos.map((video, idx) => {
                                    return (
                                        <div className="row" key={idx}>
                                            <div className="column">
                                                <div className="ui card" style={{ width: "100%", height: "100%" }} >
                                                    <div className="image" style={{ height: "50%" }}>
                                                        <img className="ui image" src={video.snippet.thumbnails.medium.url} alt={video.snippet.description} style={{ width: "100%", height: "100%" }} />
                                                    </div>
                                                    <div className="content" style={{ height: "50%" }}>
                                                        <div className="header">
                                                            <a href="/" onClick={(e) => {
                                                                e.preventDefault();
                                                                props.onVideoClicked(video)
                                                            }}>{video.snippet.title}</a>
                                                        </div>
                                                        <div className="description">
                                                            {video.snippet.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const App = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const onSearchSubmit = async (term) => {
        const response = await youtube.get("/search", {
            params: { q: term }
        })

        setVideos(response.data.items);
    };

    const onVideoClicked = (video) => {
        setSelectedVideo(video);
    }
    return (
        <div className="ui container" style={{ paddingTop: "10px", height: "100%" }}>
            <SearchBar onSubmit={onSearchSubmit} height='20%' />
            <VideoList onVideoClicked={onVideoClicked} mainVideo={selectedVideo} videos={videos} height='85%' />
        </div>
    )
}
//Render komponen ke root div
root.render(
    <App></App>
)