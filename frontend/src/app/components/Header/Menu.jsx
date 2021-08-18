import React from "react";
import { Link } from "react-router-dom";
import { ContextHeader } from './Header';
export default function Menu() {

    const [isDrawer, setDrawer] = React.useContext(ContextHeader);

    function disable() {
        setDrawer("");
    }

    return (
        <ul className={'c-menu ' + isDrawer}>
            <li className="c-menu__item c-menu__item--focus">
                <Link to='/' className='c-menu__link' onClick={disable}>Inicio</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/produtos' className='c-menu__link' onClick={disable} >Produtos</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/sobre' className='c-menu__link' onClick={disable} >Sobre</Link>
            </li>
            <li className="c-menu__item">
                <Link to='/contato' className='c-menu__link' onClick={disable} >Contato</Link>
            </li>
        </ul>

    )
}