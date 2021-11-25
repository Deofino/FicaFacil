<?php

namespace Controller;

use Helper\Response;
use Model\ProceduresModel;

class ProceduresController
{

    public function sp_getAcertos($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $dentro = '';
            $parametros = [];
            
            if (isset($_GET['cliente'])) {
                $dentro .= ':cliente,';
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
              if (isset($_GET['inicio'])) {
                $dentro .= ':inicio,';
                $parametros[':inicio'] = (int) $_GET['inicio'];
            }
              if (isset($_GET['fim'])) {
                $dentro .= ':fim,';
                $parametros[':fim'] = (int) $_GET['fim'];
            }
            $dentro =  substr($dentro, 0, strlen($dentro)-1);
            echo $model->getTodosAcertos($dentro,$parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getErros($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $dentro = '';
            $parametros = [];
            
            if (isset($_GET['cliente'])) {
                $dentro .= ':cliente,';
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
              if (isset($_GET['inicio'])) {
                $dentro .= ':inicio,';
                $parametros[':inicio'] = (int) $_GET['inicio'];
            }
              if (isset($_GET['fim'])) {
                $dentro .= ':fim,';
                $parametros[':fim'] = (int) $_GET['fim'];
            }
            $dentro =  substr($dentro, 0, strlen($dentro)-1);
            echo $model->getTodosAcertos($dentro,$parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getQuantidadesQuestoesPorCliente($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $dentro = '';
            $parametros = [];
            
            if (isset($_GET['cliente'])) {
                $dentro .= ':cliente,';
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
              if (isset($_GET['inicio'])) {
                $dentro .= ':inicio,';
                $parametros[':inicio'] = (int) $_GET['inicio'];
            }
              if (isset($_GET['fim'])) {
                $dentro .= ':fim,';
                $parametros[':fim'] = (int) $_GET['fim'];
            }
            if (isset($_GET['materia'])) {
                $dentro .= ':materia,';
                $parametros[':materia'] = (int) $_GET['materia'];
            }
            $dentro =  substr($dentro, 0, strlen($dentro)-1);
            echo $model->getTodosAcertos($dentro,$parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getSimuladosRefazer($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $dentro = '';
            $parametros = [];
            
            if (isset($_GET['cliente'])) {
                $dentro .= ':cliente,';
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
              if (isset($_GET['inicio'])) {
                $dentro .= ':inicio,';
                $parametros[':inicio'] = (int) $_GET['inicio'];
            }
              if (isset($_GET['fim'])) {
                $dentro .= ':fim,';
                $parametros[':fim'] = (int) $_GET['fim'];
            }
            $dentro =  substr($dentro, 0, strlen($dentro)-1);
            echo $model->getTodosAcertos($dentro,$parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }

    public function sp_getSimuladosPorCliente($params) // parametros daqui sao da URL
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') { // Verifica o método
            $model = new ProceduresModel();
            $dentro = '';
            $parametros = [];
            
            if (isset($_GET['cliente'])) {
                $dentro .= ':cliente,';
                $parametros[':cliente'] = (int) $_GET['cliente'];
            }
              if (isset($_GET['inicio'])) {
                $dentro .= ':inicio,';
                $parametros[':inicio'] = (int) $_GET['inicio'];
            }
            $dentro =  substr($dentro, 0, strlen($dentro)-1);
            echo $model->getTodosAcertos($dentro,$parametros);
            return;
        }
        echo Response::warning('Metodo não encontrado', 404);
    }
}