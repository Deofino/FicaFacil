import React from "react";
import Navbar from './Navbar';
import { FaBars } from 'react-icons/fa';

export const ContextHeader = React.createContext(null);

export default function Header() {
    const [ isDrawer, setDrawer ] = React.useState("");

    return (
        <ContextHeader.Provider value={ [ isDrawer, setDrawer ] }>

            <header className="l-header">
                <div className="l-header__logo">
                    <div className="l-header__image">
                        <img src="logo-branca1.png" alt="Logotipo, Fica Facil" />
                    </div>
                    <FaBars id='btn' />
                </div>
                <Navbar  />
            </header>
        </ContextHeader.Provider >
    );
}