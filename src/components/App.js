import React, { Component } from 'react';

//Components
import Header from './Header';
import Formulary from './Formulary';
import Eventos from './Eventos';

class App extends Component {

  token='SQWA6MNJW6PW76P2MK6E';
  ordenar = 'date';

  constructor(props){
    super(props);
    this.state = {
      categories:[],
      eventos:[]
    }
  }  

  componentDidMount(){
   this.getCategories();
  }

  //para llenar el combo de categorias solamene
  getCategories = async () => {

    let url = `https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=es_ES`;
    
   
    await fetch(url)
    .then(response => {
      return response.json();
    })
    .then(categories => {
      this.setState({
        categories: categories.categories
      })
    })

  }

  //Apartir de la categoria y nombre ya obtenemos los eventos

  obtenerEventos = async (busqueda) => {
    let url = `https://www.eventbriteapi.com/v3/events/search/?q=${busqueda.name}&categories=${busqueda.category}&sort_by=${this.ordenar}&token=${this.token}`;
    
    
    await fetch(url)
    .then(response => {
      return response.json();
    })
    .then(eventos => {
      this.setState({
        eventos: eventos.events
      })
    })

    

  }

  render() {
    return (
      <div className="App">
        <Header
          title="Eventos"
        />
        <div className="uk-container">
            <Formulary
            categories = {this.state.categories}
            obtenerEventos = {this.obtenerEventos}
            />
            <Eventos
              eventos={this.state.eventos}
            />
        </div>
      </div>
    );
  }
}

export default App;
