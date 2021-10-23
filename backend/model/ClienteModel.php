<?php

namespace Model;

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

    public function setEmail(string $email): void
    {
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
    public function setFotoDataAniversario(string $fotoCliente): void
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
            } else {
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
    public function post()
    {
        try {
            $con = Connection::getConn();
            $stmt = $con->prepare("INSERT INTO tb_cliente(nomeCompletoCliente, emailCliente, senhaCliente) values(?, ?, ?)");
            $stmt->bindValue(1, trim($this->getNome()), PDO::PARAM_STR);
            $stmt->bindValue(2, trim($this->getEmail()), PDO::PARAM_STR);
            $stmt->bindValue(3, trim($this->getSenha()), PDO::PARAM_STR);
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
    }
    public function delete($id)
    {
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
                                'idCliente' => $user['idCliente'],
                                'nomeCliente' => $user['nomeCompletoCliente'],
                                'emailCliente' => $user['emailCliente'],
                                'senhaCliente' => $user['senhaCliente'],
                                'fotoCliente' => $user['fotoCliente'],
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
}
