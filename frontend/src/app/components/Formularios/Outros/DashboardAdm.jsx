import React, { Fragment } from "react";
import reactDOM from "react-dom";
import { Button, } from "../../Form";
import Cookie from "../../../../img/project/cookie.png";

export default function DashboardAdm() {
    return (
        <section className="dashboardAdm">
            <div className="dashboardAdm__title">
                <h1>Métricas</h1>
            </div>
            <div className="dasboardAdm__left">

                <div className="dasboardAdm__left__totalSimulados">

                </div>
                <div className="dasboardAdm__left__entradas">

                </div>
                <div className="dasboardAdm__left__entradaTotal">

                </div>
                <div className="dasboardAdm__left__taxaAcerto">

                </div>
            </div>
            <div className="dasboardAdm__right">

                <div className="dasboardAdm__right__profile">

                </div>
                <div className="dasboardAdm__right__bugs">

                </div>
                <div className="dasboardAdm__right__perma">

                </div>

            </div>
        </section>
    );
}