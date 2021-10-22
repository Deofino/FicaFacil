<?php

namespace Model;

class UserModel
{

    private string $nome;
    private string $email;
    private string $senha;

    public function getNome(): string
    {

        return $this->nome;
    }
    public function getEmail(): string
    {
        return $this->email;
    }
    public function getSenha(): string
    {
        return $this->senha;
    }
    public function setNome(string $nome): void
    {
        // faz verificacao nao nulo aqui

        $this->nome = ucfirst($nome);
    }
    public function setEmail(string $email): void
    {
        //poliforma pra cada cxaaso adm e clinete
        $this->email = $email;
    }
    public function setSenha(string $senha): void
    {
        $this->senha = $senha;
    }


    public function get($params)
    {
    }
    public function post()
    {
    }
    public function put($id)
    {
    }
    public function delete($id)
    {
    }
}
