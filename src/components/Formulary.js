import React, {Component} from 'react';
import PropTypes from 'prop-types';
class Formulary extends Component{

    //Refs
    eventNameRef = React.createRef();
    categoryRef = React.createRef();

    searchEvent = (e) => {
        e.preventDefault();

        //Creating the object
        const datosBusqueda = {
            name: this.eventNameRef.current.value,
            category: this.categoryRef.current.value
        }


        //send by props
        this.props.obtenerEventos(datosBusqueda);
    }

    mostrarOpciones = (key) => {

        //Obteniendo el prop
        const category = this.props.categories[key];
        //destructuring
        const {id, name_localized}=category;

        if(!id || !name_localized) return null;

        return(
            <option key={id} value={id}>{name_localized}</option>
        )
    }

    render(){

        const categories = Object.keys(this.props.categories);
        return(
            <form onSubmit={this.searchEvent}>
            <fieldset className="uk-fieldset uk-margin">
                    <legend className="uk-legend uk-text-center">
                        Busca tu evento por nombre o categoría
                    </legend>
                    <div className="uk-column-1-3@m uk-margin">
                        <div className="uk-margin" uk-margin="true">
                            <input ref={this.eventNameRef} className="uk-input" type="text" placeholder="Nombre de Evento o Ciudad" />
                        </div>
                        <div className="uk-margin" uk-margin="true">
                            <select ref={this.categoryRef} className="uk-select">
                                {categories.map(this.mostrarOpciones)}
                            </select>
                        </div>
                        <div className="uk-margin" uk-margin="true">
                            <button className="uk-button uk-button-danger">Buscar</button>
                        </div>
                    </div>

            </fieldset>
            </form>
        )
    }
}

Formulary.propTypes={
    obtenerEventos: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
}

export default Formulary;