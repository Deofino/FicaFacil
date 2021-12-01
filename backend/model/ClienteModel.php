<?php

namespace Model;

use Exception;
use Model\UserModel;
use PDO;
use Helper\Response;
use Helper\Connection;

class ClienteModel extends UserModel
{

    private string $dataAniversario;
    private string $foto;
    private int $simuladosFeitos;
    private int $simuladosRefeitos;
    private int $acertos;
    private int $erros;
    private int $videosAssistidos;
    private int $comentariosFeitos;

    public function setEmail(string $email, bool $verificar = true): void
    {
        if ($verificar) {
            if (
                isset($email) && trim($email) !== '' && strlen(trim($email)) !== 0 && trim($email) !== null
            ) {
                $data =  json_decode($this->get());

                if ($data->status_code === 200) {
                    foreach ($data->data as $el) {
                        if ($el->emailCliente == $email) {
                            throw new \Exception("Esse email ja esta cadastrado como um usuario.", 400);
                        };
                    }
                    $this->email = $email;
                    return;
                } else {
                    throw new \Exception("User codigo não 200", 400);
                    return;
                };
            }
            throw new \Exception("Esse email não pode ser aceito", 400);
            return;
        } else {
            $this->email = $email;
        }
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getDataAniversario(): string
    {
        return $this->dataAniversario;
    }
    public function getFoto(): string
    {
        return $this->foto;
    }
    public function getSimuladosFeitos(): int
    {
        return $this->simuladosFeitos;
    }
    public function getSimuladosRefeitos(): int
    {
        return $this->simuladosRefeitos;
    }
    public function getAcertos(): int
    {
        return $this->acertos;
    }
    public function getErros(): int
    {
        return $this->erros;
    }
    public function getVideosAssistidos(): int
    {
        return $this->videosAssistidos;
    }
    public function getComentariosFeitos(): int
    {
        return $this->comentariosFeitos;
    }
    public function setDataAniversario(string $dataAniversarioCliente): void
    {
        $this->dataAniversario = $dataAniversarioCliente;
    }
    public function setFoto(string $fotoCliente): void
    {
        $this->foto = $fotoCliente;
    }
    public function setSimuladosFeitos(string $simuladosFeitosCliente): void
    {
        $this->simuladosFeitos = $simuladosFeitosCliente;
    }
    public function setSimuladosRefeitos(string $simuladosRefeitosCliente): void
    {
        $this->simuladosRefeitos = $simuladosRefeitosCliente;
    }
    public function setAcertos(string $acertosCliente): void
    {
        $this->acertos = $acertosCliente;
    }
    public function setErros(string $errosCliente): void
    {
        $this->erros = $errosCliente;
    }
    public function setVideosAssistidos(string $videosAssistidosCliente): void
    {
        $this->videosAssistidos = $videosAssistidosCliente;
    }
    public function setComentariosFeitos(string $comentariosFeitosCliente): void
    {
        $this->comentariosFeitos = $comentariosFeitosCliente;
    }


    public function get($params = null)
    {
        try {
            $con = Connection::getConn();
            if ($params === null) {
                $stmt = $con->prepare("SELECT * FROM tb_cliente");
            } else if (isset($params['email'])) {
                $stmt = $con->prepare("SELECT * FROM tb_cliente where emailCliente like ?");
                $stmt->bindValue(1, trim($params['email']));
            } else if (isset($params['id'])) {
                $stmt = $con->prepare("SELECT * FROM tb_cliente WHERE idCliente = ?");
                $stmt->bindValue(1, $params['id'], PDO::PARAM_INT);
            }
            if ($stmt->execute()) {
                return $stmt->rowCount() == 0 ?
                    Response::warning("Nenhuma cliente encontrada...", 404) :
                    Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
            }
            return Response::error("Erro ao selecionar cliente");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function getIds()
    {
        try {
            $con = Connection::getConn();

            $stmt = $con->prepare("SELECT idCliente as id FROM tb_cliente");

            if ($stmt->execute()) {
                return $stmt->rowCount() == 0 ?
                    Response::warning("Nenhuma cliente encontrada...", 404) :
                    Response::success($stmt->fetchAll(\PDO::FETCH_ASSOC));
            }
            return Response::error("Erro ao selecionar cliente");
        } catch (\Throwable $th) {
            return Response::error("Error: $th");
        }
    }
    public function post()
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_cliente(nomeCompletoCliente, emailCliente, senhaCliente, fotoCliente) values(?, ?, ?,?)");
            $stmt->bindValue(1, trim($this->getNome()), PDO::PARAM_STR);
            $stmt->bindValue(2, trim($this->getEmail()), PDO::PARAM_STR);
            $stmt->bindValue(3, trim($this->getSenha()), PDO::PARAM_STR);
            $stmt->bindValue(4, trim($this->getFoto()), PDO::PARAM_STR);
            if ($stmt->execute()) {
                return Response::success("Cliente `{$this->getNome()}` inserido com sucesso, id=" . $con->lastInsertId());
            }
            return Response::error("Erro ao inserir Cliente");
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }

    public function put($id)
    {
        try {

            $con = Connection::getConn();
            $stmt = $con->prepare('UPDATE tb_cliente set nomeCompletoCliente = ? , emailCliente = ? , senhaCliente = ? , dataAniversarioCliente = ? , fotoCliente = ? WHERE idCliente LIKE ?');
            $stmt->bindParam(1, $this->getNome(), PDO::PARAM_STR);
            $stmt->bindParam(2, $this->getEmail(), PDO::PARAM_STR);
            $stmt->bindParam(3, $this->getSenha(), PDO::PARAM_STR);
            $stmt->bindParam(4, $this->getDataAniversario(), PDO::PARAM_STR);
            $stmt->bindParam(5, $this->getFoto(), PDO::PARAM_STR);
            $stmt->bindParam(6, $id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                return  Response::success('Dados alterados com sucesso');
            }
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }
    public function delete($params)
    {
        if (isset($params['email'])) {
            $con = Connection::getConn();
            $stmt = $con->prepare('DELETE FROM tb_cliente WHERE emailCliente LIKE ?');
            $stmt->bindParam(1, $params['email'], PDO::PARAM_STR);
            if ($stmt->execute()) {
                return  Response::success('Cliente deletado com sucesso');
            }
        }
        if (isset($params['id'])) {
            $con = Connection::getConn();
            $stmt = $con->prepare('DELETE FROM tb_cliente WHERE idCliente LIKE ?');
            $stmt->bindParam(1, $params['id'], PDO::PARAM_STR);
            if ($stmt->execute()) {
                return  Response::success('Cliente deletado com sucesso');
            }
        }
    }

    public function login($email, $senha)
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("SELECT idCliente, nomeCompletoCliente, emailCliente, senhaCliente, fotoCliente FROM tb_cliente WHERE emailCliente = ?");
            $stmt->bindValue(1, $email);
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $user = $stmt->fetch(\PDO::FETCH_ASSOC);
                    if ((password_verify($senha, $user['senhaCliente']))) {
                        return Response::success([
                            "cliente" => json_encode([
                                'id' => $user['idCliente'],
                                'nome' => $user['nomeCompletoCliente'],
                                'email' => $user['emailCliente'],
                                'foto' => $user['fotoCliente'],
                            ])
                        ]);
                    }
                    return Response::error("E-mail ou senha incorretos.", 404);
                } else {
                    return Response::error("E-mail ou senha incorretos.", 404);
                }
            }
            return Response::error("Erro Login Cliente");
        } catch (\Throwable $th) {
            return Response::error("Error: " . $th->getMessage());
        }
    }

    public function getTodosAcertos(
        $dentro = ':cliente, :inicio, :fim, :materia',
        $parametros = [
            ':cliente' => null,
            ':inicio' => null,
            ':fim' => null,
            ':materia' => null,
        ]
    ) {
        try {
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
}
