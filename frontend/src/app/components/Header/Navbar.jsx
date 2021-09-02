import React, { useContext } from "react";
import Menu from "./Menu";
import { ContextHeader } from './Header';

export default function Navbar() {

    const [ isDrawer, setDrawer ] = useContext(ContextHeader);

    return (
        <nav className="c-navbar">
            <div className="c-navbar__logo">
                {/* <img className="c-navbar__image" alt='Logo' src={ 'LOGO' } /> */ }
                LOGO
            </div>

            <button
                className={ "d-none shadow btn-openDrawer" + isDrawer }
                onClick={ () => setDrawer(isDrawer === "" ? " active" : "") }
            ></button>

            <Menu />
        </nav>
    );
}
