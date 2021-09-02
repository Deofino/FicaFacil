import React from "react";
// import {Link} from 'react-router-dom';
import { ContextHeader } from './Header';
export default function Menu() {

    const [ isDrawer, setDrawer ] = React.useContext(ContextHeader);

    function disable() {
        setDrawer("");
    }

    return (
        <ul className={ 'c-menu ' + isDrawer }>
            <li className="c-menu__item">
                <a href='#home' className='c-menu__link' onClick={ () => {
                    window.scrollTo({ top: 0 });
                    disable();
                } }>Inicio</a>
            </li>
            <li className="c-menu__item">
                <a href='#about' className='c-menu__link' onClick={ disable } >Sobre</a>
            </li>
            <li className="c-menu__item">
                <a href='#projects' className='c-menu__link' onClick={ disable } >Projetos</a>
            </li>
            <li className="c-menu__item">
                <a href='#partner' className='c-menu__link' onClick={ disable } >Parcerias</a>
            </li>
            <li className="c-menu__item">
                <a href='#contact' className='c-menu__link' onClick={ disable } >Contato</a>
            </li>
        </ul>

    );
}