import React, { useContext } from "react";
import { ContextHeader } from './Header';
import { FaSearch, FaChartLine, FaChartPie, FaGraduationCap, FaUserAlt, FaCogs, FaSignOutAlt, FaArrowDown } from 'react-icons/fa';
export default function Navbar() {

    const [ isDrawer, setDrawer ] = useContext(ContextHeader);

    return (
        // <nav className="c-navbar">
        //     <div className="c-navbar__logo">
        //         {/* <img className="c-navbar__image" alt='Logo' src={ 'LOGO' } /> */ }
        //         LOGO
        //     </div>

        //     <button
        //         className={ "d-none shadow btn-openDrawer" + isDrawer }
        //         onClick={ () => setDrawer(isDrawer === "" ? " active" : "") }
        //     ></button>

        //     <Menu />
        // </nav>


        <nav className='c-navbar' >
            <ul className="c-navbar__menu">
                <li>
                    <FaSearch />
                    <input type="text" placeholder="Pesquisar..." />
                    <span className="c-navbar__tooltip">Pesquisar</span>
                </li>
                <li>
                    <a href="#s">
                        <FaChartLine />
                        <span className="c-navbar__links-name">Ver Acessos</span>
                    </a>
                    <span className="c-navbar__tooltip">Ver Acessos</span>
                </li>
                <li>
                    <a href="#s">
                        <FaChartPie />
                        <span className="c-navbar__links-name">Dashboard</span>
                    </a>
                    <span className="c-navbar__tooltip">Dashboard</span>
                </li>
                <li className="c-navbar__dropdown">
                    <div className="c-navbar__iocn-link ">
                        <a href="#s">
                            <FaGraduationCap />
                            <span className="c-navbar__links-name">Criar Questão</span>
                            <FaArrowDown />
                        </a>
                        <span className="c-navbar__tooltip">Criar Questão</span>
                    </div>
                    <ul className="c-navbar__sub-menu">
                        <li><a className="c-navbar__link-name" href="#s">Questão</a></li>
                        <li><a href="#s">Matérias</a></li>
                        <li><a href="#s">Dificuldade</a></li>
                        <li><a href="#s">Vídeos</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#s">
                        <FaUserAlt />
                        <span className="c-navbar__links-name">Perfil</span>
                    </a>
                    <span className="c-navbar__tooltip">Perfil</span>
                </li>
                <li>
                    <a href="#s">
                        <FaCogs />
                        <span className="c-navbar__links-name">Configuração</span>
                    </a>
                    <span className="c-navbar__tooltip">Configuração</span>
                </li>
                <li className="c-navbar__profile">
                    <div className="c-navbar__profile-details">
                        <div className="c-navbar__image-profile">
                            <img src="vitor.jpg" alt="profileImg" />
                        </div>
                        <div className="c-navbar__name-job">
                            <div className="name">Vitor Oliveira</div>
                        </div>
                    </div>
                    <FaSignOutAlt id='c-navbar__log-out' />
                </li>
            </ul>
        </nav>
    );
}
