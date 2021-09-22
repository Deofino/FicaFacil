-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21-Set-2021 às 20:39
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

--
-- Extraindo dados da tabela `tb_administrador`
--

INSERT INTO `tb_administrador` (`idAdministrador`, `nomeAdministrador`, `emailAdministrador`, `senhaAdministrador`) VALUES
(1, 'adm', 'adm', 'adm'),
(2, 'Roberto', 'admin@gmail.com', 'delfino123'),
(3, 'Kaue', 'kaue@gmail.com', 'kaue123');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_area_materia`
--

CREATE TABLE `tb_area_materia` (
  `idAreaMateria` int(11) NOT NULL,
  `nomeAreaMateria` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_area_materia`
--

INSERT INTO `tb_area_materia` (`idAreaMateria`, `nomeAreaMateria`) VALUES
(1, 'hard'),
(2, 'Humanas'),
(3, 'Exatas'),
(4, 'Marrom'),
(5, 'Dsdasd'),
(6, 'Dsds');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_assunto_materia`
--

CREATE TABLE `tb_assunto_materia` (
  `idAssuntoMateria` int(11) NOT NULL,
  `nomeAssuntoMateria` varchar(100) NOT NULL,
  `idMateria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_assunto_materia`
--

INSERT INTO `tb_assunto_materia` (`idAssuntoMateria`, `nomeAssuntoMateria`, `idMateria`) VALUES
(1, 'Fracao', 1),
(2, 'Dsadads', 1),
(6, 'Geometria', 1),
(7, 'Materdsdia', 2),
(8, 'Materdsdia', 2),
(9, 'Materdsda', 2);

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

--
-- Extraindo dados da tabela `tb_dificuldade`
--

INSERT INTO `tb_dificuldade` (`idDificuldade`, `nivelDificuldade`) VALUES
(4, 'Hard'),
(5, 'Facil');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_materia`
--

