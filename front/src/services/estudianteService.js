export const obtenerEstudiantes = ( ) => {
    const estudiantes = fetch( process.env.REACT_APP_BACKEND_URL + "estudiante" )
    .then( response => response.json() )
    .catch( error => {
        console.error( error );
    });

    return estudiantes;
}

export const guardarEstudiante = ( estudiante ) => {
    console.log( estudiante );
}