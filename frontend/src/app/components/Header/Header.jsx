import React from "react";
import Navbar from './Navbar';
import logo from '../../../img/project/logo-branca.png';
import { FaBars } from 'react-icons/fa';

export const ContextHeader = React.createContext(null);

export default function Header() {
    const [ isOpen, setOpen ] = React.useState('');
    return (
        <header className={ "l-header " + isOpen }>
            <div className="l-header__logo">
                <div className="l-header__image">
                    <img src={ logo } alt="Logotipo, Fica Facil" />
                </div>
                <FaBars className='l-header__menu icon' id='btn'
                    onClick={
                        () => setOpen(isOpen === '' ? 'l-header--open' : '')
                    } />
            </div>
            <Navbar />
        </header>
    );
}