CREATE TABLE `tb_materia` (
  `idMateria` int(11) NOT NULL,
  `nomeMateria` varchar(100) DEFAULT NULL,
  `idAreaMateria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_materia`
--

INSERT INTO `tb_materia` (`idMateria`, `nomeMateria`, `idAreaMateria`) VALUES
(1, 'Matematica', 1),
(2, 'Portugues', 2),
(4, 'Ciencia', 1);

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

--
-- Extraindo dados da tabela `tb_questao`
--

INSERT INTO `tb_questao` (`idQuestao`, `tituloQuestao`, `textoQuestao`, `imagensQuestao`, `idAdministrador`, `idDificuldade`, `idAssuntoMateria`, `idUniversidade`) VALUES
(1, 'dsadasd', 'asdasdsadsa', 'dsadsa', 1, 4, 1, 1),
(3, 'Dasdas', 'Dasdasdasdasdsa', 'dasdas', 3, 4, 1, 1),
(4, '1+1', 'Quanto que eh a soma de 1 mais 1?', '1+1', 2, 4, 6, 1),
(5, 'Raiz quadrada de 4', 'Qual eh a raiz quadrada matematicamente de 4', 'Raiz quadrada de 4', 3, 4, 1, 1),
(6, 'Dsadasdsadas', 'Dasdasdsadas', 'dsadasdsadas', 1, 4, 2, 1),
(7, 'Dasdasdasdsa', 'Dsadsadsadsa', 'dasdasdasdsa', 2, 4, 2, 1),
(8, '8*8', 'Qual e a resposta de 8 multiplicado por 8', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/8c18c1822dbbccc4cc5f5afb6d6e8662.png\"]', 3, 4, 1, 1);

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

--
-- Extraindo dados da tabela `tb_resposta`
--

INSERT INTO `tb_resposta` (`idResposta`, `textoResposta`, `certaResposta`, `idQuestao`) VALUES
(1, '10', 0, 1),
(2, '2', 1, 1),
(3, '2', 0, 4),
(4, 'A', 0, 1),
(5, 'S', 0, 1),
(6, 'V', 0, 1),
(7, 'B', 0, 1),
(8, 'Q', 0, 1),
(9, 'Alguma coisa', 0, 3),
(10, 'Nao sei', 0, 3),
(11, 'Talvez sim', 1, 3),
(12, 'Aaaaa', 0, 3),
(13, 'Krl', 0, 3),
(14, '3', 0, 5),
(15, '4', 0, 5),
(16, '5', 0, 5),
(17, '2', 1, 5),
(18, '9', 0, 5),
(19, 'Http://localhost/FicaFacil/backend/images/respostas81d823832c7eb9e1e5b50dc3de40e738.jpg', 0, 5),
(20, 'Http://localhost/FicaFacil/backend/images/respostas9ea609b5438c4ed4784ed9d48a39d974.png', 0, 5),
(21, 'Http://localhost/FicaFacil/backend/images/respostase6678b6736a2577f96984dd61978d08a.png', 0, 5),
(22, 'Http://localhost/FicaFacil/backend/images/respostasea6b77eb3ed6fa879dfddc4a496f0eae.png', 0, 5),
(23, 'Http://localhost/FicaFacil/backend/images/respostas6e559850418aa7cb541fe752624998a4.png', 1, 5),
(24, 'Http://localhost/FicaFacil/backend/images/respostas/08d9c08813b0e6e6f8e743f8fe471171.png', 0, 4),
(25, 'Http://localhost/FicaFacil/backend/images/respostas/d080d35acd9fb6a7b5239ea2b4f03d81.png', 0, 4),
(26, 'Http://localhost/FicaFacil/backend/images/respostas/66d8c621656f1b471e326dd99dc30915.png', 1, 4),
(27, 'Http://localhost/FicaFacil/backend/images/respostas/cc4a64c9dbd5e5c961f7f304de34e426.jpeg', 0, 4),
(28, 'Http://localhost/FicaFacil/backend/images/respostas/dbe9b879a04df63a8deb11d83e04b473.jpeg', 0, 4),
(29, 'Http://localhost/FicaFacil/backend/images/respostas/42ce052653db6f5e42fd044893e6c019.jpg', 0, 5),
(30, 'Http://localhost/FicaFacil/backend/images/respostas/ba352684eb0273dcbb58ae6ffa556884.png', 0, 5),
(31, 'Http://localhost/FicaFacil/backend/images/respostas/487c4eca948313978764e763c1bf4a21.png', 0, 5),
(32, 'Http://localhost/FicaFacil/backend/images/respostas/2e27ef06273f53046a02622c49b102eb.png', 1, 5),
(33, 'Http://localhost/FicaFacil/backend/images/respostas/36c5f6330c1c5d054ea619f165ca783b.png', 0, 5),
(34, 'Eh igual a 8', 0, 4),
(35, 'Eh igual a 9', 0, 4),
(36, 'Eh igual a 7', 0, 4),
(37, 'Eh igual a 3', 0, 4),
(38, 'Eh igual a 2', 1, 4),
(39, 'Sasasa', 0, 4);

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
  `tituloSujestaoVideo` varchar(100) NOT NULL,
  `thumbnailSujestaoVideo` varchar(100) NOT NULL,
  `urlSujestaoVideo` varchar(100) NOT NULL,
  `idQuestao` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_sugestao_video`
--

INSERT INTO `tb_sugestao_video` (`idSugestaoVideo`, `tituloSujestaoVideo`, `thumbnailSujestaoVideo`, `urlSujestaoVideo`, `idQuestao`) VALUES
(1, 'Https://www.youtube.com/watch?v=YrfiPisnhhY', 'Https://www.youtube.com/watch?v=YrfiPisnhhY', 'Https://www.youtube.com/watch?v=YrfiPisnhhY', 1),
(2, 'Como fazer a cor marrom', 'Cvkujhgklhjglk', 'Dasdasdasdsadas', 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_universidade`
--

CREATE TABLE `tb_universidade` (
  `idUniversidade` int(11) NOT NULL,
  `nomeUniversidade` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_universidade`
--

INSERT INTO `tb_universidade` (`idUniversidade`, `nomeUniversidade`) VALUES
(1, 'ENEM'),
(2, 'IFSP'),
(4, 'FATEC'),
(5, 'UFRJ'),
(8, 'MARROM'),
(9, 'MIAR'),
(10, 'Asasas'),
(11, 'MAMA'),
(12, 'Ddsds'),
(13, 'MARCO');

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
  MODIFY `idAdministrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tb_area_materia`
--
ALTER TABLE `tb_area_materia`
  MODIFY `idAreaMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `tb_assunto_materia`
--
ALTER TABLE `tb_assunto_materia`
  MODIFY `idAssuntoMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_dificuldade`
--
ALTER TABLE `tb_dificuldade`
  MODIFY `idDificuldade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `tb_materia`
--
ALTER TABLE `tb_materia`
  MODIFY `idMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `tb_questao`
--
ALTER TABLE `tb_questao`
  MODIFY `idQuestao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `tb_resposta`
--
ALTER TABLE `tb_resposta`
  MODIFY `idResposta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de tabela `tb_simulado`
--
ALTER TABLE `tb_simulado`
  MODIFY `idSimulado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_sugestao_video`
--
ALTER TABLE `tb_sugestao_video`
  MODIFY `idSugestaoVideo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_universidade`
--
ALTER TABLE `tb_universidade`
  MODIFY `idUniversidade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
