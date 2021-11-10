import React, { } from "react";

export default function DashboardAdm() {
    return (
        <section className="dashboard">
            <h1 className="dashboard__title">Métricas</h1>
            <div className="dashboard__c">
                <div className="dashboard__c__left">
                    <div className="dashboard__c__left__um">
                        <h3 className="dashboard__c__left__um__title">Total de Simulados</h3>
                    </div>
                    <div className="dashboard__c__left__dois">
                        <h3 className="dashboard__c__left__dois__title">Entradas Mensais</h3>
                    </div>
                    <div className="dashboard__c__left__et">
                        <div className="dashboard__c__left__et__tres">

                        </div>
                        <div className="dashboard__c__left__et__quatro">
                            <h3 className="dashboard__c__left__quatro__title">Taxa de acertos</h3>
                        </div>
                    </div>
                </div>
                <div className="dashboard__c__right">

                    <div className="dashboard__c__right__profile">

                    </div>
                    <div className="dashboard__c__right__statics">

                    </div>
                    <div className="dashboard__c__right__statics">

                    </div>
                </div>
            </div>
        </section>
    );
}