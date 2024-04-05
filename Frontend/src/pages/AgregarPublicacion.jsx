import { useState } from 'react';

import "./styles/agregarpublicacion.css";
// eslint-disable-next-line react/prop-types
const AgregarPublicacion = ({ onFormSubmit }) => {
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar validaciones si es necesario
        //hacer peticion y mandar los datos
        
        // Envía los datos al componente padre
        onFormSubmit({ descripcion, categoria });


        // Redirige a la página de inicio después de agregar la publicación
        history.push('/');
    };

    return (
        <div className="ap-container">
            <h1>Agregar Publicación</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="descripcion">Descripción:</label>
                <input
                    type="text"
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                    className="ap-input"
                />

                <label htmlFor="categoria">Categoría:</label>
                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                    className="ap-select" 
                >
                    <option value="">Selecciona una categoría</option>
                    <option value="Anuncio Importante">Anuncio Importante</option>
                    <option value="Divertido">Divertido</option>
                    <option value="Académico">Académico</option>
                    <option value="Variedad">Variedad</option>
                </select>

                <button type="submit" className="ap-button">Agregar</button> {/* Añadí la clase ap-button */}
            </form>
        </div>
    );
};

export default AgregarPublicacion;
