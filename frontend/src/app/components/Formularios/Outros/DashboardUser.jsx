import React from "react";
import { ChartPie, ChartArea, ChartBar } from "../../Main/Charts";
import { FaEdit } from "react-icons/fa";

export default function DashboardAdm() {
  let dataMaterias = [
    {
      name: "Física",
      Acertos: 10,
      color: "#00aced",
    },
    {
      name: "Matemática",
      Acertos: 90,
      color: "#6610f2",
    },
    {
      name: "Biologia",
      Acertos: 5,
      color: "#6f42c1",
    },
    {
        name: "Artes",
        Acertos: 2,
        color: "#513487",
      },
      {
        name: "Filosofia",
        Acertos: 20,
        color: "#007bff",
      },
    
  ];
  let dataAcertos = [
    {
      name: "Acertos",
      Acertos: 45,
      color: "#4746B0",
    }
  ];
  let dataMateria = [
    {
      name: "Matemática",
      Acertos: 90,
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
              Simulados realizados
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">45</p>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Tempo médio por simulado
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">
              2:45:21
            </p>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Qual matéria evoluir
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">Filosofia</p>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Máx.Acertos por simulado
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">45</p>
          </div>
        </div>


        <div className="dashboard__c__left">
          <div className="dashboard__c__left__um">
            <h3 className="dashboard__c__left__um__title">
                Melhores Matérias
            </h3>
              <ChartPie data={dataMaterias} dataKey="Acertos" outerRadius={90} innerRadius={65}/>
          </div>
          <div className="dashboard__c__left__dois">
            <h3 className="dashboard__c__left__dois__title">
              Questões por dia
            </h3>
            <ChartArea data = {[
                {
                  dia: "Seg",
                  entradas: 5,
                },
                {
                  dia: "Ter",
                  entradas: 2,
                },
                {
                  dia: "Qua",
                  entradas: 2,
                },
                {
                  dia: "Qui",
                  entradas: 8,
                },
                {
                  dia: "Sex",
                  entradas: 3,
                },
                {
                  dia: "Sab",
                  entradas: 2,
                },
                {
                  dia: "Dom",
                  entradas: 5,
                },
            ]}  keyData="entradas" keyName="dia" /* color="#513487" *//>
          </div>
          <div className="dashboard__c__left__et">
            <div className="dashboard__c__left__et__tres">
            <h3 className="dashboard__c__left__et__tres__title">
                Último simulado
              </h3>
            <ChartPie data={dataAcertos} dataKey="Acertos" outerRadius={90} innerRadius={65} />
            </div>
            <div className="dashboard__c__left__et__quatro">
              <h3 className="dashboard__c__left__et__quatro__title">
                Total de Simulados
              </h3>
              <ChartPie data={dataMateria} dataKey="Acertos" outerRadius={90} innerRadius={65} />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
