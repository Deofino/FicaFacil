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
                <Link to='/questao' className='c-menu__link' onClick={ disable } >Questao</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/projects' className='c-menu__link' onClick={ disable } >Projetos</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/partner' className='c-menu__link' onClick={ disable } >Parcerias</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/contact' className='c-menu__link' onClick={ disable } >Contato</Link>
            </li>
        </ul>

    );
}