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

            if (isset($_GET['inicio'])) {
                $parametros[':inicio'] = (int) $_GET['inicio'];
            }
            if (isset($_GET['fim'])) {
                $parametros[':fim'] = (int) $_GET['fim'];
            }
            if (isset($_GET['cliente'])) {
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
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
}
