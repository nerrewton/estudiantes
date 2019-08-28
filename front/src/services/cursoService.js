export const obtenerCursos = ( id = null ) => {

    if( id ){
        const curso = fetch( process.env.REACT_APP_BACKEND_URL + "curso/" + id )
        .then( response => response.json() )
        .catch( error => {
            console.error( error );
        });

        return curso;
    }

    const cursos = fetch( process.env.REACT_APP_BACKEND_URL + "curso" )
    .then( response => response.json() )
    .catch( error => {
        console.error( error );
    });

    return cursos;
}

export const guardarCurso = ( datos ) => {
    let method = "POST";
    if( !datos.id ){
        datos.id = undefined;
    }else{
        method = "PUT";
    }
    const curso = fetch( process.env.REACT_APP_BACKEND_URL + "curso", {
        method,
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

    return curso;
}

export const eliminarCurso = ( id ) => {

    const curso = fetch( process.env.REACT_APP_BACKEND_URL + "curso", {
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

    return curso;
}