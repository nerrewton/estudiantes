export const obtenerEstudiantes = ( ) => {
    const estudiantes = fetch( process.env.REACT_APP_BACKEND_URL + "estudiante" )
    .then( response => response.json() )
    .catch( error => {
        console.error( error );
    });

    return estudiantes;
}

export const guardarEstudiante = ( datos ) => {
    datos.id = undefined;
    const estudiante = fetch( process.env.REACT_APP_BACKEND_URL + "estudiante", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( datos )
    })
    .then( response => response.json() )
    .catch( error => {
        console.error( error );
    });

    return estudiante;
}

export const eliminarEstudiante = ( id ) => {

    const estudiante = fetch( process.env.REACT_APP_BACKEND_URL + "estudiante", {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {id} )
    })
    .then( response => response.json() )
    .catch( error => {
        console.error( error );
    });

    return estudiante;
}