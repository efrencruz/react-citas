import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
    // Local storage
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (!citasIniciales) {
        citasIniciales = [];
    }

    // Arreglo de citas
    const [citas, guardarCitas] = useState(citasIniciales);

    // useEffect
    useEffect(() => {
        let citasIniciales = JSON.parse(localStorage.getItem('citas'));
        if (citasIniciales) {
            localStorage.setItem('citas', JSON.stringify(citas));
        } else {
            localStorage.setItem('citas', JSON.stringify([]));
        }
    }, [citas]);

    // Función para guardar citas
    const crearCita = cita => {
        guardarCitas([...citas, cita]);
    };

    // Función para eliminar cita
    const eliminarCita = id => {
        const nuevasCitas = citas.filter(cita => cita.id !== id);
        guardarCitas(nuevasCitas);
    };

    // Mensaje condicional
    const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

    return (
        <Fragment>
            <h1>Adminisrador de pacientes</h1>
            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Formulario crearCita={crearCita} />
                    </div>
                    <div className="one-half column">
                        <h2>{titulo}</h2>
                        {citas.length > 0
                            ? citas.map(cita => <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />)
                            : null}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
