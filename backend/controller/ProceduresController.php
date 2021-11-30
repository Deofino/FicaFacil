<?php

namespace Controller;

use Helper\Response;
use Model\ProceduresModel;

class ProceduresController
{

    public function sp_getAcertos() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $parametros = [];

            $parametros[':cliente'] = null;
            $parametros[':inicio'] = null;
            $parametros[':fim'] = null;


            if (isset($_GET['cliente'])) {
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
            if (isset($_GET['inicio'])) {
                $parametros[':inicio'] = (int) $_GET['inicio'];
            }
            if (isset($_GET['fim'])) {
                $parametros[':fim'] = (int) $_GET['fim'];
            }
            echo $model->getTodosAcertos($parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getErros() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $parametros = [];

            $parametros[':cliente'] = null;
            $parametros[':inicio'] = null;
            $parametros[':fim'] = null;

            if (isset($_GET['cliente'])) {
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
            if (isset($_GET['inicio'])) {
                $parametros[':inicio'] = (int) $_GET['inicio'];
            }
            if (isset($_GET['fim'])) {
                $parametros[':fim'] = (int) $_GET['fim'];
            }
            echo $model->getTodosErros($parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getQuantidadesQuestoesPorCliente() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $parametros = [];

            $parametros[':cliente'] = null;
            $parametros[':inicio'] = null;
            $parametros[':fim'] = null;

            if (isset($_GET['cliente'])) {
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
            if (isset($_GET['inicio'])) {
                $parametros[':inicio'] = (int) $_GET['inicio'];
            }
            if (isset($_GET['fim'])) {
                $parametros[':fim'] = (int) $_GET['fim'];
            }
            echo $model->getQuantidadeQuestoesPorCliente($parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getSimuladosRefazer() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $parametros = [];

            $parametros[':inicio'] = null;
            $parametros[':fim'] = null;
            $parametros[':cliente'] = null;

            if (isset($_GET['inicio'])) {
                $parametros[':inicio'] = $_GET['inicio'];
            }
            if (isset($_GET['fim'])) {
                $parametros[':fim'] = $_GET['fim'];
            }
            if (isset($_GET['cliente'])) {
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
            // dd($parametros);
            echo $model->getSimuladosRefazer($parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getSimuladosPorCliente() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $parametros = [];

            $parametros[':inicio'] = null;
            $parametros[':fim'] = null;

            $parametros[':inicio'] = null;
            $parametros[':fim'] = null;

            if (isset($_GET['inicio'])) {
                $parametros[':inicio'] = (int) $_GET['inicio'];
            }
            if (isset($_GET['fim'])) {
                $parametros[':fim'] = (int) $_GET['fim'];
            }
            echo $model->getSimuladosPorCliente($parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getAcertosPorMateria() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $parametros = [];

            $parametros[':cliente'] = null;
            $parametros[':materia'] = null;
            $parametros[':inicio'] = null;
            $parametros[':fim'] = null;

            if (isset($_GET['cliente'])) {
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
            if (isset($_GET['materia'])) {
                $parametros[':materia'] = (int) $_GET['materia'];
            }
            if (isset($_GET['inicio'])) {
                $parametros[':inicio'] = (int) $_GET['inicio'];
            }
            if (isset($_GET['fim'])) {
                $parametros[':fim'] = (int) $_GET['fim'];
            }
            echo $model->getAcertosPorMateria($parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getErrosPorMateria() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $parametros = [];

            $parametros[':cliente'] = null;
            $parametros[':materia'] = null;
            $parametros[':inicio'] = null;
            $parametros[':fim'] = null;

            if (isset($_GET['cliente'])) {
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
            if (isset($_GET['materia'])) {
                $parametros[':materia'] = (int) $_GET['materia'];
            }
            if (isset($_GET['inicio'])) {
                $parametros[':inicio'] = (int) $_GET['inicio'];
            }
            if (isset($_GET['fim'])) {
                $parametros[':fim'] = (int) $_GET['fim'];
            }
            echo $model->getErrosPorMateria($parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getQtdePorMateria() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $parametros = [];

            $parametros[':cliente'] = null;
            $parametros[':materia'] = null;
            $parametros[':inicio'] = null;
            $parametros[':fim'] = null;

            if (isset($_GET['cliente'])) {
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
            if (isset($_GET['materia'])) {
                $parametros[':materia'] = (int) $_GET['materia'];
            }
            if (isset($_GET['inicio'])) {
                $parametros[':inicio'] = (int) $_GET['inicio'];
            }
            if (isset($_GET['fim'])) {
                $parametros[':fim'] = (int) $_GET['fim'];
            }
            echo $model->getQtdePorMateria($parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getMateriaEvoluir() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $parametros = [];

            $parametros[':cliente'] = null;

            if (isset($_GET['cliente'])) {
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
            echo $model->getMateriaEvoluir($parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getQtdePorMateriaAgrupada() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $parametros = [];

            $parametros[':cliente'] = null;

            if (isset($_GET['cliente'])) {
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
            echo $model->getQtdePorMateriaAgrupada($parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getSimuladosRealizados() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $parametros = [];

            $parametros[':cliente'] = null;

            if (isset($_GET['cliente'])) {
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
            echo $model->getSimuladosRealizados($parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getAcertosUltimoSimulado() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $parametros = [];

            $parametros[':cliente'] = null;

            if (isset($_GET['cliente'])) {
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
            echo $model->getAcertosUltimoSimulado($parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getTodasQuestao() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();

            echo $model->getTodasQuestao();
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getTotalClientes() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();

            echo $model->getTotalClientes();
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getTotalQuestoesCadastradas() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();

            echo $model->getTotalQuestoesCadastradas();
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getTotalSimuladosFeitos() // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();

            echo $model->getTotalSimuladosFeitos();
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
}
