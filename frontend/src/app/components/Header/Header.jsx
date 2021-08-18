import React from "react";
import Navbar from './Navbar';

export const ContextHeader = React.createContext(null);

export default function Header() {
    const [isDrawer, setDrawer] = React.useState("")

    return (
        <ContextHeader.Provider value={[isDrawer, setDrawer]}>
            <header className='l-headerMain relative shadow'>
                <Navbar />
            </header>
        </ContextHeader.Provider>
    );
}