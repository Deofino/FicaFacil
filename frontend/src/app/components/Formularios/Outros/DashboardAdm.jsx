import React, { useEffect, useState } from "react";
import { ChartPie, ChartArea, ChartBar } from "../../Main/Charts";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from 'react-router-dom';
import { parseJwt } from "../../Header/NavBarUser";


const jwt = localStorage.getItem('auth');
const adm = parseJwt(jwt);

export default function DashboardAdm() {
  const [totalClientes, setTotalClientes] = useState();
  const [totalSimuladosFeitos, setTotalSimuladosFeitos] = useState();
  const [totalQuestoesCadastradas, setTotalQuestoesCadastradas] = useState();
  const [questoesPorDia, setQuestoesPorDia] = useState([]);
  const [questoesPorMateria, setQuestoesPorMateria] = useState([]);
  const [qPorMateriaAgrupada, setQPorMateriaAgrupada] = useState([]);
  const [acertosUniversidade, setAcertosUniversidade] = useState([]);

  const [acertosTotais, setAcertosTotais] = useState(0);
  const [errosTotais, setErrosTotais] = useState(0);
  const [dataDesempenho, setDataDesempenho] = useState([]);


  const colors = ['#00aced', '#6610f2', '#6f42c1', '#513487', '#007bff'];


  useEffect(() => {
    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getTotalClientes`
      );
      let res = await req.data.data;
      if (res.length > 0) {
        setTotalClientes(+res[0].total);
      }
    })();


    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getTotalSimuladosFeitos`
      );
      let res = await req.data.data;
      if (res.length > 0) {
        setTotalSimuladosFeitos(+res[0].total);
      }
    })();
    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getTotalQuestoesCadastradas`
      );
      let res = await req.data.data;
      if (res.length > 0) {
        setTotalQuestoesCadastradas(+res[0].total);
      }
    })();
    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getQuestoesPorDia`
      );
      let res = await req.data.data;
      if (res.length > 0) {
        let data = res.map((valor, index) => {
          return {
            name: valor.dia,
            Quantidade: +valor.qtde,
          }
        })
        setQuestoesPorDia(data);
      }
    })();
    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getQtdePorMateriaAgrupada`
      );
      let res = await req.data.data;
      if (res.length > 0) {
        let data = res.map((valor, index) => {
          return {
            name: valor.nomeMateria,
            Quantidade: +valor.quantidade,
          }
        })
        setQPorMateriaAgrupada(data);
      }
    })();

    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getAcertosPorUniversidade`
      );
      let res = await req.data.data;
      console.log(res)
      if (res.length > 0) {
        let data = res.map((valor, index) => {
          return {
            name: valor.universidade,
            Quantidade: +valor.qtde,
            color: colors[index]
          }
        })
        setAcertosUniversidade(data);
      }
    })();

    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getErrosTotais`
      );
      let res = await req.data.data;
      if (res.length > 0) {
        setErrosTotais(+res[0].erros);
      }
    })();
    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getAcertosTotais`
      );
      let res = await req.data.data;
      if (res.length > 0) {
        setAcertosTotais(+res[0].acertos)
      }
    })();

  }, []);


  useEffect(() => {
    setDataDesempenho([
      {
        name: "Acertos",
        Quantidade: acertosTotais || 0,
        color: "#007bff",
      },
      {
        name: "Erros",
        Quantidade: errosTotais || 0,
        color: "#4746B0",
      },
    ]);

  }, [errosTotais, acertosTotais])



  return (
    <section className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>
      <div className="dashboard__c">
        <div className="dashboard__c__right">
          <div className="dashboard__c__right__profile">
            <div className="dashboard__c__right__profile__p"></div>
            <div className="dashboard__c__right__profile__p__profile">
              <div className="dashboard__c__right__profile__p__circle">{adm !== "" && adm.foto !== "" && adm.foto !== undefined ? (
                <img src={adm.foto} alt={adm.nome} />
              ) : (
                <div className="dashboard__c__right__profile__p__circle__title">
                  {adm.nomeAdministrador.charAt(0).toUpperCase()}
                </div>

              )}</div>
            </div>

            <h3 className="dashboard__c__right__profile__p__title">{adm.nomeAdministrador}</h3>
          </div>
          <div className="dashboard__c__right__statistics">
            <h3 className="dashboard__c__right__statistics__title">
              Estatísticas
            </h3>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Clientes cadastrados
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">{totalClientes}</p>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Simulados feitos
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">
              {totalSimuladosFeitos}
            </p>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Questões cadastradas
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">
              {totalQuestoesCadastradas}
            </p>
          </div>
        </div>
        <div className="dashboard__c__left">
          <div className="dashboard__c__left__um">
            <h3 className="dashboard__c__left__um__title">
              Questoes realizadas por materia
            </h3>
            {qPorMateriaAgrupada.length > 0 ? <ChartBar data={qPorMateriaAgrupada} dataKey="Quantidade" dataName='name' /> : <h2>Sem dados</h2>}
          </div>
          <div className="dashboard__c__left__dois">
            <h3 className="dashboard__c__left__dois__title">
              Questões por dia
            </h3>
            {questoesPorDia.length > 0 ? <ChartArea data={questoesPorDia} keyData="Quantidade" keyName="name" /> : <h2>Sem dados</h2>}
          </div>
          <div className="dashboard__c__left__et">
            <div className="dashboard__c__left__et__tres">
              <h3 className="dashboard__c__left__et__tres__title">
                Desempenho geral
              </h3>
              {dataDesempenho.length > 0 ? <ChartPie data={dataDesempenho} dataKey="Quantidade" outerRadius={90} innerRadius={65} /> : <h2>Sem dados</h2>}
            </div>
            <div className="dashboard__c__left__et__quatro">
              <h3 className="dashboard__c__left__et__quatro__title">
                Acertos de Universidade
              </h3>
              {acertosUniversidade.length > 0 ? <ChartPie data={acertosUniversidade} dataKey="Quantidade" outerRadius={90} innerRadius={65} /> : <h2>Sem dados</h2>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
