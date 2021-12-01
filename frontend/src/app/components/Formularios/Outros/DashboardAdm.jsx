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

  let dataExemplo = [
    {
      name: "Exatas",
      Acertos: 5,
      color: "#00aced",
    },
    {
      name: "Humanas",
      Acertos: 10,
      color: "#6610f2",
    },
    {
      name: "Biológicas",
      Acertos: 20,
      color: "#513487",
    },

  ];
  let dataDesempenho = [
    {
      name: "Erros",
      Acertos: 40,
      color: "#4746B0",
    },
    {
      name: "Acertos",
      Acertos: 120,
      color: "#4746B0",
    }
  ];
  let dataQuestoes = [
    {
      name: "Total Questoes",
      Acertos: 200,
      color: "#513487",
    }
  ];

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
    
  });


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
            {/*      <Link to='/perfil'>
              <FaEdit className="dashboard__c__right__profile__p__icon" />
            </Link> */}
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
            <ChartBar data={dataExemplo} dataKey="Acertos" />
          </div>
          <div className="dashboard__c__left__dois">
            <h3 className="dashboard__c__left__dois__title">
              Questões por dia
            </h3>
            <ChartArea data={[
              {
                dia: "Seg",
                entradas: 15,
              },
              {
                dia: "Ter",
                entradas: 32,
              },
              {
                dia: "Qua",
                entradas: 2,
              },
              {
                dia: "Qui",
                entradas: 18,
              },
              {
                dia: "Sex",
                entradas: 43,
              },
              {
                dia: "Sab",
                entradas: 32,
              },
              {
                dia: "Dom",
                entradas: 25,
              },
            ]} keyData="entradas" keyName="dia" /* color="#513487" */ />
          </div>
          <div className="dashboard__c__left__et">
            <div className="dashboard__c__left__et__tres">
              <h3 className="dashboard__c__left__et__tres__title">
                Desempenho
              </h3>
              <ChartPie data={dataDesempenho} dataKey="Acertos" outerRadius={90} innerRadius={65} />
            </div>
            <div className="dashboard__c__left__et__quatro">
              <h3 className="dashboard__c__left__et__quatro__title">
                Questões universidade
              </h3>
              <ChartPie data={dataQuestoes} dataKey="Acertos" outerRadius={90} innerRadius={65} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
