//import module React dan React DOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import unsplash from './Unsplash';

//2)  memanggil reference ke div dengan id root
const el = document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root = ReactDOM.createRoot(el);

//Komponen SearchBar
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
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input type="text" value={this.state.term} onChange={(e) => this.setState({ term: e.target.value })}></input>
          </div>
        </form>
      </div>
    )
  }
}

//Komponen utama
class App extends React.Component {
  state = { images: [] };

  onSearchSubmit = async (term) => {
    const response = await unsplash.get("/search/photos", {
      params: { query: term },
    })

    this.setState({ images: response.data.results });
    console.log("RESULTS: " + response.data.results);
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <div className="ui grid">
          {/* {JSON.stringify(this.state.images.pop())} */}
          {this.state.images.map((img,idx)=>{
            return <img src={img.urls.thumb}></img>
          })}
          
        </div>
      </div>
    )
  }
}

//Render komponen ke root div
root.render(
  <App></App>
)