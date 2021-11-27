import React from "react";
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';

const marks = [
    {
        value: 80,
        label: 'P',
    },
    {
        value: 100,
        label: 'M',
    },
    {
        value: 120,
        label: 'G',
    },
];

const marksZoom = [
    {
        value: 80,
        label: '80%',
    },
    {
        value: 100,
        label: '100%',
    },
    {
        value: 120,
        label: '120%',
    },
];

function valuetext(value) {
    return `${value}%`;
  }

export default function Perfil() {
    return (
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

            <div className="card">
                <div className="card__body">
                    <div className="meusDados">
                        <p>Aparência</p>
                    </div>
                    <p className="itensAparencia">Tema</p>
                    <div className="aparencia">
                        <div className="radioGrupo">
                            <label className="radio">
                                <input type="radio" value="claro" name="tema" />
                                <p>Claro</p>
                                <span></span>
                            </label>

                            <label className="radio">
                                <input type="radio" value="escuro" name="tema" />
                                <p>Escuro</p>
                                <span></span>
                            </label>
                        </div>

                    </div>
                    <br />
                    <p className="itensAparencia">Visual</p>
                    <br>
                    </br>
                    <p className="fonte">Escala de fonte</p>
                    <Box sx={{ width: 860 }}>
                        <Slider
                            aria-label="Custom marks"
                            defaultValue={30}
                            valueLabelDisplay="auto"
                            step={20}
                            min={80}
                            max={120}
                            marks={marks}
                            color="#fff"
                        />
                    <br>
                    </br>
                    <br>
                    </br>
                    <p className="fonte">Zoom</p>
                        <Slider
                            aria-label="Custom marks"
                            defaultValue={30}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext} 
                            step={20}
                            min={80}
                            max={120}
                            marks={marksZoom}
                            color="#fff"
                            />
                    </Box>

                </div>

            </div>

        </div>
    )
}