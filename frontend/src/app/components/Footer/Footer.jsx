import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
export default function Footer() {
    return (
        <footer className="c-footer">
            <div className="c-footer__container">
                <div className="c-footer__row">
                    <div className="c-footer__col">
                        <h4>menu</h4>
                        <ul>
                            <li><a href="#inicio" >início</a></li>
                            <li><a href="#perfil">meu perfil</a></li>
                            <li><a href="#a">alguma coisa</a></li>
                            <li><a href="#a">outra coisa</a></li>
                        </ul>
                    </div>
                    <div className="c-footer__col">
                        <h4>empresa</h4>
                        <ul>
                            <li><a href="#aura">aura</a></li>
                            <li><a href="#sobre">sobre</a></li>
                        </ul>
                    </div>
                    <div className="c-footer__col">
                        <h4>dúvidas?</h4>
                        <ul>
                            <li><a href="#email">e-mail</a></li>
                            <li><a href="#whatsapp">whatsapp</a></li>
                            <li><a href="#fale-conosco">fale conosco</a></li>
                        </ul>
                    </div>
                    <div className="c-footer__col">
                        <h4>redes sociais</h4>
                        <div className="c-footer__social-links">
                            <a href="#d" target="_blank">
                                <FaFacebook />
                            </a>
                            <a href="#d" target="_blank">
                                <FaTwitter />
                            </a>
                            <a href="#d" target="_blank">
                                <FaInstagram />
                            </a>
                            <a href="#d" target="_blank">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
}