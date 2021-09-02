<?php

namespace Model;

class RespostaModel
{

    private int $id;
    private string $textoResposta;
    private bool $certaResposta;
    private array $idQuestao;

    public function getId(): int
    {
        return $this->id;
    }
    public function getTextoResposta(): string
    {
        return $this->textoResposta;
    }
    public function getCertaResposta(): bool
    {
        return $this->certaResposta;
    }
    public function setTextoResposta(string $textoResposta): void
    {
        $this->textoResposta = $textoResposta;
    }
    public function setCertaResposta(bool $certaResposta): void
    {
        $this->certaResposta = $certaResposta;
    }
    public function getIdQuestao(): array
    {
        return $this->idQuestao;
    }
    public function setIdQuestao(array $questao): void
    {
        $this->idQuestao = $questao;
    }

    public function get($params)
    {
    }
    public function post($params)
    {
    }
    public function put($params)
    {
    }
    public function delete($params)
    {
    }
}
