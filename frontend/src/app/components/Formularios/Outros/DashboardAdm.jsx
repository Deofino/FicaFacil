import React from "react";
import { ChartPie, ChartArea, ChartBar } from "../../Main/Charts";
import { FaEdit } from "react-icons/fa";

export default function DashboardAdm() {
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

  return (
    <section className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>
      <div className="dashboard__c">
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
              Clientes cadastrados
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">45</p>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Simulados feitos
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">
              130
            </p>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Questões cadastradas
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">
            333
            </p>
          </div>
        </div>
        <div className="dashboard__c__left">
          <div className="dashboard__c__left__um">
            <h3 className="dashboard__c__left__um__title">
            Taxa de acertos
            </h3>
              <ChartBar data={dataExemplo} dataKey="Acertos" />
          </div>
          <div className="dashboard__c__left__dois">
            <h3 className="dashboard__c__left__dois__title">
              Questões por dia
            </h3>
            <ChartArea data = {[
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
            ]}  keyData="entradas" keyName="dia" /* color="#513487" *//>
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
                Total de Questões
              </h3>
              <ChartPie data={dataQuestoes} dataKey="Acertos" outerRadius={90} innerRadius={65} />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
