//import module React dan React DOM
import React from 'react';
import ReactDOM from 'react-dom/client';

//2)  memanggil reference ke div dengan id root
const el = document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root = ReactDOM.createRoot(el);

//Komponen 
class Clock extends React.Component {
  constructor(props) {//konstruktor untuk inisialisasi state
    super(props);
    this.state = { date: new Date() }//konstruktor kelas Date mengembalikan sebuah objek yang mencatat waktu pada saat konstruktor tersebut dipanggil.
  }

  //function untuk mendapatkan waktu saat ini
  tick() {
    this.setState({ date: new Date() })//state milik komponen ini hanya bisa diperbarui menggunakan method setState()
  }

  //LifeCycle Method yang dipanggil segera setelah komponen ini berhasil ditampilkan di browser
  componentDidMount() {

    //panggil method tick() setiap 1 detik
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  //LifeCycle Method yang dipanggil ketika komponen ini dihapus dari browser (ketika browsernya ditutup atau komponen ini diganti dengan komponen lain)
  componentWillUnmount() {

    //kalau ini tidak dipanggil:
    //method tick() akan terus menerus dipanggil oleh setInterval() meskipun komponen nya tidak ditampilkan
    clearInterval(this.timerID);
  }

  //Method yang wajib dimiliki oleh setiap komponen yang meng-extend kelas React.Component
  render() {
    return (
      <div className="ui middle aligned one column padded centered grid" style={{ backgroundColor: "rgb(37, 150, 190)", height: '100%' }}>
        <div className="centered row">
          <div className='column'>
            <div className='ui container' style={{ width: "50%", backgroundColor: "white", textAlign: "center" }}>
              <h1 class="ui header">Aplikasi Jam Sederhana Menggunakan React Class Component</h1>
              <h4>Waktu sekarang adalah: </h4>
              <div style={{backgroundColor:"#016936",color: "white",padding:"1em"}}>
                <h2>{this.state.date.toLocaleTimeString()}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//Render komponen ke root div
root.render(
  <Clock></Clock>
)