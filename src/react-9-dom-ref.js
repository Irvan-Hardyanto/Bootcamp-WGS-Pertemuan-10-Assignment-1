//import module React dan React DOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import unsplash from './Unsplash';

//2)  memanggil reference ke div dengan id root
const el = document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root = ReactDOM.createRoot(el);

//Komponen SearchBar dalam bentuk class
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

//card untuk menampilkan gambar
class ImageCard extends React.Component{
  constructor(props){
    super(props);
    this.state={spans: 0};
    this.imageRef=React.createRef();//ref yang merujuk pada elemen DOM tertentu
  }

  setSpans(e){
    //ambil tinggi gambar yang telah ditampilkan
    const height=this.imageRef.current.clientHeight;
    //hitung tinggi satu gambar (?)
    const spans=Math.ceil(height/10)
    this.setState({spans});
  }

  componentDidMount(){
    this.imageRef.current.addEventListener("load",this.setSpans);
  }

  render(){
    return(
      <img className="ui card" src={this.props.src} alt={this.props.alt} key={this.props.pictureKey} ref={this.imageRef}/>
    )
  }
}

//komponen ImageList dalam bentuk function
//ref biasa yang bukan hook itu cuma bisa di class, gak bisa di function krn function gak punya instance
const ImageList=(props)=>{
  //untuk setiap gambar yang diperoleh dari api
  const images = props.images.map(({description, id, urls})=>{
    return (<ImageCard alt={description} pictureKey={id} src={urls.regular}/>);
  });

  return (
    <div className="image-list">
       {images}
    </div>
     
  );
}



//Komponen utama dalam bentuk class
class App extends React.Component {
  state = { images: [] };

  onSearchSubmit = async (term) => {
    const response = await unsplash.get("/search/photos", {
      params: { query: term },
    })
    console.log("RESPONSE NUM: "+response.data.results.length);
    //console.log(JSON.stringify(response.data.results.pop()))
    this.setState({ images: response.data.results });
    // console.log("RESULTS: " + response.data.results);
  };
  
  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images}></ImageList>
        {/* <div className="ui grid">
          {this.state.images.map((img,idx)=>{
            return <img src={img.urls.thumb}></img>
          })}
          
        </div> */}
      </div>
    )
  }
}

//Render komponen ke root div
root.render(
  <App></App>
)