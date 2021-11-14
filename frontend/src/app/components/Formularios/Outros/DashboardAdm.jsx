import React from "react";
import { ChartPie } from "../../Main/Charts";
import { FaEdit } from "react-icons/fa";

export default function DashboardAdm() {
  let dataExemplo = [
    {
      name: "Portugues",
      Acertos: 10,
      color: "#a00",
    },
    {
      name: "Matematica",
      Acertos: 7,
      color: "#2b0",
    },
    {
      name: "Geografia",
      Acertos: 2,
      color: "#990",
    },
    {
      name: "Artes",
      Acertos: 10,
      color: "#317",
    },
    {
      name: "Macarrao",
      Acertos: 1,
      color: "#22e",
    },
  ];

  return (
    <section className="dashboard">
      <h1 className="dashboard__title">Métricas</h1>
      <div className="dashboard__c">
        <div className="dashboard__c__left">
          <div className="dashboard__c__left__um">
            <h3 className="dashboard__c__left__um__title">
              Total de Simulados
            </h3>
          </div>
          <div className="dashboard__c__left__dois">
            <h3 className="dashboard__c__left__dois__title">
              Entradas Mensais
            </h3>
          </div>
          <div className="dashboard__c__left__et">
            <div className="dashboard__c__left__et__tres"></div>
            <div className="dashboard__c__left__et__quatro">
              <h3 className="dashboard__c__left__quatro__title">
                Taxa de acertos
              </h3>
              <ChartPie data={dataExemplo} dataKey="Acertos" />
            </div>
          </div>
        </div>
        <div className="dashboard__c__right">
          <div className="dashboard__c__right__profile">
            <div className="dashboard__c__right__profile__p"></div>
            <div className="dashboard__c__right__profile__p__circle"></div>
            <FaEdit className="dashboard__c__right__profile__p__icon" />
            <h3 className="dashboard__c__right__profile__p__title">Vitória</h3>
          </div>
          <div className="dashboard__c__right__statistics">
            <h3 className="dashboard__c__right__statistics__title">
              Estatísticas
            </h3>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Bugs reportados
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">45</p>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Permanência no sistema
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">
              2:45:21
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
