import React, { useEffect, useState } from "react";
import { ChartPie, ChartArea, /* ChartBar  */} from "../../Main/Charts";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { parseJwt } from "../../Header/NavBarUser";
import { Select,} from "../../Form/";
import { ToastError, } from "../../Alert/Toast";

export default function DashboardAdm() {
  
  const [cliente, setCliente] = useState(
    parseJwt(localStorage.getItem("user")).id || null
  );
  const [materia, setMateria] = useState(null);
  const [inicio, setInicio] = useState(null);
  const [fim, setFim] = useState(null);

  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  
  const [simuladosPCliente, setSimuladosPCliente] = useState(0);

  const [acertosPMateria, setAcertosPMateria] = useState(0);
  const [nomePorMateria, setNomePorMateria] = useState("Portugues");
  const [errosPMateria, setErrosPMateria] = useState(0);
  const [selectedMateria ,setSelectedMateria] = useState(1);

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


  const [reqMateria, setReqMateria] = useState([]); 

  useEffect(() => {
     axios
    .get(`${process.env.REACT_APP_API}/materia/index/`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("auth") || localStorage.getItem("user")
        }`,
      },
    })
    .then((value) => {
      if(value.data.status_code === 200) {
        setReqMateria(value.data.data.materia);
      }
    })
    .catch((error) => ToastError({ text: error || "Error" }));

    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getAcertos?cliente=${cliente}&inicio=${inicio}&fim=${fim}`
      );
      let res = await req.data.data;
      /* console.log(res); */
      if (+Object.values(res[0])[0] === 404) {
        console.log("Erro na requisição Acertos");
      } else setAcertos(+res[0].acertos);
    })();


    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getErros?cliente=${cliente}&inicio=${inicio}&fim=${fim}`
      );
      let res = await req.data.data;
      /* console.log(res); */
      if (+Object.values(res[0])[0] === 404) {
        console.log("Erro na requisição Erros");
      } else setErros(+res[0].erros);
    })();


   /*   (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getSimuladosPorCliente?inicio=${inicio}&fim=${fim}`
      );
      let res = await req.data.data;

      if (+Object.values(res[0])[0] === 404) {
        console.log("Erro na requisição Simulados");
      } else setSimuladosPCliente(+res[0].qtde);
    })();  */
 

      (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getAcertosPorMateria?cliente=${cliente}&materia=${selectedMateria}&inicio=${inicio}&fim=${fim}`
      );
      let res = await req.data;/* 
       console.log(res.data[0]); */ 
        if(res.data[0].materia === undefined) {
        console.log("Erro na requisição Acertos por Matéria");
      } else setAcertosPMateria(+res.data[0].acertos);  
    })();  
 

    (async function () {
      let req = await axios.get(
        `${process.env.REACT_APP_API}/procedures/sp_getErrosPorMateria?cliente=${cliente}&materia=${selectedMateria}&inicio=${inicio}&fim=${fim}`
      );
      let res = await req.data;
       /* console.log("erros de "+selectedMateria+" = "+res.data[0].erros);  */
        if(res.data[0].materia === undefined) {
        console.log("Erro na requisição Erros por Matéria");
      } else {
        setErrosPMateria(+res.data[0].erros)
        setNomePorMateria(res.data[0].materia)
      };  
    })(); 


  }, [cliente, materia, inicio, fim, selectedMateria]);


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

  useEffect(()=>{
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
  },[erros,acertos,errosPMateria, acertosPMateria])
  
  
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
              Estatísticas Gerais
            </h3>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Simulados realizados
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">
              3
            </p>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Questões realizadas
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">
            {simuladosPCliente}
            </p>
          </div>
          <div className="dashboard__c__right__statistics__datas">
            <h2 className="dashboard__c__right__statistics__datas__title">
              Evoluir matéria
            </h2>
            <p className="dashboard__c__right__statistics__datas__num">
              Filosofia
            </p>
          </div>
        </div>

        <div className="dashboard__c__left">
          <div className="dashboard__c__left__um">
            <h3 className="dashboard__c__left__um__title">Melhores Matérias</h3>
           
            <ChartPie
              data={dataMaterias}
              dataKey="Acertos"
              outerRadius={90}
              innerRadius={65}
            />
          </div>
          <div className="dashboard__c__left__dois">
            <h3 className="dashboard__c__left__dois__title">
              Questões por dia
            </h3>
            <ChartArea
              data={[
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
              ]}
              keyData="entradas"
              keyName="dia" /* color="#513487" */
            />
          </div>
          <div className="dashboard__c__left__et">
            <div className="dashboard__c__left__et__tres">
              <h3 className="dashboard__c__left__et__tres__title">
                Desempenho por matéria
              </h3>
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

            <h3>{nomePorMateria}</h3>
              <ChartPie
                data={acertosMateria}
                dataKey="Acertos"
                outerRadius={90}
                innerRadius={65}
              />
            </div>
            <div className="dashboard__c__left__et__quatro">
              <h3 className="dashboard__c__left__et__quatro__title">
                Desempenho geral
              </h3>
              <ChartPie
                data={acertosTotal}
                dataKey="Acertos"
                outerRadius={90}
                innerRadius={65}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
