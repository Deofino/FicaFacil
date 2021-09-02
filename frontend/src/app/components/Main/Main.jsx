import React from 'react';
import axios from 'axios';
/**
 * @param {Main}
 * @props {style} - style inline para a Main
 * @props {children} - Componentes filhos dentro de Main 
 */
export default function Main(props) {

    React.useEffect(() => {
        (async () => {
            let url = `${process.env.REACT_APP_API_PATH}/dificuldade/create/`;
            let req = await axios.post(url, JSON.stringify({ 'dificuldade': 'easy' }));
            let res = await req.data;
            console.log(res.data);
        })();
    }, []);
    return (
        <main className='l-main' style={ props.style || null }>
            { props.children }
        </main>
    );
}