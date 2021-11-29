<?php

namespace Model;

use PDO;
use Helper\Response;
use Helper\Connection;

class ProceduresModel
{

    public function getTodosAcertos(
        array $parametros = [
            ':cliente' => null,
            ':inicio' => null,
            ':fim' => null,
        ]
    ) {
        try {
            $dentro = ':cliente, :inicio, :fim';
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getAcertos($dentro)");
            if ($stmt->execute($parametros)) {
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getTodosErros(
        array $parametros = [
            ':cliente' => null,
            ':inicio' => null,
            ':fim' => null,
        ]
    ) {
        try {
            $dentro = ':cliente, :inicio, :fim';
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getErros($dentro)");
            if ($stmt->execute($parametros)) {
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getQuantidadeQuestoesPorCliente(
        array $parametros = [
            ':cliente' => null,
            ':inicio' => null,
            ':fim' => null,
        ]
    ) {
        try {
            $dentro = ':cliente, :inicio, :fim';
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getQuantidadeQuestoesPorCliente($dentro)");
            if ($stmt->execute($parametros)) {
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getSimuladosRefazer(
        array $parametros = [
            ':inicio' => null,
            ':fim' => null,
            ':cliente' => null,
        ]
    ) {
        try {
            $dentro = ':inicio, :fim, :cliente';
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getSimuladosRefazer($dentro)");
            if ($stmt->execute($parametros)) {
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getSimuladosPorCliente(
        array $parametros = [
            ':inicio' => null,
            ':fim' => null,
        ]
    ) {
        try {
            $dentro = ':inicio, :fim';
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getSimuladosPorCliente($dentro)");
            if ($stmt->execute($parametros)) {
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getAcertosPorMateria(
        array $parametros = [
            ':cliente' => null,
            ':materia' => null,
            ':inicio' => null,
            ':fim' => null,
        ]
    ) {
        try {
            $dentro = ':cliente, :materia, :inicio, :fim';
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getAcertosPorMateria($dentro)");
            if ($stmt->execute($parametros)) {
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getErrosPorMateria(
        array $parametros = [
            ':cliente' => null,
            ':materia' => null,
            ':inicio' => null,
            ':fim' => null,
        ]
    ) {
        try {
            $dentro = ':cliente, :materia, :inicio, :fim';
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getErrosPorMateria($dentro)");
            if ($stmt->execute($parametros)) {
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getQtdePorMateria(
        array $parametros = [
            ':cliente' => null,
            ':materia' => null,
            ':inicio' => null,
            ':fim' => null,
        ]
    ) {
        try {
            $dentro = ':cliente, :materia, :inicio, :fim';
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getQtdePorMateria($dentro)");
            if ($stmt->execute($parametros)) {
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getMateriaEvoluir(
        array $parametros = [
            ':cliente' => null,
        ]
    ) {
        try {
            $dentro = ':cliente';
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getMateriaEvoluir($dentro)");
            if ($stmt->execute($parametros)) {
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getQtdePorMateriaAgrupada(
        array $parametros = [
            ':cliente' => null,
        ]
    ) {
        try {
            $dentro = ':cliente';
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getQtdePorMateriaAgrupada($dentro)");
            if ($stmt->execute($parametros)) {
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getSimuladosRealizados(
        array $parametros = [
            ':cliente' => null,
        ]
    ) {
        try {
            $dentro = ':cliente';
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getSimuladosRealizados($dentro)");
            if ($stmt->execute($parametros)) {
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }

    public function getAcertosUltimoSimulado(
        array $parametros = [
            ':cliente' => null,
        ]
    ) {
        try {
            $dentro = ':cliente';
            $con = Connection::getConn();
            $stmt = $con->prepare("call sp_getAcertosUltimoSimulado($dentro)");
            if ($stmt->execute($parametros)) {
                return Response::success($stmt->fetchAll(PDO::FETCH_ASSOC));
                die;
            }
        } catch (\Throwable $th) {
            throw new \Exception($th->getMessage(), 500);
        }
    }
}
