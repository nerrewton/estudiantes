export const obtenerNotas = ( id = null ) => {

    if( id ){
        const nota = fetch( process.env.REACT_APP_BACKEND_URL + "nota/" + id )
        .then( response => response.json() )
        .catch( error => {
            console.error( error );
        });

        return nota;
    }

    const notas = fetch( process.env.REACT_APP_BACKEND_URL + "nota" )
    .then( response => response.json() )
    .catch( error => {
        console.error( error );
    });

    return notas;
}

export const guardarNota = ( datos ) => {
    let method = "POST";
    if( !datos.id ){
        datos.id = undefined;
    }else{
        method = "PUT";
    }
    const nota = fetch( process.env.REACT_APP_BACKEND_URL + "nota", {
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

    return nota;
}

export const eliminarNota = ( id ) => {

    const nota = fetch( process.env.REACT_APP_BACKEND_URL + "nota", {
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

    return nota;
}