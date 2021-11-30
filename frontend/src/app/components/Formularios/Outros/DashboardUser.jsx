import React, { useEffect, useState } from "react";
import { ChartPie, ChartArea, ChartBar } from "../../Main/Charts";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { parseJwt } from "../../Header/NavBarUser";
import { Select, } from "../../Form/";
import { ToastError, } from "../../Alert/Toast";
import { Link } from 'react-router-dom';
import { Avatar } from "@material-ui/core";

export default function DashboardAdm() {

  const [cliente, setCliente] = useState(
    parseJwt(localStorage.getItem("user")).id || null
  );
  const [materia, setMateria] = useState(null);
  const [inicio, setInicio] = useState(null);
  const [fim, setFim] = useState(null);

  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);

  const [quantidadeQuestoesPorCliente, setQuantidadeQuestoesPorCliente] = useState(0);

  const [acertosPMateria, setAcertosPMateria] = useState(0);
  const [nomePorMateria, setNomePorMateria] = useState("Portugues");
  const [errosPMateria, setErrosPMateria] = useState(0);
  const [selectedMateria, setSelectedMateria] = useState(1);
  const [simuladosRealizados, setSimuladosRealizados] = useState(0);
  const [evoluirMateria, setEvoluirMateria] = useState("sem questões para análise");
  const [acUltimosSimulados, setAcUltimosSimulados] = useState();

  const colors = ['#00aced', '#6610f2', '#6f42c1', '#513487', '#007bff'];
  const jwt = localStorage.getItem('user');
  const user = parseJwt(jwt);

  const [qtdMateriasAgrupadas, setQtdMateriasAgrupadas] = useState([]);
  const [reqMateria, setReqMateria] = useState([]);
  const [acertosMateria, setAcertosMaterias] = useState(
    [
      {
        materia: nomePorMateria,
        acertos: 1,
        name: 'Erros',
        color: "#4746B0",
      },
      {
        materia: nomePorMateria,
        acertos: 1,
        name: 'Acertos',
        color: "#4746B0",
      }
    ]
  );
  const [acertosTotal, setAcertosTotal] = useState(
    [
      {
        acertos: 1,
        name: 'Erros'
      },
      {
        acertos: 1,
        name: 'Acertos'
      }
    ]
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/materia/index/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth") || localStorage.getItem("user")
            }`,
        },
      })
      .then((value) => {
        if (value.data.status_code === 200) {
          setReqMateria(value.data.data.materia);
        }
      })
      .catch((error) => ToastError({ text: error || "Error" }));

    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getAcertos?cliente=${cliente}&inicio=${inicio}&fim=${fim}`
      );
      let res = await req.data.data;
      if (res.length > 0) {
        setAcertos(+res[0].acertos);
      }
    })();


    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getErros?cliente=${cliente}&inicio=${inicio}&fim=${fim}`
      );
      let res = await req.data.data;
      if (res.length > 0) {
        setErros(+res[0].erros);
      }
    })();


    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getQuantidadesQuestoesPorCliente?cliente=${cliente}&inicio=${inicio}&fim=${fim}`
      );
      let res = await req.data.data;
      if (res.length > 0) {
        setQuantidadeQuestoesPorCliente(+res[0].qtde);
      }
    })();


    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getAcertosPorMateria?cliente=${cliente}&materia=${selectedMateria}&inicio=${inicio}&fim=${fim}`
      );
      let res = await req.data;
      if (res.data[0].materia === undefined) {
        console.log("Erro na requisição Acertos por Matéria");
      } else setAcertosPMateria(+res.data[0].acertos);
    })();


    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getErrosPorMateria?cliente=${cliente}&materia=${selectedMateria}&inicio=${inicio}&fim=${fim}`
      );
      let res = await req.data;
      console.log(res.data);
      if (res.data[0].materia === undefined) {
        console.log("Erro na requisição Erros por Matéria");
      } else {
        setErrosPMateria(+res.data[0].erros)
        setNomePorMateria(res.data[0].materia)
      };
    })();

    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getSimuladosRealizados?cliente=${cliente}`
      );
      let res = await req.data.data;
      // console.log(res[0].feitos)
      if (res.length > 0) {
        setSimuladosRealizados(+res[0].feitos);
      }
    })();



    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getMateriaEvoluir?cliente=${cliente}`
      );
      let res = await req.data.data;
      if (res.length > 0) {
        setEvoluirMateria(Object.values(res[0])[0]);
      }
    })();

    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getQtdePorMateriaAgrupada?cliente=${cliente}`
      );
      let res = await req.data.data;
      if (res.length > 0) {
        if (Object.values(res[0])[0] === "404") {
          console.log("Erro na requisição Por Materia Agrupada");
          // }
        } else {
          let data = res.map((val, i) => {
            return {
              Quantidade: +val.quantidade,
              name: val.nomeMateria,
              color: colors[i]
            };
          })
          setQtdMateriasAgrupadas(data);
        }
      }
    })();

    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getAcertosUltimoSimulado?cliente=${cliente}`
      );
      let res = await req.data.data;
      if (res.length > 0) {
        if (res[0] === "404") {
          console.log("Erro na requisição Acertos Últimos Simulados");
          // }
        } else {
          let data = res.map((val, i) => {
            return {
              Acertos: +val.qtde,
              inicio: 'Simulado ' + (i + 1),
            };
          })
          setAcUltimosSimulados(data);
        }
      }
    })();


  }, [cliente, materia, inicio, fim, selectedMateria]);


  useEffect(() => {
    setAcertosMaterias([
      {
        name: "Acertos",
        Acertos: acertosPMateria || 0,
        color: "#007bff",
      },
      {
        name: "Erros",
        Acertos: errosPMateria || 0,
        color: "#4746B0",
      },
    ]);

    setAcertosTotal([
      {
        name: "Acertos",
        Acertos: acertos || 0,
        color: "#216E80",
      },
      {
        name: "Erros",
        Acertos: erros || 0,
        color: "#2F823B",
      },
    ]);
  }, [erros, acertos, errosPMateria, acertosPMateria])


  return (
    <section className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>
      <div className="dashboard__c">
        <div className="dashboard__c__right">
          <div className="dashboard__c__right__profile">
            <div className="dashboard__c__right__profile__p"></div>
            <div className="dashboard__c__right__profile__p__profile">
              <div className="dashboard__c__right__profile__p__circle">{user !== "" && user.foto !== "" && user.foto !== undefined ? (
                <img src={user.foto} alt={user.nome} />
              ) : (
                <div className="dashboard__c__right__profile__p__circle__title">
                  {user.nome.charAt(0).toUpperCase()}
                </div>

              )}</div>
            </div>
            <Link to='/perfil'>
              <FaEdit className="dashboard__c__right__profile__p__icon" />
            </Link>
            <h3 className="dashboard__c__right__profile__p__title">{user.nome}</h3>
          </div>
          <div className="dashboard__c__right__statistics">
            <h3 className="dashboard__c__right__statistics__title">
              Estatísticas Gerais
            </h3>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Simulados realizados
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">
              {simuladosRealizados}
            </p>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Questões realizadas
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">
              {quantidadeQuestoesPorCliente}
            </p>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Evoluir matéria
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">
              {evoluirMateria}
            </p>
          </div>
        </div>

        <div className="dashboard__c__left">
          <div className="dashboard__c__left__um">
            <h3 className="dashboard__c__left__um__title">Melhores Matérias</h3>

            <ChartPie
              data={qtdMateriasAgrupadas}
              dataKey="Quantidade"
              outerRadius={90}
              innerRadius={65}
            />
          </div>
          <div className="dashboard__c__left__dois">
            <h3 className="dashboard__c__left__dois__title">
              Questoes realizadas por materia
            </h3>
            <ChartBar
              data={acUltimosSimulados}
              dataKey="Acertos"
              dataName="inicio" /* color="#513487" */
            />
          </div>
          <div className="dashboard__c__left__et">
            <div className="dashboard__c__left__et__tres">
              <h3 className="dashboard__c__left__et__tres__title">
              
              </h3>
              <div className="dashboard__c__left__et__tres__select">
                <Select
                  className="c-formAssuntoMateria__select"
                  name="materia"
                  id="materia"
                  label="Matéria: *"
                  value={selectedMateria}
                  onChange={({ target }) => setSelectedMateria(target.value)}
                >
                  <option value="0">Selecione</option>
                  {reqMateria !== undefined &&
                    reqMateria.map((item) => (
                      <option value={item.idMateria} key={item.idMateria}>
                        {item.idMateria + " - " + item.nomeMateria}
                      </option>
                    ))}
                </Select>
              </div>

              {acertosMateria[0].Acertos > 0 || acertosMateria[1].Acertos > 0 ? (
                <React.Fragment>
                  <h3>{nomePorMateria}</h3>
                  <ChartPie
                    data={acertosMateria}
                    dataKey="Acertos"
                    outerRadius={90}
                    innerRadius={65}
                  />
                </React.Fragment>
              ) : (<h3 className="dashboard__semdados_desemM">Sem dados</h3>)}

            </div>
            <div className="dashboard__c__left__et__quatro">
              {acertos > 0 || erros > 0 ? (

                <React.Fragment>
                  <h3 className="dashboard__c__left__et__quatro__title">
                    Desempenho geral
                  </h3>
                  <ChartPie
                    data={acertosTotal}
                    dataKey="Acertos"
                    outerRadius={90}
                    innerRadius={65}
                  />
                </React.Fragment>
              ) : (<h3 className="dashboard__semdados_desem">Sem dados</h3>)}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
