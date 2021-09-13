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
                            <li><a href="#a">simulado</a></li>
                            <li><a href="#a">dashboard</a></li>
                        </ul>
                    </div>
                    <div className="c-footer__col">
                        <h4>empresa</h4>
                        <ul>
                            <li><a href="https://deofino.github.io/Aura/">aura</a></li>
                            <li><a href="#sobre">sobre</a></li>
                        </ul>
                    </div>
                    <div className="c-footer__col">
                        <h4>dúvidas?</h4>
                        <ul>
                            <li><a href="mailto:auracompany.guaianases@gmail.com">e-mail</a></li>
                            <li><a href="#whatsapp">whatsapp</a></li>
                            <li><a href="#fale-conosco">fale conosco</a></li>
                        </ul>
                    </div>
                    <div className="c-footer__col">
                        <h4>redes sociais</h4>
                        <div className="c-footer__social-links">
                            <a href="https://www.facebook.com/Aura-co-109146718177587" target="_blank" rel='noreferrer'>
                                <FaFacebook />
                            </a>
                            <a href="https://twitter.com/AuraCo11" target="_blank" rel='noreferrer'>
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com/aura_companhia?utm_medium=copy_link" target="_blank" rel='noreferrer'>
                                <FaInstagram />
                            </a>
                            <a href="https://www.youtube.com/channel/UCTYitIhZqcHCgoxMmpZH5qQ" target="_blank" rel='noreferrer'>
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
}