import React from "react";

export default function Perfil(){
    return(
        <div>
            <div className="capa"></div>
            <div className="infos">
                <div className="infos__foto">
                    <img src="" alt="" />
                </div>
                <div className="infos__texto">
                    <div className="infos__texto__nome">
                        <p className="txtNome">Paulo</p>
                    </div>
                    <div className="infos__texto__aluno">
                        <p className="txtAluno">Aluno desde 11/11/2021</p>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card__body">
                    <div className="meusDados">
                        <p>Meus Dados</p>
                    </div>

                    <div className="dados">
                            <div className="nomeUsuario">
                                <p className="fixo">Nome de Usuário</p>
                                <p className="var">Paulo Moreira #2323</p>
                            </div>
                            <div className="btnEditar">
                                <p>Alterar</p>
                            </div>
                    </div>

                    <div className="dados">
                            <div className="emailUsuario">
                                <p className="fixo">Email</p>
                                <p className="var">nagatogts@hotmail.com</p>
                            </div>
                            <div className="btnEditar">
                                <p>Alterar</p>
                            </div>
                    </div>

                    <div className="dados">
                            <div className="dataNascUsuario">
                                <p className="fixo">Data de Nascimento</p>
                                <p className="var">08/01/2004</p>
                            </div>
                            <div className="btnEditar">
                                <p>Alterar</p>
                            </div>
                    </div>

                    <div className="dados">
                            <div className="dataNascUsuario">
                                <p className="fixo">Senha da Conta</p>
                                <p className="var">Altere sua senha</p>
                            </div>
                            <div className="btnEditar">
                                <p>Alterar</p>
                            </div>
                    </div>

                   
                    
                </div>

            </div>

        </div>
    )
}