-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 15-Out-2021 às 15:23
-- Versão do servidor: 10.4.19-MariaDB
-- versão do PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bd_fica_facil`
--
CREATE DATABASE IF NOT EXISTS `bd_fica_facil` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bd_fica_facil`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_administrador`
--

CREATE TABLE `tb_administrador` (
  `idAdministrador` int(11) NOT NULL,
  `nomeAdministrador` varchar(10) NOT NULL,
  `emailAdministrador` varchar(100) NOT NULL,
  `senhaAdministrador` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_area_materia`
--

CREATE TABLE `tb_area_materia` (
  `idAreaMateria` int(11) NOT NULL,
  `nomeAreaMateria` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_assunto_materia`
--

CREATE TABLE `tb_assunto_materia` (
  `idAssuntoMateria` int(11) NOT NULL,
  `nomeAssuntoMateria` varchar(100) NOT NULL,
  `idMateria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_cliente`
--

CREATE TABLE `tb_cliente` (
  `idCliente` int(11) NOT NULL,
  `nomeCompletoCliente` varchar(100) NOT NULL,
  `emailCliente` varchar(100) NOT NULL,
  `senhaCliente` varchar(60) NOT NULL,
  `dataAniversarioCliente` date NOT NULL,
  `fotoCliente` varchar(100) NOT NULL,
  `simuladosFeitos` int(11) NOT NULL,
  `simuladosRefeitos` int(11) NOT NULL,
  `acertos` int(11) NOT NULL,
  `erros` int(11) NOT NULL,
  `videosAssistidos` int(11) NOT NULL,
  `comentariosFeitos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_dificuldade`
--

CREATE TABLE `tb_dificuldade` (
  `idDificuldade` int(11) NOT NULL,
  `nivelDificuldade` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_materia`
--

CREATE TABLE `tb_materia` (
  `idMateria` int(11) NOT NULL,
  `nomeMateria` varchar(100) DEFAULT NULL,
  `idAreaMateria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_questao`
--

CREATE TABLE `tb_questao` (
  `idQuestao` int(11) NOT NULL,
  `tituloQuestao` varchar(100) NOT NULL,
  `textoQuestao` varchar(400) NOT NULL,
  `imagensQuestao` varchar(400) NOT NULL,
  `idAdministrador` int(11) DEFAULT NULL,
  `idDificuldade` int(11) DEFAULT NULL,
  `idAssuntoMateria` int(11) DEFAULT NULL,
  `idUniversidade` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_resposta`
--

CREATE TABLE `tb_resposta` (
  `idResposta` int(11) NOT NULL,
  `textoResposta` varchar(200) NOT NULL,
  `certaResposta` tinyint(1) NOT NULL,
  `idQuestao` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_simulado`
--

CREATE TABLE `tb_simulado` (
  `idSimulado` int(11) NOT NULL,
  `DataInicioSimulado` date NOT NULL,
  `DataTerminoSimulado` date NOT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `idQuestao` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_sugestao_video`
--

CREATE TABLE `tb_sugestao_video` (
  `idSugestaoVideo` int(11) NOT NULL,
  `tituloSugestaoVideo` varchar(100) DEFAULT NULL,
  `thumbnailSugestaoVideo` varchar(100) DEFAULT NULL,
  `urlSugestaoVideo` varchar(100) DEFAULT NULL,
  `idQuestao` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_universidade`
--

CREATE TABLE `tb_universidade` (
  `idUniversidade` int(11) NOT NULL,
  `nomeUniversidade` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_administrador`
--
ALTER TABLE `tb_administrador`
  ADD PRIMARY KEY (`idAdministrador`);

--
-- Índices para tabela `tb_area_materia`
--
ALTER TABLE `tb_area_materia`
  ADD PRIMARY KEY (`idAreaMateria`);

--
-- Índices para tabela `tb_assunto_materia`
--
ALTER TABLE `tb_assunto_materia`
  ADD PRIMARY KEY (`idAssuntoMateria`),
  ADD KEY `idMateria` (`idMateria`);

--
-- Índices para tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  ADD PRIMARY KEY (`idCliente`);

--
-- Índices para tabela `tb_dificuldade`
--
ALTER TABLE `tb_dificuldade`
  ADD PRIMARY KEY (`idDificuldade`);

--
-- Índices para tabela `tb_materia`
--
ALTER TABLE `tb_materia`
  ADD PRIMARY KEY (`idMateria`),
  ADD KEY `idAreaMateria` (`idAreaMateria`);

--
-- Índices para tabela `tb_questao`
--
ALTER TABLE `tb_questao`
  ADD PRIMARY KEY (`idQuestao`),
  ADD KEY `idAdministrador` (`idAdministrador`),
  ADD KEY `idDificuldade` (`idDificuldade`),
  ADD KEY `idAssuntoMateria` (`idAssuntoMateria`),
  ADD KEY `idUniversidade` (`idUniversidade`);

--
-- Índices para tabela `tb_resposta`
--
ALTER TABLE `tb_resposta`
  ADD PRIMARY KEY (`idResposta`),
  ADD KEY `idQuestao` (`idQuestao`);

--
-- Índices para tabela `tb_simulado`
--
ALTER TABLE `tb_simulado`
  ADD PRIMARY KEY (`idSimulado`),
  ADD KEY `idCliente` (`idCliente`),
  ADD KEY `idQuestao` (`idQuestao`);

--
-- Índices para tabela `tb_sugestao_video`
--
ALTER TABLE `tb_sugestao_video`
  ADD PRIMARY KEY (`idSugestaoVideo`),
  ADD KEY `idQuestao` (`idQuestao`);

--
-- Índices para tabela `tb_universidade`
--
ALTER TABLE `tb_universidade`
  ADD PRIMARY KEY (`idUniversidade`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_administrador`
--
ALTER TABLE `tb_administrador`
  MODIFY `idAdministrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_area_materia`
--
ALTER TABLE `tb_area_materia`
  MODIFY `idAreaMateria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_assunto_materia`
--
ALTER TABLE `tb_assunto_materia`
  MODIFY `idAssuntoMateria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_dificuldade`
--
ALTER TABLE `tb_dificuldade`
  MODIFY `idDificuldade` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_materia`
--
ALTER TABLE `tb_materia`
  MODIFY `idMateria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_questao`
--
ALTER TABLE `tb_questao`
  MODIFY `idQuestao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_resposta`
--
ALTER TABLE `tb_resposta`
  MODIFY `idResposta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_simulado`
--
ALTER TABLE `tb_simulado`
  MODIFY `idSimulado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_sugestao_video`
--
ALTER TABLE `tb_sugestao_video`
  MODIFY `idSugestaoVideo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_universidade`
--
ALTER TABLE `tb_universidade`
  MODIFY `idUniversidade` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tb_assunto_materia`
--
ALTER TABLE `tb_assunto_materia`
  ADD CONSTRAINT `tb_assunto_materia_ibfk_1` FOREIGN KEY (`idMateria`) REFERENCES `tb_materia` (`idMateria`) ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_materia`
--
ALTER TABLE `tb_materia`
  ADD CONSTRAINT `tb_materia_ibfk_1` FOREIGN KEY (`idAreaMateria`) REFERENCES `tb_area_materia` (`idAreaMateria`) ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_questao`
--
ALTER TABLE `tb_questao`
  ADD CONSTRAINT `tb_questao_ibfk_1` FOREIGN KEY (`idAdministrador`) REFERENCES `tb_administrador` (`idAdministrador`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_questao_ibfk_2` FOREIGN KEY (`idDificuldade`) REFERENCES `tb_dificuldade` (`idDificuldade`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_questao_ibfk_3` FOREIGN KEY (`idAssuntoMateria`) REFERENCES `tb_assunto_materia` (`idAssuntoMateria`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_questao_ibfk_4` FOREIGN KEY (`idUniversidade`) REFERENCES `tb_universidade` (`idUniversidade`) ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_resposta`
--
ALTER TABLE `tb_resposta`
  ADD CONSTRAINT `tb_resposta_ibfk_1` FOREIGN KEY (`idQuestao`) REFERENCES `tb_questao` (`idQuestao`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_simulado`
--
ALTER TABLE `tb_simulado`
  ADD CONSTRAINT `tb_simulado_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `tb_cliente` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_simulado_ibfk_2` FOREIGN KEY (`idQuestao`) REFERENCES `tb_questao` (`idQuestao`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tb_sugestao_video`
--
ALTER TABLE `tb_sugestao_video`
  ADD CONSTRAINT `tb_sugestao_video_ibfk_1` FOREIGN KEY (`idQuestao`) REFERENCES `tb_questao` (`idQuestao`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
