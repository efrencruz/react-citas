import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {
    // Crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    // State para manejo de errores
    const [error, actualizarError] = useState(false);

    // Función que se ejecuta cada que el usuario escrie
    const handleChange = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    };

    // Extraer valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // Cuando se enviar el formulario
    const submitCita = e => {
        e.preventDefault();

        // Validar campos
        if (
            mascota.trim() === '' ||
            propietario.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ||
            sintomas.trim() === ''
        ) {
            actualizarError(true);
            return;
        }

        // Eliminar mensaje de error
        actualizarError(false);

        // Agregar ID
        cita.id = uuid();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    };

    return (
        <Fragment>
            <h2>Crear cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
            <form onSubmit={submitCita}>
                <label>Nombre mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={handleChange}
                    value={mascota}
                />
                <label>Nombre dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño"
                    onChange={handleChange}
                    value={propietario}
                />
                <label>Fecha de alta</label>
                <input type="date" name="fecha" className="u-full-width" onChange={handleChange} value={fecha} />
                <label>Hora de alta</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={handleChange}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea className="u-full-width" name="sintomas" onChange={handleChange} value={sintomas}></textarea>
                <button type="submit" className="u-full-width button-primary">
                    Agregar cita
                </button>
            </form>
        </Fragment>
    );
};

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
};

export default Formulario;
