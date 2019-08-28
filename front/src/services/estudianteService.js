export const obtenerEstudiantes = ( ) => {
    fetch( process.env.REACT_APP_BACKEND_URL + "estudiante" )
    .then( response => {
        console.log( response );
    })
    .catch( error => {
        console.error( error );
    })
}