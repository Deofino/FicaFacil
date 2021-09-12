import React from "react";
import image from '../../../img/project/192.png';
import { FaSearch, FaChartLine, FaChartPie, FaGraduationCap, FaUserAlt, FaCog, FaSignOutAlt, FaArrowDown } from 'react-icons/fa';
export default function Navbar() {


    return (
        <nav className='c-navbar' >
            <ul className="c-navbar__menu">
                <li className='c-navbar__menu-item sc'>
                    <div className="c-navbar__search" >
                        <FaSearch className='icon' />
                    </div>
                    <input type="text" className='c-navbar__input-search' placeholder="Pesquisar..." />
                    <span className="c-navbar__tooltip">Pesquisar</span>
                </li>
                <li className='c-navbar__menu-item'>
                    <a href="#s">
                        <div className="space">
                            <FaChartLine className='icon' />
                            <span className="c-navbar__links-name">Ver Acessos</span>
                        </div>
                    </a>
                    <span className="c-navbar__tooltip">Ver Acessos</span>
                </li>
                <li className='c-navbar__menu-item'>
                    <a href="#s">
                        <div className="space">
                            <FaChartPie className='icon' />
                            <span className="c-navbar__links-name">Dashboard</span>
                        </div>
                    </a>
                    <span className="c-navbar__tooltip">Dashboard</span>
                </li>
                <li className="c-navbar__dropdown">
                    <div className="c-navbar__menu-item">
                        <a href="#s">
                            <div className="space">
                                <FaGraduationCap className='icon' />
                                <span className="c-navbar__links-name">Criar Questão</span>
                                <FaArrowDown className='arrow icon' />
                            </div>
                        </a>
                        <span className="c-navbar__tooltip">Criar Questão</span>
                    </div>
                    <ul className="c-navbar__sub-menu">
                        <li className='c-navbar__menu-item'><a className="c-navbar__link-name" href="#s">Questão</a></li>
                        <li className='c-navbar__menu-item'><a href="#s">Matérias</a></li>
                        <li className='c-navbar__menu-item'><a href="#s">Dificuldade</a></li>
                        <li className='c-navbar__menu-item'><a href="#s">Vídeos</a></li>
                    </ul>
                </li>
                <li className='c-navbar__menu-item'>
                    <a href="#s">
                        <div className="space">
                            <FaUserAlt className='icon' />
                            <span className="c-navbar__links-name">Perfil</span>
                        </div>
                    </a>
                    <span className="c-navbar__tooltip">Perfil</span>
                </li>
                <li className='c-navbar__menu-item'>
                    <a href="#s">
                        <div className="space">
                            <FaCog className='icon' />
                            <span className="c-navbar__links-name">Configuração</span>
                        </div>
                    </a>
                    <span className="c-navbar__tooltip">Configuração</span>
                </li>
                <li className="c-navbar__profile">
                    <div className="c-navbar__profile-details">
                        <div className="c-navbar__image-profile">
                            <img src={ image } alt="Imagem de perfil, profile" />
                        </div>
                        <div className="c-navbar__name-job">
                            <div className="name">Vitor Oliveira</div>
                        </div>
                    </div>
                    <FaSignOutAlt className='c-navbar__log-out icon' />
                </li>
            </ul>
        </nav>
    );
}
