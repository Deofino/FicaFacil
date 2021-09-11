import React from "react";
import { Link } from 'react-router-dom';
import { ContextHeader } from './Header';
export default function Menu() {

    const [ isDrawer, setDrawer ] = React.useContext(ContextHeader);

    function disable() {
        setDrawer("");
    }

    return (
        <ul className={ 'c-menu ' + isDrawer }>
            <li className="c-menu__item">
                <Link to='/home' className='c-menu__link' onClick={ () => {
                    window.scrollTo({ top: 0 });
                    disable();
                } }>Inicio</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/questao' className='c-menu__link' onClick={ disable } >Questão</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/areamateria' className='c-menu__link' onClick={ disable } >Area Matéria</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/materia' className='c-menu__link' onClick={ disable } >Matéria</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/assuntomateria' className='c-menu__link' onClick={ disable } >Assunto Matéria</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/universidade' className='c-menu__link' onClick={ disable } >Universidade</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/dificuldade' className='c-menu__link' onClick={ disable } >Dificuldade</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/resposta' className='c-menu__link' onClick={ disable } >Resposta</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/sugestaoVideo' className='c-menu__link' onClick={ disable } >Sugestão Vídeo</Link>
            </li>
           
           
        </ul>

    );
}