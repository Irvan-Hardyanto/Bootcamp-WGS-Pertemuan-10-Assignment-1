//import module React dan React DOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import youtube from './Youtube';

//2)  memanggil reference ke div dengan id root
const el = document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root = ReactDOM.createRoot(el);

//Komponen SearchBar dalam bentuk class, yang menerima masukan berupa kata kunci video yang ingin dicari oleh pengguna
class SearchBar extends React.Component {
  state = { term: "" };

  //event handler jika pengguna menekan tombol enter (melakukan submit) pada form
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);//passing value yang diketikan
  }
  //tampilkan form ke DOM
  render() {
    return (
      <div className="ui segment" height={this.props.height} style={{ margin: "0px" }}>
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Video Search</label>
            <input type="text" value={this.state.term} onChange={(e) => this.setState({ term: e.target.value })}></input>
          </div>
        </form>
      </div>
    )
  }
}

//Komponen yang merepresentasikan video utama yang ingin ditonton
class Video extends React.Component {
  render() {
    if (!this.props.video) {
      return (<div className="ten wide column"><div className="ui message">Please choose a video</div></div>)
    }
    return (
      <div className="ten wide column">
        <div className="ui card" style={{ width: "100%", height: "100%" }}>
          <div className="image" style={{ height: "80%" }}>
            {/*Kalo pengguna belum nge search video, tampilin loading */}
            <iframe src={"https://www.youtube.com/embed/" + this.props.video.id.videoId} allowFullScreen style={{ height: "100%", width: "100%" }} />
          </div>
          <div className="content" style={{ height: "20%" }}>
            <span className="header"><strong>{this.props.video.snippet.title}</strong></span>
            <div className="description">
              <h3>{this.props.video.snippet.description}</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//komponen yang menampilkan daftar video yang diperoleh dari API
const VideoList = (props) => {
  console.log(props.mainVideo)
  console.log(props.videos.length)
  if (!props.mainVideo&&props.videos.length == 0) {
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
                    <div className="row">
                      <div className="column">
                        <div className="ui card" style={{ width: "100%", height: "100%"}} >
                          <div className="image" style={{ height: "50%" }}>
                            <img className="ui image" src={video.snippet.thumbnails.medium.url} alt={video.snippet.description} style={{ width: "100%", height: "100%" }} />
                          </div>
                          <div class="content" style={{ height: "50%" }}>
                            <div className="header">
                              <a href="/" onClick={(e)=>{
                                  e.preventDefault();
                                console.log(props.onVideoClicked)
                                  props.onVideoClicked(video)
                                }}>{video.snippet.title}</a>
                            </div>
                            <div class="description">
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





//Komponen utama dalam bentuk class
class App extends React.Component {
  //state yang berisi daftar video yang diperoleh dari API dan 
  //video utama yang dipilih oleh pengguna
  state = { videos: [], selectedVideo: null};

  onSearchSubmit = async (term) => {
    const response = await youtube.get("/search", {
      params: { q: term }
    })

    this.setState({ videos: response.data.items })
  };

  onVideoClicked=(video)=>{
    //event.preventDefault()
    this.setState({selectedVideo: video})
  }

  render() {
    return (
      <div className="ui container" style={{ paddingTop: "10px", height: "100%" }}>
        <SearchBar onSubmit={this.onSearchSubmit} height='20%' />
        <VideoList onVideoClicked={this.onVideoClicked} mainVideo={this.state.selectedVideo} videos={this.state.videos} height='85%' />
      </div>
    )
  }
}

//Render komponen ke root div
root.render(
  <App>

  </App>
)