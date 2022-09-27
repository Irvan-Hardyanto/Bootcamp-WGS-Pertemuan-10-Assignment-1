//import module React dan React DOM
import React from 'react';
import ReactDOM from 'react-dom/client';

//2)  memanggil reference ke div dengan id root
const el = document.getElementById("root");

//3) Memberi tahu react untuk Mengambil control dari elemen tersebut 
const root = ReactDOM.createRoot(el);

//Komponen form
class ContohForm extends React.Component{
  constructor(props){
    super(props);
    this.state={value:""};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  //event handler pada saat value dari sebuah input mengalami perubahan
  //memastikan state selalu diupdate jika terjadi perubahan pada form
  handleChange(event){
    this.setState({value: event.target.value});
  }

  //event handler pada saat pengguna men-submit form
  handleSubmit(event){
    alert("A name was submitted: "+this.state.value);
    event.preventDefault();
  }
  //tampilkan form ke DOM
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
    )
  }
}

//Render komponen ke root div
root.render(
  <ContohForm></ContohForm>
)