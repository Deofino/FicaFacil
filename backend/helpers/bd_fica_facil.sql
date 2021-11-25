-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26-Nov-2021 às 00:02
-- Versão do servidor: 10.4.18-MariaDB
-- versão do PHP: 8.0.3

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

DELIMITER $$
--
-- Procedimentos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getAcertos` (IN `cliente` INT(7), IN `tempo1` DATETIME, IN `tempo2` DATETIME)  BEGIN
	IF (SELECT 1 FROM tb_cliente where tb_cliente.idCliente = cliente) THEN
    	IF(tempo1 <> "0000-00-00 00:00:00" and tempo2 <> "0000-00-00 00:00:00")THEN
            SELECT 
            count(idSimulado) as acertos
            from tb_simulado
            where acertouQuestao = 1
            and idCliente = cliente 
            and tb_simulado.DataInicioSimulado BETWEEN tempo1 and tempo2;
        ELSE
        	SELECT 
            count(idSimulado) as acertos
            from tb_simulado
            where acertouQuestao = 1
            and idCliente = cliente;
    	END IF;
    ELSE
    	SELECT "404";
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getAcertosPorMateria` (IN `cliente` INT, IN `materia` INT, IN `inicio` DATETIME, IN `fim` DATETIME)  BEGIN
	set @nulo = '0000-00-00 00:00:00';
    IF(select 1 from tb_materia where idMateria = materia)
    THEN	
        IF(select 1 from tb_cliente where idCliente = cliente)
        THEN
			IF (inicio <> @nulo and fim <> @nulo)
            THEN
            	select 
                nomeMateria as materia,
count(tb_simulado.idSimulado) as acertos
                from tb_simulado
                INNER join tb_questao on tb_questao.idQuestao = tb_simulado.idQuestao
                INNER JOIN tb_assunto_materia on tb_assunto_materia.idAssuntoMateria = tb_questao.idAssuntoMateria
                inner join tb_materia on tb_materia.idMateria = tb_assunto_materia.idMateria
                where tb_materia.idMateria = materia and idCliente = cliente
                and tb_simulado.acertouQuestao = 1
                and tb_simulado.DataInicioSimulado BETWEEN inicio and fim;
            ELSE
            	select 
                nomeMateria as materia,
                count(tb_simulado.idSimulado) as acertos
                from tb_simulado
                INNER join tb_questao on tb_questao.idQuestao = tb_simulado.idQuestao
                INNER JOIN tb_assunto_materia on tb_assunto_materia.idAssuntoMateria = tb_questao.idAssuntoMateria
                inner join tb_materia on tb_materia.idMateria = tb_assunto_materia.idMateria
                where tb_materia.idMateria = materia and idCliente = cliente and tb_simulado.acertouQuestao = 1;
            END IF;
        ELSE
            select 
                nomeMateria as materia,
                count(tb_simulado.idSimulado) as acertos
                from tb_simulado
                INNER join tb_questao on tb_questao.idQuestao = tb_simulado.idQuestao
                INNER JOIN tb_assunto_materia on tb_assunto_materia.idAssuntoMateria = tb_questao.idAssuntoMateria
                inner join tb_materia on tb_materia.idMateria = tb_assunto_materia.idMateria
                where tb_materia.idMateria = materia and tb_simulado.acertouQuestao = 1;
        END IF;
        
        ELSE SELECT "404";
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getErros` (IN `cliente` INT, IN `tempo1` DATETIME, IN `tempo2` DATETIME)  BEGIN
	IF (SELECT 1 FROM tb_cliente where tb_cliente.idCliente = cliente) THEN
    	IF(tempo1 <> "0000-00-00 00:00:00" and tempo2 <> "0000-00-00 00:00:00")THEN
            SELECT 
            count(idSimulado) as erros
            from tb_simulado
            where acertouQuestao = 0
            and idCliente = cliente 
            and tb_simulado.DataInicioSimulado BETWEEN tempo1 and tempo2;
        ELSE
        	SELECT 
            count(idSimulado) as erros
            from tb_simulado
            where acertouQuestao = 0
            and idCliente = cliente;
    	END IF;
    ELSE
    	SELECT "404";
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getErrosPorMateria` (IN `cliente` INT, IN `materia` INT, IN `inicio` DATETIME, IN `fim` DATETIME)  BEGIN
	set @nulo = '0000-00-00 00:00:00';
    IF(select 1 from tb_materia where idMateria = materia)
    THEN	
        IF(select 1 from tb_cliente where idCliente = cliente)
        THEN
			IF (inicio <> @nulo and fim <> @nulo)
            THEN
            	select 
                nomeMateria as materia,
count(tb_simulado.idSimulado) as erros
                from tb_simulado
                INNER join tb_questao on tb_questao.idQuestao = tb_simulado.idQuestao
                INNER JOIN tb_assunto_materia on tb_assunto_materia.idAssuntoMateria = tb_questao.idAssuntoMateria
                inner join tb_materia on tb_materia.idMateria = tb_assunto_materia.idMateria
                where tb_materia.idMateria = materia and idCliente = cliente
                and tb_simulado.acertouQuestao = 0
                and tb_simulado.DataInicioSimulado BETWEEN inicio and fim;
            ELSE
            	select 
                nomeMateria as materia,
                count(tb_simulado.idSimulado) as erros
                from tb_simulado
                INNER join tb_questao on tb_questao.idQuestao = tb_simulado.idQuestao
                INNER JOIN tb_assunto_materia on tb_assunto_materia.idAssuntoMateria = tb_questao.idAssuntoMateria
                inner join tb_materia on tb_materia.idMateria = tb_assunto_materia.idMateria
                where tb_materia.idMateria = materia and idCliente = cliente and tb_simulado.acertouQuestao = 0;
            END IF;
        ELSE
            select 
                nomeMateria as materia,
                count(tb_simulado.idSimulado) as erros
                from tb_simulado
                INNER join tb_questao on tb_questao.idQuestao = tb_simulado.idQuestao
                INNER JOIN tb_assunto_materia on tb_assunto_materia.idAssuntoMateria = tb_questao.idAssuntoMateria
                inner join tb_materia on tb_materia.idMateria = tb_assunto_materia.idMateria
                where tb_materia.idMateria = materia and tb_simulado.acertouQuestao = 0;
        END IF;
        
        ELSE SELECT "404";
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getQtdePorMateria` (IN `cliente` INT, IN `materia` INT, IN `inicio` DATETIME, IN `fim` DATETIME)  BEGIN
	set @nulo = '0000-00-00 00:00:00';
    IF(select 1 from tb_materia where idMateria = materia)
    THEN	
        IF(select 1 from tb_cliente where idCliente = cliente)
        THEN
			IF (inicio <> @nulo and fim <> @nulo)
            THEN
            	select 
                nomeMateria as materia,
                count(tb_simulado.idSimulado) as total
                from tb_simulado
                INNER join tb_questao on tb_questao.idQuestao = tb_simulado.idQuestao
                INNER JOIN tb_assunto_materia on tb_assunto_materia.idAssuntoMateria = tb_questao.idAssuntoMateria
                inner join tb_materia on tb_materia.idMateria = tb_assunto_materia.idMateria
                where tb_materia.idMateria = materia and idCliente = cliente
                and tb_simulado.DataInicioSimulado BETWEEN inicio and fim;
            ELSE
            	select 
                nomeMateria as materia,
                count(tb_simulado.idSimulado) as total
                from tb_simulado
                INNER join tb_questao on tb_questao.idQuestao = tb_simulado.idQuestao
                INNER JOIN tb_assunto_materia on tb_assunto_materia.idAssuntoMateria = tb_questao.idAssuntoMateria
                inner join tb_materia on tb_materia.idMateria = tb_assunto_materia.idMateria
                where tb_materia.idMateria = materia and idCliente = cliente;
            END IF;
        ELSE
            select 
                nomeMateria as materia,
                count(tb_simulado.idSimulado) as total
                from tb_simulado
                INNER join tb_questao on tb_questao.idQuestao = tb_simulado.idQuestao
                INNER JOIN tb_assunto_materia on tb_assunto_materia.idAssuntoMateria = tb_questao.idAssuntoMateria
                inner join tb_materia on tb_materia.idMateria = tb_assunto_materia.idMateria
                where tb_materia.idMateria = materia;
        END IF;
        
        ELSE SELECT "404";
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getQuantidadeQuestoesPorCliente` (IN `cliente` INT, IN `tempo1` DATETIME, IN `tempo2` DATETIME)  BEGIN
	IF EXISTS(SELECT 1 FROM tb_cliente where tb_cliente.idCliente = cliente) THEN
        IF (tempo1 <> '0000-00-00 00:00:00' and tempo2 <> '0000-00-00 00:00:00')
        THEN
        	IF EXISTS(select 1 from tb_materia where tb_materia.idMateria = materia)THEN
             SELECT count(tb_simulado.idSimulado) as qtde, idCliente FROM tb_simulado WHERE tb_simulado.idCliente = idCliente and tb_simulado.DataInicioSimulado BETWEEN tempo1 and tempo2;
             END IF;
        ELSE
        	SELECT count(tb_simulado.idSimulado) as qtde, idCliente FROM tb_simulado WHERE tb_simulado.idCliente = cliente;
        END IF;
    ELSE
    	SELECT '404';
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getSimuladosPorCliente` (IN `tempo1` DATETIME, IN `tempo2` DATETIME)  BEGIN
IF tempo1 != '0000-00-00 00:00:00' THEN
	select COUNT(idSimulado) as qtde, tb_cliente.nomeCompletoCliente as cliente from tb_simulado inner join tb_cliente on tb_cliente.idCliente = tb_simulado.idCliente 
    WHERE tb_simulado.DataInicioSimulado BETWEEN tempo1 and tempo2
    GROUP BY tb_simulado.idCliente; 
ELSE
	select COUNT(idSimulado) as qtde, tb_cliente.nomeCompletoCliente as cliente from tb_simulado inner join tb_cliente on tb_cliente.idCliente = tb_simulado.idCliente GROUP BY tb_simulado.idCliente; 
end IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getSimuladosRefazer` (IN `tempo1` DATETIME, IN `tempo2` DATETIME, IN `cliente` INT)  BEGIN
	IF (select 1 from tb_cliente where tb_cliente.idCliente = cliente) THEN
        IF (tempo1 <> '0000-00-00 00:00:00' and tempo2 <> '0000-00-00 00:00:00')THEN
        SELECT idSimulado,DataInicioSimulado as comeco,DataTerminoSimulado as fim,acertouQuestao as certa,idCliente, idQuestao from tb_simulado WHERE idCliente = cliente AND
                    DataInicioSimulado BETWEEN tempo1 and tempo2;
        END if;
    ELSE SELECT "404";
    END IF;
END$$

DELIMITER ;

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
(1, 'Gabriely', 'gaby@gmail.com', '$2y$10$Tz.5jxNebPu8yjLYAeWI/eoi9.8zSo.E8nhmSuY3cAf5KmhjPU/Am'),
(2, 'Camylly', 'camy@gmail.com', '$2y$10$liIiqLs5lLCBl0J.1P2Yp./rxdlUnEVa/Cb8qrEErLsyKLUihlTIS'),
(3, 'Vitória', 'vitoria@gmail.com', '$2y$10$1PsrqBA2DeLDjQqfwZidle2bxDq.UMF464UJXDpnHDsWT02JkMEhG'),
(4, 'Delfino', 'delfino@gmail.com', '$2y$10$nEKpRaDC8dXVoMa6QZU/9uE4JmOUDaEvluYqkOmpv7J3tWyFD1MWu'),
(5, 'Paulo', 'paulo@gmail.com', '$2y$10$IPMDFncI.2ydnaOhLh/xH.Uw.g2cAfLlSU.0qOEOiOPznEfUIcV..'),
(6, 'Kaue', 'kaue@gmail.com', '$2y$10$jiwOV4OTP609ttOFLgq8u.ggEsvlSjLF8Lw4.IVrbOoVf10GP8v5i'),
(7, 'Delfino', 'guilhermedelfino25@gmail.com', '$2y$10$RJbOKDpDMi6qMjPRmDB0J.TDauJ9kb4NjfmgTc6pcHVugbwoSez/y'),
(8, 'Delfino', 'guilherme@gmail.com', '$2y$10$pU6WUx0ZuS3gnHlqhxphWeAzateURuHrv/ubIniJ68KZJqpcz5K1K'),
(9, 'Ruy', 'ruybarbao@gmail.com', '$2y$10$dUg5LbYN7GeE/AzZ4iS0re2TWiu7mFRAwDemPLM8.oGBaEGebC/cq');

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
(1, 'Exatas'),
(2, 'Humanas'),
(3, 'Biológicas');

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
(1, 'Classes Gramaticais', 1),
(2, 'Pontuação', 1),
(3, 'Funções Sintáticas', 1),
(4, 'Geometria Plana', 4),
(5, 'Razão e Proporção', 4),
(6, 'Porcentagem', 4),
(7, 'Estática', 5),
(8, 'Cinemática', 5),
(9, 'Dinâmica de Newton', 5),
(10, 'Reações Químicas', 6),
(11, 'Tabela Periódica', 6),
(12, 'Funções Inorgânicas', 6),
(13, 'Citologia', 7),
(14, 'Bioquímica Celular', 7),
(15, 'Divisão Celular', 7),
(16, 'Zoologia Comparada', 8),
(17, 'Anelídeos', 8),
(18, 'Vertebrados aos Invertebrados', 8),
(19, 'Ecologia', 9),
(20, 'Grandezas Escalares e Vetoriais', 9),
(21, 'Relação entre as Ciências', 9),
(22, 'Guerra Fria', 2),
(23, 'Brasil Colônia', 2),
(24, 'Brasil Reinado', 2),
(25, 'Filosofia Grega', 3),
(26, 'Filosofia Moderna', 3),
(27, 'Filosofia Contemporânea', 3),
(28, 'Romantismo no Brasil', 1),
(29, 'Realismo e Naturalismo', 1),
(30, 'Modernismo', 1),
(31, 'Teoria Sociológica', 12),
(32, 'Cultura', 12),
(33, 'As Relações Sociais no Capitalismo', 12),
(34, 'Urbanização', 13),
(35, 'Demografia', 13),
(36, 'Climatologia', 13),
(37, 'Conjuções', 14),
(38, 'Advérbios', 14),
(39, 'Acentuación', 14),
(40, 'Pronouns', 15),
(41, 'Verbos e Estruturas', 15),
(42, 'Adjectives', 15),
(43, 'Bioquimica Celular', 6),
(44, 'Potenciação de números naturais e inteiros', 4),
(45, 'MMC e MDC', 4),
(46, 'Probabilidade', 4),
(47, 'Geometria Espacial', 4),
(48, 'História da Arte', 16),
(49, 'Arte Conceitual', 16),
(50, 'Arte Rupestre', 16),
(51, 'Geografia Humana', 17),
(52, 'Geografia Física do Brasil e do Mundo', 17),
(53, 'Teorias Demográficas', 13),
(54, 'Ética', 3),
(55, 'Origem da Vida e do Universo', 7),
(56, 'Histologia Humana e Animal', 7),
(57, 'Embriologia', 7),
(58, 'Fisiologia Humana', 7),
(59, 'Microbiologia', 7),
(60, 'Fungos', 7),
(61, 'Calorimetria', 5),
(62, 'Eletricidade e Eletromagnetismo', 5),
(63, 'Gravitação Universal de Newton', 5),
(64, 'Gases', 6),
(65, 'Sistemas Materiais', 6),
(66, 'Atomística', 6),
(67, 'Soluções', 6),
(68, 'Propriedades Coligativas', 6),
(69, 'Termoquímica', 6),
(70, 'Peixes e Anfíbios', 8),
(71, 'Mamíferos', 8),
(72, 'Artrópodes e Equinodermas', 8);

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
  `videosAssistidos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_cliente`
--

INSERT INTO `tb_cliente` (`idCliente`, `nomeCompletoCliente`, `emailCliente`, `senhaCliente`, `dataAniversarioCliente`, `fotoCliente`, `simuladosFeitos`, `simuladosRefeitos`, `acertos`, `erros`, `videosAssistidos`) VALUES
(2, 'Kauê Loviz de Oliveira', 'klovizoliveira@gmail.com', '$2y$10$DzgLZVVrZF75XAMmRfLO4.Sn.cmvqvsb41DpUjzVkWBIQnUWQ8dYO', '0000-00-00', '', 0, 0, 0, 0, 0),
(4, 'Guilherme Delfino', 'guilhermedelfino25@gmail.com', '$2y$10$5e3YXjQfHH5oDneSpHhEkOTvNaoXC2jkuDAOE6A3a37eD422qHWlO', '0000-00-00', '', 0, 0, 0, 0, 0);

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
(1, 'Fácil'),
(2, 'Média'),
(3, 'Difícil');

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
(1, 'Português', 2),
(2, 'História', 2),
(3, 'Filosofia', 2),
(4, 'Matemática', 1),
(5, 'Física', 1),
(6, 'Química', 1),
(7, 'Biologia', 3),
(8, 'Zoologia', 3),
(9, 'Ciências da Natureza', 3),
(12, 'Sociologia', 2),
(13, 'Geografia', 2),
(14, 'Espanhol', 2),
(15, 'Inglês', 2),
(16, 'Artes', 2),
(17, 'Ciências Humanas', 2);

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
(5, 'Percebe-se que a classe gramatical das palavras se altera em função da ordem que elas assumem na exp', 'Durante uma Copa do Mundo, foi veiculada, em programa esportivo de uma emissora de TV, a notícia de que um apostador inglês acertou o resultado de uma partida, porque seguiu os prognósticos de seu burro de estimação. Um dos comentaristas fez, então, a seguinte observação:\r\n\"Já vi muito comentarista burro, mas burro comentarista é a primeira vez.\"', '[]', 6, 3, 1, 11),
(6, 'Assinale a alternativa que preencha corretamente as lacunas da frase ao lado:', '\"............................ da terra natal, ....................... para as antigas sensações .......................  estavam adormecidas.\"', '[]', 6, 3, 1, 10),
(7, 'Nessa questão da prova de Matemática, as alternativas correspondem a um numeral. Qual é o tipo desse', 'Numa escola com 1 200 alunos foi realizada uma pesquisa sobre o conhecimento desses em duas línguas estrangeiras, inglês e espanhol.\r\nNessa pesquisa constatou-se que 600 alunos falam inglês, 500 falam espanhol e 300 não falam qualquer um desses idiomas.\r\nEscolhendo-se um aluno dessa escola ao acaso e sabendo-se que ele não fala inglês, qual a probabilidade de que esse aluno fale espanhol?\r\n1/4\r\n5/', '[]', 6, 1, 1, 3),
(8, 'Responda o que se pede:', 'O plural dos nomes compostos está correto em todas as alternativas, exceto:', '[]', 6, 2, 1, 31),
(15, 'Na frase extraída do Capítulo 1 de Esaú e Jacó, de Machado de Assis, A noite é clara e quente; podia', 'A pontuação pode ser substituída, muitas vezes, por conectivos, para estabelecer variados tipos de relações sintático-semânticas.', '[]', 6, 3, 2, 33),
(17, 'Classifique a oração subordinada nesta passagem de Carlos Drummond de Andrade:', '\"Meu pai dizia que os amigos são para as ocasiões\".', '[]', 6, 2, 2, 34),
(19, 'Leia o excerto e classifique sintaticamente a oração destacada:', '\"Sem dúvida as árvores se despojaram e enegreceram, o açude estancou, as porteiras dos currais se abriram, inúteis.\"', '[]', 6, 2, 2, 15),
(20, 'O sedutor médio', 'Vamos juntar\r\nNossas rendas e\r\nexpectativas de vida\r\nquerida,\r\no que me dizes?\r\nTer 2, 3 filhos\r\ne ser meio felizes?', '[]', 6, 2, 1, 3),
(21, 'Responda o que se pede:', 'Assinale a alternativa em que o período proposto está corretamente pontuado:', '[]', 6, 2, 2, 27),
(22, 'Identifique a opção em que está corretamente indicada a ordem dos sinais de pontuação que devem subs', 'Quando se trata de trabalho científico* duas coisas devem ser consideradas* uma é a contribuição teórica que o trabalho oferece* a outra é o valor prático que possa ter.', '[]', 6, 1, 2, 32),
(23, 'Nas frases acima o que aparece seis vezes; em três delas é pronome relativo. Quais?', 'Conheci que (1) Madalena era boa em demasia... A culpa foi desta vida agreste que (2) me deu uma alma agreste. Procuro recordar o que (3) dizíamos. Terá realmente piado a coruja? Será a mesma que (4) piava há dois anos? Esqueço que (5) eles me deixaram e que (6) esta casa está quase deserta.', '[]', 6, 3, 3, 20),
(24, 'Levando em consideração o uso e a colocação pronominal, de acordo norma padrão da Língua Portuguesa,', 'Considere o seguinte texto e as lacunas:\r\n\r\n__________ muito a respeito da profissão correta a escolher. Para __________, é preciso paciência e informações. O jovem deve pautar sua escolha nas disciplinas que __________.', '[]', 6, 1, 3, 36),
(25, 'Responda o que se pede:', 'Assinale a alternativa que apresenta erro de colocação pronominal:', '[]', 6, 2, 3, 37),
(26, 'A sequência correta de letras, de cima para baixo, é:', 'Assinale com V a colocação verdadeira e com F a colocação falsa dos pronomes oblíquos átonos, nos períodos abaixo:\r\n\r\n( ) Sempre soube que negariam-me o pedido.\r\n( ) Vou-me embora pra Pasárgada.\r\n( ) Ninguém retirara-se antes do encerramento do conclave.\r\n( ) Tudo me parecia bem até que me alertaram do perigo que corria.\r\n( ) Em se tratando de artes, preferimos sempre a divina música.\r\n( ) Dir-se-', '[]', 6, 2, 3, 38),
(27, 'Responda o que se pede:', 'A única frase que NÃO apresenta desvio em relação à regência (nominal e verbal) recomendada pela norma culta é:', '[]', 6, 3, 3, 27),
(28, 'Essa divisão europeia ficou conhecida como:', 'Do ponto de vista geopolítico, a Guerra Fria dividiu a Europa em dois blocos. Essa divisão propiciou a formação de alianças antagônicas de caráter militar, como a OTAN, que aglutinava os países do bloco ocidental, e o Pacto de Varsóvia, que concentrava os do bloco oriental. É importante destacar que, na formação da OTAN, estão presentes, além dos países do oeste europeu, os EUA e o Canadá. Essa di', '[]', 6, 3, 22, 3),
(29, 'Responda o que se pede:', 'O Pacto de Varsóvia, criado em 1955 e extinto em 1991, teve como principal objetivo:', '[]', 6, 3, 22, 39),
(30, 'Esse plano:', '\"É lógico que os EUA devem fazer o que lhes for possível para ajudar a promover o retorno ao poder econômico normal no mundo, sem o que não pode haver estabilidade política nem garantia de paz.\"', '[]', 6, 2, 22, 40),
(31, 'Dessa forma, foi consagrado um estilo conhecido por:', 'O Estado soviético, formado após a Revolução Russa, cuidou de expurgar da cultura deste país toda e qualquer manifestação artística que estivesse, no entendimento das autoridades, associada ao chamado “espírito burguês”. Foi criada, então, uma política cultural que decretava como arte oficial as expressões que servissem de estímulo para a ideologia do proletariado.', '[]', 6, 2, 22, 41),
(32, 'Responda o que se pede:', 'Usa-se o nome Guerra Fria para designar:', '[]', 6, 1, 22, 41),
(33, 'Entre as características dessa época, é INCORRETO elencar:', 'O período compreendido entre 1500 e 1530 é denominado, pela historiografia tradicional, de \"período pré-colonial\".', '[]', 6, 2, 23, 42),
(34, 'Dentre as afirmativas anteriores estão corretas apenas:', 'O período da nossa história conhecido como Pré-colonizador pode ser caracterizado pelos seguintes pontos:\r\n\r\nI. A descoberta de metais preciosos, particularmente, prata e diamantes na região amazônica.\r\nII. A montagem de estabelecimentos provisórios, conhecidos como feitorias, onde eram feitas trocas comerciais entre os navegantes portugueses e os povos indígenas do Brasil.\r\nIII. A criação das cid', '[]', 6, 1, 23, 43),
(35, 'No processo de ocupação portuguesa do atual território do Brasil, as primeiras três décadas que se s', 'Nas primeiras três décadas que se seguiram à passagem da armada de Cabral, além das precárias guarnições das feitorias [...], apenas alguns náufragos l...) e \'lançados\' atestavam a soberania do rei de Portugal no litoral americano do Atlântico Sul.', '[]', 6, 1, 23, 19),
(36, 'Na percepção de muitos colonizadores portugueses do Brasil, uma das armas mais importantes utilizada', '\"Descoberto o Novo Mundo e instaurado o processo de colonização, começou a se desenrolar o embate entre o Bem e o Mal.\"', '[]', 6, 2, 23, 41),
(37, 'O viajante francês Jean de Léry (1534-1611) reproduz um diálogo travado, em 1557, com um ancião tupi', 'Em geral, os nossos tupinambás ficaram admirados ao ver os franceses e os outros dos países longínquos terem tanto trabalho para buscar o seu arabutã, isto é, pau-brasil. Houve uma vez um ancião da tribo que me fez esta pergunta: \"Por que vindes vós outros, mairs e péros (franceses e portugueses), buscar lenha de tão longe para vos aquecer? Não tendes madeira em vossa terra?\"', '[]', 6, 2, 23, 3),
(38, 'Responda o que se pede:', 'Sobre a independência do Brasil, é INCORRETO afirmar que:', '[]', 6, 3, 23, 44),
(40, 'Responda o que se pede:', 'As principais alterações introduzidas pelo Ato Adicional de 1834 à Constituição do Império foram:', '[]', 6, 2, 24, 45),
(41, 'Responda o que se pede:', 'O Golpe da Maioridade, datado de julho de 1840 e que elevou D. Pedro II a imperador do Brasil, foi justificado como sendo', '[]', 6, 1, 24, 46),
(42, 'Responda o que se pede:', 'Sobre o parlamentarismo praticado durante quase todo o Segundo Reinado e a atuação dos partidos Liberal e Conservador, podemos afirmar que:', '[]', 6, 2, 24, 9),
(43, 'Responda o que se pede:', 'A Lei Eusébio de Queirós visava, a partir de 1850:', '[]', 6, 1, 24, 47),
(44, 'A respeito da política externa dessa época, assinale a única alternativa INCORRETA:', 'O Segundo Reinado (1840-1889) marcou o auge da forma de governo monárquica no Brasil.', '[]', 6, 3, 24, 28),
(45, 'Os fragmentos do pensamento pré-socrático expõem uma oposição que se insere no campo das:', 'TEXTO I\r\nFragmento B91: Não se pode banhar duas vezes no\r\nmesmo rio, nem substância mortal alcançar duas vezes\r\na mesma condição; mas pela intensidade e rapidez da\r\nmudança, dispersa e de novo reúne.\r\n\r\nTEXTO II\r\nFragmento B8: São muitos os sinais de que o ser\r\né ingênito e indestrutível, pois é compacto, inabalável\r\ne sem fim; não foi nem será, pois é agora um todo\r\nhomogêneo, uno, contínuo. Como', '[]', 6, 3, 25, 3),
(46, 'O texto faz referência à relação entre razão e sensação, um aspecto essencial da Doutrina das Ideias', 'Para Platão, o que havia de verdadeiro em Parmênides era que o objeto de conhecimento é um objeto de razão e não de sensação, e era preciso estabelecer uma relação entre objeto racional e objeto sensível ou material que privilegiasse o primeiro em detrimento do segundo. Lenta, mas irresistivelmente, a Doutrina das Ideias formava-se em sua mente.', '[]', 6, 2, 25, 3),
(47, 'Responda o que se pede:', 'Em relação à definição de Bem apresentada por Aristóteles, no Livro I da Ética a Nicômaco, considere as seguintes alternativas:\r\n\r\nI. O Bem é algo que está em todas as coisas, sendo identificada nos objetos, mas não entre os homens.\r\nII. O Bem é aquilo a que todas as coisas tendem, ou seja, o bem é definido em função de um fim.\r\nIII. O Bem é o meio para termos uma ciência eficiente e útil, tal com', '[]', 6, 3, 25, 28),
(48, 'O trabalho braçal é considerado, na filosofia aristotélica, como:', 'A utilidade do escravo é semelhante à do animal. Ambos prestam serviços corporais para atender às necessidades da vida. A natureza faz o corpo do escravo e do homem livre de forma diferente. O escravo tem corpo forte, adaptado naturalmente ao trabalho servil. Já o homem livre tem corpo ereto, inadequado ao trabalho braçal, porém apto à vida do cidadão.', '[]', 6, 2, 25, 3),
(49, 'Ao reconhecer na felicidade a reunião dos mais excelentes atributos, Aristóteles a identifica como:', 'A felicidade é, portanto, a melhor, a mais nobre e a mais aprazível coisa do mundo, e esses atributos não devem estar separados como na inscrição existente em Delfos “das coisas, a mais nobre é a mais justa, e a melhor é a saúde; porém a mais doce é ter o que amamos”. Todos estes atributos estão presentes nas mais excelentes atividades, e entre essas a melhor, nós a identificamos como felicidade.', '[]', 6, 2, 25, 3),
(50, 'No século XVI, Maquiavel escreveu O Príncipe, reflexão sobre a monarquia e a função do governante. A', 'O príncipe, portanto, não deve se incomodar com a reputação de cruel, se seu propósito é manter o povo unido e leal. De fato, com uns poucos exemplos duros poderá ser mais clemente do que outros que, por muita piedade, permitem os distúrbios que levem ao assassínio e ao roubo.', '[]', 6, 1, 26, 3),
(51, 'Responda o que se pede:', 'Com base no texto e nos conhecimentos sobre o pensamento de Maquiavel acerca da relação entre poder e moral, é correto afirmar:', '[]', 6, 2, 26, 48),
(52, 'A partir da análise histórica do comportamento humano em suas relações sociais e políticas, Maquiave', 'Nasce daqui uma questão: se vale mais ser amado que temido ou temido que amado. Responde-se que ambas as coisas seriam de desejar; mas porque é difícil juntá-las, é muito mais seguro ser temido que amado, quando haja de faltar uma das duas. Porque dos homens se pode dizer, duma maneira geral, que são ingratos, volúveis, simuladores, covardes e ávidos de lucro, e enquanto lhes fazes bem são inteira', '[]', 6, 1, 26, 3),
(53, 'Com base no texto e nos conhecimentos sobre Maquiavel, é correto afirmar:', '“A escolha dos ministros por parte de um príncipe não é coisa de pouca importância: os ministros serão bons ou maus, de acordo com a prudência que o príncipe demonstrar. A primeira impressão que se tem de um governante e da sua inteligência, é dada pelos homens que o cercam. Quando estes são eficientes e fiéis, pode-se sempre considerar o príncipe sábio, pois foi capaz de reconhecer a capacidade e', '[]', 6, 2, 26, 48),
(54, 'A justiça e a conformidade ao contrato consistem em algo com que a maioria dos homens parece concord', 'De acordo com Locke, até a mais precária coletividade depende de uma noção de justiça, pois tal noção:', '[]', 6, 3, 26, 3),
(55, 'Qual dos conceitos abaixo não é essencial para a compreensão do materialismo histórico?', 'O pensamento de Marx pode ser considerado como uma crítica aos sistemas de pensamento tanto de autores anteriores quanto contemporâneos, embora incorpore diversos conceitos utilizados por eles.', '[]', 6, 3, 27, 49),
(56, 'Sobre o conceito de dialética em Hegel, é CORRETO afirmar que se trata da:', 'O conceito de Dialética tomou parte nas preocupações filosóficas de pensadores, como Hegel, Engels e Marx.', '[]', 6, 2, 27, 50),
(57, 'Esta frase de Jean Paul Sartre sintetiza o movimento filosófico, que marcou a Europa no pós-Segunda ', '\"O homem é condenado a ser livre\".', '[]', 6, 1, 27, 50),
(58, 'Responda o que se pede:', 'Assinale a alternativa que NÃO corresponde aos fundamentos da ciência contemporânea:', '[]', 6, 3, 27, 51),
(59, 'O texto indica que existe uma significativa produção científica sobre os impactos socioculturais da ', 'Um volume imenso de pesquisas tem sido produzido para tentar avaliar os efeitos dos programas de televisão. A maioria desses estudos diz respeito às crianças — o que é bastante compreensível pela quantidade de tempo que elas passam em frente ao aparelho e pelas possíveis implicações desse comportamento para a socialização. Dois dos tópicos mais pesquisados são o impacto da televisão no âmbito do c', '[]', 6, 2, 27, 3),
(63, 'Leia o fragmento do poema “Antífona” de Cruz e Souza:', 'Ó Formas alvas, brancas, Formas claras De luares, de neves, de neblinas!... Ó Formas vagas, fluidas, cristalinas... Incensos dos turíbulos das aras...  Formas do Amor, constelarmente puras, De Virgens e de Santas vaporosas... Brilhos errantes, mádicas frescuras E dolências de lírios e de rosas...  Indefiníveis músicas supremas, Harmonias da Cor e do Perfume... Horas do Ocaso, trêmulas, extremas, R', '[]', 9, 2, 28, 41),
(64, 'Leia o fragmento do poema “Antífona” de Cruz e Souza.', 'Ó Formas alvas, brancas, Formas claras\r\nDe luares, de neves, de neblinas!...\r\nÓ Formas vagas, fluidas, cristalinas...\r\nIncensos dos turíbulos das aras...\r\n\r\nFormas do Amor, constelarmente puras,\r\nDe Virgens e de Santas vaporosas...\r\nBrilhos errantes, mádicas frescuras\r\nE dolências de lírios e de rosas...\r\n\r\nIndefiníveis músicas supremas,\r\nHarmonias da Cor e do Perfume...\r\nHoras do Ocaso, trêmulas,', '[]', 9, 3, 28, 41),
(65, 'Cárcere das almas', 'Ah! Toda a alma num cárcere anda presa,\r\nSoluçando nas trevas, entre as grades\r\nDo calabouço olhando imensidades,\r\nMares, estrelas, tardes, natureza.\r\n\r\nTudo se veste de uma igual grandeza\r\nQuando a alma entre grilhões as liberdades\r\nSonha e, sonhando, as imortalidades\r\nRasga no etéreo o Espaço da Pureza.\r\n\r\nÓ almas presas, mudas e fechadas\r\nNas prisões colossais e abandonadas,\r\nDa Dor no calabouç', '[]', 9, 3, 28, 3),
(66, 'Responda o que se pede:', 'Assinale a alternativa que contém apenas características da estética simbolista:', '[]', 9, 2, 28, 66),
(67, 'Responda o que se pede:', 'Assinale a alternativa em que todas as características de estilo são do Simbolismo.', '[]', 9, 1, 28, 70),
(68, 'Cárcere das almas', 'Ah! Toda a alma num cárcere anda presa,\r\nSoluçando nas trevas, entre as grades\r\nDo calabouço olhando imensidades,\r\nMares, estrelas, tardes, natureza.\r\n\r\nTudo se veste de uma igual grandeza\r\nQuando a alma entre grilhões as liberdades\r\nSonha e, sonhando, as imortalidades\r\nRasga no etéreo o Espaço da Pureza.\r\n\r\nÓ almas presas, mudas e fechadas\r\nNas prisões colossais e abandonadas,\r\nDa Dor no calabouç', '[]', 9, 3, 28, 3),
(69, 'Responda o que se pede:', '\"Algum tempo hesitei se devia abrir estas memórias pelo princípio ou pelo fim, isto é, se poria em primeiro lugar o meu nascimento ou a minha morte. Suposto o uso vulgar seja começar pelo nascimento, duas considerações me levaram a adotar diferente método: a primeira é que eu não sou propriamente um autor defunto, mas um defunto autor, para quem a campa foi outro berço; a segunda é que o escrito', '[]', 9, 2, 29, 20),
(70, 'Responda o que se pede:', 'Assinale a alternativa correta sobre a obra de Machado de Assis.', '[]', 9, 2, 29, 8),
(71, 'Responda o que se pede:', 'Considere a obra Dom Casmurro, de Machado de Assis, e as afirmativas que se seguem:\r\nI. D. Glória tentava impedir o casamento de Bentinho com Capitu, pois desejava que ele se unisse a Sancha.\r\nII. Bento Santiago não teve problemas em homenagear o amigo Escobar, por ocasião de seu enterro, pois era seu melhor amigo.\r\nIII. A cena descrita no velório de Escobar (homens e mulheres chorando) é uma cara', '[]', 9, 2, 29, 5),
(72, 'Responda o que se pede:', 'A propósito de Dom Casmurro, de Machado de Assis, é correto afirmar:', '[]', 9, 3, 29, 69),
(73, 'Responda o que se pede:', 'Todas as afirmações sobre Dom Casmurro, de Machado de Assis, estão certas, exceto:', '[]', 9, 1, 29, 71),
(74, 'Responda o que se pede:', 'Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.\r\nNo Romance de 30, no qual se destacaram, entre outros, Jorge Amado e ........ , as obras  apresentam, em geral, ........ e são narradas ........ .', '[]', 9, 3, 30, 8),
(75, 'Responda o que se pede:', 'Na década de 30 do SÉCULO XX:', '[]', 9, 3, 30, 66),
(76, 'Responda o que se pede:', 'A obra Grande Sertão: Veredas, de Guimarães Rosa:', '[]', 9, 1, 30, 69),
(77, 'O fragmento textual que segue, retirado da narrativa A terceira margem do rio, de João Guimarães Ros', 'Sou homem de tristes palavras. De que era que eu tinha tanta, tanta culpa? Se o meu pai, sempre fazendo ausência: e o rio-rio-rio — o rio — pondo perpétuo. Eu sofria já o começo da velhice — esta vida era só o desmoramento. Eu mesmo tinha achaques, ânsias, cá de baixo, cansaços, perrenguice de reumatismo. E ele? Por quê? Devia de padecer demais. De tão idoso, não ia, mais dia menos dia, fraquejar ', '[]', 9, 3, 30, 72),
(78, 'Leia o texto a seguir e responda à questão.', 'Explico ao senhor: o diabo vige dentro do homem, os crespos do homem — ou é o homem arruinado, ou o homem dos avessos. Solto, por si, cidadão, é que não tem diabo nenhum. Nenhum! — é o que digo. O senhor aprova? Me declare tudo, franco — é alta mercê que me faz: e pedir posso, encarecido. Este caso — por estúrdio que me vejam — é de minha certa importância. Tomara não fosse... Mas, não diga que o', '[]', 9, 3, 30, 73),
(79, 'Responda o que se pede:', 'Na produção social que os homens realizam, eles entram em determinadas relações indispensáveis e independentes de sua vontade; tais relações de produção correspondem a um estágio definido de desenvolvimento das suas forças materiais de produção. A totalidade dessas relações constitui a estrutura econômica da sociedade – fundamento real, sobre o qual se erguem as superestruturas política e jurídica', '[]', 9, 3, 31, 3),
(80, 'Responda o que se pede:', 'O objeto de estudo da sociologia, para Durkheim, é o fato social, que deve ser tratado como \"coisa\" e o sociólogo deve afastar suas prenoções e preconceitos. A construção durkheimiana do objeto de estudo da sociologia pode ser considerada', '[]', 9, 2, 31, 74),
(81, 'Responda o que se pede:', 'A lei não nasce da natureza, junto das fontes frequentadas pelos primeiros pastores: a lei nasce das batalhas reais, das vitórias, dos massacres, das conquistas que têm sua data e seus heróis de horror: a lei nasce das cidades incendiadas, das terras devastadas; ela nasce com os famosos inocentes que agonizam no dia que está amanhecendo.\r\n\r\nFOUCAULT. M. Aula de 14 de janeiro de 1976. In. Em defesa', '[]', 9, 2, 31, 3),
(82, 'Considere a citação:', 'O edifício é circular. Os apartamentos dos prisioneiros ocupam a circunferência. Você pode chamá-los, se quiser, de celas. O apartamento do inspetor ocupa o centro; você pode chamá-lo, se quiser de alojamento do inspetor. A moral reformada; a saúde preservada; a indústria revigorada; a instrução difundida; os encargos públicos aliviados; a economia assentada, como deve ser, sobre uma rocha; o nó g', '[]', 9, 3, 31, 3),
(83, 'Responda o que se pede:', 'De acordo com a crítica à “indústria cultural”, na sociedade capitalista avançada, a produção e a reprodução da cultura se realizam sob a égide da padronização e da racionalidade técnica. No contexto dessa crítica, considerando o fast food como produto cultural, é correto afirmar:', '[]', 9, 2, 32, 48),
(84, 'Responda o que se pede:', 'É uma forma de cultura produzida industrialmente, e tem por objetivo a lucratividade das corporações de mídia que nela investem grande capital em máquinas e infraestrutura fabril. Utiliza tecnologia de ponta, destina¬-se a um grande público anônimo e impessoal e é distri¬buída através do mercado e depende de patrocinadores:', '[]', 9, 1, 32, 49),
(85, 'Responda o que se pede:', 'Com relação à chamada cultura de massas ou à mercantilização da cultura, marque a alternativa correta.', '[]', 9, 2, 32, 5),
(86, 'Leia o texto a seguir:', '“Desde o início, a criança desenvolve uma interação não apenas com o próprio corpo e o ambiente físico, mas também com outros seres humanos. A biografia do indivíduo, desde o nascimento, é a história de suas relações com outras pessoas. Além disso, os componentes não sociais das experiências da criança estão entremeados e são modificados por outros componentes, ou seja, pela experiência social.”\r\n', '[]', 9, 1, 32, 75),
(87, 'Responda o que se pede:', 'Assinale a opção que indica o emprego correto do conceito de cultura na perspectiva da antropologia:', '[]', 9, 3, 32, 63),
(88, 'Observe a charge', 'No Brasil, os críticos da abertura indiscriminada às importações alertam para o fato de que ela contribui para aumentar o desemprego e a exclusão social. A insistência em realizar essa abertura relaciona-se à seguinte característica do processo de globalização:', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/9217a0ed420a779fed45c853492d0bc8.png\"]', 9, 2, 33, 55),
(89, 'Responda o que se pede:', '“Em seu livro, Jihad vs. McMorld, Benjamin Barber foi incrivelmente profético ao descrever nosso mundo complicado, em que dois cenários aparentemente contraditórios desenrolam-se simultaneamente: um, onde “cultura é lançada contra cultura, pessoas contra pessoas, tribos contra tribos” e outro, onde “ímpeto e forças econômicas, tecnológicas e ecológicas (...) exigem integração e uniformidade e (...', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/bb9b44f2e6948f10da7a20d5aa208aa6.png\"]', 9, 3, 33, 63),
(90, 'Responda o que se pede:', 'TEXTO 1\r\n\r\nNo ano de 1990, o filósofo Gilles Deleuze criou o conceito de “sociedade do controle” para explicar a configuração totalitária das sociedades atuais. Na sociedade de controle, as pessoas têm a ilusão de desfrutarem de maior autonomia, pois podem, por exemplo, acessar contas correntes pela Internet. Mas, por outro lado, seus comportamentos e hábitos de consumo podem ser conhecidos pelo g', '[]', 9, 2, 33, 68),
(91, 'Responda o que se pede:', 'A definição de desenvolvimento sustentável mais usualmente utilizada é a que procura atender às necessidades atuais sem comprometer a capacidade das gerações futuras. Isso significa optar pelo consumo de bens produzidos com tecnologia e materiais menos ofensivos ao meio ambiente, utilização racional dos bens de consumo, evitando-se o desperdício e o excesso e ainda, após o consumo, cuidar para que', '[]', 9, 3, 33, 38),
(92, 'Responda o que se pede:', 'A questão ambiental, uma das principais pautas contemporâneas, possibilitou o surgimento de concepções políticas diversas, dentre as quais se destaca a preservação ambiental, que sugere uma ideia de intocabilidade da natureza e impede o seu aproveitamento econômico sob qualquer justificativa.\r\nFonte: PORTO GONÇALVES, C.W. A globalização da natureza e a natureza da globalização. .Rio de Janeiro: Ci', '[]', 9, 3, 33, 3),
(93, 'Responda o que se pede:', 'Assinale a alternativa correta em relação ao processo de urbanização.', '[]', 9, 3, 34, 8),
(94, 'Responda o que se pede:', 'Considere o segmento abaixo, a respeito do Plano Diretor de uma cidade.\r\nSegundo a Associação Brasileira de Normas Técnicas (ABNT), o Plano Diretor de uma cidade é instrumento básico de um processo de planejamento municipal para a implantação da política de desenvolvimento urbano. Em uma sociedade desigual como a brasileira, o resultado do planejamento urbano e a sua execução geraram uma série de ', '[]', 9, 2, 34, 8),
(95, 'Observe a figura abaixo.', 'Considere as afirmações sobre os resíduos sólidos coletados no Brasil.\r\nI - O aumento do poder de compra dos brasileiros está fazendo com que a população do país gere cada vez mais lixo inorgânico, o que não é acompanhado pela implantação de programas de coleta seletiva e pelo volume de material reciclado.\r\nII - A reduzida coleta de resíduos urbanos na região Norte é explicada pela maior preocupaç', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/19a63a076de2207b11c15af62b109adb.png\"]', 9, 1, 34, 8),
(96, 'Responda o que se pede:', 'O deslocamento diário de pessoas entre municípios que fazem parte de uma mesma região metropolitana é denominado de:', '[]', 9, 2, 34, 8),
(97, 'Responda o que se pede:', 'O processo de industrialização que se efetivou em São Paulo a partir do início do século XX foi o indutor do processo de metropolização. A partir do final dos anos 1950, a concentração da estrutura produtiva e a centralização do capital em São Paulo foram acompanhadas de uma urbanização contraditória que, ao mesmo tempo, absorvia as modernidades possíveis e expulsava para as periferias imensa quan', '[]', 9, 1, 34, 20),
(98, 'Responda o que se pede:', 'Considere as seguintes afirmações sobre a taxa média geométrica de crescimento anual da população residente no Brasil.\r\nI - As regiões Nordeste, Sudeste e Sul apresentaram um pequeno aumento na taxa de crescimento; as regiões Centro-Oeste e Norte apresentaram um declínio na mesma taxa no período de 1991/2000 a 2001/2005.\r\nII - As regiões Norte e Centro-Oeste apresentaram os valores mais elevados n', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/6c5a3e316cb8423941d06344b4fbf9a5.png\"]', 9, 3, 35, 8),
(99, 'Responda o que se pede:', 'Nos últimos tempos, o Brasil tem sido escolhido como destino de emigrantes africanos de diversos países. Segundo dados da Polícia Federal, viviam, em 2000, no Brasil, 1.054 africanos regularizados de 38 nacionalidades, mas o número saltou, em 12 anos, para 31.866 cidadãos legalizados, provenientes de 48 das 54 nações do continente.\r\nConsidere as afirmações abaixo, sobre esse fluxo migratório cresc', '[]', 9, 3, 35, 8),
(100, 'Responda o que se pede:', 'Assinale a alternativa que preenche as lacunas do enunciado abaixo, na ordem em que aparecem.\r\nA população brasileira, em razão ........ da taxa de ........, deve começar a decrescer a partir de 2040. Essa situação é chamada de ........ . O fenômeno é ........ na cidade que no campo.', '[]', 9, 2, 35, 8),
(101, 'Responda o que se pede:', 'Assinale a alternativa que apresenta somente países de baixa densidade demográfica.', '[]', 9, 2, 35, 8),
(102, 'Responda o que se pede:', 'Observe o gráfico abaixo, sobre as estimativas das populações residentes nos municípios brasileiros, divulgado pelo IBGE, com data de referência de 1º de julho de 2015.\r\n\r\n\r\n\r\n\r\nConsidere as afirmações sobre a distribuição da população nos municípios brasileiros.\r\nI - Mais da metade da população brasileira, 56%, vive em apenas 5,5% dos municípios, que são aqueles com até 100 mil habitantes, indica', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/a5cf02b00be9974297c5ea2d136c21dc.png\"]', 9, 2, 35, 8),
(103, 'Responda o que se pede:', 'Considere o enunciado abaixo e as três propostas para completá-lo.\r\nO fenômeno oceânico-atmosférico La Niña caracteriza-se por um resfriamento anormal nas águas superficiais do oceano Pacífico Equatorial nos setores central e oriental.\r\nEntre os efeitos desse fenômeno, pode-se citar corretamente\r\n1 - a tendência de chuvas abundantes no norte e no leste da Amazônia.\r\n2 - o aumento da precipitação e', '[]', 9, 3, 36, 8),
(104, 'Observe o mapa abaixo.', 'Em relação às áreas sombreadas no mapa, são feitas as seguintes afirmações.\r\nI - Essas áreas apresentam clima temperado continental com alta amplitude térmica diária.\r\nII - Nelas, as alterações antrópicas no meio natural são contínuas, e, por isso, a vegetação (taiga, pradaria, mediterrânea, campos, etc.) raramente é encontrada em sua forma original.\r\nIII - Nelas, ocorre confronto de massas de ar ', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/4292cfb4752fb275d04dba6e88ebf4ce.png\"]', 9, 2, 36, 8),
(105, 'Responda o que se pede:', 'Assinale a alternativa que preenche corretamente as lacunas do enunciado abaixo, na ordem em que aparecem.\r\nNos meses de inverno, no Brasil, é frequente a ocorrência de ........ no sul, ........ no centro-oeste e ......... no sudeste.', '[]', 9, 2, 36, 8),
(106, 'Responda o que se pede:', 'No que diz respeito aos furacões, assinale a alternativa correta.', '[]', 9, 2, 36, 8),
(107, 'Responda o que se pede:', 'Com relação à dinâmica climática, considere as afirmações abaixo.\r\nI - O deslocamento das massas de ar é um fenômeno atmosférico que ocorre na troposfera e que interfere nas condições meteorológicas.\r\nII - As massas de ar polares têm origem nos polos Norte e Sul do planeta e, conforme a área por onde se deslocam, podem ser secas ou úmidas.\r\nIII - As chamadas frentes de transição, que se formam nas', '[]', 9, 3, 36, 8),
(110, 'Observe a música \"Que no me pierda\", de Gustavo Santander:', 'No trecho \" !Hoy, sin embargo , me encontraba trasteando por internet, […]” os termos em negrito se classificam como:', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/52c8f05bff34705595df21c318736361.png\"]', 9, 3, 37, 76),
(111, 'Responda o que se pede:', 'No último verso da canção, temos uma ideia de condição. Para trocar a conjunção da letra por outra que não trouxesse prejuízo ao significado, deveríamos usar:', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/f7bfb0799c7a940498b1b19c0d2b59d1.png\"]', 9, 3, 37, 76),
(112, 'Responda o que se pede:', ') Pollo ___ oveja, pez ___ hígado, cualquier tipo de carne me gusta.o - e', '[]', 9, 3, 37, 10),
(113, 'Responda o que se pede:', 'A palavra pero pode ser substituída, sem alteração do sentido contextual por:', '[]', 9, 1, 37, 8),
(114, 'Responda o que se pede:', 'La palabra quizás expresa una:', '[]', 9, 3, 38, 56),
(115, 'Responda o que se pede:', 'Viajo a menudo en tranvía\r\nA melhor interpretação da frase acima é:', '[]', 9, 2, 38, 17),
(116, 'Responda o que se pede:', 'Señala la proposición cuyas palabras completan correctamente el siguiente enunciado:\r\nEl ajedrez me gusta _______ porque es ________ entretenimiento __________ interesante.', '[]', 9, 3, 38, 60),
(117, 'Responda o que se pede:', 'En el fragmento \"Uno termina llevándolos a la cama porque está cansado o porque lo disfruta, porque quizá los ve poco durante el día y de noche necesita tenerlos cerca\" el adverbio quizá puede ser reemplazado por:', '[]', 9, 3, 38, 25),
(118, 'Responda o que se pede:', 'En cuanto al uso de “mucho” y “muy”, la frase correcta es:', '[]', 9, 3, 38, 52),
(119, 'Considere as seguintes afirmações sobre regras de acentuação.', 'I - As palavras sé (l. 09) e él (l. 17) são monossílabos e possuem acentuação diferencial.\r\n\r\n  II - A palavra flores (l. 10) é uma paroxítona acabada em s e, portanto, não se acentua ortograficamente.\r\n\r\n  III - As palavras razón (l. 19) e árbol (l. 28) são acentuadas ortograficamente, embora por regras diferentes.\r\n\r\n  Quais estão corretas?', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/bf4d320ed418d759cf0655d1ec66c0a5.png\"]', 9, 2, 39, 8),
(120, 'Responda o que se pede:', 'Nas alternativas abaixo, as palavras que se acentuam pelas mesmas regras que mí (3) e orejón (6) são, respectivamente,', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/4b47b8c18c955ea3fdc17ed962bda400.png\"]', 9, 3, 39, 3),
(121, 'Responda o que se pede:', 'De acuerdo con las reglas de acentuación de la lengua española es correcto afirmar que', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/e6803d5b4678426b31f532e11ca4cede.png\"]', 9, 3, 39, 77),
(122, 'Considere las siguientes afirmaciones sobre reglas de acentuación de palabras del texto.', 'I - La palabra él (l. 06) va acentuada por tratarse de un caso de acento diferencial.\r\n\r\nII - Las palabras empático (l. 12), sistemático (l. 14) y psicológico (l. 37) siguen la misma regla de acentuación.\r\n\r\nIII - Las palabras energía (l. 17), alegría (l. 22) y diversión (l. 22) se acentúan, porque forman diptongos.\r\n\r\nCuáles están correctas?', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/ed525fd310cd30a734cc942e5f095e42.png\"]', 9, 3, 39, 8),
(123, 'El Sur también existe', 'El Sur también existe\r\n\r\n01. Con su ritual de acero\r\n02. sus grandes chimeneas\r\n03. sus sabios clandestinos\r\n04. su canto de sirenas\r\n05. sus cielos de neón\r\n06. sus ventas navideñas\r\n07. su culto de dios padre\r\n08. y de las charreteras\r\n09. con sus llaves del reino\r\n10. el norte es el que ordena\r\n11. pero aquí abajo abajo\r\n12. el hambre disponible\r\n13. recurre al fruto amargo\r\n14. de lo que otros', '[]', 9, 3, 39, 8),
(124, 'Responda o que se pede:', 'Go and find the driver _______ arrived here yesterday.', '[]', 9, 2, 40, 62),
(125, 'Responda o que se pede:', '\"Did _______ belong to ________?\"\r\n\"Yes, _________ were ________.\"', '[]', 9, 3, 40, 22),
(126, 'Responda o que se pede:', 'He is the man ____________ sings very well', '[]', 9, 3, 40, 39),
(127, 'Responda o que se pede:', 'Check the alternative that adequately fills the gaps:\r\nShe is Fernanda Montenegro, but ____ real name is Arlete Torres\r\nYou are Grande Otelo, but ______ real name is Sebastão Prata\r\nHe is Ringo Star, but ______ real name is Richard Stakney\r\nYou are Gal, but _____ real name is Maria da Graça\r\nWe are Pelé and Zico, but ____ real names are Edson and Artur', '[]', 9, 3, 40, 28),
(128, 'Responda o que se pede:', '\"He is the salesman ________ sold me the photograph.\"', '[]', 9, 2, 40, 54),
(129, 'Responda o que se pede:', 'There’s no hope of ________ survivors.', '[]', 9, 2, 41, 19),
(130, 'Responda o que se pede:', 'Listen to John ! He ___________ the guitar for you', '[]', 9, 1, 41, 78),
(131, 'Responda o que se pede:', 'Some people __________ to be home on Sundays', '[]', 9, 2, 41, 78),
(132, 'Responda o que se pede:', 'I’m looking there and I ______ a bird now', '[]', 9, 2, 41, 39),
(133, 'Responda o que se pede:', 'In the excerpt from the third paragraph – may suffer from a variety of problems later in life –, the word may carries the idea of', '[]', 9, 2, 41, 73),
(134, 'Responda o que se pede:', 'Papyrus was used ____________ than paper.', '[]', 9, 3, 42, 10),
(135, 'De acordo como texto, “about 10 percent lower mortality rates” é resultado de:', 'To live the longest and healthiest life possible, get smarter. Institute for Health Metrics and Evaluation (IHME) data show that past a certain threshold, health and wealth are just weakly correlated. However, overall health is closely tied to how many years people spend in school. Mexico, for instance, has a fifth the per capita gross domestic product (GDP) of the United States, but, for women, m', '[]', 9, 3, 42, 20),
(136, 'Responda o que se pede:', 'Assinale a alternativa que expressa uma comparação de igualdade.', '[]', 9, 2, 42, 79),
(137, 'Responda o que se pede:', 'Selecione o comparativo e o superlativo correto das seguintes palavras, respectivamente: Large andSmall.', '[]', 9, 2, 42, 10),
(138, 'Analise as frases seguintes quanto ao emprego dos adjetivos e assinale a alternativa correta.', 'I- The electorate has not cleaned all the city halls yet.\r\nII- Many candidates ofconservative parties also won the municipal elections.\r\nIII- The press and special anticorruption courts have already acted against thieves inhigh places.\r\nIV- Marta promised to “close de faucets of corruption” and “to dismantle the corruptionmachine”, too.', '[]', 9, 3, 42, 3),
(139, 'Responda o que se pede:', 'A membrana plasmática e parede celular são estruturas presentes simultaneamente em:', '[]', 9, 3, 13, 61),
(140, 'Responda o que se pede:', 'Assinale a alternativa correta a respeito da membrana lipoproteica.', '[]', 9, 3, 13, 9),
(141, 'Responda o que se pede:', 'Em relação aos envoltórios celulares, podemos afirmar que:', '[]', 9, 1, 13, 25),
(142, 'Responda o que se pede:', 'Sobre as funções dos tipos de retículo endoplasmático, pode–se afirmar que:', '[]', 9, 1, 13, 54),
(143, 'Responda o que se pede:', 'Todas as alternativas abaixo expressam uma relação correta entre uma estrutura celular e sua função ou origem, exceto:', '[]', 9, 3, 13, 62),
(144, 'Associe os elementos químicos da coluna superior com as funções orgânicas da coluna inferior.', '1.	Magnésio \r\n2.	Potássio \r\n3.	Iodo \r\n4.	Cálcio \r\n5.	Sódio \r\n6.	Ferro \r\n \r\n( ) formação do tecido ósseo \r\n( ) transporte de oxigênio \r\n( ) assimilação de energia luminosa \r\n( ) equilíbrio de água no corpo \r\n( ) transmissão de impulso nervoso \r\nA sequência numérica correta, de cima para baixo, na coluna inferior, é:', '[]', 9, 1, 43, 8),
(145, 'Com relação a alguns componentes químicos do corpo humano, assinale a alternativa incorreta.', 'A matéria que constitui os seres vivos revela abundância em água, cerca de 75% a 85%, além de proteínas (10 a 15%), lipídios (2 a 3%), glicídios (1%), ácidos nucleicos (1%), e de sais minerais diversos (1%).', '[]', 9, 2, 14, 57),
(146, 'Responda o que se pede:', 'Os adubos inorgânicos industrializados, conhecidos pela sigla NPK, contêm sais de três elementos químicos: nitrogênio, fósforo e potássio. Qual das alternativas indica as principais razões pelas quais esses elementos são indispensáveis à vida de uma planta?', '[]', 9, 2, 14, 20),
(147, 'Cinco amostras com ácidos nucleicos foram analisadas quimicamente e apresentaram os seguintes result', '1a amostra: ribose \r\n2a amostra: timina \r\n3a amostra: dupla hélice \r\n4a amostra: uracila \r\nV - 5a amostra: 20% de guanina e 30% de citosina \r\n \r\nEntre estas amostras, quais se referem a DNA?', '[]', 9, 1, 14, 8),
(148, 'Responda o que se pede:', 'O DNA presente nas mitocôndrias tem composição e estrutura típicas desse tipo de ácido nucléico, portanto é formado por: \r\nI.	uma cadeia de nucleotídeos em que as bases nitrogenadas interagem, formando ligações fosfo-diéster. \r\nII.	duas cadeias polinucleotídicas paralelas e complementares entre si, através dos pareamentos de aminoácidos. \r\nIII.	nucleotídeos que são compostos por uma base nitrogena', '[]', 9, 3, 43, 63),
(149, 'Responda o que se pede:', 'Os biólogos costumam dividir o ciclo celular em INTÉRFASE (G1, S e G2) e DIVISÃO. Uma célula tem ciclo de 20 horas e leva 1 hora para realizar a divisão completa, 8 horas para realizar a fase G1 e 3 horas para realizar G2. Portanto, essa célula leva:', '[]', 9, 2, 15, 41),
(150, 'Responda o que se pede:', 'A todo momento, os seres vivos pluricelulares perdem muitas células do próprio corpo, como, por exemplo, quando ocorrem ferimentos, quando os alimentos passam pelo trato digestório e até mesmo quando há o envelhecimento celular, mas, graças a um processo de divisão celular, a mitose, as células somáticas são repostas diariamente. No entanto, para uma célula se dividir em duas novas células iguais,', '[]', 9, 3, 15, 18),
(151, 'A meiose é um processo de divisão celular em que são formadas quatro células com o número de cromoss', 'I.	clivagem (quebra) das cromátides homólogas e troca de trechos entre elas. \r\nII.	deslocamento das cromátides irmãs para polos opostos da célula. \r\nIII.	ocorrência da citocinese e formação das duas células, as quais possuirão n cromossomos cada uma. \r\nIV.	deslocamento dos cromossomos homólogos para polos opostos da célula. \r\nV.	emparelhamento dos cromossomos homólogos na placa metafásica (equator', '[]', 9, 2, 15, 18),
(152, 'Responda o que se pede:', 'Quatro organismos iniciaram o processo reprodutivo ao mesmo tempo e, em meia hora, havia oito indivíduos. Passou-se mais uma hora, quando então eram contados trinta e dois organismos. Possivelmente trata-se de:', '[]', 9, 2, 16, 64),
(153, 'Responda o que se pede:', 'O tipo de composto nitrogenado (amônia, ureia ou ácido úrico) eliminado por um organismo depende, entre outros fatores, da disponibilidade de água no meio em que vive, da sua capacidade de concentrar a urina e da necessidade de economizar a água do corpo. Exemplos de animais que eliminam, respectivamente, amônia, ureia e ácido úrico, são', '[]', 9, 2, 16, 62),
(154, 'Responda o que se pede:', 'Considere as descrições, abaixo, sobre três tipos de esqueletos encontrados entre os grupos animais. Esqueleto de origem epidérmica no qual são depositados quitina e carbonato de cálcio. Esqueleto resultante da manutenção de líquido dentro de cavidades corporais, de modo a apoiar a ação muscular. Esqueleto de origem mesodérmica no qual são depositados sais que lhe conferem rigidez. Os três tipos d', '[]', 9, 3, 16, 71),
(155, 'Responda o que se pede:', 'No organismo humano, os receptores sensoriais responsáveis pelos sentidos do olfato podem ser classificados como:', '[]', 9, 1, 16, 66),
(156, 'Responda o que se pede:', 'Um biólogo encontra uma nova espécie de animal de aspecto vermiforme. A princípio, fica em dúvida se este é um representante do Filo Annelida ou Nematoda. Para decidir entre as duas opções, você recomendaria que ele examinasse a presença de:', '[]', 9, 1, 16, 67),
(157, 'Responda o que se pede:', 'A minhoca apresenta respiração (I) e circulação (II). Para completar corretamente essa frase, I e II devem ser substituídos, respectivamente, por:', '[]', 9, 1, 16, 58),
(158, 'Responda o que se pede:', 'Um biólogo coletou exemplares de uma espécie animal desconhecida, os quais foram criados em laboratório e analisados quanto a diversas características. Concluiu que se tratava de representantes do filo Annelida, pois eram animais:', '[]', 9, 2, 16, 41),
(159, 'Responda o que se pede:', 'A área da Edafologia da UNISINOS estuda a importância da minhoca na recuperação do solo. É uma alternativa de baixo custo e bastante eficiente para a refertilização dos solos brasileiros, já bastante pobres. Assinale a característica que pode ser atribuída às minhocas (Anelídeos – Oligoquetas):', '[]', 9, 2, 16, 30),
(160, 'Responda o que se pede:', 'A minhoca apresenta respiração (I) e circulação (II). Para completar corretamente essa frase, I e II devem ser substituídos, respectivamente, por:', '[]', 9, 2, 16, 58),
(162, 'Responda o que se pede:', 'Em relação à classificação dos animais, é correto afirmar:', '[]', 9, 2, 18, 69),
(163, 'Responda o que se pede:', 'As planárias são vermes acelomados, pequenos e achatados dorso-ventralmente; apresentam um tubo digestório com inúmeras ramificações. O tamanho e a forma das planárias estão diretamente relacionados', '[]', 9, 3, 18, 40),
(164, 'Responda o que se pede:', 'O Reino Animália reúne uma grande diversidade de organismos distribuídos em Filos que encerram determinadas características peculiares. Considere as seguintes afirmativas: \r\nI.	O Filo Porífera reúne as esponjas, animais de organização muito simples, que absorvem água com partículas alimentares através de células especializadas chamadas coanócitos. \r\nII.	O Filo Arthropoda reúne grande diversidade d', '[]', 9, 3, 18, 52),
(165, 'Responda o que se pede:', 'Um agricultor tinha uma plantação de 20 hectares de algodão. Uma seca muito grande ocasionou a morte de uma boa parte da população de algodoeiros. Logo em seguida, a plantação passou por um ataque dizimador de bicudos. Referida população de algodoeiros sofreu os efeitos sucessivos de:', '[]', 9, 1, 19, 52),
(166, 'Responda o que se pede:', 'Em uma floresta ocorrem três espécies de árvores, igualmente bem sucedidas e numerosas. Essas árvores constituem:', '[]', 9, 3, 19, 28),
(167, 'Considere as seguintes definições:', 'I.Conjunto de todos os indivíduos de uma mesma espécie, vivendo em uma mesma área em um mesmo intervalo de tempo;\r\nII.Conjunto de todas as populações que ocorrem em uma determinada área;\r\nIII.Conjunto de todos os ecossistemas terrestres.\r\nAssinale a opção que corresponde, respectivamente, aos conceitos definidos acima:', '[]', 9, 2, 19, 52),
(168, 'Responda o que se pede:', 'Pesquisadores do Departamento de Biologia da UEPB realizaram um estudo da macrofauna do açude do Bodocongó, localizado na cidade de Campina Grande-PB, coletando os seguintes organismos:\r\n\r\n5 gastrópodes (caramujos),\r\n8 caraciformes (peixes),\r\n10 dípteros (insetos),\r\n2 chelonios (cágados),\r\n2 ciconiformes (garças),\r\nanuros (3 sapos e 5 rãs).\r\nEsse pequeno açude contém:', '[]', 9, 3, 19, 53),
(169, 'Responda o que se pede:', 'Em relação aos níveis de organização de um ser vivo, a alternativa que contém os termos que substituem adequadamente os números 1, 2, 3 e 4, sendo\r\nCélula → (1) → (2) → Sistema → (3) → (4) → Comunidade, é', '[]', 9, 1, 19, 54),
(170, 'Responda o que se pede:', 'Um automóvel percorre 6,0km para o norte e, em seguida 8,0km para o leste. A intensidade do vetor posição, em relação ao ponto de partida é?', '[]', 9, 3, 20, 40),
(171, 'Responda o que se pede:', 'Quando dizemos que a velocidade de uma bola é de 20 m/s, horizontal e para a direita, estamos definindo a velocidade como uma grandeza:', '[]', 9, 2, 20, 56),
(172, 'Responda o que se pede:', 'Uma partícula está sob ação das forças coplanares conforme o esquema abaixo. A resultante delas é uma força, de intensidade, em N, igual a:', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/653f544595962f8550b23a92b3b3a4b4.png\"]', 9, 3, 20, 57),
(173, 'Considere as grandezas físicas:', 'I. Velocidade\r\nII. Temperatura\r\nIII. Quantidade de movimento\r\nIV. Deslocamento\r\nV. Força\r\n Destas, a grandeza escalar é:', '[]', 9, 1, 20, 57),
(174, 'Responda o que se pede:', 'Um menino sai de sua casa e caminha para a escola dando, em média, um passo por segundo. Se o tamanho médio de seu passo é de 0,5 m e se ele gasta 5 min no trajeto, a distância entre sua casa e a escola, em metros, é de:', '[]', 9, 2, 20, 58),
(175, 'A aventura humana na Terra tem-se caracterizado, com o passar dos tempos, por um esforço contínuo ru', '(  ) A Biologia tem estreitas relações com outras áreas do conhecimento, como a Química, a Física, a Matemática, a Geografia, a Economia e a Política.\r\n(  ) A Biologia, tal qual as outras ciências, segue o procedimento geral do método científico: não possui técnicas particulares nem evolução própria.\r\n(  ) Após serem testadas, por experimentação, as hipóteses podem vir a ganhar consistência, passa', '[]', 9, 2, 21, 59),
(176, 'Responda o que se pede:', 'A lenda diz que, em um belo dia ensolarado, Newton estava relaxando sob uma macieira. Pássaros gorjeavam em suas orelhas. Havia uma brisa gentil. Ele cochilou por alguns minutos. De repente, uma maçã caiu sobre a sua cabeça e ele acordou com um susto. Olhou para cima. “Com certeza um pássaro ou um esquilo derrubou a maçã da árvore”, supôs. Mas não havia pássaros ou esquilos na árvore por perto. El', '[]', 9, 1, 21, 3),
(177, 'Responda o que se pede:', 'O tema “teoria da evolução” tem provocado debates em certos locais dos Estados Unidos da América, com algumas entidades contestando seu ensino nas escolas. Nos últimos tempos, a polêmica está centrada no termo teoria que, no entanto, tem significado bem definido para os cientistas. Sob o ponto de vista da ciência, teoria é:', '[]', 9, 2, 21, 20),
(178, 'Leia o trecho abaixo e assinale qual alternativa é correta em relação ao texto.', 'Observe a imagem.', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/ea7ec984392435c18d062d8b8d3faf03.png\"]', 9, 1, 21, 60),
(179, 'Um físico atuante em renomado laboratório nacional resolveu dedicar-se exclusivamente a certa pesqui', 'I. A natureza altamente teórica da Física propicia um amplo número de problemas de pesquisa para o trabalho experimental. Pesquisa guiada por teoria é mais eficiente e tem mais chance de sucesso.\r\nII. O experimento deveria ser realizado com um número grande de árvores para que fosse alcançado um conhecimento verdadeiro e imutável sobre o assunto.\r\nIII. Criatividade e imaginação, embora importantes', '[]', 9, 3, 21, 60),
(180, 'Responda o que se pede:', 'No triângulo ABC da figura a seguir AC = 21 cm, BC = 12 cm e AD = 7 cm.   Sabendo que os ângulos de ADE e ACB são congruentes, a medida do segmento DE, em cm é:', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/c333e3457b4cbd7e7aadc9fe938ae41a.png\"]', 9, 1, 4, 1),
(181, 'Responda o que se pede:', 'Um terreno retangular possui dimensões x e y com x < y, e tem 200 metros de perímetro, ou seja, a soma de x e y é igual a 100 metros. A área do terreno é o produto de x por y, que mede 2400 m² , então o valor de x, em metros, é igual a:', '[]', 9, 1, 4, 2);
INSERT INTO `tb_questao` (`idQuestao`, `tituloQuestao`, `textoQuestao`, `imagensQuestao`, `idAdministrador`, `idDificuldade`, `idAssuntoMateria`, `idUniversidade`) VALUES
(182, 'Responda o que se pede:', 'Um quebra-cabeça consiste em recobrir um quadrado com triângulos retângulos isósceles.\r\nUma artesã confecciona um quebra-cabeça como o descrito, de tal modo que a menor das peças é um triângulo retângulo isósceles cujos catetos medem 2 cm.\r\nO quebra-cabeça, quando montado, resultará em um quadrado cuja medida do lado, em centímetro, é:', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/40832314c3fd791e5b8dddab2fffee01.png\"]', 9, 2, 4, 3),
(183, 'Responda o que se pede:', 'Em uma certa cidade, os moradores de um bairro carente de espaços de lazer reivindicam à prefeitura municipal a construção de uma praça. A prefeitura concorda com a solicitação e afirma que irá construí-la em formato retangular devido às características técnicas do terreno. Restrições de natureza orçamentária impõem que sejam gastos, no máximo, 180 m de tela para cercar a praça. A prefeitura apres', '[]', 9, 2, 4, 3),
(184, 'Em canteiros de obras de construção civil é comum perceber trabalhadores realizando medidas de co', 'A região demarcada pelas estacas A, B, M e N deveria ser calçada com concreto. \r\nNessas condições, a área a ser calçada corresponde:', '[]', 9, 3, 4, 3),
(185, 'Responda o que se pede:', 'Para se construir um contrapiso, é comum, na constituição do concreto, se utilizar cimento, areia e brita, na seguinte proporção: 1 parte de cimento, 4 partes de areia e 2 partes de brita. Para construir o contrapiso de uma garagem, uma construtora encomendou um caminhão betoneira com 14 m3 de concreto.\r\n\r\nQual é o volume de cimento, em m3, na carga de concreto trazido pela betoneira?', '[]', 9, 1, 5, 3),
(186, 'Responda o que se pede:', 'Escala gráfica, segundo Vesentini e Vlach (1996, p. 50), “é aquela que expressa diretamente os valores da realidade mapeada num gráfico situado na parte inferior de um mapa”. Nesse sentido, considerando que a escala de um mapa está representada como 1:25000 e que duas cidades, A e B, nesse mapa, estão distantes, entre si, 5cm, a distância real entre essas cidades é de:', '[]', 9, 1, 5, 4),
(187, 'Responda o que se pede:', 'Considere dois mapas do Brasil, sendo que o mapa “A” tem escala de 1/10.000.000 e o mapa “B”, escala de 1/50.000.000. Assinale a alternativa correta.', '[]', 9, 2, 5, 7),
(188, 'Responda o que se pede:', 'Uma empresa tem 750 empregados e comprou marmitas individuais, suficientes para o almoço deles durante 25 dias. Se essa empresa contratasse mais 500 empregados que recebessem almoço nas condições anteriores, a quantidade de marmitas já adquiridas seria suficiente para um número\r\nde dias igual a:', '[]', 9, 2, 5, 71),
(189, 'Responda o que se pede:', '5.	Para garantir a segurança de um grande evento público que terá início às 4 h da tarde, um organizador precisa monitorar a quantidade de pessoas presentes em cada instante. Para cada 2 000 pessoas se faz necessária a presença de um policial. Além disso, estima-se uma densidade de quatro pessoas por metro quadrado de área de terreno ocupado. Às 10 h da manhã, o organizador verifica que a área de ', '[]', 9, 3, 5, 3),
(190, 'Responda o que se pede:', 'Na escola Mundial, havia uma classe com 55 alunos. Para dar um presente à professora Helena, cada qual colaborou com 25% do que pagavam mensalmente à escola. Sabendo-se, em 12 meses de aulas, cada aluno pagava a unidade de R$ 15.600,00, pergunta-se: Qual a mensalidade e quanto arrecadaram?', '[]', 9, 1, 6, 6),
(191, 'Responda o que se pede:', 'Na cidade de São Paulo, as tarifas de transporte urbano podem ser pagas usando o bilhete único. A tarifa é de $3,00 para uma viagem simples (ônibus ou metrô/trem) e de R$4,65 para uma viagem de integração (ônibus e metrô/trem). Um usuário vai recarregar seu bilhete único, que está com um saldo de R$12,50. O menor valor de recarga para o qual seria possível zerar o saldo do bilhete após algumas uti', '[]', 9, 2, 6, 8),
(192, 'Responda o que se pede:', 'Uma mercadoria que custa R reais sofre um desconto de 60%. Um aumento de 60% sobre o novo preço fará com que a mercadoria fique custando, em reais:', '[]', 9, 2, 6, 8),
(193, 'Responda o que se pede:', 'Com 20% de desconto, paguei R$640,00 por uma coleção de livros. O preço sem desconto é?', '[]', 9, 2, 6, 9),
(194, 'Responda o que se pede:', 'Em uma fábrica com 100 empregados, 1% é do sexo masculino. O número de mulheres que devem ser dispensadas para que a quantidade de homens represente 2% do total é:', '[]', 9, 3, 6, 10),
(195, 'Responda o que se pede:', 'Três barras de peso desprezível, articuladas nos pinos P,Q e R, constituem uma estrutura vertical em forma de triângulo isósceles, com 6,0 m de base e 4,0 m de altura, que sustenta uma massa M suspensa em Q em equilíbrio estático. O pino P também é articulado no seu ponto fixo, e o pino P apoia-se verticalmente sobre o rolete livre. Sendo 15 x 10³N e 5 x 10³N os respectivos valores máximos das for', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/40bbb402ab03de4df53c09d94243c76c.png\"]', 9, 3, 7, 11),
(196, 'Nas figuras (X) e (Y) abaixo, está representado um limpador de janelas trabalhando em um andaime sus', 'Durante o intervalo de tempo limitado pelas figuras, você observa que o trabalhador caminha sobre o andaime indo do lado esquerdo, figura (X), para o lado direito, figura (Y). \r\nAssinale a alternativa que preenche corretamente as lacunas da sentença abaixo, na ordem em que aparecem.\r\nApós o trabalhador ter-se movido para a direita (figura (Y)), podemos afirmar corretamente que, em relação à situaç', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/b29d85ec0b04d6bdf1c6181850f1d388.png\"]', 9, 2, 7, 8),
(197, 'Responda o que se pede:', 'Em um experimento, um professor levou para a sala de aula um saco de arroz, um pedaço de madeira triangular e uma barra de ferro cilíndrica e homogênea. Ele propôs que fizessem a medição da massa da barra utilizando esses objetos. Para isso, os alunos fizeram marcações na barra, dividindo-a em oito partes iguais, e em seguida apoiaram-na sobre a base triangular, com o saco de arroz p', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/b0b63f7bab32e0e79f5d394f52ede6f7.png\"]', 9, 1, 4, 3),
(198, 'Considerando que a aceleração da gravidade local é de 10 m/s2, a densidade da água do lago, em g/cm', 'Em um experimento realizado para determinar a densidade da água de um lago, foram utilizados alguns materiais conforme ilustrado: um dinamômetro D com graduação de 0 N a 50 N e um cubo maciço e homogêneo de 10 cm de aresta e 3 kg de massa. Inicialmente, foi conferida a calibração do dinamômetro, constatando-se a leitura de 30 N quando o cubo era preso ao dinamômetro e suspenso no ar. A', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/7e437b2c0052b5a7327b2b48a06ea296.png\"]', 9, 1, 7, 3),
(199, 'Responda o que se pede:', 'Duas partículas percorrem uma mesma trajetória em movimentos circulares uniformes, uma em sentido horário e a outra em sentido anti-horário. A primeira efetua 1/3 rpm e a segunda 1/4 rpm. Sabendo que partiram do mesmo ponto, em 1 hora encontrar-se-ão:', '[]', 9, 3, 8, 12),
(200, 'Responda o que se pede:', 'Um velocímetro comum de carro mede, na realidade, a velocidade angular do eixo da roda, e indica um valor que corresponde à velocidade do carro. O velocímetro para um determinado carro sai da fábrica calibrado para uma roda de 20 polegadas de raio (isso inclui o pneu). Um motorista resolve trocar as rodas do carro para 22 polegadas de raio. Assim, quando o velocímetro indica 100km/h, a velocidade', '[]', 9, 2, 8, 13),
(201, 'Analise as afirmações:', 'Em uma bicicleta que se movimenta com velocidade constante, considere um ponto A na periferia da catraca e um ponto B na periferia da roda.\r\n\r\nI. A velocidade escalar de A é igual à de B.\r\nII. A velocidade angular de A é igual à de B.\r\nIII. O período de A é igual ao de B.\r\n\r\nEstá correto SOMENTE o que se afirma em:', '[]', 9, 3, 8, 14),
(202, 'Nesse caso, podemos afirmar que a velocidade escalar da partícula é:', 'Uma partícula descreve um movimento uniforme. A função horária dos espaços, com unidades do Sistema Internacional de Unidades é:\r\ns = -2,0 + 5,0.t', '[]', 9, 1, 8, 17),
(203, 'A equação horária desse movimento é:', 'A posição de um móvel, em movimento uniforme, varia com o tempo conforme a tabela que segue.', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/8d874f47455619382483b8ff569ba901.png\"]', 9, 1, 8, 15),
(204, 'Responda o que se pede:', 'De acordo com a terceira lei de Newton, a toda força corresponde outra igual e oposta, chamada de reação. A razão por que essas forças não se cancelam é:\r\nelas agem em objetos diferentes.', '[]', 9, 3, 9, 44),
(205, 'Responda o que se pede:', 'No arremesso de peso, um atleta gira o corpo rapidamente e depois o abandona. Se não houver influência da Terra e desprezarmos a resistência do ar, a trajetória do corpo após abandonado pelo esportista será:', '[]', 9, 2, 9, 10),
(206, 'Responda o que se pede:', ') Considere que um caminhão-tanque, ao abastecer um posto de gasolina, se encontra em repouso, apoiado sobre um piso plano e horizontal, sem atrito.\r\nÉ correto afirmar que a menor força capaz de deslocar esse caminhão é:', '[]', 9, 3, 9, 18),
(207, 'Responda o que se pede:', 'As estatísticas indicam que o uso do cinto de segurança deve ser obrigatório para prevenir lesões mais graves em motoristas e passageiros no caso de acidentes. Fisicamente, a função do cinto está relacionada com a:', '[]', 9, 1, 9, 19),
(208, 'Responda o que se pede:', 'A massa de uma partícula X é dez vezes maior do que a massa de uma partícula Y. Se as partículas colidirem frontalmente uma com a outra, pode-se afirmar que, durante a colisão, a intensidade da força exercida por X sobre Y, comparada à intensidade da força exercida por Y sobre X, será:', '[]', 9, 2, 9, 8),
(209, 'Responda o que se pede:', 'Num laboratório, foram feitos testes para avaliar a reatividade de três metais - cobre, Cu, magnésio, Mg, e zinco, Zn. Para tanto, cada um desses metais foi mergulhado em três soluções diferentes - uma de nitrato de cobre, Cu(NO3)2, uma de nitrato de magnésio, Mg(NO3)2,e uma de nitrato de zinco, Zn(NO3)2. Neste quadro, estão resumidas as observações feitas ao longo dos testes:', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/af1f6787d2d30cd61a90131f34bd97d3.png\"]', 9, 2, 10, 71),
(210, 'A amônia é um composto utilizado como matéria-prima em diversos processos químicos. A obtenção da am', 'N2(g) + 3H2(g) --> 2NH3(g)\r\n\r\nA entalpia padrão de formação da amônia é de -46,0 KJ/mol.\r\nA obtenção da amônia para a reação citada a cima pode ser classificada como uma reação de;', '[]', 9, 1, 10, 12),
(211, 'Sobre tais transformações, pode-se afirmar, corretamente, que ocorre oxirredução apenas em:', 'Na produção de combustível nuclear, o trióxido de urânio é transformado no hexafluoreto de urânio, como representado pelas equações químicas:', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/418cd1486b51df541313f7126295eb33.png\"]', 9, 3, 10, 20),
(212, 'Responda o que se pede:', 'Airbags são hoje em dia um acessório de segurança indispensável nos automóveis. A reação que ocorre quando um airbag infla é\r\nNaN3 (s) → N2 (g) + Na (s)\r\nQuando se acertam os coeficientes estequiométricos, usando o menor conjunto adequado de coeficientes inteiros, a soma dos coeficientes é:', '[]', 9, 1, 10, 8),
(213, 'Leia as afirmativas a seguir:', 'I. A primeira energia de ionização cresce da esquerda para a direita, para elementos de um mesmo período da tabela periódica, porque o aumento do número atômico acarreta maior atração dos elétrons pelo núcleo.\r\nII. A segunda energia de ionização, para um elemento químico, é menor que a primeira, porque a retirada do segundo elétron é favorecida após a primeira ionização.\r\nIII. A energia de ionizaç', '[]', 9, 2, 11, 21),
(214, 'Responda o que se pede:', 'Comparando o cloro e o sódio, os dois elementos químicos formadores do sal de cozinha, é correto afirmar que:', '[]', 9, 3, 11, 22),
(215, 'Responda o que se pede:', 'Com relação à classificação periódica moderna dos elementos, assinale a afirmação verdadeira:', '[]', 9, 2, 11, 23),
(216, 'Com base nos critérios desta classificação, a letra X corresponde ao seguinte elemento químico:', 'Em uma das primeiras classificações periódicas, os elementos químicos eram organizados em grupos de três, denominados tríades. Os elementos de cada tríade apresentam propriedades químicas semelhantes, e a massa atômica do elemento central equivale aproximadamente à média aritmética das massas atômicas dos outros dois. Observe as tríades a seguir:', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/406ebf3288262fa5888cdde76872069c.png\"]', 9, 1, 11, 24),
(218, 'O gráfico abaixo mostra a variação do potencial de ionização (eixo das ordenadas) em função do númer', 'Considerando que a escala no eixo das abscissas não começa necessariamente de zero, os números atômicos dos elementos A, B e C só podem ser, respectivamente:', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/69b0b87d5d805fb191f18f28e39a3763.png\"]', 9, 3, 11, 25),
(219, 'Responda o que se pede:', 'A formação de hidróxido de alumínio, resultante da reação de um sal desse metal com uma base, pode ser representada por:', '[]', 9, 2, 12, 26),
(220, 'Responda o que se pede:', 'Identifique a alternativa que apresenta dois produtos caseiros com propriedades alcalinas básicas:', '[]', 9, 1, 12, 27),
(221, 'Responda o que se pede:', 'Cloreto de sódio é um composto iônico que se encontra no estado sólido. Dissolvido em água, se dissocia completamente. Acerca desse sal, é INCORRETO afirmar que:', '[]', 9, 2, 12, 29),
(222, 'Responda o que se pede:', 'Ao participar de uma festa, você pode comer e beber em demasia, apresentando sinais de má digestão ou azia. Para combater a acidez, ocasionada pelo excesso de ácido clorídrico no estômago, seria bom ingerir uma colher de leite de magnésia, que irá reagir com esse ácido. A equação que representa a reação é:', '[]', 9, 1, 12, 30),
(223, 'O algarismo das unidades de 910 é:', 'Dica: o algarismo das unidades é também o último algarismo de um\r\nnúmero. Por exemplo, o algarismo das unidades de 123432 é o\r\núltimo dois - 123432.', '[]', 9, 3, 44, 8),
(224, 'Dica: um quilômetro cúbico equivale a 1.000.000.000.000 (1 trilhão) de litros.', 'Técnicos concluem mapeamento do aquífero\r\nGuarani O aquífero Guarani localiza-se no subterrâneo dos\r\nterritórios da Argentina, Brasil, Paraguai e Uruguai, com extensão\r\ntotal de 1.200.000 quilômetros quadrados, dos quais 840.000\r\nquilômetros quadrados estão no Brasil. O aquífero armazena cerca\r\nde 30 mil quilômetros cúbicos de água e é considerado um dos\r\nmaiores do mundo. Na maioria das vezes em ', '[]', 9, 3, 44, 3),
(225, 'Responda o que se pede:', 'Os astrônomos estimam que, no universo\r\nvisível, existem aproximadamente 100 bilhões de galáxias,\r\ncada uma com 100 bilhões de estrelas. De acordo com estes\r\nnúmeros, se cada estrela tiver, em média, 10 planetas a sua\r\nvolta, então existem no universo visível aproximadamente\r\nDica: 1 bilhão equivale a 1.000.000.000 ou, ainda, 109', '[]', 9, 2, 44, 81),
(226, 'Responda o que se pede:', 'Qual é a metade de 222?', '[]', 9, 3, 44, 20),
(227, 'Sejam a e b números irracionais. Dadas as afirmações:', 'I) a.b é um número irracional.\r\nII) a + b é um número irracional.\r\nIII) a - b pode ser um número racional.\r\nPodemos concluir que:', '[]', 9, 3, 44, 40),
(228, 'Considere as afirmações a seguir:', '(I) O número 2 é primo.\r\n(II) A soma de dois números ímpares é sempre par.\r\n(III) Todo número primo multiplicado por 2 é par.\r\n(IV) Todo número par é racional.\r\n(V) Um número racional pode ser inteiro.\r\nAtribuindo V para as afirmações verdadeiras e F para as\r\nfalsas, assinale a sequência CORRETA:', '[]', 9, 1, 44, 70),
(229, 'Responda o que se pede:', 'Uma pesquisa realizada por estudantes da\r\nFaculdade de Estatística mostra, em horas por dia, como os jovens\r\nentre 12 e 18 anos gastam seu tempo, tanto durante a semana (de \r\nsegunda-feira a sexta-feira), como no fim de semana (sábado e\r\ndomingo). A seguinte tabela ilustra os resultados da pesquisa.\r\n\r\nDe acordo com esta pesquisa, quantas horas de seu tempo gasta\r\num jovem entre 12 e 18 anos, na s', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/ea754672e9d7199ab787857566f5c3d8.png\"]', 9, 1, 44, 3),
(230, 'Responda o que se pede:', 'Sejam x e y números tais que os conjuntos {0, 7, 1} e {x, y, 1}\r\nsão iguais. Então, podemos afirmar que:', '[]', 9, 2, 44, 29),
(231, 'Responda o que se pede:', 'Num colégio de 100 alunos, 80 gostam de sorvete de chocolate, 70\r\ngostam de sorvete de creme e 60 gostam dos dois sabores.\r\nQuantos não gostam de nenhum dos dois sabores?', '[]', 9, 3, 44, 29),
(232, 'Responda o que se pede:', 'Um eletricista tem 4 rolos do fio X, com 84 m\r\ncada um, 3 rolos do fio Y, com 144 m cada um, e 5 rolos do fio Z,\r\ncom 60 m cada um. Para fazer as ligações necessárias de uma\r\nobra, ele deverá cortar os fios dos 12 rolos em pedaços do mesmo \r\ntamanho, sendo esse tamanho o maior possível, de modo que não\r\nreste nenhum pedaço de fio nos rolos. Dessa maneira, ele deverá\r\nobter um número total de pedaç', '[]', 9, 3, 45, 68),
(233, 'Responda o que se pede:', 'O MMC e o MDC dos números (20, 18,\r\n6) são, respectivamente:', '[]', 9, 1, 45, 82),
(234, 'Responda o que se pede:', 'Um comerciante comprou uma\r\ncaixa de ossinhos para cães e, para revendê-los, fez pacotinhos\r\nmenores, todos com a mesma quantidade de ossinhos. Ao iniciar\r\na montagem dos pacotinhos, percebeu que poderia formar\r\npacotinhos com 6 ou com 8 ou com 10 ossinhos em cada\r\npacotinho e que não restaria nenhum ossinho na caixa. O menor\r\nnúmero de ossinhos existente nessa caixa era:', '[]', 9, 2, 45, 68),
(235, 'Responda o que se pede:', 'Os garotos João e Pedro vão passear de\r\nbicicleta em uma pista circular, seguindo sempre em uma mesma\r\ndireção, com velocidades diferentes. Eles iniciaram o passeio\r\npartindo, no mesmo instante, de um mesmo ponto e combinaram de\r\nencerrar o passeio quando se encontrassem pela primeira vez no\r\nponto de partida. Se, para completar cada volta na pista, João gasta\r\n20 minutos e Pedro 24, então o passe', '[]', 9, 2, 45, 83),
(236, 'Responda o que se pede:', 'Uma empresa que trabalha com enormes\r\nquantidades de documentos confidenciais adquiriu 11 máquinas\r\nfragmentadoras de papel, dividindo-as entre suas duas filiais. Todas\r\nas máquinas são capazes de triturar a mesma quantidade de papel\r\npor hora. Na filial de São Paulo, operando com a máxima\r\ncapacidade, as máquinas lá entregues trituraram 1.400 kg de papel\r\nem 4 horas. Já as máquinas da filial do R', '[]', 9, 2, 45, 84),
(237, 'Responda o que se pede:', 'Uma moeda não tendenciosa é lançada até\r\nque sejam obtidos dois resultados consecutivos iguais. Qual a\r\nprobabilidade de a moeda ser lançada exatamente três\r\nvezes?', '[]', 9, 3, 46, 32),
(238, 'Responda o que se pede:', 'Para disputar a final de um torneio internacional de natação, classificaram-se 8 atletas: 3 norteamericanos, 1 australiano, 1 japonês, 1 francês e 2 brasileiros. Considerando que todos os atletas classificados são ótimos e têm iguais condições de receber uma medalha (de ouro, prata ou bronze), a probabilidade de que pelo menos um brasileiro esteja entre os três primeiros colocados é igual a:', '[]', 9, 3, 46, 84),
(239, 'Responda o que se pede:', 'Um juiz de futebol possui três cartões no bolso. Um é todo amarelo, outro é todo vermelho e o terceiro é vermelho de um lado e amarelo do outro. Num determinado lance, o juiz retira ao acaso, um cartão do bolso mostrando-o a um jogador. Qual é a probabilidade de a face que o juiz vê ser vermelha, e de a outra face mostrada ao jogador, ser amarela?', '[]', 9, 3, 46, 32),
(240, 'Responda o que se pede:', 'Em um jogo disputado em uma mesa de sinuca, há 16 bolas: 1 branca e 15 coloridas, as quais, de acordo com a coloração, valem de 1 a 15 pontos (um valor para cada bola colorida).O jogador acerta o taco na bola branca de forma que esta acerte as outras, com o objetivo de acertar duas das quinze bolas em quaisquer caçapas. Os valores dessas duas bolas são somados e devem resultar em um valor escolhid', '[]', 9, 3, 46, 3),
(241, 'Responda o que se pede:', 'Lançando-se simultaneamente dois dados não\r\nviciados, a probabilidade de que suas faces superiores\r\nexibam soma igual a 7 ou 9 é:', '[]', 9, 3, 46, 19),
(242, 'Responda o que se pede:', 'A média das idades dos cinco jogadores de um\r\ntime de basquete é 23,20 anos. Se o pivô dessa equipe,\r\nque possui 27 anos, for substituído por um jogador de\r\n20 anos e os demais jogadores forem mantidos, então a\r\nmédia de idade dessa equipe, em anos, passará a ser:', '[]', 9, 2, 7, 84),
(243, 'Responda o que se pede:', 'Um aluno deve atingir 70 pontos\r\npara ser aprovado. Esse total de pontos é resultado\r\nde uma média ponderada de 3 notas, N1, N2 e N3,\r\ncujos pesos são, respectivamente, 1, 2, 2.\r\nAs suas notas, N1 e N2, são, respectivamente, em\r\num total de 100 pontos distribuídos em cada uma, 50\r\ne 65. Para ser aprovado, a sua nota N3 (em 100\r\npontos distribuídos) deverá ser:', '[]', 9, 2, 7, 85),
(244, 'Responda o que se pede:', 'A nota final para uma disciplina de\r\numa instituição de ensino superior é a média\r\nponderada das notas A, B e C , cujos pesos\r\nsão 1, 2 e 3, respectivamente. Paulo obteve A =\r\n3,0 e B = 6,0. Quanto ele deve obter em C para\r\nque sua nota final seja 6,0?', '[]', 9, 3, 7, 83),
(245, 'Responda o que se pede:', 'Um nadador, disputando a prova\r\ndos 400 metros, nado livre, completou os\r\nprimeiros 300 metros em 3 minutos e 51\r\nsegundos. Se esse nadador mantiver a\r\nmesma velocidade média nos últimos 100\r\nmetros, completará a prova em:', '[]', 9, 2, 7, 20),
(246, 'Responda o que se pede:', 'Um poliedro convexo tem 14 vértices. Em 6 desses\r\nvértices concorrem 4 arestas, em 4 desses vértices concorrem 3\r\narestas e, nos demais vértices, concorrem 5 arestas. O número de\r\nfaces desse poliedro é igual a:', '[]', 9, 3, 3, 32),
(247, 'Responda o que se pede:', 'Um poliedro convexo de onze faces tem seis faces\r\ntriangulares e cinco faces quadrangulares. O número de arestas e\r\nde vértices do poliedro é, respectivamente:', '[]', 9, 2, 47, 32),
(248, 'Qual deve ser o aumento, em metros, no raio da cisterna para atingir o volume desejado?', 'Para resolver o problema de abastecimento de\r\nágua, foi decidido, numa reunião do condomínio, a construção\r\nde uma nova cisterna. A cisterna atual tem formato cilíndrico,\r\ncom 3 m de altura e 2 m de diâmetro, e estimou-se que a\r\nnova cisterna deverá comportar 81 m3 de água, mantendo o \r\nformato cilíndrico e a altura da atual. Após a inauguração da\r\nnova cisterna a antiga será desativada. Utilize 3', '[]', 9, 2, 47, 3),
(249, 'Responda o que se pede:', 'O número de faces triangulares de uma\r\npirâmide é 11. Pode-se, então, afirmar que esta pirâmide\r\npossui:', '[]', 9, 3, 47, 20),
(250, 'Responda o que se pede:', 'Um poliedro convexo de 16 arestas é formado\r\npor faces triangulares e quadrangulares.\r\nSeccionando-o por um plano convenientemente\r\nescolhido, dele se destaca um novo poliedro\r\nconvexo, que possui apenas faces quadrangulares.\r\nEste novo poliedro possui um vértice a menos que o\r\noriginal e uma face a mais que o número de faces\r\nquadrangulares do original. Sendo m e n,\r\nrespectivamente, o número de ', '[]', 9, 3, 47, 11),
(251, 'Considere o texto abaixo, extraído do romance “Iracema”, de José de Alencar, publicado em 1865.', '“Além, muito além daquela serra, que ainda azula no horizonte, nasceu Iracema.\r\nIracema, a virgem dos lábios de mel, que tinha os cabelos mais negros que a asa da graúna,\r\ne mais longos que seu talhe de palmeira.\r\nO favo da jati não era doce como seu sorriso; nem a baunilha recendia no bosque como seu\r\nhálito perfumado.\r\nMais rápida que a ema selvagem, a morena virgem corria o sertão e as matas do', '[]', 9, 2, 48, 22),
(252, 'Responda o que se pede:', 'A guerra não é travada só pelos exércitos mas pelas próprias nações... Essa é a razão de\r\nessas guerras serem tão sangrentas, ocasionarem tão grandes perdas humanas e\r\nterminarem com a aniquilação da população e a ruína de regiões inteiras.\r\n(Relatório da Comissão Balcânica de Canergie, 1913.\r\nApud Política Externa Brasileira. São Paulo, 2 (3): 77 jan-fev/1994.)\r\nHá evidências de semelhanças entre', '[]', 9, 2, 48, 24),
(253, 'Responda o que se pede:', 'Sobre o Barroco, pode-se afirmar que:', '[]', 9, 2, 48, 71),
(254, 'Responda o que se pede:', 'As dificuldades para que a sociedade humana se estabelecesse e conseguisse construir uma\r\ncultura sofisticada foram imensas. No mundo da modernização, parece que o historiador\r\nperdeu seu ofício e o passado, seu significado. Tudo muda muito rápido, e as invenções\r\nmodernas agitam a sociedade. Busca-se o novo, não se valoriza, como antes, mais a\r\nexperiência.\r\nO texto acima:', '[]', 9, 2, 48, 88),
(255, 'Inspiração no lixo', 'O paulistano Jaime Prades, um dos precursores do grafite e da arte urbana, chegou ao lixo por sua intensa relação com as ruas de São Paulo. “A partir da década de 1980, passei a perceber o desastre que é a ecologia urbana. Quando a gente fala em questão ambiental, sempre se refere à natureza, mas a crise ambiental urbana é forte”, diz Prades. Inspirado pela obra de Frans Krajcberg, há quatro anos', '[]', 9, 2, 49, 3),
(256, 'Responda o que se pede:', 'A peça Fonte foi criada pelo francês Marcel Duchamp e apresentada em Nova Iorque em 1917. A transformação de um urinol em obra de arte representou, entre outras coisas,', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/fcce01714e4dc3780a38bb20bdcc7b78.png\"]', 9, 2, 49, 19),
(257, 'Obra de Marcel Duchamp, criada no contexto da 1a Guerra Mundial', 'A imagem expressa:', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/d3f7197578a2f875b4253c0678ca06c0.png\"]', 9, 2, 49, 90),
(258, 'Responda o que se pede:', 'Em 1956, o artista Flávio de Resende Carvalho desfilou pela Avenida Paulista com o traje New Look, uma proposta tropical para o guarda-roupa masculino. Suas obras mais conhecidas são relacionadas as performances. A imagem permite relacionar como características dessa manifestação artística o uso:', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/be4b1025538347a505d6e35bf5fd3980.png\"]', 9, 1, 49, 3),
(259, 'Responda o que se pede:', 'Com base na figura e nos conhecimentos sobre arte paleolítica, assinale a alternativa CORRETA.', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/afaf318bf708600fb029adbe409ee942.png\"]', 9, 2, 50, 48),
(260, 'Responda o que se pede:', 'As pinturas rupestres são evidências materiais do desenvolvimento intelectual dos seres humanos. Embora tradicionalmente estudadas pela Arqueologia, elas ajudaram a redefinir a concepção de que a História se inicia com a escrita, pois:', '[]', 9, 2, 50, 91),
(261, 'Responda o que se pede:', 'Em várias grutas pré-históricas, ricamente decoradas, foram encontradas pinturas retratando cenas de caça, ou animais como o cavalo e o bisão. Assim é a arte rupestre comumente feita sobre a pedra que pode também ser encontrada em incisões em ossos e madeira. As pinturas e as incisões rupestres surgiram no período:', '[]', 9, 1, 50, 52),
(262, 'Responda o que se pede:', '\"Já se afirmou ser a Pré-História uma continuação da História Natural, havendo uma analogia entre a evolução orgânica e o progresso da cultura\".\r\nSobre a Pré-História, qual das alternativas a seguir é incorreta?', '[]', 9, 2, 50, 50),
(263, 'Responda o que se pede:', '“As Itaquatiaras são gravuras feitas em rochas, pintadas ou não, que circundam leitos de rios. Há exemplares desta técnica em Pernambuco, tanto às margens do São Francisco como nos limites com a Paraíba.”\r\n(Antônio Clarindo Barbosa de Souza e Fábio Gutemberg R. B. Souza – História da Paraíba. EDUFCG p. 19)', '[]', 9, 2, 50, 53),
(264, 'Responda o que se pede:', 'Durante as três últimas décadas, algumas regiões do Centro-Sul do Brasil mudaram do ponto de vista da organização humana, dos espaços herdados da natureza, incorporando padrões que abafaram, por substituição parcial, anteriores estruturas sociais e econômicas. Essas mudanças ocorreram, principalmente, devido à implantação de infraestruturas viárias e energéticas, além da descoberta de impensadas v', '[]', 9, 1, 51, 3),
(265, 'Responda o que se pede:', 'O mercado tende a gerir e regulamentar todas as atividades humanas. Até há pouco, certos campos – cultura, esporte, religião – ficavam fora do seu alcance. Agora, são absorvidos pela esfera do mercado. Os governos confiam cada vez mais nele (abandono dos setores de Estado, privatizações).\r\nRAMONET, I. Guerras do século XXI: novos temores e novas ameaças. Petrópolis: Vozes. 2003.\r\nNo texto é aprese', '[]', 9, 1, 51, 3),
(266, 'Responda o que se pede:', 'Um trabalhador em tempo flexível controla o local do trabalho, mas não adquire maior controle sobre o processo em si. A essa altura, vários estudos sugerem que a supervisão do trabalho é muitas vezes maior para os ausentes do escritório do que para os presentes. O trabalho é fisicamente descentralizado e o poder sobre o trabalhador, mais direto.\r\nSENNETT R. A corrosão do caráter, consequências pes', '[]', 9, 2, 50, 3),
(267, 'A letra dessa canção reﬂete elementos identitários que representam a:', 'Minha vida é andar \r\n\r\nPor esse país \r\n\r\nPra ver se um dia \r\n\r\nDescanso feliz \r\n\r\nGuardando as recordações \r\n\r\nDas terras onde passei \r\n\r\nAndando pelos sertões \r\n\r\nE dos amigos que lá deixei\r\n\r\nGONZAGA, L.; CORDOVIL, H. A vida de viajante, 1953. Disponível em: www.recife.pe.gov.br. Acesso em: 20 fev. 2012 (fragmento).', '[]', 9, 2, 51, 3),
(268, 'Responda o que se pede:', 'Embora haja dados comuns que dão unidade ao fenômeno da urbanização na África, na Ásia e na América Latina, os impactos são distintos em cada continente e mesmo dentro de cada país, ainda que as modernizações se deem com o mesmo conjunto de inovações.\r\nELIAS, D. Fim do século e urbanização no Brasil. Revista Ciência Geográfica, ano IV, n. 11, set/dez. 1988.\r\nO texto aponta para a complexidade da u', '[]', 9, 3, 51, 3),
(269, 'Pode-se afirmar que as principais ações humanas associadas às alterações I, II e III são, respectiva', 'A possível escassez de água é uma das maiores preocupações da atualidade, considerada por alguns especialistas como o desafio maior do novo século. No entanto, tão importante quanto aumentar a oferta é investir na preservação da qualidade e no reaproveitamento da água de que dispomos hoje.\r\nA ação humana tem provocado algumas alterações quantitativas e qualitativas da água:\r\nI. Contaminação de len', '[]', 9, 3, 52, 3),
(270, 'Responda o que se pede:', 'Considerando a riqueza dos recursos hídricos brasileiros, uma grave crise de água em nosso país poderia ser motivada por:', '[]', 9, 1, 52, 3),
(271, 'Responda o que se pede:', 'As áreas do planalto do cerrado – como a chapada dos Guimarães, a serra de Tapirapuã e a serra dos Parecis, no Mato Grosso, com altitudes que variam de 400 m a 800 m – são importantes para a planície pantaneira mato-grossense (com altitude média inferior a 200 m), no que se refere à manutenção do nível de água, sobretudo durante a estiagem. Nas cheias, a inundação ocorre em função d', '[]', 9, 2, 52, 3),
(272, 'Responda o que se pede:', 'Ao destruir uma paisagem de árvores de troncos retorcidos, folhas e arbustos ásperos sobre os solos ácidos, não raro laterizados ou tomados pelas formas bizarras dos cupinzeiros, essa modernização lineariza e aparentemente não permite que se questione a pretensão modernista de que a forma deve seguir a função.\r\nO processo descrito ocorre em uma área biogeográfica com predomínio de vegetação', '[]', 9, 2, 52, 3),
(273, 'Qual tipo climático favorece o processo de alteração do solo descrito no texto?', 'A presunção de que a superfície das chapadas e chapadões representa uma velha peneplanície é corroborada pelo fato de que ela é coberta por acumulações superficiais, tais como massas de areia, camadas de cascalhos e seixos e pela ocorrência generalizada de concreções ferruginosas que formam uma crosta laterítica, denominada “canga”.', '[]', 9, 2, 52, 3),
(274, 'Responda o que se pede:', 'O debate sobre a organização do espaço feito pela Geografia é auxiliado por uma categoria que está ligada à ideia de domínio ou gestão de determinada área. Estas características correspondem à categoria', '[]', 9, 1, 53, 92),
(275, 'Responda o que se pede:', 'Considerando as relações de afetividade e identidade que as pessoas passam a estabelecer através de vivências e vínculos criados, os parâmetros Curriculares Nacionais (1998) entendem que essa categoria geográfica permite que ocorra a comunicação entre o homem e o mundo. O texto faz referência a qual categoria geográfica?', '[]', 9, 2, 53, 42),
(276, 'Menino de engenho', 'A minha mãe sempre me falava do engenho como de um recanto do céu. E uma negra que ela trouxera para criada contava histórias de lá, das moagens, dos banhos de rio, das frutas e dos brinquedos, que me acostumei a imaginar o engenho como qualquer coisa de um conto de fadas, de um reino fabuloso.\r\nO conceito geográfico que define a relação descrita no texto entre indivíduo e espaço é:', '[]', 9, 2, 53, 3),
(277, 'Leia o segmento abaixo.', 'A realidade geográfica apresenta-se então como composta por três elementos fundamentais: um substrato plástico, uma energia de circulação, produzida pelos contatos entre forças opostas, e um conjunto de formas que são como que o efeito desta energia sobre o substrato, justamente sua inscrição. É este último plano, o das inscrições, entendido como fisionomia da Terra, que é o plano propriamente geo', '[]', 9, 1, 53, 8),
(278, 'O Sertão, na forma como os compositores utilizam nas estrofes transcritas acima, pode ser definido c', 'Inté mesmo asa branca\r\nBateu asa no sertão\r\nEntonce eu disse adeus rosinha\r\nGuarda contigo o meu coração\r\nHoje longe muitas légua\r\nNuma triste solidão\r\nEspero a chuva cai de novo\r\nPra mim vortá pro meu sertão [...]', '[]', 9, 2, 53, 53),
(279, 'Responda o que se pede:', 'A ética precisa ser compreendida como um empreendimento coletivo a ser constantemente retomado e rediscutido, porque é produto da relação interpessoal e social. A ética supõe ainda que cada grupo social se organize sentindo-se responsável por todos e que crie condições para o exercício de um pensar e agir autônomos. A relação entre ética e política é também uma questão de educação e luta pela sobe', '[]', 9, 2, 54, 3),
(280, 'Responda o que se pede:', 'O brasileiro tem noção clara dos comportamentos éticos e morais adequados, mas vive sob o espectro da corrupção, revela pesquisa. Se o país fosse resultado dos padrões morais que as pessoas dizem aprovar, pareceria mais com a Escandinávia do que com Bruzundanga (corrompida nação fictícia de Lima Barreto).\r\n\r\nFonte: FRAGA, P. Ninguém é inocente. Folha de S. Paulo. 4 out. 2009 (adaptado).\r\n\r\nO dista', '[]', 9, 2, 54, 3),
(281, 'Responda o que se pede:', 'Quanto ao “choque de civilizações”, é bom lembrar a carta de uma menina americana de sete anos cujo pai era piloto na Guerra do Afeganistão: ela escreveu que — embora amasse muito seu pai — estava pronta a deixá-lo morrer, a sacrificá-lo pelo seu país. Quando o presidente Bush citou suas palavras, elas foram entendidas como manifestação “normal” de patriotismo americano; vamos conduzir uma experiê', '[]', 9, 2, 54, 3),
(282, 'A passagem citada expõe um pensamento caracterizado pela:', 'A pura lealdade na amizade, embora até o presente não tenha existido nenhum amigo leal, é imposta a todo homem, essencialmente, pelo fato de tal dever estar implicado como dever em geral, anteriormente a toda experiência, na ideia de uma razão que determina a vontade segundo princípios a priori.\r\n\r\nFonte: KANT, I. Fundamentação da metafísica dos costumes. São Paulo: Barcarolla, 2009.', '[]', 9, 2, 54, 3),
(283, 'Arrependimentos terminais', 'Em Antes de partir, uma cuidadora especializada em doentes terminais fala do que eles mais se arrependem na hora de morrer. “Não deveria ter trabalhado tanto”, diz um dos pacientes. “Desejaria ter ficado em contato com meus amigos”, lembra outro. “Desejaria ter coragem de expressar meus sentimentos.” “Não deveria ter levado a vida baseando-me no que esperavam de mim”, diz um terceiro. Há cem anos ', '[]', 9, 2, 54, 3),
(284, 'Para Marilena Chauí:', '\"Do ponto de vista da Filosofia, podemos falar em dois grandes momentos de teorização da arte. No primeiro, inaugurado por Platão e Aristóteles, a Filosofia trata as artes sob a forma da poética; no segundo, a partir do século XVIII, sob a forma da estética.\" (Fonte: CHAUÍ, Marilena. Convite a Filosofia. 7.ed. São Paulo: Ática, 2001, p. 321). A partir do enunciado em questão é INCORRETO afirmar qu', '[]', 9, 3, 54, 51),
(285, 'Segundo o filósofo, a dimensão estética da obra de arte caracteriza-se por:', 'Uma obra de arte pode denominar-se revolucionária se, em virtude da transformação estética, representar, no destino exemplar dos indivíduos, a predominante ausência de liberdade, rompendo assim com a realidade social mistificada e petrificada e abrindo os horizontes da libertação. Esta tese implica que a literatura não é revolucionária por ser escrita para a classe trabalhadora ou para a “revoluçã', '[]', 9, 3, 54, 19),
(286, 'Responda o que se pede:', 'Kant definiu a Estética como sendo ciência. E completando, Alexander Brumgarten a definiu como sendo a teoria do belo e das suas manifestações através da arte. Como ciência e teoria do belo, a Estética pretende alcançar um tipo específico de conhecimento que é aquele captado', '[]', 9, 2, 54, 76),
(287, 'Responda o que se pede:', 'Capacidade Subjetiva e Aspectos Universais, são termos que indicam, respectivamente:', '[]', 9, 2, 54, 11),
(288, 'Responda o que se pede:', 'Para resumir sua teoria sobre a beleza, Kant formulou uma expressão que ficou bem conhecida. Que expressão é essa?', '[]', 9, 3, 54, 3),
(289, 'Segundo o pensamento de Santo Agostinho, as verdades contidas na filosofia pagã provêm de que fonte?', '“Quando, pois, se trata das coisas que percebemos pela mente (...) estamos falando ainda em coisas que vemos como presentes naquela luz interior da verdade, pela qual é iluminado e de que frui o homem interior.\r\n\r\nFonte: Santo Agostinho. Do Mestre. São Paulo: Abril Cultural. 1973. p. 320. (Os Pensadores)', '[]', 9, 3, 54, 1),
(290, 'O texto deve ser relacionado com:', 'Seu principal objetivo era demonstrar, por um raciocínio lógico formal, a autenticidade dos dogmas cristãos. A filosofia devia desempenhar um papel auxiliar na realização deste objetivo. Por isso a tese de que a filosofia está a serviço da teologia.', '[]', 9, 1, 54, 93),
(291, 'Responda o que se pede:', 'A respeito daquilo que Santo Tomás de Aquino pensa sobre a relação entre fé e razão, através da correlação entre teologia e filosofia, assinale a alternativa CORRETA.', '[]', 9, 2, 54, 48),
(292, 'Responda o que se pede:', 'A filosofia de Agostinho (354 – 430) é estreitamente devedora do platonismo cristão milanês: foi nas traduções de Mário Vitorino que leu os textos de Plotino e de Porfírio, cujo espiritualismo devia aproximá-lo do cristianismo. Ouvindo sermões de Ambrósio, influenciados por Plotino, que Agostinho venceu suas últimas resistências (de tornar-se cristão).\r\n(Fonte: PEPIN, Jean. Santo Agostinho e a pat', '[]', 9, 2, 54, 10),
(293, 'A Patrística é o primeiro momento da filosofia cristã. Sobre esta tendência filosófica, leia as segu', 'I. a Patrística é um movimento de pensadores cristãos que procura justificar teórica e filosoficamente a concepção de vida e de mundo depreendida da Bíblia.\r\nII. Boécio não é considerado um pensador da Patrística.\r\nIII. Plotino é um pensador considerado como participante da Patrística.\r\nIV. a Patrística sempre rejeitou a filosofia greco-romana em seu todo.\r\nV. Santo Agostinho é considerado o maior', '[]', 9, 3, 54, 6),
(294, 'Responda o que se pede:', 'Dentre as teorias desenvolvidas para explicar a origem da vida, a teoria da abiogênese se constituiu num verdadeiro entrave para o progresso da Biologia. São informações corretas sobre esta teoria:', '[]', 9, 3, 55, 94),
(295, 'Responda de acordo com o seguinte código:', 'I - A teoria da abiogênese, afirma que todo ser vivo nasce, cresce, se reproduz e morre.\r\n\r\nII - De acordo com a teoria da biogênese, a vida só pode ser originada de outra, preexistência e semelhante.\r\n\r\nIII - A teoria da geração espontânea afirma que os seres vivos podem nascer de matéria bruta.', '[]', 9, 3, 55, 95),
(296, 'Responda o que se pede:', 'Muitos pesquisadores tentaram explicar a origem da vida. Sobre isso, é correto afirmar-se que:', '[]', 9, 2, 55, 96),
(297, 'Responda o que se pede:', 'Recentemente, pesquisadores dissolveram, em água, material orgânico extraído de meteoritos e obtiveram coacervados, reforçando a teoria da pangênese sobre a origem da vida. Coacervados são:', '[]', 9, 2, 55, 52),
(298, 'Responda o que se pede:', 'De acordo com a teoria da origem da vida, elaborada por Oparin, são condições essenciais para que a vida tenha surgido na Terra, EXCETO:', '[]', 9, 3, 55, 44),
(299, 'Responda o que se pede:', 'Certos venenos, como o curare, agem nas transmissões sinápticas. Usado pelos índios, o curare bloqueia as sinapses entre neurônios motores e músculos, o que:', '[]', 9, 2, 56, 28),
(300, 'Responda o que se pede:', 'Durante uma prova de maratona, o suprimento de oxigênio torna-se gradualmente insuficiente durante o exercício muscular intenso realizado pelos atletas, a liberação de energia pelas células musculares esqueléticas processa-se cada vez mais em condições relativas de anaerobiose, a partir da glicose. O principal produto acumulado nestas condições é o:', '[]', 9, 2, 56, 28),
(301, 'Responda o que se pede:', 'Além de participar da construção do corpo dos organismos, as proteínas exercem diversas funções. Podemos afirmar, corretamente, que as proteínas Actina e Miosina estão envolvidas no processo de:', '[]', 9, 2, 56, 52),
(302, 'Responda o que se pede:', 'O tecido muscular, responsável pelos movimentos corporais, pode ser classificado, de acordo com as suas características morfológicas e funcionais, em três tipos: esquelético, cardíaco e liso. O(s) tipo(s) muscular(es) que apresenta(m) contração rápida, forte, contínua e involuntária é(são) denominado(s)', '[]', 9, 1, 56, 42),
(303, 'O trecho citado está se referindo ao tecido:', 'Uma pessoa que faz academia fica  \"inchada\" porque a atividade física estimula as células já existentes a aumentarem o seu volume e  consequentemente vemos o crescimento do bíceps, gastrocnêmio e outros.\r\nFonte: S. Lopes, Bio, volume único. Adaptado', '[]', 9, 1, 56, 97),
(304, 'Responda o que se pede:', 'O celoma é a cavidade delimitada diretamente', '[]', 9, 3, 57, 8),
(305, 'Responda o que se pede:', 'A dengue, a febre chikungunya, a febre zika e a febre amarela têm o mesmo agente causador: o mosquito Aedes aegypti, mais precisamente as fêmeas desse mosquito. Autoridades médicas vêm alertando para o aumento na ocorrência de casos de malformação em bebês filhos de mulheres que contraíram a febre zika, embora ainda não se tenha estudos conclusivos acerca da relação entre o zika vírus e esse probl', '[]', 9, 1, 57, 52),
(306, 'Entre as doenças possivelmente causadas pelo zika vírus, encontra-se:', '“Primeira grande epidemia de zika vírus acontece no Brasil”, diz infectologista. - (iG, 13 jan.16. Disponível em: < http://goo.gl/yQ2rNr> Adaptado)', '[]', 9, 3, 57, 68),
(307, 'Responda o que se pede:', 'Um embrião esférico, constituído por uma única camada de pequenas células que circunda uma cavidade preenchida por um líquido, está na fase de:', '[]', 9, 2, 57, 98),
(308, 'Responda o que se pede:', 'A notocorda é um cordão de tecido conjuntivo que representa a primeira estrutura de sustentação do corpo de um cordado, podendo persistir, alterar-se ou desaparecer nos adultos. Pode-se afirmar que a notocorda nos vertebrados:', '[]', 9, 1, 57, 12),
(309, 'Responda o que se pede:', 'Com a intenção de avaliar o efeito dos neurotransmissores na contração muscular, uma terceira pesquisa foi realizada fixando-se a extremidade de uma fatia de músculo cardíaco a um medidor de força. Sobre essa fatia de músculo, o biólogo pingou gotas de cinco diferentes neurotransmissores, uma por vez. O medidor de força mostrou que houve contração após as células musculares terem sido banhadas em:', '[]', 9, 2, 58, 22),
(310, 'Analise as informações sobre o baço humano.', 'I. Ele controla, armazena e destrói células sanguíneas.\r\nII. Sua posição anatômica é à esquerda e atrás do estômago.\r\nIII. Este órgão é responsável pela síntese do colesterol.\r\nIV. Neste órgão ocorre a conversão de amônia em ureia.\r\n\r\nEstão corretas apenas as informações contidas em:', '[]', 9, 3, 58, 22),
(311, 'Responda o que se pede:', '( ) O principal músculo respiratório é o diafragma.\r\n( ) O dióxido de carbono (CO2) é, principalmente, transportado dissolvido no plasma como bicarbonato (HCO3 - ).\r\n( ) A enzima anidrase carbônica, presente no plasma, participa no transporte de oxigênio.\r\n( ) A mioglobina funciona como a reserva de oxigênio para os músculos.\r\nA sequência correta de preenchimento dos parênteses, de cima para baixo', '[]', 9, 2, 58, 8),
(312, 'Responda o que se pede:', 'Um reduzido suprimento de sangue no músculo cardíaco de mamíferos acarreta', '[]', 9, 1, 58, 8),
(313, 'Responda o que se pede:', 'Tem-se observado que a exposição extensa e por longo prazo a pesticidas está associada a problemas à saúde humana, como a neurodegeneração. A destruição de neurônios cuja função é transmitir sinais desde o sistema nervoso central até o órgão motor demonstra que a toxina afetou o:', '[]', 9, 3, 58, 22),
(314, 'Responda o que se pede:', 'Certas infecções hospitalares podem ser de difícil combate por meio de antibióticos comumente utilizados. Este feito deve-se à:', '[]', 9, 2, 59, 99),
(315, 'Responda o que se pede:', 'Na embalagem de um antibiótico, encontra-se uma bula que, entre outras informações, explica a ação do remédio do seguinte modo: O medicamento atua por inibição da síntese proteica bacteriana. Essa afirmação permite concluir que o antibiótico', '[]', 9, 1, 59, 3),
(316, 'Responda o que se pede:', 'Alguns protozoários são parasitas do homem, causando-lhe doenças. Entre as espécies de protozoários parasitas, podemos citar o:', '[]', 9, 1, 59, 100),
(317, 'Responda o que se pede:', 'Sobre os vírus, é correta a afirmação:', '[]', 9, 1, 59, 101),
(318, 'Responda o que se pede:', 'Componente que faz parte da estrutura dos vírus, formado por proteínas que, além de proteger o ácido nucleico viral, tem a capacidade de se combinar quimicamente com substâncias presentes na superfície das células hospedeiras, permitindo ao vírus reconhecer e atacar o tipo de célula adequado a hospedá-lo:', '[]', 9, 1, 59, 101),
(319, 'Responda o que se pede:', '“Para nenhum povo da antiguidade, por mais que consumissem a cerveja, ela foi tão significativa e importante como para os egípcios. Entre eles, além de ter uma função litúrgica determinada no banquete oferecido aos mortos ilustres, a cerveja era a bebida nacional [...]. As mulheres que fabricavam a cerveja tornavam-se sacerdotisas, tal era a importância dessa bebida digna de ser oferecida como lib', '[]', 9, 1, 60, 48),
(320, 'Responda o que se pede:', 'O fermento biológico usado na fabricação de pães provoca o aumento do volume da massa como conseqüência da produção de:', '[]', 9, 1, 60, 25),
(321, 'Responda o que se pede:', 'A cana-de-açúcar é importante matéria prima para a produção de etanol. A energia contida na molécula de etanol e liberada na sua combustão foi:', '[]', 9, 3, 60, 20),
(322, 'Responda o que se pede:', 'A parte comestível do cogumelo (\"champignon\") corresponde ao:', '[]', 9, 2, 60, 68),
(323, 'Responda o que se pede:', 'Assinale a opção que NÃO apresenta uma característica dos seres pertencentes ao Reino Fungi.', '[]', 9, 2, 60, 25),
(324, 'Responda o que se pede:', 'Uma placa é feita de um metal cuja função trabalho W é menor que hν, sendo ν uma frequência no intervalo do espectro eletromagnético visível e h a constante de Planck. Deixada exposta, a placa interage com a radiação eletromagnética proveniente do Sol absorvendo uma potência P. Sobre a ejeção de elétrons da placa metálica nesta situação é correto afirmar que os elétrons:', '[]', 9, 3, 61, 11),
(325, 'Responda o que se pede:', 'A figura mostra dois anteparos opacos à radiação, sendo um com fenda de tamanho variável d, com centro na posição x = 0, e o outro com dois fotodetectores de intensidade da radiação, tal que F1 se situa em x = 0 e F2, em x = L > 4d. No sistema incide radiação eletromagnética de comprimento de onda λ constante. Num primeiro experimento, a relação entre d e λ é tal que d ≫ λ, e são feitas as seguint', '[]', 9, 3, 61, 11),
(326, 'Responda o que se pede:', 'Em 1999, um artigo de pesquisadores de Viena (M. Arndt e outros) publicado na revista Nature mostrou os resultados de uma experiência de interferência realizada com moléculas de fulereno – até então os maiores objetos a exibir dualidade onda-partícula. Nessa experiência, as moléculas de fulereno, que consistem em um arranjo de 60 átomos de carbono, eram ejetadas de um forno e passavam por um siste', '[]', 9, 3, 61, 8);
INSERT INTO `tb_questao` (`idQuestao`, `tituloQuestao`, `textoQuestao`, `imagensQuestao`, `idAdministrador`, `idDificuldade`, `idAssuntoMateria`, `idUniversidade`) VALUES
(327, 'Observações e medidas desse tipo confirmam previsões relativísticas. Com base nos conhecimentos em F', 'Os múons são partículas da família dos léptons, originados pela desintegração de partículas píons em altitudes elevadas na atmosfera terrestre, usualmente a alguns milhares de metros acima do nível do mar. Um múon típico, movendo-se com velocidade de 0, 998 c, realiza um percurso de aproximadamente 600 m durante seu tempo de vida média de 2 × 10−6 s. Contudo, o tempo de vida média desse múon, medi', '[]', 9, 3, 61, 48),
(328, 'Responda o que se pede:', 'Um trem de comprimento igual a 100 m viaja a uma velocidade de 0,8 c, onde c é a velocidade da luz, quando atravessa um túnel de comprimento igual a 70 m. Quando visto por um observador parado ao lado dos trilhos, é CORRETO afirmar que o trem', '[]', 9, 3, 61, 88),
(329, 'O elemento de armazenamento de carga análogo ao exposto no segundo sistema e a aplicação cotidiana c', 'Atualmente, existem inúmeras opções de celulares com telas sensíveis ao toque (touchscreen). Para decidir qual escolher, é bom conhecer as diferenças entre os principais tipos de telas sensíveis ao toque existentes no mercado. Existem dois sistemas básicos usados para reconhecer o toque de uma pessoa:\r\nO primeiro sistema consiste em um painel de vidro normal, recoberto por duas camadas afastadas p', '[]', 9, 2, 62, 3),
(330, 'Responda o que se pede:', 'Um cosmonauta russo estava a bordo da estação espacial MIR quando um de seus rádios de comunicação quebrou. Ele constatou que dois capacitores do rádio de 3 μF e 7 μF ligados em série estavam queimados. Em função da disponibilidade, foi preciso substituir os capacitores defeituosos por um único capacitor que cumpria a mesma função. Qual foi a capacitância, medida em μF, do capacitor utilizado pelo', '[]', 9, 2, 62, 3),
(331, 'Responda o que se pede:', 'Um capacitor de placas paralelas de área A e distância 3h possui duas placas metálicas idênticas, de espessura h e área A cada uma. Compare a capacitância C deste capacitor com a capacitância C0 que ele teria sem as duas placas metálicas.', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/44a663cb03cc014584b18cb6984e5223.png\"]', 9, 3, 62, 11),
(332, 'Responda o que se pede:', 'Nas figuras abaixo, estão ilustradas duas associações de capacitores, as quais serão submetidas a uma mesma d.d.p. de 12V, assim que as respectivas chaves, kA e kB, forem fechadas.\r\nAs relações entre as cargas elétricas (Q) adquiridas pelos capacitores serão:', '[]', 9, 3, 62, 9),
(333, 'Responda o que se pede:', 'Uma diferença de potencial eletrostático V é estabelecida entre os pontos M e Q da rede cúbica de capacitores idênticos mostrada na figura. A diferença de potencial entre os pontos N e P é:', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/cfa2459d0f25bdb55fc0f55b064a7c02.png\"]', 9, 3, 62, 11),
(334, 'Responda o que se pede:', 'Um carro-foguete supersônico está tentando quebrar o recorde de velocidade, correndo no deserto. A ideia é andar em linha reta, no entanto, ele faz leve uma curva, com raio de curvatura de 10.000 metros. Se a velocidade do carro é de 400 m/s e sua massa é de 2000 kg, qual seria a força centrípeta necessária para ele fazer esta curva?', '[]', 9, 1, 63, 3),
(335, 'Em relação às Leis de Newton, considere as afirmações que seguem:', 'I – Um acelerador de partículas faz com que pequenas partículas (prótons, núcleos atômicos) ganhem muita velocidade, chegando a valores próximos à velocidades da luz. Para estudar a aceleração destas partículas, não se pode utilizara a equação FR = m*a.\r\n\r\nII – Todos os movimentos que acontecem na Terra podem ser perfeitamente estudados e descritos utilizando as Leis de Newton.\r\n\r\nIII – As Leis de', '[]', 9, 3, 63, 11),
(336, 'Responda o que se pede:', 'Observe as alternativas abaixo e considere V para verdadeiro e F para falso.\r\n( ) As forças de um par ação – reação podem aparecer em um único objeto.\r\n( ) Uma professora de Física é puxada pela Terra por uma força de 650 N. Como reação a esta força, a professora puxa a Terra em sua direção com uma força de 650 N.\r\n( ) Um gato dorme no parapeito de uma janela, exercendo uma força de 60 N de cima p', '[]', 9, 2, 63, 10),
(337, 'Responda o que se pede:', 'O peso de um objeto depende de dois fatores: sua massa e a intensidade do campo gravitacional do local onde ele está. Esta intensidade do campo pode ser determinada com grande precisão deixando o objeto cair livremente próximo à superfície do planeta e medindo a aceleração deste objeto. No caso da Terra, este valor é de aproximadamente 10/m/s². Assim, qual é o peso de um haltere formado por uma ba', '[]', 9, 3, 63, 102),
(338, 'Responda o que se pede:', 'Após anos de treino numa academia, uma atleta testa sua força, distendendo uma mola de constante elástica k=10000N/m. Ela consegue esticar a mola em 25 cm. Qual o valor da força exercida pela mola em reação ao puxão dado pela atleta?', '[]', 9, 1, 63, 20),
(339, 'Dados: R=0,082 atm.L/mol.K e M(O2)=32g/mol.', 'Assumindo que uma amostra de gás oxigênio puro, encerrada em um frasco, se comporta idealmente, o valor mais próximo da densidade, em gL-1 , desse gás a 273 K e 1,0 atm é:', '[]', 9, 2, 64, 25),
(340, 'Dados: R = 0,082 atm.L. mol-1.K-1; T(K) = 273,15 + T(oC)', 'Ao desejar identificar o conteúdo de um cilindro contendo um gás ideal monoatômico puro, um estudante de Química coletou uma amostra desse gás e determinou sua densidade, d=5,38 g/L, nas seguintes condições de temperatura e pressão: 15ºC e 0,97atm. Com base nessas informações, e assumindo o modelo do gás ideal, calcule a a massa molar do gás .', '[]', 9, 3, 64, 23),
(341, 'NOTE E ADOTE  No interior do frasco descartado havia apenas éter. Massa molar do éter = 74 g K = oC ', 'Um laboratório químico descartou um frasco de éter, sem perceber que, em seu interior, havia ainda um resíduo de 7,4 g de éter, parte no estado líquido, parte no estado gasoso. Esse frasco, de 0,8 L de volume, fechado hermeticamente, foi deixado sob o sol e, após um certo tempo, atingiu a temperatura de equilíbrio T = 37oC, valor acima da temperatura de ebulição do éter. Se todo o éter no estado l', '[]', 9, 2, 64, 20),
(342, 'Responda o que se pede:', 'O comportamento de um gás real aproxima-se do comportamento de gás ideal quando submetido a:', '[]', 9, 2, 64, 65),
(343, 'Responda o que se pede:', 'O estado gasoso caracteriza-se pela distância e agitação das moléculas. Para definir volume de um gás é necessário mencionar a temperatura e a pressão a que a massa gasosa está submetida. Considerando que 1,2x1021 moléculas de gás carbônico estão armazenadas em um recipiente de 50 mL e exercem uma pressão aproximada de 744 mmHg, qual será, em Celsius, a temperatura aproximada do recipiente? (Dados', '[]', 9, 3, 64, 28),
(344, 'Essa técnica considera dois processos de separação de misturas, sendo eles, respectivamente:', 'Um grupo de pesquisadores desenvolveu um método simples, barato e eficaz de remoção de petróleo contaminante na água, que utiliza um plástico produzido a partir do líquido da castanha-de-caju (LCC). A composição química do LCC é muito parecida com a do petróleo e suas moléculas, por suas características, interagem formando agregados com o petróleo. Para retirar os agregados da água, os pesquisador', '[]', 9, 2, 65, 3),
(345, 'A terceira etapa é realizada por meio dos métodos de:', 'A extração de petróleo em águas profundas segue basicamente três etapas:\r\n\r\nperfuração, utilizando uma sonda;\r\ninjeção de água pressurizada, que extrai o petróleo das rochas subterrâneas;\r\nseparação do petróleo misturado com água e pedaços de rochas.', '[]', 9, 2, 65, 69),
(346, 'Responda o que se pede:', 'Durante séculos, filósofos e alquimistas acreditaram que a matéria era constituída de quatro elementos fundamentais: terra, água, ar e fogo. Hoje, contudo, reconhecemos a existência de muito mais do que quatro elementos e alcançamos uma compreensão mais aprofundada sobre o que, de fato, são água, ar, terra e fogo. Sobre esse assunto, são feitas as seguintes afirmativas:\r\n\r\nA água é uma substância ', '[]', 9, 2, 65, 22),
(347, 'Responda o que se pede:', 'Assim como Monsièur Jourdain, o personagem de Molière, que falava em prosa sem sabê-lo, também nós realizamos e presenciamos transformações químicas, sem ter plenamente consciência disso. No dia a dia, muitas transformações químicas acontecem sem que pensemos nelas, como por exemplo:', '[]', 9, 2, 65, 12),
(348, 'Responda o que se pede:', 'Para enfrentar a falta de água em períodos de seca, os moderadores da caatinga constroem poços, cacimbas e açudes. Mesmo assim, na maior parte das vezes, só conseguem obter água salobra, imprópria para consumo. Após se perfurar um poço, obteve-se uma mistura de água salobra e areia. Nesse caso, para se obter água pura, em uma única operação, o método de separação CORRETO é a:', '[]', 9, 3, 65, 71),
(349, 'Leia o poema apresentado a seguir.', 'Pudim de passas\r\nCampo de futebol\r\nBolinhas se chocando\r\nOs planetas do sistema solar\r\nÁtomos\r\nÀs vezes\r\nSão essas coisas\r\nEm química escolar\r\n\r\nFonte: LEAL, Murilo Cruz. Soneto de hidrogênio.São João del Rei: Editora UFSJ, 2011.\r\n\r\nO poema faz parte de um livro publicado em homenagem ao Ano Internacional da Química. A composição metafórica presente nesse poema remete:', '[]', 9, 1, 66, 78),
(350, 'Assinale a alternativa correta em relação a essas afirmativas.', 'Analise as afirmações abaixo, sobre os modelos atômicos.\r\n\r\nI - John Dalton: Afirmava que toda a matéria é formada por partícula extremamente pequena, e é indivisível.\r\nII - Thomson: Formulou a teoria segundo a qual o átomo é uma esfera positiva que, para tornar-se neutra, apresenta elétrons (partículas negativas) presos em sua superfície.\r\nIII - Erwin Schrödinger: O físico propôs a teoria que dem', '[]', 9, 2, 66, 38),
(351, 'Responda o que se pede:', 'Fogos de artifício utilizam sais de diferentes íons metálicos misturados com um material explosivo. Quando incendiados, emitem diferentes colorações. Por exemplo: sais de sódio emitem cor amarela, de bário, cor verde e de cobre, cor azul. Essas cores são produzidas quando os elétrons excitados dos íons metálicos retornam para níveis de menor energia. O modelo atômico mais adequado para explicar es', '[]', 9, 1, 66, 103),
(352, 'Responda o que se pede:', 'A Lei da Conservação da Massa, enunciada por Lavoisier em 1774, é uma das leis mais importantes das transformações químicas. Ela estabelece que, durante uma transformação química, a soma das massas dos reagentes é igual à soma das massas dos produtos. Esta teoria pôde ser explicada, alguns anos mais tarde, pelo modelo atômico de Dalton. Entre as ideias de Dalton, a que oferece a explicação mais ap', '[]', 9, 3, 66, 19),
(353, 'Responda o que se pede:', 'Em um determinado momento histórico, o modelo atômico vigente e que explicava parte da constituição da matéria considerava que o átomo era composto de um núcleo com carga positiva. Ao redor deste, haviam partículas negativas uniformemente distribuídas. A experiência investigativa que levou à proposição desse modelo foi aquela na qual:', '[]', 9, 3, 66, 104),
(354, 'Responda o que se pede:', 'Uma solução de hidróxido de potássio foi preparada dissolvendo-se 16,8 g da base em água suficiente para 200 mL de solução. Dessa solução, o volume que deve ser diluído a 300 mL para que a concentração molar seja 1/3 da solução original é de:', '[]', 9, 3, 67, 44),
(355, 'Responda o que se pede:', 'Em um laboratório, foram misturados 200 mL de solução 0,05 mol/L de cloreto de cálcio (CaCl2) com 600 mL de solução 0,10 mol/L de cloreto de alumínio (AlCl3), ambas aquosas. Considerando o grau de dissociação desses sais igual a 100% e o volume final igual à soma dos volumes de cada solução, a concentração, em quantidade de matéria (mol/L), dos íons cloreto (Cl–) na solução resultante será de:', '[]', 9, 3, 67, 19),
(356, 'Responda o que se pede:', 'Dois litros de solução aquosa sacarose de concentração 50 g/L foram adicionados a 6 litros de solução aquosa de cloreto de sódio (NaCl) de concentração 2 mols/L. Qual a concentração do açúcar e do sal na solução final?', '[]', 9, 2, 67, 105),
(357, 'Responda o que se pede:', 'Uma solução de ácido clorídrico (HCl) 4,0 M foi misturada com outra solução do mesmo ácido (HCl) 1,5 M, obtendo-se 400 mililitros de solução 2,5 M. Os volumes em mililitros das soluções 4,0 M e 1,5 M de HCl que foram adicionadas são, respectivamente?', '[]', 9, 2, 67, 25),
(358, 'Responda o que se pede:', 'Inadvertidamente, uma pessoa deixou cair 2 pastilhas de NaOH(s) em um béquer que continha 100mL de HCl 6 x 10-2 mol/L. Que quantidade de HCl, em mol, restou na solução remanescente?\r\n\r\nDado: massa de 1 pastilha de NaOH = 0,02 g', '[]', 9, 3, 67, 66),
(359, 'Responda o que se pede:', 'Por que a adição de certos aditivos na água dos radiadores de carros evita que ocorra o superaquecimento da mesma e também o seu congelamento, quando comparada com a da água pura?', '[]', 9, 2, 68, 50),
(360, 'Responda o que se pede:', 'Uma certa quantidade de água é colocada em um congelador, cuja temperatura é de - 20 °C. Após estar formado e em equilíbrio térmico com o congelador, o gelo é transferido para outro congelador, cuja temperatura é de - 5 °C.\r\nConsiderando-se essa situação, identifique a alternativa correta, em relação ao gelo, do momento em que é transferido para o segundo congelador até atingir o equilíbrio térmic', '[]', 9, 2, 68, 71),
(361, 'Considerando-se essas observações, identifique a alternativa incorreta.', 'Duas panelas de pressão iguais, uma aberta e outra fechada, foram comparadas quanto às condições de cozimento de uma mesma quantidade de certo alimento. Ambas estavam ao nível do mar e à mesma temperatura. Foram submetidas à mesma fonte de aquecimento e continham a mesma quantidade de água. Observou-se, então, que:\r\n\r\n- a água, na panela aberta, entrou em ebulição em menos tempo que na panela fech', '[]', 9, 3, 68, 71),
(362, 'Responda o que se pede:', 'Qual das opções abaixo contém a sequência correta de ordenação da pressão de vapor saturante das seguintes substâncias CO2, Br2 e Hg, na temperatura de 25 °C?', '[]', 9, 3, 68, 11),
(363, 'Das afirmativas abaixo, identifique as incorretas.', 'Tendo em vista o momento em que um líquido se encontra em equilíbrio com seu vapor, leia atentamente as afirmativas abaixo:\r\n\r\nA evaporação e a condensação ocorrem com a mesma velocidade.\r\nNão há transferência de moléculas entre o líquido e o vapor.\r\nA pressão de vapor do sistema se mantém constante.\r\nA concentração do vapor depende do tempo.', '[]', 9, 3, 68, 44),
(364, 'Responda o que se pede:', 'Ainda hoje, é muito comum as pessoas utilizarem vasilhames de barro (moringas ou potes de cerâmica não-esmaltada) para conservar água a uma temperatura menor do que a do ambiente. Isso ocorre porque:', '[]', 9, 3, 69, 3),
(365, 'Responda o que se pede:', 'A oxidação de 1 g de gordura num organismo humano libera 9.300 calorias. Se o nosso corpo possui 5.300 g de sangue, quanto de gordura deve ser metabolizado para fornecer o calor necessário para elevar a temperatura do sangue da temperatura ambiente (25 °C) até a temperatura de nosso corpo (37 °C)?\r\nObservação: Supor o calor específico do sangue igual ao calor específico da água.', '[]', 9, 2, 69, 35),
(366, 'Responda o que se pede:', 'Ao se sair molhado em local aberto, mesmo em dias quentes, sente-se uma sensação de frio. Esse fenômeno está relacionado com a evaporação da água que, no caso, está em contato com o corpo humano. O que explica essa sensação de frio?', '[]', 9, 2, 69, 71),
(367, 'Considerando-se essas informações, o que é correto afirmar?', 'A dissolução de cloreto de sódio sólido em água foi experimentalmente investigada, utilizando-se dois tubos de ensaio, um contendo cloreto de sódio sólido e o outro, água pura, ambos à temperatura ambiente. A água foi transferida para o tubo que continha o cloreto de sódio. Logo após a mistura, a temperatura da solução formada decresceu pouco a pouco.', '[]', 9, 3, 69, 71),
(368, 'Responda o que se pede:', 'Ao misturar uma solução aquosa de iodeto de potássio com uma solução aquosa de nitrato de chumbo, ocorre a formação imediata de um precipitado amarelo. Aquecendo-se a mistura até próximo da ebullição, o precipitado é totalmente dissolvido, sendo formado novamente com o resfriamento da mistura até a temperatura ambiente. Quanto à fórmula do preciptado formado e à natureza termoquímica de seu proces', '[]', 9, 3, 69, 62),
(369, 'Responda o que se pede:', 'A bexiga natatória de um peixe tem importante papel no controle de sua flutuação na água. Considere que um zoólogo ao estudar a anatomia de dois peixes ósseos de mesmo tamanho – um de água salgada e outro de água doce – verificou que as bexigas natatórias dos dois animais, quando vazias, tinham, aproximadamente, as mesmas dimensões. Se estes animais estivessem vivos, em seus respectivos hábitats e', '[]', 9, 3, 70, 49),
(370, 'Responda o que se pede:', 'Os peixes possuem órgãos que controlam sua flutuabilidade. Os peixes ósseos buscam o equilíbrio através de uma bexiga natatória. Já os tubarões mantêm sua flutuação subaquática através de uma espécie de fígado bastante oleoso e menos denso que a água. As informações acima referem-se, em termos de fisiologia do mergulho, aos órgãos:', '[]', 9, 1, 70, 106),
(371, 'Responda o que se pede:', 'O sistema de respiração branquial dos peixes funciona retirando oxigênio dissolvido na água, captando-o para o seu organismo por intermédio de seus filamentos branquiais, por difusão gasosa. O dióxido de carbono, proveniente do metabolismo, é eliminado para o meio externo também por intermédio dos filamentos branquiais. Tomando como base o texto acima, pode-se afirmar que:', '[]', 9, 2, 70, 106),
(372, 'Responda o que se pede:', 'Os cardumes deslocam-se sincronizadamente na água, sem colisões entre os peixes. Esse fato deve-se à presença de:', '[]', 9, 2, 70, 104),
(373, 'Responda o que se pede:', 'Os anfíbios são classificados em três ordens: Urodela, Anura e Gymnophiona ou Apoda. Assinale a alternativa correta que contém, respectivamente, os animais classificados como anfíbios e pertencentes a essas ordens.', '[]', 9, 1, 70, 38),
(374, 'Analise as afirmações abaixo, classificando-as em verdadeiras (V) ou falsas F.', '( ) Nos mamíferos o coração encontra-se dividido em quatro cavidades: dois átrios e dois ventrículos. Desta forma, o sangue oxigenado não se mistura com o sangue rico em gás carbônico.\r\n\r\n( ) As baleias, os golfinhos e o peixe-boi são exemplos de mamíferos aquáticos e, portanto, as mães amamentam suas crias em baixo da água.\r\n\r\n( ) A característica principal que identifica um mamífero é a presença', '[]', 9, 1, 71, 52),
(375, 'Responda o que se pede:', 'Mamíferos são animais extremamente interessantes, existindo cerca de quatro mil espécies conhecidas, distribuídas pelo mundo. Esses animais encontram-se classificados em dois grandes grupos, onde os ornitorrincos e as équidnas (exclusivos da Austrália) pertencem à Subclasse Prototheria e todos os outros animais estão colocados na Subclasse Theria. Com relação aos mamíferos, são Marsupiais e Placen', '[]', 9, 2, 71, 52),
(376, 'Responda o que se pede:', 'Analise as afirmativas abaixo e assinale a que apresenta características exclusivas da classe dos mamíferos (questão adaptada):', '[]', 9, 2, 71, 107),
(377, 'Responda o que se pede:', 'Em agosto de 2013, foi divulgada a descoberta de um mamífero, o olinguito, que parece uma mistura de gato doméstico e urso de pelúcia, nativo das florestas da Colômbia e do Equador.\r\n\r\nDisponível em:  <http://exame.abril.com.br/ciencia/noticias/americano-olinguito-e-o-mais-novo-mamifero-descoberto>. Acesso em: 20 ago. 2013.\r\n\r\nSobre esse mamífero, pode-se afirmar que deve necessariamente apresenta', '[]', 9, 3, 71, 8),
(378, 'Responda o que se pede:', 'Os animais conhecidos popularmente como “tatuíras”, comuns nas praias do litoral gaúcho, pertencem ao grupo dos crustáceos. Qual das alternativas apresenta somente animais que fazem parte desse grupo taxonômico?', '[]', 9, 2, 72, 8),
(379, 'Responda o que se pede:', 'Artrópodes que apresentam corpo marcadamente subdivido em cabeça, tórax e abdome, apresentando três pares de apêndices locomotores:', '[]', 9, 1, 72, 101),
(380, 'Responda o que se pede:', 'Determine a alternativa que indica um crustáceo, um aracnídeo e um inseto, nesta ordem:', '[]', 9, 1, 72, 50),
(381, 'Responda o que se pede:', '“Todo o sistema hidrovascular está preenchido por um líquido similar à água do mar, exceto pelo fato de que apresenta alguns tipos celulares, proteínas e um alto conteúdo de íons potássio. Quando o animal se locomove, esse sistema opera como um sistema hidráulico e a concentração da ampola determina o alongamento do pé ambulacral. Quando ele entra em contato com o substrato, o centro da ventosa te', '[]', 9, 1, 72, 41),
(382, 'Responda o que se pede:', 'Os equinodermas estão relacionados com os cordados porque:', '[]', 9, 1, 72, 108);

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
(16, 'Obra grandiosa', 1, 5),
(17, 'Jovem estudante', 0, 5),
(18, 'Brasileiro trabalhador', 0, 5),
(19, 'Velho chinês', 0, 5),
(20, 'Fanático religioso', 0, 5),
(21, 'Nos lembrando - despertamos-nos – onde', 0, 6),
(22, 'Nos lembrando - despertamo-nos – as quais', 0, 6),
(23, 'Lembrando-nos - despertamos-nos - cujas', 0, 6),
(24, 'Nos lembrando - nos despertamos - que', 0, 6),
(25, 'Lembrando-nos - despertamo-nos – as quais', 1, 6),
(26, 'Numeral Cardinal', 0, 7),
(27, 'Numeral Ordinal', 0, 7),
(28, 'Numeral Fracionário', 1, 7),
(29, 'Numeral Multiplicativo', 0, 7),
(30, 'Numeral Coletivo', 0, 7),
(31, 'Ele gosta de amores-perfeitos e cultiva-os.', 0, 8),
(32, 'Os vice-diretores reunir-se-ão na próxima semana.', 0, 8),
(33, 'As aulas serão dadas às segundas-feiras.', 0, 8),
(34, 'Há muitos beijas-flores no seu quintal.', 1, 8),
(35, 'A moda está voltando às saias-balão.', 0, 8),
(66, 'Explicativo', 0, 15),
(67, 'Conclusivo', 0, 15),
(68, 'Proporcional', 0, 15),
(69, 'Final', 0, 15),
(70, 'Adversativa', 1, 15),
(76, 'Subordinada substantiva objetiva indireta', 1, 17),
(77, 'Subordinada substantiva objetiva direta', 0, 17),
(78, 'Subordinada substantiva completiva nominal', 0, 17),
(79, 'Subordinada substantiva predicativa', 0, 17),
(80, 'Todas as respostas estão erradas', 0, 17),
(86, 'Coordenada sindética aditiva', 0, 19),
(87, 'Coordenada sindética adversativa', 0, 19),
(88, 'Coordenada sindética conclusiva', 0, 19),
(89, 'Coordenada assindética', 1, 19),
(90, 'Subordinada adversativa', 0, 19),
(91, 'No poema O sedutor médio, é possível reconhecer a presença de posições críticas nos três primeiros versos, em que “juntar expectativas de vida” significa que, juntos, os cônjuges poderiam viver mais, ', 0, 20),
(92, 'Na mensagem veiculada pelo poema, em que os valores da sociedade são ironizados, o que é acentuado pelo uso do adjetivo “médio” no título e do advérbio “meio” no verso final.', 1, 20),
(93, 'No verso “e ser meio felizes?”, em que “meio” é sinônimo de metade, ou seja, no casamento, apenas um dos cônjuges se sentiria realizado.', 0, 20),
(94, 'Nos dois primeiros versos, em que “juntar rendas” indica que o sujeito poético passa por dificuldades financeiras e almeja os rendimentos da mulher.', 0, 20),
(95, 'No título, em que o adjetivo “médio” qualifica o sujeito poético como desinteressante ao sexo oposto e inábil em termos de conquistas amorosas.', 0, 20),
(96, 'Neste ponto viúva amiga, é natural que lhe perguntes, a propósito da Inglaterra como é que se explica, a vitória eleitoral de Gladstone.', 0, 21),
(97, 'Neste ponto, viúva amiga, é natural que lhe perguntes, a propósito da Inglaterra, como é que se explica, a vitória eleitoral de Gladstone.', 1, 21),
(98, 'Neste ponto viúva amiga é natural que, lhe perguntes, a propósito da Inglaterra, como é que se explica, a vitória eleitoral, de Gladstone.', 0, 21),
(99, 'Neste ponto viúva amiga, é natural, que lhe perguntes, a propósito da Inglaterra, como é que, se explica a vitória eleitoral de Gladstone.', 0, 21),
(100, 'Neste ponto viúva amiga, é natural que lhe perguntes, a propósito da Inglaterra como é, que se explica, a vitória eleitoral de Gladstone.', 0, 21),
(101, 'Dois-pontos, ponto-e-vírgula, ponto-e-vírgula', 0, 22),
(102, 'Dois-pontos, vírgula, ponto-e-vírgula', 0, 22),
(103, 'Vírgula, dois-pontos ponto-e-vírgula', 1, 22),
(104, 'Ponto-e-vírgula, dois-pontos, ponto-e-vírgula', 0, 22),
(105, 'Ponto-e-vírgula, vírgula, vírgula', 0, 22),
(106, '1, 2 e 4', 0, 23),
(107, '2,4 e 6.', 0, 23),
(108, '3,4 e 5.', 0, 23),
(109, '2,3 e 4.', 1, 23),
(110, '2, 3 e 5.', 0, 23),
(111, 'Se pensa – encontra-la – agradem-lhe', 0, 24),
(112, 'Pensa-se – encontrar-na – o agradem', 0, 24),
(113, 'Pensa-se – encontrá-la – lhe agradem', 1, 24),
(114, 'Se pensa – encontrar-lha – agradem-no', 0, 24),
(115, 'Pensa-se – encontra-lá – no agradem', 0, 24),
(116, 'Você não devia calar-se.', 0, 25),
(117, 'Não lhe darei qualquer informação.', 0, 25),
(118, 'O filho não o atendeu.', 0, 25),
(119, 'Não privarei-me de meus pequenos prazeres.', 1, 25),
(120, 'Ninguém quer aconselhá-lo.', 0, 25),
(121, 'F, F, V, F, V, V', 0, 26),
(122, 'V, V, F, V, F, F', 0, 26),
(123, 'F, V, F, V, V, V', 1, 26),
(124, 'F, V, V, F, V, V', 0, 26),
(125, 'V, F, F, V, F, F', 0, 26),
(126, 'O governador insistia em afirmar que o assunto principal seria “as grandes questões nacionais”, com o que discordavam líderes pefelistas.', 0, 27),
(127, 'Enquanto Cuba monopolizava as atenções de um clube, do qual nem sequer pediu para integrar, a situação dos outros países passou despercebida.', 0, 27),
(128, 'Em busca da realização pessoal, profissionais escolhem a dedo aonde trabalhar, priorizando à empresas com atuação social.', 0, 27),
(129, 'Uma família de sem-teto descobriu um sofá deixado por um morador não muito consciente com a limpeza da cidade.', 0, 27),
(130, 'O roteiro do filme oferece uma versão de como conseguimos um dia preferir a estrada à casa, a paixão e o sonho à regra, a aventura à repetição.', 1, 27),
(131, 'Cortina de Ferro', 1, 28),
(132, 'Muro de Berlim', 0, 28),
(133, 'União Europeia', 0, 28),
(134, 'Convenção de Ramsar', 0, 28),
(135, 'Conferência de Estocolmo', 0, 28),
(136, 'Reunir os países socialistas como a Alemanha Oriental e a Alemanha Ocidental contra a OTAN.', 0, 29),
(137, 'Consolidar a influência soviética sobre os países da Europa Oriental.', 1, 29),
(138, 'Conter a influência soviética sobre os países da Europa Oriental.', 0, 29),
(139, 'Consolidar a influência socialista na Europa Ocidental.', 0, 29),
(140, 'Consolidar a influência capitalista na Europa Oriental.', 0, 29),
(141, 'Assegurava a penetração de capitais norte-americanos no continente europeu, sobretudo em sua parte oriental.', 0, 30),
(142, 'Garantia, aos norte-americanos, o retorno a uma política isolacionista, voltada unicamente para os seus interesses internos.', 0, 30),
(143, 'Pretendia deter as ameaças soviéticas sobre os países do Oriente Médio, cuja produção de petróleo era vital para as economias ocidentais.', 0, 30),
(144, 'Era um instrumento decisivo na luta contra o avanço do comunismo na Europa arrasada pelo pós-guerra.', 1, 30),
(145, 'Representava uma tomada da tradicional política da \"boa vizinhança\" dos EUA em relação à América Latina.', 0, 30),
(146, 'Expressionismo soviético – que, através de uma orientação estética intimista, procurava expor a “alma inquieta dos povos eslavos”, que passaram a integrar a União das Repúblicas Socialistas Soviéticas', 0, 31),
(147, 'Abstracionismo proletário – que, através da decomposição geométrica do real, exprimia a “ordenação sincrônica da sociedade comunista”.', 0, 31),
(148, 'Realismo socialista – que, através de composições didáticas, esteticamente simplificadas, procurava enaltecer a “combatividade, a capacidade de trabalho e a consciência social” do povo soviético.', 1, 31),
(149, 'Romantismo comunista – que, através de um figurativismo apenas sugestivo, procurava realizar a “idealização do mujique”, o camponês russo típico, como representante das raízes culturais russas.', 0, 31),
(150, 'Concretismo operário – que, através de uma concepção criadora autônoma – não resultante de modelos –, utilizava elementos visuais e táteis, com o objetivo de mostrar a “prevalência do concreto sobre o', 0, 31),
(151, 'A tensão militar existente entre Inglaterra e Alemanha, no final do século XIX, motivada pela disputa, entre os dois Estados Nacionais, pelo controle do comércio no Mar do Norte.', 0, 32),
(152, 'O problema diplomático surgido entre França e Portugal, no início do século XIX, que provocou a vinda da família real portuguesa para o Brasil e a posterior transformação da colônia em Reino Unido.', 0, 32),
(153, 'A invasão francesa na Rússia, no início do século XIX, com a decorrente derrota dos invasores e o fim do período napoleônico.', 0, 32),
(154, 'O conjunto de tensões entre Estados Unidos e União Soviética, resultante da disputa, entre ambas, por uma posição hegemônica no contexto internacional do pós Segunda Guerra Mundial.', 1, 32),
(155, 'A disputa entre Rússia e Japão, no período imediatamente anterior à Primeira Guerra Mundial, por territórios no extremo oriente da Ásia e pelo controle do comércio marítimo no Pacífico.', 0, 32),
(156, 'A fundação de feitorias e a exploração do pau-brasil.', 0, 33),
(157, 'O envio de expedições \'guarda-costas\' para a defesa do litoral.', 0, 33),
(158, 'A presença de franceses \'contrabandeando\' pau-brasil.', 0, 33),
(159, 'A fundação de vilas e cidades e a introdução da escravidão.', 1, 33),
(160, 'N.D.A', 0, 33),
(161, 'I e II', 0, 34),
(162, 'II e III', 0, 34),
(163, 'II e IV', 1, 34),
(164, 'III e IV', 0, 34),
(165, 'I e IV', 0, 34),
(166, 'Portugal não se dedicou regularmente a sua colonização, pois estava voltado prioritariamente para a busca de riquezas no Oriente.', 1, 35),
(167, 'Prevaleceram as atividades extrativistas, que tinham por principal foco a busca e a exploração de ouro nas regiões centrais da colônia.', 0, 35),
(168, 'Portugal estabeleceu rotas regulares de comunicação, interessado na imediata exploração agrícola das férteis terras que a colônia oferecia.', 0, 35),
(169, 'Prevaleceram as disputas pela colônia com outros países europeus e sucessivos episódios de invasão holandesa e francesa no litoral brasileiro.', 0, 35),
(170, 'Portugal implantou fortificações ao longo do litoral e empenhou-se em estender seus domínios em direção ao sul, chegando até a região do Prata.', 0, 35),
(171, 'Retomada de padrões religiosos da Antiguidade.', 0, 36),
(172, 'Defesa do princípio do Livre arbítrio.', 0, 36),
(173, 'Aceitação da diversidade de crenças.', 0, 36),
(174, 'Catequização das populações nativas.', 1, 36),
(175, 'Busca da racionalidade e do espírito científico.', 0, 36),
(176, 'Do destino dado ao produto do trabalho nos seus sistemas culturais.', 1, 37),
(177, 'Da preocupação com a preservação dos recursos ambientais.', 0, 37),
(178, 'Do interesse de ambas em uma exploração comercial mais lucrativa do pau-brasil.', 0, 37),
(179, 'Da curiosidade, reverência e abertura cultural recíprocas.', 0, 37),
(180, 'Da preocupação com o armazenamento de madeira para os períodos de Inverno.', 0, 37),
(181, 'Resultou de um processo político comandado pelos grandes proprietários de terras.', 0, 38),
(182, 'Girou em torno de D. Pedro I com o objetivo de garantir a unidade do país.', 0, 38),
(183, 'Proporcionou mudanças radicais na estrutura de produção para beneficiar as elites.', 1, 38),
(184, 'Continuou a produção a atender as exigências do mercado internacional.', 0, 38),
(185, 'N.D.A', 0, 38),
(191, 'Maior autonomia para os estados e criação do Conselho de Estado.', 0, 40),
(192, 'Maior autonomia para as Províncias e criação da Regência Trina.', 0, 40),
(193, 'Maior autonomia para as províncias e criação da Regência Una.', 1, 40),
(194, 'Maior autonomia para os regentes e criação do Conselho de Estado.', 0, 40),
(195, 'Maior autonomia para o Conselho e extinção das regências.', 0, 40),
(196, 'Uma estratégia para manter a unidade nacional, abalada pelas sucessivas rebeliões provinciais.', 1, 41),
(197, 'O único caminho para que o país alcançasse novo patamar de desenvolvimento econômico e social.', 0, 41),
(198, 'A melhor saída para impedir que o Partido Liberal dominasse a política nacional.', 0, 41),
(199, 'A forma mais viável para o governo aceitar a proclamação da República e a abolição da escravidão.', 0, 41),
(200, 'Uma estratégia para impedir a instalação de um governo ditatorial e simpatizante do socialismo utópico.', 0, 41),
(201, 'Ambos colaboraram para suprimir qualquer fraude nas eleições e faziam forte oposição ao centralismo imperial.', 0, 42),
(202, 'As divergências entre ambos impediram períodos de conciliação, gerando acentuada instabilidade no sistema parlamentar.', 0, 42),
(203, 'Organizado de baixo para cima, o parlamentarismo brasileiro chocou-se com os partidos Liberal e Conservador de composição elitista.', 0, 42),
(204, 'Liberal e Conservador, sem diferenças ideológicas significativas, alternavam-se no poder, sustentando o parlamentarismo de fachada, manipulado pelo imperador.', 1, 42),
(205, 'Os partidos tinham sólidas bases populares e o parlamentarismo seguia e praticava rigidamente o modelo inglês.', 0, 42),
(206, 'Extinguir o casamento religioso.', 0, 43),
(207, 'Implantar o divórcio em substituição ao desquite.', 0, 43),
(208, 'Regularizar a prática do aborto.', 0, 43),
(209, 'Permitir legalmente a eutanásia.', 0, 43),
(210, 'Extinguir o tráfico negreiro.', 1, 43),
(211, 'O Império, aproveitando-se da rebelião dos seringueiros e revelando traços imperialistas, obteve da Bolívia a região do Acre, formalizando a conquista com o Tratado de Petrópolis.', 1, 44),
(212, 'A Questão Christie culminou com o rompimento de relações diplomáticas com a Inglaterra.', 0, 44),
(213, 'O Império interveio militarmente no Uruguai e provocou a queda de Aguirre, do Partido Blanco, apesar da solidariedade que este tinha de Solano Lopes.', 0, 44),
(214, 'O Império interveio militarmente na Argentina, juntamente com algumas províncias deste país, em rebelião contra seu presidente, João Manuel Rosas.', 0, 44),
(215, 'Nenhum atrito digno de registro ocorreu entre o Brasil e o Império Alemão, do qual recebemos numerosos colonos ou imigrantes.', 0, 44),
(216, 'Investigações do pensamento sistemático.', 0, 45),
(217, 'Preocupações do período mitológico.', 0, 45),
(218, 'Discussões de base ontológica.', 1, 45),
(219, 'Habilidades da retórica sofística.', 0, 45),
(220, 'Verdades do mundo sensível.', 0, 45),
(221, 'Estabelecendo um abismo intransponível entre as duas.', 0, 46),
(222, 'Privilegiando os sentidos e subordinando o conhecimento a eles.', 0, 46),
(223, 'Atendo-se à posição de Parmênides de que razão e sensação são inseparáveis.', 0, 46),
(224, 'Afirmando que a razão é capaz de gerar conhecimento, mas a sensação não.', 1, 46),
(225, 'Rejeitando a posição de Parmênides de que a sensação é superior à razão.', 0, 46),
(226, 'Apenas a alternativa II está correta.', 1, 47),
(227, 'As alternativas II e III estão corretas.', 0, 47),
(228, 'Todas as alternativas estão corretas.', 0, 47),
(229, 'As alternativas III e IV estão corretas.', 0, 47),
(230, 'Apenas a alternativa III está correta.', 0, 47),
(231, 'Indicador da imagem do homem no estado de natureza.', 0, 48),
(232, 'Condição necessária para a realização da virtude humana.', 0, 48),
(233, 'Atividade que exige força física e uso limitado da racionalidade.', 1, 48),
(234, 'Referencial que o homem deve seguir para viver uma vida ativa.', 0, 48),
(235, 'Mecanismo de aperfeiçoamento do trabalho por meio da experiência.', 0, 48),
(236, 'Busca por bens materiais e títulos de nobreza.', 0, 49),
(237, 'Plenitude espiritual e ascese pessoal.', 0, 49),
(238, 'Finalidade das ações e condutas humanas.', 1, 49),
(239, 'Conhecimento de verdades imutáveis e perfeitas.', 0, 49),
(240, 'Expressão do sucesso individual e reconhecimento público.', 0, 49),
(241, 'Inércia do julgamento de crimes polêmicos.', 0, 50),
(242, 'Bondade em relação ao comportamento dos mercenários.', 0, 50),
(243, 'Compaixão quanto a condenação de transgressões religiosas.', 0, 50),
(244, 'Neutralidade diante da condenação dos servos.', 0, 50),
(245, 'Conveniência entre o poder tirânico e a moral do príncipe.', 1, 50),
(246, 'Maquiavel se preocupa em analisar a ação política considerando tão-somente as qualidades morais do Príncipe que determinam a ordem objetiva do Estado.', 0, 51),
(247, 'O sentido da ação política, segundo Maquiavel, tem por fundamento originário e, portanto, anterior, a ordem divina, refletida na harmonia da Cidade.', 0, 51),
(248, 'Para Maquiavel, a busca da ordem e da harmonia, em face do desequilíbrio e do caos, só se realiza com a conquista da justiça e do bem comum.', 0, 51),
(249, 'Na reflexão política de Maquiavel, o fim que deve orientar as ações de um Príncipe é a ordem e a manutenção do poder.', 1, 51),
(250, 'A análise de Maquiavel, com base nos valores espirituais superiores aos políticos, repudia como ilegítimo o emprego da força coercitiva do Estado', 0, 51),
(251, 'Munido de virtude, com disposição nata a praticar o bem a si e aos outros.', 0, 52),
(252, 'Possuidor de fortuna, valendo-se de riquezas para alcançar êxito na política.', 0, 52),
(253, 'Guiado por interesses, de modo que suas ações são imprevisíveis e inconstantes.', 1, 52),
(254, 'Naturalmente racional, vivendo em um estado Pré-Social e portando seus direitos naturais.', 0, 52),
(255, 'Sociável por natureza, mantendo relações pacíficas com seus pares.', 0, 52),
(256, 'As atitudes do príncipe são livres da influência dos ministros que ele escolhe para governar.', 0, 53),
(257, 'Basta que o príncipe seja bom e virtuoso para que seu governo obtenha pleno êxito e seja reconhecido pelo povo.', 0, 53),
(258, 'O povo distingue e julga, separadamente, as atitudes do príncipe daquelas de seus ministros.', 0, 53),
(259, 'A escolha dos ministros é irrelevante para garantir um bom governo, desde que o príncipe tenha um projeto político perfeito.', 0, 53),
(260, 'Um príncipe e seu governo são avaliados também pela escolha dos ministros.', 1, 53),
(261, 'Identifica indivíduos despreparados para a vida em comum.', 0, 54),
(262, 'Contribui com a manutenção da ordem e do equilíbrio social.', 1, 54),
(263, 'Estabelece um conjunto de regras para a formação da sociedade.', 0, 54),
(264, 'Determina o que é certo ou errado num contexto de interesses conflitantes.', 0, 54),
(265, 'Representa os interesses da coletividade, expressos pela vontade da maioria.', 0, 54),
(266, 'A dialética.', 0, 55),
(267, 'A escassez.', 1, 55),
(268, 'A alienação.', 0, 55),
(269, 'O valor-trabalho.', 0, 55),
(270, 'O modo de produção.', 0, 55),
(271, 'Ciência das leis gerais do movimento, tanto do mundo externo como do pensamento humano.', 0, 56),
(272, 'Marcha do pensamento que procede por contradição, passando por três fases - tese, antítese e síntese -, reproduzindo o próprio movimento do Ser absoluto ou Ideia.', 1, 56),
(273, 'Sistematização do chamado materialismo histórico.', 0, 56),
(274, 'Organização política e econômica que torna comuns os bens de produção.', 0, 56),
(275, 'Situação do filósofo cujo pensamento supõe comprometimento com a situação social e política vivida.', 0, 56),
(276, 'Estruturalismo.', 0, 57),
(277, 'Pós-modernidade.', 0, 57),
(278, 'Pós-estruturalismo.', 0, 57),
(279, 'Dodecafonismo.', 0, 57),
(280, 'Existencialismo', 1, 57),
(281, 'Noção de método como conjunto de regras, normas e procedimentos gerais, a fim de definir o objeto e para a orientação do pensamento durante a investigação e, posteriormente, para a confirmação ou refu', 0, 58),
(282, 'As leis científicas definem seus objetos conforme sistemas complexos de relações necessárias de causalidade, complementaridade, inclusão e exclusão, objetivando o caráter necessário do objeto e o afas', 0, 58),
(283, 'Distinção entre sujeito e objeto do conhecimento, que permite estabelecer a ideia de subjetividade, isto é, de dependência dos fenômenos em relação ao sujeito que conhece e age.', 1, 58),
(284, 'A ideia de método pressupõe a adequação do pensamento a certos princípios lógicos universalmente válidos, dos quais dependem o conhecimento da verdade e a exclusão do falso.', 0, 58),
(285, 'O objeto científico é submetido à análise e à síntese, que descrevem fatos verificados ou constroem a própria objetividade como um campo de relações internas necessárias, isto é, uma estrutura que pod', 0, 58),
(286, 'Codificam informações transmitidas nos programas infantis por meio da observação.', 0, 59),
(287, 'Adquirem conhecimentos variados que incentivam o processo de interação social.', 0, 59),
(288, 'Interiorizam padrões de comportamento e papéis sociais com menor visão crítica.', 1, 59),
(289, 'Observam formas de convivência social baseadas na tolerância e no respeito.', 0, 59),
(290, 'Apreendem modelos de sociedade pautados na observância das leis.', 0, 59),
(306, 'Apenas em I e II.', 0, 63),
(307, 'Apenas em I e III.', 1, 63),
(308, 'Apenas em II e III.', 0, 63),
(309, 'Apenas em I.', 0, 63),
(310, 'Em I, II e III.', 0, 63),
(311, 'Invocações, simultaneidade de traços, dinamicidade, ausência de sequência temporal e descritor-observador;', 1, 64),
(312, 'Explicações, sequência de traços, estaticidade, sequência temporal e narrador-personagem;', 0, 64),
(313, 'Explicações, sequências de traços, dinamicidade, ausência de conflito narrativo e ausência de narrador;', 0, 64),
(314, 'Invocações, concomitância de traços, estaticidade, ausência de conflito narrativo e ausência de narrador;', 0, 64),
(315, 'Invocações, concomitância de traços, estaticidade, sequência temporal e descritor-observador.', 0, 64),
(316, 'A opção pela abordagem, em linguagem simples e direta, de temas filosóficos.', 0, 65),
(317, 'A prevalência do lirismo amoroso e intimista em relação à temática nacionalista.', 0, 65),
(318, 'O refinamento estético da forma poética e o tratamento metafísico de temas universais.', 1, 65),
(319, 'A evidente preocupação do eu lírico com a realidade social expressa em imagens poéticas inovadoras.', 0, 65),
(320, 'A liberdade formal da estrutura poética que dispensa a rima e a métrica tradicionais em favor de temas do cotidiano.', 0, 65),
(321, 'Temática social; hermetismo; valorização dos tons fortes; materialismo; antítese.', 0, 66),
(322, 'Temática intimista; ocultismo; valorização dos tons fortes; espiritualidade; sinestesia.', 0, 66),
(323, 'Temática intimista; hermetismo; valorização do branco e da transparência; espiritualidade; sinestesia.', 1, 66),
(324, 'Temática bucólica; hermetismo; valorização do branco e da transparência; espiritualidade; antítese.', 0, 66),
(325, 'Temática bucólica; ocultismo; valorização das tonalidades verdes; materialismo; sinestesia.', 0, 66),
(326, 'Impassibilidade, vida descrita objetivamente, ecletismo.', 0, 67),
(327, 'Hermetismo intencional, alquimia verbal, musicalidade.', 1, 67),
(328, 'Favor da forma, expressões ousadas, fidelidade nas observações.', 0, 67),
(329, 'Atmosfera de imprecisão, realismo cru, religiosidade.', 0, 67),
(330, 'Complexidade, ressurreição dos valores humanos, materialismo pornográfico.', 0, 67),
(331, 'A opção pela abordagem, em linguagem simples e direta, de temas filosóficos.', 0, 68),
(332, 'A prevalência do lirismo amoroso e intimista em relação à temática nacionalista.', 0, 68),
(333, 'O refinamento estético da forma poética e o tratamento metafísico de temas universais.', 1, 68),
(334, 'A evidente preocupação do eu lírico com a realidade social expressa em imagens poéticas inovadoras.', 0, 68),
(335, 'A liberdade formal da estrutura poética que dispensa a rima e a métrica tradicionais em favor de temas do cotidiano.', 0, 68),
(336, 'Vai começar suas memórias pela narração de seu nascimento.', 0, 69),
(337, 'Vai adotar uma sequência narrativa invulgar.', 0, 69),
(338, 'Que o levaram a escrever suas memórias duas considerações sobre a vida e a morte.', 0, 69),
(339, 'Vai começar suas memórias pela narração de sua morte.', 1, 69),
(340, 'Vai adotar a mesma sequência narrativa utilizada por Moisés.', 0, 69),
(341, 'O primeiro romance publicado por Machado de Assis foi Dom Casmurro (1899), totalmente integrado à estética romântica, ao pôr em evidência a história de amor entre Bentinho e Capitu.', 0, 70),
(342, 'Brás Cubas, o protagonista do romance Memórias Póstumas de Brás Cubas, é um humanista oriundo da classe trabalhadora, defensor dos direitos dos escravos.', 0, 70),
(343, 'Quincas Borba, único romance de Machado de Assis que apresenta narrador em primeira pessoa, é narrado pelo próprio Quincas.', 0, 70),
(344, 'Várias histórias reúne alguns dos principais contos de Machado de Assis, entre eles \"A causa secreta\", que narra o prazer mórbido que sente Fortunato ao presenciar o sofrimento alheio.', 1, 70),
(345, 'Helena é um romance da última fase de Machado de Assis, já integrado ao realismo, na qual se destaca a ironia que consagrou o autor.', 0, 70),
(346, 'Se apenas IV é correta.', 1, 71),
(347, 'Se apenas I, II são corretas.', 0, 71),
(348, 'Se apenas III e V são corretas.', 0, 71),
(349, 'Se apenas V é correta.', 0, 71),
(350, 'Nenhuma delas é correta.', 0, 71),
(351, 'O artifício narrativo usado é a forma de diário, de modo que o leitor receba as informações do narrador à medida que elas acontecem, mantendo-se assim a tensão.', 0, 72),
(352, 'Elegendo a temática do adultério, o autor resgata o romantismo de seus primeiros romances, com personagens idealizadas entregues à paixão amorosa.', 0, 72),
(353, 'O espaço geográfico e social representado é situado em uma província do Império, buscando demonstrar que as mazelas sociais não são prerrogativa da Corte.', 0, 72),
(354, 'Bentinho desejava a morte de Escobar (até tentou envenená-lo uma vez), a ponto de se sentir culpado quando o ex-amigo morreu afogado.', 0, 72),
(355, 'A narrativa de Bento Santiago é comparável a uma acusação: aproveitando sua formação jurídica, o narrador pretende configurar a culpa de Capitu.', 1, 72),
(356, 'Discurso em primeira pessoa favorece o clima de dúvida que paira sobre o adultério de Capitu, pois o que prevalece na narrativa são as impressões de Bentinho, o narrador.', 0, 73),
(357, 'Além da semelhança de Ezequiel com Escobar, outro fator acentua a dúvida de Bentinho, sobre a paternidade do filho: a capacidade de dissimulação de Capitu.', 0, 73),
(358, 'Adultério, núcleo da narrativa, é um pretexto para se discorrer sobre a existência humana, subordinada ao poder desintegrador do tempo, que atua de forma irreversível sobre todas as coisas.', 0, 73),
(359, 'A alegoria do tenor italiano, que apresenta a vida como uma ópera composta por Deus e pelo diabo, projeta-se em todo o romance, mostrando que, na luta entre as virtudes e os vícios, o Bem sempre triun', 1, 73),
(360, 'Ao tentar reproduzir no Engenho Novo a casa em que se havia criado na antiga rua de Mata-cavalos, ou ao escrever suas memórias, Dom Casmurro tenta reconstruir o passado, logrando invocar-lhe as imagen', 0, 73),
(361, 'Guimarães Rosa – a tendência digressiva e reflexiva do narrador – em linguagem popular ou caipira.', 0, 74),
(362, 'Erico Verissimo – a tendência digressiva e reflexiva do narrador – em linguagem popular ou caipira.', 0, 74),
(363, 'Guimarães Rosa – o contexto econômico e social das personagens – em linguagem popular ou caipira.', 0, 74),
(364, 'Guimarães Rosa – o contexto econômico e social das personagens – em linguagem próxima do padrão culto.', 0, 74),
(365, 'Erico Verissimo – o contexto econômico e social das personagens – em linguagem próxima do padrão culto.', 1, 74),
(366, 'O Modernismo viu esgotados seus ideais, com a retomada de uma prosa e de uma poesia de caráter conservador.', 0, 75),
(367, 'A poesia se renovou significativamente, graças a poetas como Carlos Drummond de Andrade e Murilo Mendes.', 1, 75),
(368, 'Não houve surgimento de grandes romancistas, o que só viria a ocorrer na década seguinte.', 0, 75),
(369, 'Predominou, ainda, o ideário modernista dos primeiros momentos, sendo central a figura de Graça Aranha.', 0, 75),
(370, 'A poesia abandonou de vez o emprego do verso, substituindo-o pela composição de palavras soltas no espaço da página.', 0, 75),
(371, 'Continua o regionalismo dos fins do século passado, sem grandes inovações', 0, 76),
(372, 'Exprime problemas humanos, em estilo próprio, baseado na contribuição linguística regional.', 1, 76),
(373, 'Descreve tipos de várias regiões do Brasil, na tentativa de documentar a realidade brasileira.', 0, 76),
(374, 'Fixa os tipos regionais, com precisão científica.', 0, 76),
(375, 'Idealiza o tipo sertanejo, continuando a tradição de Alencar.', 0, 76),
(376, 'Recriação do mundo sertanejo pela linguagem, a partir da apropriação de recursos da oralidade.', 1, 77),
(377, 'Aproveitamento de elementos pitorescos da cultura regional que tematizam a visão de mundo simplista do homem sertanejo.', 0, 77),
(378, 'Resgate de histórias que procedem do universo popular, contadas de modo original, opondo realidade e fantasia.', 0, 77),
(379, 'Sondagem da natureza universal da existência humana, através de referência a aspectos da religiosidade popular.', 0, 77),
(380, 'Todas as afirmativas são corretas.', 0, 77),
(381, 'Vive preferencialmente nas crianças, livre e fazendo as suas traquinagens.', 0, 78),
(382, 'é capaz de entrar no corpo humano e tomar posse dele, vivendo aí e perturbando a vida do homem.', 0, 78),
(383, 'Só existe na mente das pessoas que nele acreditam, perturbando-as mesmo sem existir concretamente.', 0, 78),
(384, 'Não existe como entidade autônoma, antes reflete os piores estados emocionais do ser humano.', 1, 78),
(385, 'é uma condição humana e não está relacionado com as coisas da natureza.', 0, 78),
(386, 'O proletariado seja contemplado pelo processo de mais-valia.', 0, 79),
(387, 'O trabalho se constitua como o fundamento real da produção material.', 1, 79),
(388, 'A consolidação das forças produtivas seja compatível com o progresso humano.', 0, 79),
(389, 'A autonomia da sociedade civil seja proporcional ao desenvolvimento econômico.', 0, 79),
(390, 'A burguesia revolucione o processo social de formação da consciência de classe', 0, 79),
(391, 'Positivista, pois se fundamenta na busca de objetividade e neutralidade.', 1, 80),
(392, 'Dialética, pois reconhece a existência de uma realidade exterior ao pesquisador.', 0, 80),
(393, 'Kantiana, pois trata da \"coisa em si\"; e realiza a coisificação da realidade.', 0, 80),
(394, 'Nietzschiana, pois coloca a \"vontade de poder\" como fundamento para a pesquisa.', 0, 80),
(395, 'Weberiana, pois aborda a ação social racional atribuída por um sujeito.', 0, 80),
(396, 'Combater ações violentas na guerra entre as nações.', 0, 81),
(397, 'Coagir e servir para refrear a agressividade humana.', 0, 81),
(398, 'Criar limites entre a guerra e a paz praticadas entre os indivíduos de uma mesma nação.', 0, 81),
(399, 'Estabelecer princípios éticos que regulamentam as ações bélicas entre países inimigos.', 0, 81),
(400, 'Organizar as relações de poder na sociedade e entre os Estados.', 1, 81),
(401, 'Religiosos, que se constituem como um olho divino controlador que tudo vê.', 0, 82),
(402, 'Ideológicos, que estabelecem limites pela alienação, impedindo a visão da dominação sofrida.', 0, 82),
(403, 'Repressivos, que perpetuam as relações de dominação entre os homens por meio da tortura física.', 0, 82),
(404, 'Sutis, que adestram os corpos no espaço-tempo por meio do olhar como instrumento de controle.', 1, 82),
(405, 'Consensuais, que pactuam acordos com base na compreensão dos benefícios gerais de se ter as próprias ações controladas.', 0, 82),
(406, 'A padronização dos hábitos e valores alimentares obedece aos ditames da lógica material da sociedade industrializada.', 1, 83),
(407, 'A homogeneização dos hábitos alimentares reflete a inserção crítica dos indivíduos na cultura de massa.', 0, 83),
(408, 'A racionalidade técnica e a padronização dos valores alimentares permitem ampliar as condições de liberdade e de autonomia dos cidadãos.', 0, 83),
(409, 'A massificação dos produtos alimentares sob os ditames do mercado corresponde à efetiva democratização da sociedade.', 0, 83),
(410, 'Nenhuma das anteriores.', 0, 83),
(411, 'Cultura Erudita.', 0, 84),
(412, 'Cultura Popular.', 0, 84),
(413, 'Cultura de Massa.', 1, 84),
(414, 'Cultura Midiática.', 0, 84),
(415, 'Cultura Eletrônica.', 0, 84),
(416, 'Para os autores da teoria crítica, as modernas sociedades industrializadas desenvolvem uma produção cultural diversificada, produzida pelas massas. Essa produção tem por objetivo a satisfação das nece', 0, 85),
(417, 'De acordo com a teoria crítica, as sociedades modernas capitalistas têm como característica fundamental a produção do valor de troca, o que possibilita a existência de uma produção artística e cultura', 0, 85),
(418, 'Segundo os autores da chamada teoria crítica, há uma tendência, na moderna sociedade capitalista, de transformar tudo em mercadorias, fazendo com que o critério estético das pessoas passe a ser difere', 0, 85),
(419, 'De acordo com a teoria crítica, há uma tendência na sociedade moderna capitalista de transformar tudo em mercadoria, fazendo com que o critério estético das pessoas passe a ser o mesmo das coisas. Ess', 1, 85),
(420, 'Nenhuma das anteriores.', 0, 85),
(421, 'I e II', 0, 86),
(422, 'II e III', 0, 86),
(423, 'I e III', 0, 86),
(424, 'I, II, e III', 1, 86),
(425, 'Nenhuma das alternativas.', 0, 86),
(426, 'A cultura diz respeito aos atributos a-históricos que singularizam um povo;', 0, 87),
(427, 'A cultura de um povo é determinada pelo meio natural;', 0, 87),
(428, 'A cultura é herdada biologicamente e condiciona o comportamento dos povos;', 0, 87),
(429, 'A cultura é uma forma de linguagem que tem origem simbólica;', 1, 87),
(430, 'Nenhuma das alternativas emprega corretamente o conceito.', 0, 87),
(431, 'Desestímulo ao processo de privatização de empresas', 0, 88),
(432, 'Esvaziamento econômico do setor de comércio e serviços', 0, 88),
(433, 'Imposição de medidas protecionistas para as empresas nacionais', 0, 88),
(434, 'Facilidade de deslocamento de mercadorias capitais e informações.', 1, 88),
(435, 'Preponderância de empresas nacionais no domínio do mercado financeiro.', 0, 88),
(436, 'Intensa homogeneização do espaço - eliminação das culturas tradicionais', 1, 89),
(437, 'Democracia nos países ricos – autoritarismo e desorganização da sociedade civil nas nações subdesenvolvidas', 0, 89),
(438, 'Incentivo à integração econômica – fragmentação política pelo nacionalismo', 0, 89),
(439, 'Poder das empresas globais – popularização de transportes em massa', 0, 89),
(440, 'Universalização de produtos e facilidade de circulação de riqueza – diferenciação de ritmo e intensidade dos países e populações na globalização.', 0, 89),
(441, 'Os resultados da pesquisa atestam a inadequação do conceito proposto pelo filósofo francês e pelas reflexões sobre as sociedades atuais, pois o conceito está defasado vinte anos em relação a notícia d', 0, 90),
(442, 'Os resultados da pesquisa atestam o grau em que os parâmetros da sociedade de controle foram internalizados pelos indivíduos.', 1, 90),
(443, 'De acordo com o filósofo francês, os acessos informatizados garantem o aumento da autonomia dos indivíduos.', 0, 90),
(444, 'O conceito de sociedade de controle tem sua aplicação restrita a sociedades governadas por ditaduras, não podendo ser aplicados reflexões sobre a sociedade democráticas.', 0, 90),
(445, 'O neoliberalismo, tal como o liberalismo, defende a liberdade do indivíduo como prioridade, o que se expressa por facilidades de trânsitos entre países, diminuição de burocracia alfandegária e incenti', 0, 90),
(446, 'Traçar um novo modelo de desenvolvimento econômico para nossa sociedade com o uso racional dos recursos naturais disponíveis e indisponíveis.', 0, 91),
(447, 'A redução do consumo das reservas naturais com a consequente estagnação do desenvolvimento econômico e tecnológico.', 0, 91),
(448, 'A preservação do equilíbrio global e do valor das reservas de capital natural, o que não justifica a desaceleração do desenvolvimento econômico e político de uma sociedade.', 0, 91),
(449, 'A distribuição homogênea das reservas naturais entre as nações e as regiões em nível global e regional.', 0, 91),
(450, 'Definir os critérios e instrumentos de avaliação do custo-benefício e os efeitos socioeconômicos e os valores reais do consumo e da preservação.', 1, 91),
(451, 'Prática econômica sustentável.', 0, 92),
(452, 'Contenção de impactos ambientais.', 0, 92),
(453, 'Cprogressiva dos recursos naturais.', 0, 92),
(454, 'Proibição permanente da exploração da natureza.', 1, 92),
(455, 'Definição de áreas prioritárias para a exploração econômica.', 0, 92),
(456, 'As cidades de São Paulo e do Rio de Janeiro são chamadas de megalópoles regionais, pois seus parques tecnológicos incrementam o desenvolvimento de indústrias na Região Sudeste.', 0, 93),
(457, 'A rede urbana da Região Nordeste é muito preparada para o turismo internacional e conta com quatro metrópoles nacionais, como as cidades de Recife, Salvador, Fortaleza e São Luís.', 0, 93),
(458, 'A verticalização das cidades é um termo que se utiliza quando a cidade cresce em áreas de grande declividade do terreno.', 0, 93),
(459, 'Uma Região Metropolitana é assim considerada apenas quando o município integrante encontra-se em conurbação.', 0, 93),
(460, 'A chamada terciarização das cidades é o fenômeno de especialização com elevada parte da sua população trabalhando no setor de serviços.', 1, 93),
(461, 'V – V – F – F.', 0, 94),
(462, 'F – V – F – V.', 0, 94),
(463, 'V – F – V – F.', 1, 94),
(464, 'F – F – V – F.', 0, 94),
(465, 'V – V – F – V.', 0, 94),
(466, 'Apenas I.', 0, 95),
(467, 'Apenas II.', 0, 95),
(468, 'Apenas III.', 0, 95),
(469, 'Apenas I e III.', 1, 95),
(470, 'I, II e III.', 0, 95),
(471, 'Migração pendular.', 1, 96),
(472, 'Migração internacional.', 0, 96),
(473, 'Migração interestadual.', 0, 96),
(474, 'Emigração.', 0, 96),
(475, 'êxodo rural.', 0, 96),
(476, 'O processo que levou à formação da metrópole paulistana foi dual, pois, ao trazer modernidade, trouxe também segregação social.', 1, 97),
(477, 'A cidade de São Paulo, no período entre o final da Segunda Guerra Mundial e os anos de 1980, conheceu um processo intenso de desconcentração industrial.', 0, 97),
(478, 'A periferia de São Paulo continua tendo, nos dias de hoje, um papel fundamental de eliminar a fragmentação e a hierarquização espacial.', 0, 97),
(479, 'A periferização, em São Paulo, cresceu com ritmo acelerado até os anos de 1980, e, a partir daí, estagnou, devido à retração de investimentos na metrópole.', 0, 97),
(480, 'A expansão da área construída da metrópole, na década de 1960, permitiu, ao mesmo tempo, ampliar a mancha urbana e eliminar a fragmentação espacial.', 0, 97),
(481, 'Apenas I.', 0, 98),
(482, 'Apenas II.', 0, 98),
(483, 'Apenas I e II.', 1, 98),
(484, 'Apenas I e III.', 0, 98),
(485, 'Apenas II e III.', 0, 98),
(486, 'Apenas I.', 0, 99),
(487, 'Apenas II.', 0, 99),
(488, 'Apenas III.', 0, 99),
(489, 'Apenas I e II.', 1, 99),
(490, 'I, II e III.', 0, 99),
(491, 'Da diminuição – natalidade – transição demográfica – menor', 0, 100),
(492, 'Da manutenção – mortalidade – declínio demográfico – igual', 0, 100),
(493, 'Da diminuição – fecundidade – transição demográfica – maior', 1, 100),
(494, 'Da manutenção – natalidade – estabilidade demográfica – maior', 0, 100),
(495, 'Do aumento – fecundidade – transição demográfica – menor', 0, 100),
(496, 'Noruega, Canadá e Austrália.', 1, 101),
(497, 'Estados Unidos, Índia e Austrália.', 0, 101),
(498, 'Nigéria, Brasil e Canadá.', 0, 101),
(499, 'Rússia, Austrália e China.', 0, 101),
(500, 'Brasil, Paquistão e Argentina.', 0, 101),
(501, 'Apenas I.', 0, 102),
(502, 'Apenas II.', 1, 102),
(503, 'Apenas III.', 0, 102),
(504, 'Apenas I e II.', 0, 102),
(505, 'I, II e III.', 0, 102),
(506, 'Apenas 1.', 0, 103),
(507, 'Apenas 2.', 0, 103),
(508, 'Apenas 3.', 0, 103),
(509, 'Apenas 1 e 3.', 1, 103),
(510, 'Apenas 2 e 3.', 0, 103),
(511, 'Apenas I.', 0, 104),
(512, 'Apenas II.', 0, 104),
(513, 'Apenas I e II.', 0, 104),
(514, 'Apenas II e III.', 1, 104),
(515, 'I, II e III.', 0, 104),
(516, 'Geada – seca – inversão térmica', 1, 105),
(517, 'Neve – chuvas frontais – inundação', 0, 105),
(518, 'Chuvas convectivas – inundação – inversão térmica', 0, 105),
(519, 'Geada – chuvas frontais – inundação', 0, 105),
(520, 'Chuvas convectivas – seca – neve', 0, 105),
(521, 'Furacões, tufões, ciclones, tempestades ciclônicas e ciclones tropicais têm origens diferentes e ocorrem nos mesmos espaços geográficos do planeta.', 0, 106),
(522, 'Eles ocorrem quando do resfriamento da massa de ar, imediatamente acima da água dos oceanos, provocando evaporação e consequente aumento da umidade.', 0, 106),
(523, 'Eles geralmente se originam no oceano Pacífico, estando associados às correntes marinhas frias no Hemisfério Norte.', 0, 106),
(524, 'A maior ocorrência de furacões no Caribe e na América do Norte está associada aos meses frios do inverno boreal.', 0, 106),
(525, 'A ocorrência do furacão Sandy, no mês de outubro de 2012, é o resultado do aumento da intensidade do vento entre regiões com grandes diferenças de temperaturas frias (pressão maior) e quentes (pressão', 1, 106),
(526, 'Apenas I.', 0, 107),
(527, 'Apenas II.', 0, 107),
(528, 'Apenas III.', 0, 107),
(529, 'Apenas II e III.', 0, 107),
(530, 'I, II e III.', 1, 107),
(541, 'Conjunción Adversativa y Preposición', 1, 110),
(542, 'Conjunción Concesiva y Conector', 0, 110),
(543, 'Conjunción Disyuntiva y Preposición de Lugar', 0, 110),
(544, 'Conjunción Adversativa y Conjunción de Lugar', 0, 110),
(545, 'Conjunción Consecutiva y Preposición', 0, 110),
(546, 'Aunque', 0, 111),
(547, 'Sin embargo', 0, 111),
(548, 'Por consiguiente', 0, 111),
(549, 'Desde que', 1, 111),
(550, 'Puesto que', 0, 111),
(551, 'O – e', 0, 112),
(552, 'U – y', 0, 112),
(553, 'O – y', 0, 112),
(554, 'E – u', 0, 112),
(555, 'U – e', 1, 112),
(556, 'Pues', 0, 113),
(557, 'Sin embargo', 1, 113),
(558, 'Sin duda', 0, 113),
(559, 'Mientras', 0, 113),
(560, 'Por supuesto', 0, 113),
(561, 'Conclusión', 0, 114),
(562, 'Finalidade', 0, 114),
(563, 'Duda', 1, 114),
(564, 'Negación', 0, 114),
(565, 'Condición', 0, 114),
(566, 'Nunca viajo en tranvia', 0, 115),
(567, 'Difícilmente viajo en tranvía.', 0, 115),
(568, 'Raramente viajo en tranvía.', 0, 115),
(569, 'Viajo con frecuencia en tranvia', 1, 115),
(570, 'No viajo en tranvía', 0, 115),
(571, 'Mucho - uno – muy', 0, 116),
(572, 'Muy - uno – mucho', 0, 116),
(573, 'Mucho - uno – más', 0, 116),
(574, 'De más - el – máximo', 0, 116),
(575, 'Mucho - un - de veras', 1, 116),
(576, 'Solamente', 0, 117),
(577, 'Unicamente', 0, 117),
(578, 'De vez en cuando', 0, 117),
(579, 'Tal vez', 1, 117),
(580, 'Ocasionalmente', 0, 117),
(581, 'En la montaña hace muy frío.', 0, 118),
(582, 'Así será muy mejor.', 0, 118),
(583, 'Esta corbata fue mucho cara', 0, 118),
(584, 'Mucho me alegra tu visita.', 1, 118),
(585, 'Será mucho peor si no cuentas  nada.', 0, 118),
(586, 'Apenas I.', 0, 119),
(587, 'Apenas II.', 0, 119),
(588, 'Apenas III.', 0, 119),
(589, 'Apenas I e II.', 0, 119),
(590, 'I, II e III.', 1, 119),
(591, 'Té e cortés.', 1, 120),
(592, 'Así e corazón.', 0, 120),
(593, 'Aún e debía.', 0, 120),
(594, 'Cantó e también.', 0, 120),
(595, 'Sí e tenías.', 0, 120),
(596, 'Fenómenos (línea 19) y témpanos (línea 70) son palabras esdrújulas.', 1, 121),
(597, 'Está (línea 10) es una palabra grave terminada en vocal.', 0, 121),
(598, 'Principal (línea 37) y atmósfera (línea 38) son palabras agudas.', 0, 121),
(599, 'Aún (línea 51) es palabra grave, con tilde por terminar en n.', 0, 121),
(600, 'Calor (línea 33) es palabra grave terminada en consonante.', 0, 121),
(601, 'Solo I.', 0, 122),
(602, 'Solo II.', 0, 122),
(603, 'Solo III.', 0, 122),
(604, 'Solo I y II.', 1, 122),
(605, 'I, II y III.', 0, 122),
(606, 'Apenas I.', 1, 123),
(607, 'Apenas II.', 0, 123),
(608, 'Apenas III.', 0, 123),
(609, 'Apenas I e II.', 0, 123),
(610, 'I, II e III.', 0, 123),
(611, 'He', 0, 124),
(612, 'Who', 1, 124),
(613, 'Whose', 0, 124),
(614, 'What', 0, 124),
(615, 'Whom', 0, 124),
(616, 'It - him - it – his', 0, 125),
(617, 'Theys - him - they – him', 0, 125),
(618, 'It - her - it – hers', 0, 125),
(619, 'They - you - they – mine', 1, 125),
(620, 'It - you - it - your', 0, 125),
(621, 'Whom', 0, 126),
(622, 'How', 0, 126),
(623, 'Which', 0, 126),
(624, 'Who', 1, 126),
(625, 'What', 0, 126),
(626, 'Her - your - his - your – their', 0, 127),
(627, 'Her - his - his - your – their', 0, 127),
(628, 'Her - your - his - our – your', 0, 127),
(629, 'Your - your - his - your – their', 0, 127),
(630, 'Her - your - his - your - our', 1, 127),
(631, 'Which', 0, 128),
(632, 'Whom', 0, 128),
(633, 'Who', 1, 128),
(634, 'Whose', 0, 128),
(635, 'What', 0, 128),
(636, 'To find', 0, 129),
(637, 'Fouded', 0, 129),
(638, 'Finding', 1, 129),
(639, 'Found', 0, 129),
(640, 'Finds', 0, 129),
(641, 'Play', 0, 130),
(642, 'Plays', 0, 130),
(643, 'Is playing', 1, 130),
(644, 'Playng', 0, 130),
(645, 'Being play', 0, 130),
(646, 'Are liking', 0, 131),
(647, 'Like', 1, 131),
(648, 'Likes', 0, 131),
(649, 'Is liking', 0, 131),
(650, 'Nenhuma das anteriores', 0, 131),
(651, 'Am seeing', 1, 132),
(652, 'Seeing', 0, 132),
(653, 'Are seeing', 0, 132),
(654, 'See', 0, 132),
(655, 'Nenhuma das anteriores', 0, 132),
(656, 'Obligation', 0, 133),
(657, 'Habit', 0, 133),
(658, 'Inevitability', 0, 133),
(659, 'Request', 0, 133),
(660, 'Possibility', 1, 133),
(661, 'Early', 0, 134),
(662, 'Earlier', 1, 134),
(663, 'More early', 0, 134),
(664, 'Earlyer', 0, 134),
(665, 'Earliest', 0, 134),
(666, '10 percent increase in GDP', 0, 135),
(667, '“child mortality reductions”', 0, 135),
(668, '“equivalent per capita GDP”', 0, 135),
(669, '“economic growth”', 0, 135),
(670, '“one year of schooling”', 1, 135),
(671, 'We are the world\'s leading producer.', 0, 136),
(672, 'You used to wait years to have a telephone installed.', 0, 136),
(673, 'These resources are no longer exploited at the cost of the environment.', 0, 136),
(674, 'Brazilians are as technology-hungry as anywhere in the world.', 1, 136),
(675, 'We are the world\'s largest producer of sugar.', 0, 136),
(676, 'Larger/ The largest // Smaller/ The Smallest', 1, 137),
(677, 'Largger/ The larger // Smaler/ The Smallest', 0, 137),
(678, 'Larger/ The larggest // Smaler/ The Smalest', 0, 137),
(679, 'Largger/ The largest // Smaller/ The Smalest', 0, 137),
(680, 'Largger/ The larggest // Smaller/ The smallest', 0, 137),
(681, 'Somente I está correta.', 0, 138),
(682, 'Somente I e III estão corretas.', 0, 138),
(683, 'Somente I, II e IV estão corretas.', 0, 138),
(684, 'Somente II e IV estão corretas.', 0, 138),
(685, 'Todas estão corretas', 1, 138),
(686, 'Em todo tipo de célula.', 0, 139),
(687, 'Apenas nas células animais.', 0, 139),
(688, 'Apenas nas células vegetais.', 0, 139),
(689, 'Apenas nos vírus.', 0, 139),
(690, 'Bactérias e células vegetais.', 1, 139),
(691, 'Em bactérias, apresenta uma organização diferente da encontrada em células eucariotas.', 0, 140),
(692, 'Existe apenas como envoltório externo das células.', 0, 140),
(693, 'É formada por uma camada dupla de glicoproteínas, com várias moléculas de lipídios encrustadas.', 0, 140),
(694, 'É rígida, garantindo a estabilidade da célula.', 0, 140),
(695, 'Está envolvida em processos como a fagocitose e a pinocitose.', 1, 140),
(696, 'Todas as células dos seres vivos têm parede celular.', 0, 141),
(697, 'Somente as células vegetais têm membrana celular.', 0, 141),
(698, 'Somente as células animais têm parede celular.', 0, 141),
(699, 'Todas as células dos seres vivos têm membrana celular.', 1, 141),
(700, 'Os fungos e bactérias não têm parede celular.', 0, 141),
(701, 'O rugoso está relacionado com o processo de síntese de esteroides;', 0, 142),
(702, 'O liso tem como função a síntese de proteínas;', 0, 142),
(703, 'O liso é responsável pela formação do acrossomo dos espermatozoides;', 0, 142),
(704, 'O rugoso está ligado à síntese de proteína;', 1, 142),
(705, 'O liso é responsável pela síntese de poliolosídios.', 0, 142),
(706, 'Aparelho de Golgi – relacionado com a síntese de polissacarídeos e com a adição de açúcares às moléculas de proteínas.', 0, 143),
(707, 'Retículo endoplasmático rugoso – relacionado com a sínteses de proteínas reduzidas das células.', 0, 143),
(708, 'Peroxissomos – relacionados com os processos de fagocitose e pinocitose, sendo responsáveis pela digestão intracelular.', 1, 143),
(709, 'Lisossomos – ricos em hidrolases ácidas, têm sua origem relacionada com os sacos do aparelho de Golgi.', 0, 143),
(710, 'Retículo endoplasmático liso – relacionado com a secreção de esteroides e com o processo de desintoxicação celular.', 0, 143),
(711, '4 - 3 -1 - 5 - 2.', 0, 144),
(712, '5 - 6 - 3 - 4 - 1', 0, 144),
(713, '4 - 6 - 1 - 5 - 2', 1, 144),
(714, '5 - 4 - 3 - 6 - 1', 0, 144),
(715, '6 - 4 - 2 - 3 - 1', 0, 144),
(716, 'Na composição química das membranas celulares, há fosfolipídios organizados em duas camadas; há também moléculas de proteína.', 0, 145),
(717, 'O colesterol, conhecido principalmente por estar associado ao enfarte e a doenças do sistema circulatório, é um importante componente de membranas celulares.', 0, 145),
(718, 'Um importante polissacarídeo, o amido, é armazenado no fígado e, quando o organismo necessitar, esse polissacarídeo pode ser quebrado, originando moléculas de glicose para o metabolismo energético.', 1, 145),
(719, 'Os íons de cálcio (Ca++) participam das reações de coagulação do sangue e da contração muscular, além de serem componentes fundamentais dos ossos.', 0, 145),
(720, 'Os íons de sódio (Na+) e de potássio (K+), entre outras funções, são responsáveis pelo funcionamento das células nervosas.', 0, 145),
(721, 'Nitrogênio - É constituinte de ácidos nucleicos e proteínas; Fósforo - É constituinte de ácidos nucleicos e proteínas; Potássio - É constituinte de ácidos nucleicos, glicídios e proteínas.', 0, 146),
(722, 'Nitrogênio - Atua no equilíbrio osmótico e na permeabilidade celular; Fósforo - É constituinte de ácidos nucleicos; Potássio - Atua no equilíbrio osmótico e na permeabilidade celular.', 0, 146),
(723, 'Nitrogênio - É constituinte de ácidos nucléicos e proteínas; Fósforo - É constituinte de ácidos nucleicos; Potássio - Atua no equilíbrio osmótico e na permeabilidade celular.', 1, 146),
(724, 'Nitrogênio - É constituinte de ácidos nucleicos, glicídios e proteínas; Fósforo - Atua no equilíbrio osmótico e na permeabilidade celular; Potássio - É constituinte de proteínas.', 0, 146),
(725, 'Nitrogênio - É constituinte de glicídios; Fósforo - É constituinte de ácidos nucleicos e proteínas; Potássio - Atua no equilíbrio osmótico e na permeabilidade celular.', 0, 146),
(726, 'Apenas I e II.', 1, 147),
(727, 'Apenas I e III.', 0, 147),
(728, 'Apenas II e III.', 0, 147),
(729, 'Apenas II e IV.', 0, 147),
(730, 'Apenas II e V', 0, 147),
(731, 'Apenas I.', 1, 148),
(732, 'Apenas II.', 0, 148),
(733, 'Apenas III.', 0, 148),
(734, 'Apenas I e II.', 0, 148),
(735, 'Apenas II e III.', 0, 148),
(736, '3 horas para duplicar seu DNA.', 0, 149),
(737, '1 hora para duplicar seu DNA.', 0, 149),
(738, '8 horas para condensar seus cromossomos.', 0, 149),
(739, '1 hora para descondensar seus cromossomos.', 0, 149),
(740, '8 horas para duplicar seus cromossomos.', 1, 149),
(741, 'Os processos de mitose e meiose ocorrem em todos os seres vivos.', 0, 150),
(742, 'O número cromossômico permanece igual após ambos os processos, contudo as células que realizam o segundo tipo de divisão celular sofrem a permuta gênica, o que gera variabilidade genética.', 0, 150),
(743, 'A transcrição de RNA ocorre principalmente na interfase. Durante os processos de divisões, a transcrição diminui, chegando até à inativação.', 1, 150),
(744, 'Na fase de metáfase, os fusos mitóticos se ligam aos telômeros dos cromossomos.', 0, 150);
INSERT INTO `tb_resposta` (`idResposta`, `textoResposta`, `certaResposta`, `idQuestao`) VALUES
(745, 'Tanto na anáfase da mitose quanto nas anáfases I e II da meiose, as cromátides-irmãs são separadas para os polos opostos.', 0, 150),
(746, 'Interfase, Anáfase I, Telófase II, Anáfase II, Metáfase I.', 0, 151),
(747, 'Prófase I, Anáfase II, Telófase I, Anáfase I e Metáfase I.', 1, 151),
(748, 'Telófase I, Anáfase II, Citocinese I, Telófase II e Prófase I.', 0, 151),
(749, 'Anáfase I, Telófase II, intercinese, Prófase I, Intercinese.', 0, 151),
(750, 'Intercinese, Telófase II, Anáfase I, Metáfase I, Anáfase II.', 0, 151),
(751, 'Cissiparidade.', 1, 152),
(752, 'Esporulação.', 0, 152),
(753, 'Poliembrionia.', 0, 152),
(754, 'Divisão múltipla', 0, 152),
(755, 'Poliploidia.', 0, 152),
(756, 'Lambari, macaco e gavião.', 1, 153),
(757, 'Sapo, foca e lambari.', 0, 153),
(758, 'Golfinho, peixe-boi e galinha.', 0, 153),
(759, 'Sapo, lambari e gafanhoto.', 0, 153),
(760, 'Lagarto, boi e sapo.', 0, 153),
(761, 'Caracóis, poliquetos e onicóforos.', 0, 154),
(762, 'Ouriços-do-mar, lagostas e tubarões.', 0, 154),
(763, 'Caranguejos, minhocas e tubarões.', 1, 154),
(764, 'Gafanhotos, minhocas e corais.', 0, 154),
(765, 'Ouriços-do-mar, nematoides e traíras.', 0, 154),
(766, 'Propriorreceptores.', 0, 155),
(767, 'Mecanorreceptores.', 0, 155),
(768, 'Quimiorreceptores.', 1, 155),
(769, 'Fotorreceptores.', 0, 155),
(770, 'Termorreceptores.', 0, 155),
(771, 'Simetria bilateral.', 0, 156),
(772, 'Segmentação corporal.', 1, 156),
(773, 'Sistema circulatório aberto.', 0, 156),
(774, 'Sistema digestivo completo.', 0, 156),
(775, 'Sistema nervoso difuso.', 0, 156),
(776, 'Cutânea e aberta;', 0, 157),
(777, 'Cutânea e fechada;', 1, 157),
(778, 'Branquial e aberta;', 0, 157),
(779, 'Branquial e fechada;', 0, 157),
(780, 'Traqueal e fechada.', 0, 157),
(781, 'Diblásticos, celomados, segmentados e de simetria radial;', 0, 158),
(782, 'Triblásticos, celomados, não segmentados e de simetria bilateral;', 0, 158),
(783, 'Triblásticos, acelomados, segmentados e de simetria bilateral;', 0, 158),
(784, 'Diblásticos, celomados, segmentados e de simetria bilateral;', 0, 158),
(785, 'Triblásticos, celomados, segmentados e de simetria bilateral.', 1, 158),
(786, 'Marinhos, com projeções laterais denominadas parapódios.', 0, 159),
(787, 'Com ventosas na região anterior e posterior do corpo.', 0, 159),
(788, 'São de sexos separados.', 0, 159),
(789, 'Respiração branquial.', 0, 159),
(790, 'Respiração cutânea.', 1, 159),
(791, 'Cutânea e aberta;', 0, 160),
(792, 'Cutânea e fechada;', 1, 160),
(793, 'Branquial e aberta;', 0, 160),
(794, 'Branquial e fechada;', 0, 160),
(795, 'Traqueal e fechada.', 0, 160),
(801, 'As planárias, apesar de não serem parasitas, são classificadas no Filo Platyhelminthes.', 1, 162),
(802, 'Os pernilongos não são considerados insetos, porque apresentam apenas um par de asas.', 0, 162),
(803, 'As estrelas-do-mar pertencem ao Filo Chordata, pois apresentam esqueleto interno.', 0, 162),
(804, 'Os caramujos não pertencem ao Filo Mollusca (= corpo mole), pois apresentam uma concha dura que os envolve.', 0, 162),
(805, 'Os vertebrados apresentam dois pares de apêndices; portanto, peixes não são vertebrados.', 0, 162),
(806, 'à capacidade regenerativa de seu mesênquima.', 0, 163),
(807, 'Ao sistema nervoso ganglionar ventral.', 0, 163),
(808, 'à presença de células flama.', 0, 163),
(809, 'Aos ocelos acima dos gânglios cerebróides.', 0, 163),
(810, 'à ausência de um sistema circulatório.', 1, 163),
(811, 'I, II e III', 0, 164),
(812, 'II, III e IV', 0, 164),
(813, 'I, II e IV', 1, 164),
(814, 'I, III e IV', 0, 164),
(815, 'Todas anteriores', 0, 164),
(816, 'Dois fatores bióticos', 0, 165),
(817, 'Dois fatores abióticos', 0, 165),
(818, 'Um fator biótico e um abiótico', 0, 165),
(819, 'Um fator abiótico e um biótico', 1, 165),
(820, 'Nenhuma das anteriores', 0, 165),
(821, 'Três populações.', 1, 166),
(822, 'Um ecossistema.', 0, 166),
(823, 'Duas comunidades.', 0, 166),
(824, 'Três comunidades.', 0, 166),
(825, 'Uma população.', 0, 166),
(826, 'População, comunidade e bioma;', 0, 167),
(827, 'Raça, biocenose e biosfera;', 0, 167),
(828, 'Tribo, ecossistema e biocenose;', 0, 167),
(829, 'População, comunidade e biosfera.', 1, 167),
(830, 'Nenhuma das anteriores', 0, 167),
(831, 'Sete comunidades e uma população', 0, 168),
(832, 'Duas comunidades e sete populações', 0, 168),
(833, 'Uma comunidade e sete populações.', 1, 168),
(834, 'Cinco comunidades e três populações', 0, 168),
(835, 'Uma comunidade e uma população.', 0, 168),
(836, '1 – tecido, 2 – órgão, 3 – corpo, 4 – espécie.', 0, 169),
(837, '1 – órgão, 2 – tecido, 3 – organismo, 4 – ecossistema.', 0, 169),
(838, '1 – tecido, 2 – órgão, 3 – organismo, 4 – população.', 1, 169),
(839, '1 – organela, 2 – tecido, 3 – corpo, 4 – população.', 0, 169),
(840, '1 – organela, 2 – órgão, 3 – tecido, 4 – órgão.', 0, 169),
(841, '10km', 1, 170),
(842, '14km', 0, 170),
(843, '2km', 0, 170),
(844, '12km', 0, 170),
(845, '8km', 0, 170),
(846, 'Escalar', 0, 171),
(847, 'Vetorial', 1, 171),
(848, 'Algébrica', 0, 171),
(849, 'Linear', 0, 171),
(850, 'Nenhuma das anteriores', 0, 171),
(851, '110', 0, 172),
(852, '70', 0, 172),
(853, '60', 0, 172),
(854, '50', 1, 172),
(855, '30', 0, 172),
(856, 'I', 0, 173),
(857, 'II', 1, 173),
(858, 'III', 0, 173),
(859, 'IV', 0, 173),
(860, 'V', 0, 173),
(861, '15', 0, 174),
(862, '25', 0, 174),
(863, '100', 0, 174),
(864, '150', 1, 174),
(865, '300', 0, 174),
(866, 'F - V - F - F – V', 0, 175),
(867, 'V - F - V - V – F', 0, 175),
(868, 'V - F - V - V – V', 1, 175),
(869, 'V - V - V - V – F', 0, 175),
(870, 'Nenhuma das anteriores', 0, 175),
(871, 'Falsificação de teses.', 0, 176),
(872, 'Negação da observação.', 0, 176),
(873, 'Proposição de hipóteses.', 1, 176),
(874, 'Contemplação da natureza.', 0, 176),
(875, 'Universalização de conclusões.', 0, 176),
(876, 'Sinônimo de hipótese, ou seja, uma suposição ainda sem comprovação experimental.', 0, 177),
(877, 'Uma ideia sem base em observação e experimentação, que usa o senso comum para explicar fatos do cotidiano.', 0, 177),
(878, 'Uma ideia, apoiada no conhecimento científico, que tenta explicar fenômenos naturais relacionados, permitindo fazer previsões sobre eles.', 1, 177),
(879, 'Uma ideia, apoiada pelo conhecimento científico, que, de tão comprovada pelos cientistas, já é considerada uma verdade incontestável.', 0, 177),
(880, 'Nenhuma das anteriores', 0, 177),
(881, 'O trecho “para a produção do conhecimento em Física interesse é fundamental” (linhas 15-16) significa que um dos motores fundamentais da produção do conhecimento em Física é o interesse do pesquisador', 1, 178),
(882, 'Pedro gosta de Física principalmente porque pode fazer muitos cálculos', 0, 178),
(883, 'O trecho “a Física era coisa de um gênio que faz tudo sozinho” (linha 03) é consistente com a visão atual sobre a produção do conhecimento em Física.', 0, 178),
(884, 'O trecho “as explicações vão se modificando com o tempo” (linha 08) significa que o conhecimento produzido na Física tem pouca validade, pois muda constantemente', 0, 178),
(885, 'O trecho “compreensão mais profunda dos fenômenos físicos” (linhas 08-09) significa que o conhecimento produzido na Física é verdadeiro e imutável.', 0, 178),
(886, 'O argumento I é consistente com a visão atual sobre a produção de conhecimento em Física', 1, 179),
(887, 'O argumento II é consistente com a visão atual sobre a produção de conhecimento em Física.', 0, 179),
(888, 'O argumento III é inconsistente com a visão atual sobre a produção de conhecimento em Física.', 0, 179),
(889, 'O argumento IV é consistente com a visão atual sobre a produção de conhecimento em Física.', 0, 179),
(890, 'O argumento V é consistente com a visão atual sobre a produção de conhecimento em Física.', 0, 179),
(891, '3', 0, 180),
(892, '4', 1, 180),
(893, '7', 0, 180),
(894, '12,25', 0, 180),
(895, '36', 0, 180),
(896, '20', 0, 181),
(897, '30', 0, 181),
(898, '40', 1, 181),
(899, '50', 0, 181),
(900, '60', 0, 181),
(901, '14', 1, 182),
(902, '12', 0, 182),
(903, '72–√', 0, 182),
(904, '6 + 42–√', 0, 182),
(905, '6 + 22–√', 0, 182),
(906, '1', 0, 183),
(907, '2', 0, 183),
(908, '3', 1, 183),
(909, '4', 0, 183),
(910, '5', 0, 183),
(911, 'À mesma área do triângulo AMC', 0, 184),
(912, 'À mesma área do triângulo BNC.', 0, 184),
(913, 'À metade da área formada pelo triângulo ABC.', 0, 184),
(914, 'Ao dobro da área do triângulo MNC.', 0, 184),
(915, 'Ao triplo da área do triângulo MNC.', 1, 184),
(916, '1,75', 0, 185),
(917, '2,00', 1, 185),
(918, '2,33', 0, 185),
(919, '4,00', 0, 185),
(920, '8,00', 0, 185),
(921, '25000m', 0, 186),
(922, '1250m', 1, 186),
(923, '12500m', 0, 186),
(924, '500m', 0, 186),
(925, '250', 0, 186),
(926, 'Ambos os mapas apresentam a mesma riqueza de detalhes.', 0, 187),
(927, 'O mapa “A” apresenta menor riqueza de detalhes que o mapa “B”.', 0, 187),
(928, 'O mapa “A apresenta maior riqueza de detalhes que o mapa “B”.', 1, 187),
(929, 'O mapa “B” é proporcionalmente cinco vezes maior que o mapa “A”.', 0, 187),
(930, 'Os dois mapas possuem o mesmo tamanho.', 0, 187),
(931, '10', 0, 188),
(932, '12', 0, 188),
(933, '15', 1, 188),
(934, '18', 0, 188),
(935, '20', 0, 188),
(936, '360', 0, 189),
(937, '485', 0, 189),
(938, '560', 0, 189),
(939, '740', 0, 189),
(940, '860', 1, 189),
(941, 'R$ 1.800,00 - R$ 25.700,00', 0, 190),
(942, 'R$ 1.300,00 - R$ 17.875,00', 1, 190),
(943, 'R$ 1.400,00 - R$ 18.580,00', 0, 190),
(944, 'R$ 1.600,00 - R$ 19.575,00', 0, 190),
(945, 'R$ 1.700,00 - R$ 21.950,00', 0, 190),
(946, 'R$ 0,85', 0, 191),
(947, 'R$1,15', 1, 191),
(948, 'R$1,45', 0, 191),
(949, 'R$ 2,50', 0, 191),
(950, 'R$ 2,80', 0, 191),
(951, '0,36 R', 0, 192),
(952, '0,40 R', 0, 192),
(953, '0,60 R', 0, 192),
(954, '0,64 R', 1, 192),
(955, 'Nenhuma das anteriores', 0, 192),
(956, 'R$ 900,00', 0, 193),
(957, 'R$ 768,00', 0, 193),
(958, 'R$ 800,00', 1, 193),
(959, 'R$ 660,00', 0, 193),
(960, 'R$ 880,00', 0, 193),
(961, '1', 0, 194),
(962, '2', 0, 194),
(963, '49', 0, 194),
(964, '50', 1, 194),
(965, '51', 0, 194),
(966, '3,0 x 10²kg', 0, 195),
(967, '4,0 x 10²kg', 0, 195),
(968, '8,0 x 10²kg', 1, 195),
(969, '2,4 x 10³Kg', 0, 195),
(970, '4,0 x 10³kg', 0, 195),
(971, 'Permanece a mesma – as tensões nos cabos 1 e 2 permanecem as mesmas', 0, 196),
(972, 'Permanece a mesma – a diminuição da tensão no cabo 1 corresponde a igual aumento na tensão no cabo 2', 1, 196),
(973, 'Aumenta – aumenta a tensão no cabo 2 e permanece a mesma tensão no cabo 1', 0, 196),
(974, 'Aumenta – aumenta a tensão no cabo 1 e permanece a mesma tensão no cabo 2', 0, 196),
(975, 'Diminui – diminui a tensão no cabo 1 e permanece a mesma tensão no cabo 2', 0, 196),
(976, '3.00 kg', 0, 197),
(977, '3,75 kg', 0, 197),
(978, '5.00 kg', 0, 197),
(979, '6.00 kg', 0, 197),
(980, '15.00 kg', 1, 197),
(981, '0,6.', 0, 198),
(982, '1,2.', 1, 198),
(983, '1,5.', 0, 198),
(984, '2,4.', 0, 198),
(985, '4,8.', 0, 198),
(986, '45 vezes', 0, 199),
(987, '35 vezes', 1, 199),
(988, '25 vezes', 0, 199),
(989, '15 vezes', 0, 199),
(990, '7 vezes', 0, 199),
(991, '100 km/h', 0, 200),
(992, '200 km/h', 0, 200),
(993, '110 km/h', 1, 200),
(994, '90 km/h', 0, 200),
(995, '160 km/h', 0, 200),
(996, 'I', 0, 201),
(997, 'II', 0, 201),
(998, 'III', 0, 201),
(999, 'I e II', 0, 201),
(1000, 'II e III', 1, 201),
(1001, '-2 m/s e o movimento é retrógrado.', 0, 202),
(1002, '-2 m/s e o movimento é progressivo.', 0, 202),
(1003, '5,0 m/s e o movimento é progressivo.', 1, 202),
(1004, '5,0 m/s e o movimento é retrógrado.', 0, 202),
(1005, '-2,5 m/s e o movimento é retrógrado.', 0, 202),
(1006, 'S = 4 – 25.t', 0, 203),
(1007, 'S = 25 - 4.t', 1, 203),
(1008, 'S = 25 + 4.t', 0, 203),
(1009, 'S = -4 + 25.t', 0, 203),
(1010, 'S = -25 – 4.t', 0, 203),
(1011, 'Elas agem em objetos diferentes.', 1, 204),
(1012, 'Elas não estão sempre na mesma direção.', 0, 204),
(1013, 'Elas atuam por um longo período de tempo.', 0, 204),
(1014, 'Elas não estão sempre em sentidos opostos.', 0, 204),
(1015, 'Nenhuma das alternativas anteriores.', 0, 204),
(1016, 'Circular', 0, 205),
(1017, 'Parabólica', 0, 205),
(1018, 'Curva qualquer', 0, 205),
(1019, 'Reta', 1, 205),
(1020, 'Espiral', 0, 205),
(1021, 'Uma força que depende da natureza das superfícies de contato.', 0, 206),
(1022, 'Uma força que está relacionada com a área de contato entre as suas superfícies.', 0, 206),
(1023, 'Igual à força de atrito estático máxima.', 0, 206),
(1024, 'Uma força proporcional à reação normal de apoio.', 0, 206),
(1025, 'Qualquer força, por menor que seja, desde que haja uma componente horizontal.', 1, 206),
(1026, 'Lei de Ampère', 0, 207),
(1027, 'Lei de Ohm', 0, 207),
(1028, 'Primeira Lei de Kepler', 0, 207),
(1029, 'Primeira Lei de Newton', 1, 207),
(1030, 'Lei de Snell', 0, 207),
(1031, '100 vezes menor', 0, 208),
(1032, '10 vezes menor', 0, 208),
(1033, 'Igual', 1, 208),
(1034, '10 vezes maior', 0, 208),
(1035, '100 vezes maior', 0, 208),
(1036, 'Cu / Mg / Zn', 0, 209),
(1037, 'Cu / Zn / Mg', 1, 209),
(1038, 'Mg / Zn / Cu', 0, 209),
(1039, 'Zn / Cu / Mg', 0, 209),
(1040, 'Nenhuma das anteriores', 0, 209),
(1041, 'Deslocamento.', 0, 210),
(1042, 'Decomposição.', 0, 210),
(1043, 'Dupla-troca.', 0, 210),
(1044, 'Síntese.', 1, 210),
(1045, 'Nenhuma das anteriores', 0, 210),
(1046, 'I.', 0, 211),
(1047, 'II.', 0, 211),
(1048, 'III.', 0, 211),
(1049, 'I e II.', 0, 211),
(1050, 'I e III.', 1, 211),
(1051, '3', 0, 212),
(1052, '5', 0, 212),
(1053, '7', 1, 212),
(1054, '8', 0, 212),
(1055, '9', 0, 212),
(1056, 'I.', 1, 213),
(1057, 'II.', 0, 213),
(1058, 'III.', 0, 213),
(1059, 'I, II e III.', 0, 213),
(1060, 'II e III.', 0, 213),
(1061, 'O cloro tem menor energia de ionização.', 0, 214),
(1062, 'O sódio tem raio atômico maior.', 1, 214),
(1063, 'O sódio tem maior afinidade eletrônica.', 0, 214),
(1064, 'Os íons de ambos são isoeletrônicos.', 0, 214),
(1065, 'Ambos pertencem ao mesmo grupo da tabela periódica.', 0, 214),
(1066, 'Na Tabela Periódica, os elementos químicos estão colocados em ordem decrescente de massas atômicas.', 0, 215),
(1067, 'Em uma família, os elementos apresentam propriedades químicas bem distintas.', 0, 215),
(1068, 'Em uma família, os elementos apresentam geralmente o mesmo número de elétrons na última camada.', 1, 215),
(1069, 'Em um período, os elementos apresentam propriedades químicas semelhantes.', 0, 215),
(1070, 'Todos os elementos representativos pertencem aos grupos B da tabela periódica.', 0, 215),
(1071, 'O', 0, 216),
(1072, 'As', 0, 216),
(1073, 'Se', 1, 216),
(1074, 'Po', 0, 216),
(1075, 'Nenhuma das anteriores', 0, 216),
(1081, 'A = 1; B = 9; C = 10.', 0, 218),
(1082, 'A = 11; B = 18; C = 19.', 1, 218),
(1083, 'A = 10; B = 19; C = 20.', 0, 218),
(1084, 'A = 12; B = 17; C = 18.', 0, 218),
(1085, 'A = 2; B = 10; C = 11.', 0, 218),
(1086, 'Al+ + OH- → Al(OH)', 0, 219),
(1087, 'Al2+ + 2 OH- → Al(OH)2', 0, 219),
(1088, 'Al3+ + 3 OH- → Al(OH)3', 1, 219),
(1089, 'Al4+ + 4 OH- → Al(OH)4', 0, 219),
(1090, 'Al5+ + 5 OH- → Al(OH)5', 0, 219),
(1091, 'Hidróxido de Ferro II, Hidróxido de Sódio, Hidróxido de Cálcio.', 0, 220),
(1092, 'Hidróxido de Lítio, Hidróxido de Magnésio, Hidróxido de Cálcio.', 0, 220),
(1093, 'Hidróxido de Sódio, Hidróxido de Cálcio, Hidróxido de Magnésio.', 0, 220),
(1094, 'Hidróxido de Ferro II, Hidróxido de Cálcio, Hidróxido de Sódio.', 1, 220),
(1095, 'Hidróxido de Sódio, Hidróxido de Potássio, Hidróxido de Cálcio.', 0, 220),
(1096, 'Tem fórmula NaCl.', 0, 221),
(1097, 'No estado sólido, a atração entre os seus íons é muito forte e por essa razão possui elevado ponto de fusão.', 0, 221),
(1098, 'Em solução aquosa, conduz corrente elétrica muito bem.', 0, 221),
(1099, 'A ligação entre os seus íons é por covalência.', 1, 221),
(1100, 'HCl e NaOH são o ácido e a base que dão origem a esse sal.', 0, 221),
(1101, 'Mg(OH)2 + 2 HClO → Mg(ClO)2 + 2 H2O.', 0, 222),
(1102, 'Mg(OH)2 + 2 HCl → MgCl2 + 2 H2O.', 1, 222),
(1103, 'Mg(OH)2+ 2 HClO3 → Mg(ClO3)2 + 2 H2O.', 0, 222),
(1104, 'Mn(OH)2+ 2 HClO2 → Mn(ClO2)2 + 2 H2O.', 0, 222),
(1105, 'Mn(OH)2+ 2 HCl → MnCl2 + 2 H2O.', 0, 222),
(1106, '0', 0, 223),
(1107, '1', 1, 223),
(1108, '3', 0, 223),
(1109, '6', 0, 223),
(1110, '9', 0, 223),
(1111, '1,5 x 102 vezes a capacidade do reservatório novo.', 0, 224),
(1112, '1,5 x 103 vezes a capacidade do reservatório novo.', 0, 224),
(1113, '1,5 x 106 vezes a capacidade do reservatório novo.', 0, 224),
(1114, '1,5 x 108 vezes a capacidade do reservatório novo.', 0, 224),
(1115, '1,5 x 109 vezes a capacidade do reservatório novo.', 1, 224),
(1116, '10\'12 planetas', 0, 225),
(1117, '10\'17 planetas', 0, 225),
(1118, '10\'23 planetas', 1, 225),
(1119, '10\'121 planetas', 0, 225),
(1120, '10\'220 planetas', 0, 225),
(1121, '2\'11', 0, 226),
(1122, '1\'22', 0, 226),
(1123, '11\'2', 0, 226),
(1124, '4\'11', 0, 226),
(1125, '2\'21', 1, 226),
(1126, 'As três são falsas.', 0, 227),
(1127, 'As três são verdadeiras.', 0, 227),
(1128, 'Somente I e III são verdadeiras.', 0, 227),
(1129, 'Somente I é verdadeira.', 0, 227),
(1130, 'Somente I e II são falsas.', 1, 227),
(1131, 'V, V, V, V, V', 1, 228),
(1132, 'V, F, V, V, V', 0, 228),
(1133, 'V, F, V, V, F', 0, 228),
(1134, 'F, F, V, V, V', 0, 228),
(1135, 'V, F, V, F, F', 0, 228),
(1136, '20', 0, 229),
(1137, '21', 0, 229),
(1138, '24', 0, 229),
(1139, '25', 0, 229),
(1140, '27', 1, 229),
(1141, 'X = 0 e y = 5', 0, 230),
(1142, 'X + y = 7', 1, 230),
(1143, 'X = 0 e y = 1', 0, 230),
(1144, 'X + 2 y = 7', 0, 230),
(1145, 'X = y', 0, 230),
(1146, '0', 0, 231),
(1147, '10', 1, 231),
(1148, '20', 0, 231),
(1149, '30', 0, 231),
(1150, '40', 0, 231),
(1151, '24', 0, 232),
(1152, '36', 0, 232),
(1153, '49', 0, 232),
(1154, '64', 0, 232),
(1155, '89', 1, 232),
(1156, '90 e 4', 0, 233),
(1157, '360 e 4', 0, 233),
(1158, '120 e 2', 0, 233),
(1159, '180 e 2', 1, 233),
(1160, '240 e 2', 0, 233),
(1161, '100', 0, 234),
(1162, '120', 1, 234),
(1163, '140', 0, 234),
(1164, '160', 0, 234),
(1165, '200', 0, 234),
(1166, '1 hora e 30 minutos', 0, 235),
(1167, '2 horas', 1, 235),
(1168, '2 horas e 30 minutos', 0, 235),
(1169, '3 horas', 0, 235),
(1170, '4 horas', 0, 235),
(1171, '5', 0, 236),
(1172, '6', 0, 236),
(1173, '7', 1, 236),
(1174, '8', 0, 236),
(1175, '9', 0, 236),
(1176, '1/8', 0, 237),
(1177, '1/4', 1, 237),
(1178, '1/3', 0, 237),
(1179, '1/2', 0, 237),
(1180, '3/4', 0, 237),
(1181, '5/14', 0, 238),
(1182, '3/7', 0, 238),
(1183, '4/7', 0, 238),
(1184, '9/14', 1, 238),
(1185, '5/7', 0, 238),
(1186, '16,60%', 1, 239),
(1187, '20%', 0, 239),
(1188, '33,30%', 0, 239),
(1189, '50%', 0, 239),
(1190, '66,60%', 0, 239),
(1191, 'Arthur, pois a soma que escolheu é a menor.', 0, 240),
(1192, 'Bernardo, pois há 7 possibilidades de compor a soma escolhida por ele, contra 4 possibilidades para a escolha de Arthur e 4 possibilidades para a escolha de Caio.', 0, 240),
(1193, 'Bernardo, pois há 7 possibilidades de compor a soma escolhida por ele, contra 5 possibilidades para a escolha de Arthur e 4 possibilidades para a escolha de Caio.', 1, 240),
(1194, 'Caio, pois há 10 possibilidades de compor a soma escolhida por ele, contra 5 possibilidades para a escolha de Arthur e 8 possibilidades para a escolha de Bernardo.', 0, 240),
(1195, 'Caio, pois a soma que escolheu é a maior.', 0, 240),
(1196, '1/6', 0, 241),
(1197, '4/9', 0, 241),
(1198, '2/11', 0, 241),
(1199, '5/18', 1, 241),
(1200, '3/7', 0, 241),
(1201, '20,6', 0, 242),
(1202, '21,2', 0, 242),
(1203, '21,8', 1, 242),
(1204, '22,4', 0, 242),
(1205, '23,0', 0, 242),
(1206, 'Maior ou igual a 70 pontos.', 0, 243),
(1207, 'Maior que 70 pontos.', 0, 243),
(1208, 'Maior que 85 pontos.', 0, 243),
(1209, 'Maior ou igual a 85 pontos.', 1, 243),
(1210, 'Maior ou igual a 80 pontos.', 0, 243),
(1211, '7,0', 1, 244),
(1212, '9,0', 0, 244),
(1213, '8,0', 0, 244),
(1214, '10,0', 0, 244),
(1215, '12,0', 0, 244),
(1216, '4 minutos e 51 segundos.', 0, 245),
(1217, '5 minutos e 8 segundos.', 1, 245),
(1218, '5 minutos e 28 segundos.', 0, 245),
(1219, '5 minutos e 49 segundos.', 0, 245),
(1220, '6 minutos e 3 segundos', 0, 245),
(1221, '16', 1, 246),
(1222, '18', 0, 246),
(1223, '24', 0, 246),
(1224, '30', 0, 246),
(1225, '44', 0, 246),
(1226, '34 e 10', 0, 247),
(1227, '19 e 10', 1, 247),
(1228, '34 e 20', 0, 247),
(1229, '12 e 10', 0, 247),
(1230, '19 e 12', 0, 247),
(1231, '0,5', 0, 248),
(1232, '1,0', 0, 248),
(1233, '2,0', 1, 248),
(1234, '3,5', 0, 248),
(1235, '8', 0, 248),
(1236, '33 vértices e 22 arestas.', 0, 249),
(1237, '12 vértices e 11 arestas.', 0, 249),
(1238, '22 vértices e 11 arestas.', 0, 249),
(1239, '11 vértices e 22 arestas.', 0, 249),
(1240, '12 vértices e 22 arestas.', 1, 249),
(1241, 'M = 9, n = 7', 0, 250),
(1242, 'M = n = 9', 1, 250),
(1243, 'M = 8, n = 10', 0, 250),
(1244, 'M = 10, n = 8', 0, 250),
(1245, 'M = 7, n = 9', 0, 250),
(1246, 'O desprezo pelos índios brasileiros, vistos como um entrave ao desenvolvimento nacional, exemplificado, no texto, pela comparação de Iracema a uma ema selvagem.', 0, 251),
(1247, 'O preconceito em relação aos valores e características tipicamente nacionais, dado o caráter tropical e “selvagem” do Brasil, como afirma Alencar, o que demonstra a forte in-fluência européia sobre a ', 0, 251),
(1248, 'A descrição minuciosa e realista da cultura e do modo de vida indígena, como forma de tornar conhecidas as origens da nação brasileira a partir da herança recebida dos índios da tribo tabajara.', 0, 251),
(1249, 'A ruptura entre os modelos clássicos da cultura européia e o tropicalismo brasileiro, o que pode ser percebido em comparações simbólicas como: “nem a baunilha recendia no bosque como seu hálito perfum', 0, 251),
(1250, 'O indianismo e a idealização de ambientes e personagens, pela exaltação de valores nacionais em detrimento das influências européias, com o objetivo de construir uma cultura e uma identidade brasileir', 1, 251),
(1251, 'Nacionalismo.', 1, 252),
(1252, 'Romantismo.', 0, 252),
(1253, 'Liberalismo.', 0, 252),
(1254, 'Socialismo.', 0, 252),
(1255, 'Fascismo.', 0, 252),
(1256, 'Foi uma forma de manifestação artística inspirada nos conceitos pagãos da Idade Média e da Antigüidade.', 0, 253),
(1257, 'Fez uso da grandeza excessiva, do extravagante, do artificial, para expressar as concepções de mundo moderno.', 1, 253),
(1258, 'Surgiu nos países anglo-saxões, no final do século XVII, e se espalhou por toda a Europa no século XVIII.', 0, 253),
(1259, 'Impôs uma nítida diferenciação entre as formas artísticas, como a pintura, a escultura e a arquitetura.', 0, 253),
(1260, 'Nenhuma das anteriores', 0, 253),
(1261, 'é muito pessimista, pois a sociedade humana fez conquistas fabulosas e resolveu problemas aparentemente insuperáveis com a chegada da globalização.', 0, 254),
(1262, 'Sintetiza bem as angústias e os desejos dos tempos modernos, onde o progresso encanta e há a possibilidade, sempre crescente, de se atingir a harmonia social.', 0, 254),
(1263, 'Exalta o valor da experiência, cometendo um equívoco histórico.', 0, 254),
(1264, 'Faz uma síntese de questões importantes para o historiador, num mundo de mudanças rápidas e surpreendentes que, muitas vezes, não se preocupa em valorizar o passado.', 1, 254),
(1265, 'é bastante equivocado, pois nunca se teve tanta certeza sobre o valor do passado como nos tempos atuais.', 0, 254),
(1266, 'Reflexão sobre a responsabilidade ambiental do homem.', 1, 255),
(1267, 'Valorização da poética em detrimento do conteúdo.', 0, 255),
(1268, 'Preocupação com o belo encontrado na natureza.', 0, 255),
(1269, 'Percepção da obra como suporte da memória.', 0, 255),
(1270, 'Reutilização do lixo como forma de consumo.', 0, 255),
(1271, 'A alteração do sentido de um objeto do cotidiano e uma crítica às convenções artísticas então vigentes.', 1, 256),
(1272, 'A crítica à vulgarização da arte e a ironia diante das vanguardas artísticas do final do século XIX.', 0, 256),
(1273, 'O esforço de tirar a arte dos espaços públicos e a insistência de que ela só podia existir na intimidade.', 0, 256),
(1274, 'A vontade de expulsar os visitantes dos museus, associando a arte a situações constrangedoras.', 0, 256),
(1275, 'O fim da verdadeira arte, do conceito de beleza e importância social da produção artística.', 0, 256),
(1276, 'Crise dos velhos valores e padrões e busca de um olhar crítico sobre objetos de consumo.', 1, 257),
(1277, 'Fascínio pelo advento das novas tecnologias e exaltação ao progresso industrial capitalista.', 0, 257),
(1278, 'Desencanto com a Guerra e busca de explicações religiosas para o mundo contemporâneo.', 0, 257),
(1279, 'Apego ao passado e tentativa de resgatar funções específicas dos objetos.', 0, 257),
(1280, 'Sacralização e funcionalidade da arte, próprias da Belle Époque europeia.', 0, 257),
(1281, 'Da intimidade, da política e do corpo.', 0, 258),
(1282, 'Do público, da ironia e da dor.', 0, 258),
(1283, 'Do espaço urbano, da intimidade e do drama.', 0, 258),
(1284, 'Da moda, do drama e do humor.', 0, 258),
(1285, 'Do corpo, da provocação e da moda.', 1, 258),
(1286, 'A pintura feita com guache é uma característica desse período, que consiste na mistura de alguns tipos de terra; tais pinturas serviam para catalogar o que haviam caçado, garantindo a diversidade de e', 0, 259),
(1287, 'As pinturas e os desenhos foram feitos com pigmentos minerais e vegetais, fixados com gordura animal; tais produções são relacionadas a aspectos mágicos, presentes no cotidiano das organizações pré-hi', 1, 259),
(1288, 'As pinturas funcionavam como oferenda aos deuses e, pelas dimensões, é possível perceber o nível de reverência; os artistas desse período empenhavam-se na produção de uma arte religiosa com fins decor', 0, 259),
(1289, 'As pinturas e os desenhos encontrados nas grutas eram feitos como afrescos e representam figuras híbridas, metade humana e metade animal; os mitos gregos têm suas origens nessas imagens da pré-históri', 0, 259),
(1290, 'Nos registros encontrados nas cavernas, as figuras de destaque remetem à flora; para os povos paleolíticos esses desenhos caracterizaram o momento em que deixaram de ser nômades e, para a história, fo', 0, 259),
(1291, 'Funcionam como códices velados de uma comunidade à espera de decifração.', 1, 260),
(1292, 'Expressam uma concepção de tempo marcada pela cronologia', 0, 260),
(1293, 'Indicam o predomínio da técnica sobre as forças da natureza.', 0, 260),
(1294, 'Atestam as relações entre registros gráficos e mitos de origem.', 0, 260),
(1295, 'Registram a supremacia do indivíduo sobre os membros de seu grupo.', 0, 260),
(1296, 'Glacial.', 0, 261),
(1297, 'Paleolítico.', 1, 261),
(1298, 'Mesolítico.', 0, 261),
(1299, 'Neolítico.', 0, 261),
(1300, 'Nenhuma das anteriores', 0, 261),
(1301, 'Várias ciências auxiliam o estudo, como a Antropologia, a Arqueologia e a Química.', 0, 262),
(1302, 'A Pré-História pode ser dividida em Paleolítico e Neolítico, no que se refere ao processo técnico de trabalhar a pedra.', 0, 262),
(1303, 'Sobre o Paleolítico, podemos afirmar que foi o período de grande desenvolvimento artístico, cujo exemplo são as pinturas antropomorfas e zoomorfas realizadas nas cavernas.', 0, 262),
(1304, 'O Neolítico apresentou um desenvolvimento artístico diferente do Paleolítico, através dos traços geométricos do desenho e da pintura.', 0, 262),
(1305, 'Os primeiros seres semelhantes ao homem foram os Australopitecus e o Homem de Java que eram bem mais adaptados que o Homem de Neanderthal.', 1, 262),
(1306, 'O sítio arqueológico do Ingá de Bacarmate abrange uma área de aproximadamente 82 hectares, sendo considerado o maior do Brasil', 0, 263),
(1307, 'As Itaquatiaras do Ingá são formadas por um só bloco de gnaisse, medindo aproximadamente 52 m de comprimento por 10 de largura.', 0, 263),
(1308, 'As gravuras do painel (Itaquatiárias do Ingá) representam exclusivamente figuras zoomorfas, não existindo presença de fitomorfos e antropomorfos.', 0, 263),
(1309, 'As Itaquatiaras mais famosas do Brasil são as do Ingá, na Paraíba, por serem únicas no mundo em sua forma, constituindo um enigma e desafio para os estudiosos da pré-história.', 1, 263),
(1310, 'A importância do sítio arqueológico do Ingá de Bacarmate se dá devido a ser o único do estado da Paraíba e por estar situado na região do Piemonte da Borborema, a 84 km de João Pessoa e 30 km de Campi', 0, 263),
(1311, 'Expansão do mercado interno.', 0, 264),
(1312, 'Valorização do manejo familiar.', 0, 264),
(1313, 'Exploração de espécies nativas.', 0, 264),
(1314, 'Modernização de métodos produtivos.', 1, 264),
(1315, 'Incorporação de mão de obra abundante.', 0, 264),
(1316, 'Socialismo', 0, 265),
(1317, 'Feudalismo', 0, 265),
(1318, 'Capitalismo', 1, 265),
(1319, 'Anarquismo', 0, 265),
(1320, 'Comunitarismo', 0, 265),
(1321, 'As tecnologias de informação sejam usadas para democratizar as relações laborais.', 0, 266),
(1322, 'As estruturas burocráticas sejam transferidas da empresa para o espaço doméstico.', 0, 266),
(1323, 'Os procedimentos de terceirização sejam aprimorados pela qualificação profissional.', 0, 266),
(1324, 'As organizações sindicais sejam fortalecidas com a valorização da especialização funcional.', 0, 266),
(1325, 'Os mecanismos de controle sejam deslocados dos processos para os resultados do trabalho.', 1, 266),
(1326, 'Valorização das características naturais do Sertão nordestino', 0, 267),
(1327, 'Denúncia da precariedade social provocada pela seca.', 0, 267),
(1328, 'Experiência de deslocamento vivenciada pelo migrante.', 1, 267),
(1329, 'Profunda desigualdade social entre as regiões brasileiras.', 0, 267),
(1330, 'Discriminação dos nordestinos nos grandes centros urbanos.', 0, 267),
(1331, 'Espacial, em função do sistema integrado que envolve as cidades locais e globais.', 0, 268),
(1332, 'Cultural, em função da semelhança histórica e da condição de modernização econômica e política', 0, 268),
(1333, 'Demográfico, em função da localização das maiores aglomerações urbanas e continuidade do fluxo campo-cidade.', 1, 268),
(1334, 'Territorial, em função da estrutura de organização e planejamento das cidades que atravessam as fronteiras nacionais.', 0, 268),
(1335, 'Econômico, em função da revolução agrícola que transformou o campo e a cidade e contribuiu para fixação do homem ao lugar.', 0, 268),
(1336, 'Uso de fertilizantes e aterros sanitários / lançamento de gases poluentes / canalização de córregos e rios.', 0, 269),
(1337, 'Lançamento de gases poluentes / lançamento de lixo nas ruas / construção de aterros sanitários.', 0, 269),
(1338, 'Uso de fertilizantes e aterros sanitários / desmatamento/ impermeabilização do solo urbano.', 1, 269),
(1339, 'Lançamento de lixo nas ruas / uso de fertilizantes / construção de aterros sanitários.', 0, 269),
(1340, 'Construção de barragens / uso de fertilizantes / construção de aterros sanitários.', 0, 269),
(1341, 'Reduzida área de solos agricultáveis.', 0, 270),
(1342, 'Ausência de reservas de águas subterrâneas.', 0, 270),
(1343, 'Escassez de rios e de grandes bacias hidrográficas.', 0, 270),
(1344, 'Falta de tecnologia para retirar o sal da água do mar.', 0, 270),
(1345, 'Degradação dos mananciais e desperdício no consumo.', 1, 270),
(1346, 'A criação de parques ecológicos na área do pantanal mato-grossense.', 0, 271),
(1347, 'A proibição da pesca e da caça, que tanto ameaçam a biodiversidade.', 0, 271),
(1348, 'O aumento das pastagens na área da planície, para que a cobertura vegetal, composta de gramíneas, evite a erosão do solo.', 0, 271),
(1349, 'O controle do desmatamento e da erosão, principalmente nas nascentes dos rios responsáveis pelo nível das águas durante o período de cheias.', 1, 271),
(1350, 'A construção de barragens, para que o nível das águas dos rios seja mantido, sobretudo na estiagem, sem prejudicar os ecossistemas.', 0, 271),
(1351, 'Tropófila e clima tropical', 1, 272),
(1352, 'Xerófila e clima semiárido', 0, 272),
(1353, 'Hidrófila e clima equatorial', 0, 272),
(1354, 'Aciculifoliada e clima subtropical', 0, 272),
(1355, 'Semidecídua e clima tropical úmido', 0, 272),
(1356, 'Árido, com déficit hídrico', 0, 273),
(1357, 'Subtropical, com baixas temperaturas', 0, 273),
(1358, 'Temperado, com invernos frios e secos', 0, 273),
(1359, 'Tropical, com sazonalidade das chuvas.', 1, 273),
(1360, 'Equatorial, com pluviosidade abundante.', 0, 273),
(1361, 'Região', 0, 274),
(1362, 'Paisagem', 0, 274),
(1363, 'Espaço', 0, 274),
(1364, 'Lugar', 0, 274),
(1365, 'Território', 1, 274),
(1366, 'Lugar', 1, 275),
(1367, 'Região', 0, 275),
(1368, 'Território', 0, 275),
(1369, 'Espaço', 0, 275),
(1370, 'Nenhuma das anteriores', 0, 275),
(1371, 'Rede, pois permite o fluxo de informações.', 0, 276),
(1372, 'Escala, pois dimensiona a área de utilização.', 0, 276),
(1373, 'Lugar, pois oferece uma noção de afetividade.', 1, 276),
(1374, 'Território, pois caracteriza um exercício de poder.', 0, 276),
(1375, 'Região, pois delimita conjuntos por homogeneidades.', 0, 276),
(1376, 'Lugar', 0, 277),
(1377, 'Territorio', 0, 277),
(1378, 'Espaço', 0, 277),
(1379, 'Escala', 0, 277),
(1380, 'Paisagem', 1, 277),
(1381, 'Paisagem, pois nos remete a cenários distintos: o cinza e a desolação da estação seca, que afugenta a asa branca e o verde e vivaz do período chuvoso das plantações e que traz de volta o migrante.', 0, 278),
(1382, 'Território, pois remete um espaço de controle das elites políticas e econômicas que se utilizam do discurso da seca para tirar proveito em benefício dos seus interesses e continuar a exercer o poder s', 0, 278),
(1383, 'Região, delimitada pelo critério exclusivamente econômico, que tem na divisão territorial do trabalho o papel de fornecedora de mão de obra desqualificada para o Centro-Sul do país.', 0, 278),
(1384, 'Região, pois se refere à área delimitada pelo clima semiárido de ocorrência da caatinga e sujeita às secas periódicas, mas também tem o sentido de lugar, pois, ao se referir ao \"meu sertão\", o autor d', 1, 278),
(1385, 'Espaço, pois a dinâmica populacional está presente através da migração do sertanejo que vai para outras regiões produzir bens e transformar as paisagens distantes, mas também se reproduzir enquanto fo', 0, 278),
(1386, 'Instrumento de garantia da cidadania, porque através dela os cidadãos passam a pensar e a agir de acordo com os valores coletivos.', 1, 279),
(1387, 'Mecanismo de criação de direitos humanos, porque é da natureza do homem ser ético e virtuoso.', 0, 279),
(1388, 'Meio para resolver conflitos sociais no cenário da globalização, pois a partir do entendimento do que é efetivamente a ética, a política internacional se realiza.', 0, 279),
(1389, 'Parâmetro para assegurar o exercício político primando pelos interesses e ação privada dos cidadãos.', 0, 279),
(1390, 'Aceitação de valores universais implícitos numa sociedade que busca dimensionar a sua vinculação a outras sociedades.', 0, 279),
(1391, 'Decorrentes da vontade divina e, por esse motivo, utópicas.', 0, 280),
(1392, 'Parâmetros idealizados, cujo cumprimento é destituído de obrigação.', 0, 280),
(1393, 'Amplas e vão além da capacidade de o indivíduo conseguir cumpri-las integralmente.', 0, 280),
(1394, 'Criadas pelo homem, que concede a si mesmo a lei à qual deve se submeter.', 1, 280),
(1395, 'Cumpridas por aqueles que se dedicam inteiramente a observar as normas jurídicas.', 0, 280),
(1396, 'Prática da diplomacia.', 0, 281),
(1397, 'Exercício da alteridade.', 1, 281),
(1398, 'Expansão da democracia.', 0, 281),
(1399, 'Universalização do progresso.', 0, 281),
(1400, 'Conquista da autodeterminação.', 0, 281),
(1401, 'Eficácia prática da razão empírica.', 0, 282),
(1402, 'Transvaloração dos valores judaico-cristãos.', 0, 282),
(1403, 'Recusa em fundamentar a moral pela experiência.', 1, 282),
(1404, 'Comparação da ética a uma ciência de rigor matemático.', 0, 282),
(1405, 'Importância dos valores democráticos nas relações de amizade.', 0, 282),
(1406, 'Satisfação pessoal e valores tradicionais.', 1, 283),
(1407, 'Relativismo cultural e postura ecumênica.', 0, 283),
(1408, 'Tranquilidade espiritual e costumes liberais.', 0, 283),
(1409, 'Realização profissional e culto à personalidade.', 0, 283),
(1410, 'Engajamento político e princípios nacionalistas.', 0, 283),
(1411, 'O termo arte poética deriva de uma obra de Aristóteles sobre as artes da fala e da escrita, do canto e da dança.', 0, 284),
(1412, 'A arte poética se preocupa com as obras de arte como fabricação de seres e gestos artificiais, ou seja, elaborados pelos seres humanos.', 0, 284),
(1413, 'O termo estética vem do grego aesthesis, que significa conhecimento sensorial, experiência, sensibilidade. Em sua acepção original, referia-se ao estudo das obras de arte enquanto criações da sensibil', 0, 284),
(1414, 'Após seu surgimento, o termo estética vai substituindo a ideia de arte poética passando a se referir a toda investigação filosófica que tenha por objeto as artes.', 0, 284),
(1415, 'Para a Estética, a arte é produto da racionalidade e da formulação lógica do artista e que, dessa forma, o belo é igual ao verdadeiro.', 1, 284),
(1416, 'Apresentar conteúdos ideológicos de caráter conservador da ordem burguesa.', 0, 285),
(1417, 'Comprometer-se com as necessidades de entretenimento dos consumidores culturais.', 0, 285),
(1418, 'Estabelecer uma relação de independência frente à conjuntura política imediata.', 1, 285),
(1419, 'Subordinar-se aos imperativos políticos e materiais de transformação da sociedade.', 0, 285),
(1420, 'Contemplar as aspirações políticas das populações economicamente excluídas.', 0, 285),
(1421, 'Pela lógica.', 0, 286),
(1422, 'Pela razão.', 0, 286),
(1423, 'Pela alma.', 0, 286),
(1424, 'Pelos sentidos.', 1, 286),
(1425, 'Pela emoção.', 0, 286),
(1426, 'Noções pessoais de beleza e noções gerais, comuns a outras pessoas.', 1, 287),
(1427, 'Noções comuns a outras pessoas e noções individuais de beleza.', 0, 287),
(1428, 'Ideais pessoais de beleza, livre de vinculação com o social e Ideais universais de beleza, também livres de vinculação com o social.', 0, 287),
(1429, 'Capacidades de produzir beleza individuais e capacidades de produzir belezas universais.', 0, 287),
(1430, 'Valorização de beleza de poucas pessoas e valorização de uma beleza universal, que atinge a todas as pessoas do mundo.', 0, 287),
(1431, 'Fundamento da razão pura.', 0, 288),
(1432, 'Fundamento do juízo de valor.', 0, 288),
(1433, 'Fundamento do pensamento estético.', 0, 288),
(1434, 'Fundamento da razão emocional.', 0, 288),
(1435, 'Fundamento do juízo de gosto.', 1, 288),
(1436, 'De fonte diferente de onde emanam as verdades cristãs, pois há oposição entre as verdades pagãs e as verdades cristãs.', 0, 289),
(1437, 'Da mesma fonte de onde emanam as verdades cristãs, pois não há oposição entre as verdades pagãs e cristãs.', 1, 289),
(1438, 'De Platão, por ter chegado a conceber a ideia Suprema do Bem.', 0, 289),
(1439, 'De Aristóteles, por ter concebido o Ser Supremo corno primeiro motor imóvel.', 0, 289),
(1440, 'De Tales de Mileto, primeiro filósofo reconhecido pela humanidade.', 0, 289),
(1441, 'A filosofia epicurista.', 0, 290),
(1442, 'A filosofia escolástica.', 1, 290),
(1443, 'A filosofia iluminista.', 0, 290),
(1444, 'O socialismo.', 0, 290),
(1445, 'O positivismo.', 0, 290),
(1446, 'A filosofia pode contestar a teologia.', 0, 291),
(1447, 'A teologia, de acordo com a filosofia, determina Deus como uma ideia reguladora da razão.', 0, 291),
(1448, 'A teologia tem de se subordinar à filosofia.', 0, 291),
(1449, 'Não há nenhuma relação entre fé e razão.', 0, 291),
(1450, 'A fé orienta a razão.', 1, 291),
(1451, 'Para Agostinho, é possível ao ser humano obter o conhecimento verdadeiro, enquanto, para Platão, a verdade a respeito do mundo é inacessível ao ser humano.', 0, 292),
(1452, 'Para Platão, a verdadeira realidade encontra-se no mundo das Ideias, enquanto para Agostinho não existe nenhuma realidade além do mundo natural em que vivemos.', 0, 292),
(1453, 'Para Agostinho, a alma é imortal, enquanto para Platão a alma não é imortal, já que é apenas a forma do corpo.', 0, 292),
(1454, 'Para Platão, o conhecimento é, na verdade, reminiscência, a alma reconhece as Ideias que ela contemplou antes de nascer; Agostinho diz que o conhecimento é resultado da Iluminação divina, a centelha d', 1, 292),
(1455, 'Nenhuma das anteriores', 0, 292),
(1456, 'Somente as afirmativas I, II e IV são corretas.', 0, 293),
(1457, 'Somente as afirmativas I, II, V e VI são corretas.', 0, 293),
(1458, 'Somente as afirmativas III, V e VI são corretas.', 0, 293),
(1459, 'Somente as afirmativas I, V e VI são corretas.', 1, 293),
(1460, 'Somente as afirmativas II, V e VI são corretas.', 0, 293),
(1461, 'Foi proposta por Pasteur e defendia que um ser vivo só pode se originar de outro ser vivo.', 0, 294),
(1462, 'Foi amplamente divulgada por Aristóteles e defendia a possibilidade de os seres vivos surgirem espontaneamente de matéria sem vida.', 1, 294),
(1463, 'Foi defendida por Redi e Spallanzani que provaram a sua veracidade por meio de experiências bem sucedidas.', 0, 294),
(1464, 'Foi contestada por Needham e Joblot através dos famosos caldos nutritivos preparados à base de carne.', 0, 294),
(1465, 'Teve em Pasteur um grande defensor.', 0, 294),
(1466, 'Apenas a afirmativa I é correta.', 0, 295),
(1467, 'Apenas a afirmativa III é correta.', 0, 295),
(1468, 'Apenas as afirmativas I e III são corretas.', 0, 295),
(1469, 'Apenas as afirmativas II e III são corretas.', 1, 295),
(1470, 'As afirmativas I, II, III são corretas.', 0, 295),
(1471, 'Stanley Miller investigou a origem espontânea de moscas a partir de matéria não viva em decomposição.', 0, 296),
(1472, 'Os primeiros seres fotossintetizantes não usavam água como fonte de íon hidrogênio e liberavam gás sulfídrico para a atmosfera.', 0, 296),
(1473, 'Aristóteles formulou a teoria da biogênese que foi confirmada pelo cientista Louis Pasteur.', 0, 296),
(1474, 'A panspermia é uma teoria segundo a qual micro-organismos se encontram presentes na água, sendo capazes de dar origem à vida, quando atingem um local adequado.', 0, 296),
(1475, 'Helmont é autor de uma receita para obter ratos a partir de grãos de trigo. Com isso, ele tentou provar a teoria da abiogênese.', 1, 296),
(1476, 'Bolsas delimitadas por membranas lipoproteicas.', 0, 297),
(1477, 'Estruturas precursoras das bactérias, apresentando membrana, material genético, porém, sem parede celular.', 0, 297),
(1478, 'Estruturas semelhantes a arqueobactérias, que não dependem da fotossíntese para sobreviver.', 0, 297),
(1479, 'Aglomerados de proteínas que se formam espontaneamente em soluções aquosas com certo grau de acidez e de salinidade, envolvidos por uma película d’água.', 1, 297),
(1480, 'Nenhuma das anteriores', 0, 297),
(1481, 'Radiações ultravioletas em abundância.', 0, 298),
(1482, 'Existência de grande quantidade de descargas elétricas.', 0, 298),
(1483, 'Atmosfera com constituição química bem diferente da atual.', 0, 298),
(1484, 'Espessa camada de ozônio.', 1, 298),
(1485, 'Temperatura elevada.', 0, 298),
(1486, 'Ocasiona convulsões violentas.', 0, 299),
(1487, 'Acelera os movimentos respiratórios.', 0, 299),
(1488, 'Impede a contração muscular.', 1, 299),
(1489, 'Destrói o estrato mielínico.', 0, 299),
(1490, 'Ocasiona febre e perda de consciência.', 0, 299),
(1491, 'ácido pirúvico.', 0, 300),
(1492, 'ácido acetoacético.', 0, 300),
(1493, 'ácido láctico.', 1, 300),
(1494, 'ácido cítrico.', 0, 300),
(1495, 'Etanol.', 0, 300),
(1496, 'Transporte de oxigênio no tecido sanguíneo', 0, 301),
(1497, 'Cobertura protetora da pele', 0, 301),
(1498, 'Lise de amido', 0, 301),
(1499, 'Sinapse nas terminações nervosas', 0, 301),
(1500, 'Contração muscular', 1, 301),
(1501, 'Músculo cardíaco.', 1, 302),
(1502, 'Músculo liso.', 0, 302),
(1503, 'Músculo esquelético.', 0, 302),
(1504, 'Músculos cardíaco e esquelético.', 0, 302),
(1505, 'Músculo liso e esquelético.', 0, 302),
(1506, 'Muscular liso.', 0, 303),
(1507, 'Muscular estriado esquelético.', 1, 303),
(1508, 'Conjuntivo propriamente dito.', 0, 303),
(1509, 'Conjuntivo cartilaginoso.', 0, 303),
(1510, 'Conjuntivo denso.', 0, 303),
(1511, 'Apenas pela endoderme.', 0, 304),
(1512, 'Pela ectoderme e mesoderme.', 0, 304),
(1513, 'Apenas pela mesoderme.', 1, 304),
(1514, 'Pela endoderme e mesoderme.', 0, 304),
(1515, 'Apenas pela ectoderme.', 0, 304),
(1516, 'Microcefalia', 1, 305),
(1517, 'Hidrocefalia', 0, 305),
(1518, 'Meningocefalia', 0, 305),
(1519, 'Anencefalia', 0, 305),
(1520, 'Criptoquidia', 0, 305),
(1521, 'Anencefalia', 0, 306),
(1522, 'Paralisia infantil', 0, 306),
(1523, 'Síndrome de Guillain-Barré', 1, 306),
(1524, 'Malária', 0, 306),
(1525, 'Febre Amarela', 0, 306),
(1526, 'Zigoto', 0, 307),
(1527, 'Mórula', 0, 307),
(1528, 'Gástrula', 0, 307),
(1529, 'Nêurula', 0, 307),
(1530, 'Blástula', 1, 307),
(1531, 'Encontra-se apenas na fase adulta.', 0, 308),
(1532, 'é substituída pelo progressivo aparecimento da coluna vertebral.', 1, 308),
(1533, 'Existe concomitantemente com a coluna vertebral.', 0, 308),
(1534, 'Persiste por toda a vida.', 0, 308),
(1535, 'Está presente nos embriões de alguns grupos.', 0, 308),
(1536, 'Noradrenalina.', 1, 309),
(1537, 'Acetilcolina.', 0, 309),
(1538, 'Serotonina.', 0, 309),
(1539, 'Glicina.', 0, 309),
(1540, 'Glutamato.', 0, 309),
(1541, 'I e II.', 1, 310),
(1542, 'II e III.', 0, 310),
(1543, 'III e IV.', 0, 310),
(1544, 'I, II e IV.', 0, 310),
(1545, 'I, III e IV.', 0, 310),
(1546, 'V – F – V – V', 0, 311),
(1547, 'F – F – V – F', 0, 311),
(1548, 'F – V – F – V', 0, 311),
(1549, 'V – V – F – V', 1, 311),
(1550, 'V – V – V – F', 0, 311),
(1551, 'A diminuição do suprimento de oxigênio.', 1, 312),
(1552, 'O aumento do número de hemácias.', 0, 312),
(1553, 'O aumento do número de mitocôndrias.', 0, 312),
(1554, 'O aumento do metabolismo oxidativo.', 0, 312),
(1555, 'A diminuição da concentração de ácido láctico.', 0, 312),
(1556, 'Sistema aferente.', 0, 313),
(1557, 'Sistema eferente.', 1, 313),
(1558, 'Sistema sensitivo.', 0, 313),
(1559, 'Sinal pré-sináptico.', 0, 313),
(1560, 'Sinal pré-dentrítico.', 0, 313),
(1561, 'Indução, nas bactérias, de resistência aos antibióticos;', 0, 314),
(1562, 'Convivência de portadores de diversos tipos de infecção;', 0, 314),
(1563, 'Seleção de linhagens de bactérias resistentes aos antibióticos;', 1, 314),
(1564, 'Tendência da bactéria a se habituar aos antibióticos', 0, 314),
(1565, 'Rejeição de antibióticos pelo organismo humano.', 0, 314),
(1566, 'Impede a fotossíntese realizada pelas bactérias causadoras da doença e, assim, elas não se alimentam e morrem.', 0, 315),
(1567, 'Altera as informações genéticas das bactérias causadoras da doença, o que impede manutenção e reprodução desses organismos.', 0, 315),
(1568, 'Dissolve as membranas das bactérias responsáveis pela doença, o que dificulta o transporte de nutrientes e provoca a morte delas.', 0, 315),
(1569, 'Elimina os vírus causadores da doença, pois não conseguem obter as proteínas que seriam produzidas pelas bactérias que parasitam.', 0, 315),
(1570, 'Interrompe a produção de proteína das bactérias causadoras da doença, o que impede sua multiplicação pelo bloqueio de funções vitais.', 1, 315),
(1571, 'Trypanosoma cruzi, causador da doença de chagas.', 1, 316),
(1572, 'Clostridium tetani, causador do tétano.', 0, 316),
(1573, 'Treponema pallidum, causador da sífilis.', 0, 316),
(1574, 'Mycobacterium leprae, causador da lepra.', 0, 316),
(1575, 'Neisseria meningitidis, causador da meningite.', 0, 316),
(1576, 'Todos os vírus têm DNA na sua constituição.', 0, 317),
(1577, 'Os vírus diferem dos seres vivos por serem acelulares.', 1, 317),
(1578, 'Não necessitam de outros organismos para sua reprodução.', 0, 317),
(1579, 'Não infectam células bacterianas.', 0, 317),
(1580, 'É considerado um ser unicelular.', 0, 317),
(1581, 'Núcleo viral.', 0, 318),
(1582, 'Envoltório lipídico.', 0, 318),
(1583, 'Capsídeo.', 1, 318),
(1584, 'DNA.', 0, 318),
(1585, 'RNA.', 0, 318),
(1586, 'Fungos macroscópicos, liberando álcool etílico e oxigênio.', 0, 319),
(1587, 'Bactérias, liberando álcool metílico e gás carbônico.', 0, 319),
(1588, 'Bactérias, liberando álcoois aromáticos e oxigênio.', 0, 319),
(1589, 'Fungos microscópicos, liberando álcool etílico e gás carbônico.', 1, 319),
(1590, 'Fungos microscópicos, liberando álcool metílico e água.', 0, 319),
(1591, 'CO2, a partir da água acrescentada à massa do pão.', 0, 320),
(1592, 'CO2, a partir da fermentação do açúcar acrescentado à massa do pão.', 1, 320),
(1593, 'O2, a partir da fermentação do amido existente na farinha do pão.', 0, 320),
(1594, 'N2, a partir da fermentação do açúcar acrescentado à massa do pão.', 0, 320),
(1595, 'O2, a partir da respiração do açúcar acrescentado à massa do pão.', 0, 320),
(1596, 'Captada da luz solar pela cana-de-açúcar, armazenada na molécula de glicose produzida por fungos no processo de fermentação e, posteriormente, transferida para a molécula de etanol.', 0, 321),
(1597, 'Obtida por meio do processo de fermentação realizado pela cana-de-açúcar e, posteriormente, incorporada à molécula de etanol na cadeia respiratória de fungos.', 0, 321),
(1598, 'Captada da luz solar pela cana-de-açúcar, por meio do processo de fotossíntese, e armazenada na molécula de clorofila, que foi fermentada por fungos.', 0, 321),
(1599, 'Obtida na forma de ATP no processo de respiração celular da cana-de-açúcar e armazenada na molécula de glicose, que foi, posteriormente, fermentada por fungos.', 0, 321),
(1600, 'Captada da luz solar por meio do processo de fotossíntese realizado pela cana-de-açúcar e armazenada na molécula de glicose, que foi, posteriormente, fermentada por fungos.', 1, 321),
(1601, 'Micélio monocariótico do Ascomiceto.', 0, 322),
(1602, 'Corpo de frutificação do Ascomiceto.', 0, 322),
(1603, 'Micélio monocariótico do Basidiomiceto.', 0, 322),
(1604, 'Corpo de frutificação do Basidiomiceto.', 1, 322),
(1605, 'Sorédio do fungo.', 0, 322),
(1606, 'São autotróficos e realizam fotossíntese.', 1, 323),
(1607, 'Produzem antibióticos.', 0, 323),
(1608, 'São capazes de realizar fermentação.', 0, 323),
(1609, 'Realizam decomposição de matéria orgânica.', 0, 323),
(1610, 'Suas células não possuem cloroplastos.', 0, 323),
(1611, 'Não são ejetados instantaneamente, já que precisam de um tempo mínimo para acúmulo de energia.', 0, 324),
(1612, 'Podem ser ejetados instantaneamente com uma mesma energia cinética para qualquer elétron.', 0, 324),
(1613, 'Não podem ser ejetados pois a placa metálica apenas reflete toda a radiação.', 0, 324),
(1614, 'Podem ser ejetados instantaneamente, com energia que depende da frequência da radiação absorvida e da energia do elétron no metal.', 1, 324),
(1615, 'Não podem ser ejetados instantaneamente e a energia cinética após a ejeção depende da frequência da radiação absorvida e da energia do elétron no metal.', 0, 324),
(1616, 'I, II e IV', 0, 325),
(1617, 'I, IV e V', 1, 325),
(1618, 'II, IV e V', 0, 325),
(1619, 'III, V e VI', 0, 325),
(1620, 'I, IV e VI', 0, 325),
(1621, '1,00 x 10−11 m', 0, 326),
(1622, '5,00 x 10−12 m', 1, 326),
(1623, '1,25 x 10−12 m', 0, 326),
(1624, '6,25 x 10−13m', 0, 326),
(1625, '3,12 x 10−13m', 0, 326),
(1626, 'I e IV.', 0, 327),
(1627, 'II e III.', 0, 327),
(1628, 'III e IV.', 0, 327),
(1629, 'I, II e III.', 0, 327),
(1630, 'I, II e IV.', 1, 327),
(1631, 'Não chega a ficar totalmente dentro do túnel, restando um espaço de 12 m fora do túnel.', 0, 328),
(1632, 'Fica totalmente dentro do túnel e sobra um espaço de 10 m.', 1, 328),
(1633, 'Fica totalmente dentro do túnel e sobra um espaço de 15 m.', 0, 328),
(1634, 'Não chega a ficar totalmente dentro do túnel, restando um espaço de 5 m fora do túnel.', 0, 328);
INSERT INTO `tb_resposta` (`idResposta`, `textoResposta`, `certaResposta`, `idQuestao`) VALUES
(1635, 'Fica totalmente dentro do túnel e não resta nenhum espaço.', 0, 328),
(1636, 'Receptores – televisor.', 0, 329),
(1637, 'Resistores – chuveiro elétrico', 0, 329),
(1638, 'Geradores – telefone celular.', 0, 329),
(1639, 'Fusíveis – caixa de força residencial.', 0, 329),
(1640, 'Capacitores – flash de máquina fotográfica.', 1, 329),
(1641, '0,1', 0, 330),
(1642, '0,5', 0, 330),
(1643, '2,1', 1, 330),
(1644, '10', 0, 330),
(1645, '10 21', 0, 330),
(1646, 'C = C0', 0, 331),
(1647, 'C > 4C0', 0, 331),
(1648, '0 < C < C0', 0, 331),
(1649, 'C0 < C < 2C0', 0, 331),
(1650, '2C0 < C < 4C0', 1, 331),
(1651, 'Q1 = Q3 ; Q2 = Q4', 0, 332),
(1652, 'Q1 = Q3 ; Q2 = (1/5)Q4', 0, 332),
(1653, 'Q1 = 4xQ3 ; Q2 = 4xQ4', 0, 332),
(1654, 'Q1 = (5/4)Q3 ; Q2 = 5Q4', 1, 332),
(1655, 'Q1 = (1/4)Q3 ; Q2 = (1/4)Q4', 0, 332),
(1656, 'V/2', 0, 333),
(1657, 'V/3', 0, 333),
(1658, 'V/4', 0, 333),
(1659, 'V/5', 1, 333),
(1660, 'V/6', 0, 333),
(1661, '32 N.', 0, 334),
(1662, '80 N.', 0, 334),
(1663, '16.000 N.', 0, 334),
(1664, '32.000 N.', 1, 334),
(1665, '64.000 N.', 0, 334),
(1666, 'Nenhuma.', 0, 335),
(1667, 'Apenas I.', 1, 335),
(1668, 'Apenas I e III.', 0, 335),
(1669, 'Apenas II e III.', 0, 335),
(1670, 'Todas.', 0, 335),
(1671, 'F V V F.', 0, 336),
(1672, 'V V V V.', 0, 336),
(1673, 'F F F F.', 0, 336),
(1674, 'F V V V.', 1, 336),
(1675, 'V F F F.', 0, 336),
(1676, '10 kg.', 0, 337),
(1677, '25 kg.', 0, 337),
(1678, '25 N.', 0, 337),
(1679, '200 N.', 0, 337),
(1680, '250 N.', 1, 337),
(1681, '2500 N.', 1, 338),
(1682, '1025 N.', 0, 338),
(1683, '2500 kg.', 0, 338),
(1684, '25 N.', 0, 338),
(1685, '25 Kg.', 0, 338),
(1686, '1', 0, 339),
(1687, '1,2', 0, 339),
(1688, '1,4', 1, 339),
(1689, '1,6', 0, 339),
(1690, '1,8', 0, 339),
(1691, '1,310 g/mol', 0, 340),
(1692, '13,10 g/mol', 0, 340),
(1693, '124,23 g/mol', 0, 340),
(1694, '131,22g/mol', 1, 340),
(1695, '131,22g/mol 165,04 g/mol', 0, 340),
(1696, '0,37 atm.', 0, 341),
(1697, '1,0 atm.', 0, 341),
(1698, '2,5 atm.', 0, 341),
(1699, '3,1 atm.', 1, 341),
(1700, '5,9 atm.', 0, 341),
(1701, 'Baixas temperaturas e baixas pressões.', 0, 342),
(1702, 'Altas temperaturas e altas pressões.', 0, 342),
(1703, 'Baixas temperaturas independentemente da pressão.', 0, 342),
(1704, 'Altas temperaturas e baixas pressões.', 1, 342),
(1705, 'Baixas temperaturas e altas pressões.', 0, 342),
(1706, '25oC.', 1, 343),
(1707, '298oC.', 0, 343),
(1708, '100oC.', 0, 343),
(1709, '10oC.', 0, 343),
(1710, '50oC.', 0, 343),
(1711, 'Flotação e decantação', 0, 344),
(1712, 'Decomposição e centrifugação', 0, 344),
(1713, 'Floculação e separação magnética', 1, 344),
(1714, 'Destilação fracionada e peneiração', 0, 344),
(1715, 'Dissolução fracionada e magnetização', 0, 344),
(1716, 'Decantação e filtração.', 1, 345),
(1717, 'Extrusão e evaporação.', 0, 345),
(1718, 'Sedimentação e flotação.', 0, 345),
(1719, 'Destilação e centrifugação.', 0, 345),
(1720, 'Evaporação e cromatografia.', 0, 345),
(1721, 'I.', 0, 346),
(1722, 'II.', 0, 346),
(1723, 'I e II.', 0, 346),
(1724, 'I e III.', 0, 346),
(1725, 'II e III.', 1, 346),
(1726, 'A sublimação do I2 (s).', 0, 347),
(1727, 'A atração de um metal por um imã.', 0, 347),
(1728, 'O congelamento da água.', 0, 347),
(1729, 'O amadurecimento de um fruto.', 1, 347),
(1730, 'Amassar um papel.', 0, 347),
(1731, 'Decantação.', 0, 348),
(1732, 'Destilação.', 1, 348),
(1733, 'Filtração.', 0, 348),
(1734, 'Flotação.', 0, 348),
(1735, 'Filtração à vácuo.', 0, 348),
(1736, 'Aos modelos atômicos propostos por Thomson, Dalton e Rutherford.', 1, 349),
(1737, 'às teorias explicativas para as leis ponderais de Dalton, Proust e Lavoisier.', 0, 349),
(1738, 'Aos aspectos dos conteúdos de cinética química no contexto escolar', 0, 349),
(1739, 'às relações de comparação entre núcleo/eletrosfera e bolinha/campo de futebol.', 0, 349),
(1740, 'às diferentes dimensões representacionais do sistema solar.', 0, 349),
(1741, 'O modelo formulado por John Dalton ficou conhecido como pudim de passas.', 0, 350),
(1742, 'O modelo proposto por Erwin Schrödinger é utilizado até hoje.', 1, 350),
(1743, 'John Dalton provou que o átomo é uma partícula dividida em prótons elétrons e nêutrons.', 0, 350),
(1744, 'Thomson foi o autor da frase \"O átomo é uma partícula formada apenas por uma única carga\"', 0, 350),
(1745, 'Pertence ao físico Erwin Schrödinger a expressão \"pudim de passas\", que se refere à estrutura atômica da matéria.', 0, 350),
(1746, 'Rutherford.', 0, 351),
(1747, 'Rutherford-Bohr.', 1, 351),
(1748, 'Thomson.', 0, 351),
(1749, 'Dalton', 0, 351),
(1750, 'Millikan.', 0, 351),
(1751, 'Os átomos não são criados, destruídos ou convertidos em outros átomos durante uma transformação química.', 1, 352),
(1752, 'Os átomos são constituídos por 3 partículas fundamentais: prótons, nêutrons e elétrons.', 0, 352),
(1753, 'Todos os átomos de um mesmo elemento são idênticos em todos os aspectos de caracterização.', 0, 352),
(1754, 'Um elétron em um átomo pode ter somente certas quantidades específicas de energia.', 0, 352),
(1755, 'Toda a matéria é composta por átomos.', 0, 352),
(1756, 'Realizou-se uma série de descargas elétricas em tubos de gases rarefeitos.', 0, 353),
(1757, 'Determinou-se as leis ponderais das combinações químicas.', 0, 353),
(1758, 'Analisou-se espectros atômicos com emissão de luz com cores características para cada elemento.', 0, 353),
(1759, 'Caracterizou-se estudos sobre radioatividade e dispersão e reflexão de partículas alfa.', 1, 353),
(1760, 'Providenciou-se a resolução de uma equação para determinação dos níveis de energia da camada eletrônica.', 0, 353),
(1761, '75 mL.', 0, 354),
(1762, '25 mL.', 0, 354),
(1763, '50 mL.', 0, 354),
(1764, '100 mL.', 1, 354),
(1765, '150 mL.', 0, 354),
(1766, '0,25.', 1, 355),
(1767, '0,20.', 0, 355),
(1768, '0,15.', 0, 355),
(1769, '0,10.', 0, 355),
(1770, '0,05.', 0, 355),
(1771, '25,0 g/L; 3,0 mol/L.', 0, 356),
(1772, '0,2 Kg/L; 3,0 mol/L.', 0, 356),
(1773, '12,5 g/L; 1,5 mol/L.', 1, 356),
(1774, '25,0 g/L; 1,5 mol/L.', 0, 356),
(1775, '12,5 g/L; 3,0 mol/L.', 0, 356),
(1776, '120 e 280.', 0, 357),
(1777, '140 e 260.', 0, 357),
(1778, '160 e 240.', 1, 357),
(1779, '180 e 220.', 0, 357),
(1780, '200 e 200.', 0, 357),
(1781, '1 x 10-3 mol', 0, 358),
(1782, '2 x 10-3 mol', 0, 358),
(1783, '3 x 10-3 mol', 0, 358),
(1784, '4 x 10-3 mol', 0, 358),
(1785, '5 x 10-3 mol', 1, 358),
(1786, 'Porque a água mais o aditivo formam uma solução que apresenta pontos de ebulição e de fusão maiores que os da água pura.', 0, 359),
(1787, 'Porque a solução formada (água + aditivo) apresenta pressão de vapor maior que a água pura, o que causa um aumento no ponto de ebulição e de fusão.', 0, 359),
(1788, 'Porque o aditivo reage com a superfície metálica do radiador, que passa então a absorver energia mais eficientemente, diminuindo, portanto, os pontos de ebulição e de fusão quando comparados com a águ', 0, 359),
(1789, 'Porque o aditivo diminui a pressão de vapor da solução formada com relação à água pura, causando um aumento do ponto de ebulição e uma diminuição do ponto de fusão.', 1, 359),
(1790, 'Porque o aditivo diminui a capacidade calorífica da água, causando uma diminuição do ponto de fusão e de ebulição.', 0, 359),
(1791, 'Se funde.', 0, 360),
(1792, 'Transfere calor para o congelador.', 0, 360),
(1793, 'Se aquece.', 1, 360),
(1794, 'Permanece na mesma temperatura inicial.', 0, 360),
(1795, 'Nenhuma das anteirores', 0, 360),
(1796, 'A panela fechada requer mais tempo para atingir a pressão atmosférica em seu interior.', 1, 361),
(1797, 'A pressão de vapor da água em ebulição na panela fechada é maior que a pressão atmosférica.', 0, 361),
(1798, 'A temperatura de ebulição da água na panela é maior que 100 °C.', 0, 361),
(1799, 'O cozimento na panela fechada se passa em temperatura mais elevada que na panela aberta.', 0, 361),
(1800, 'Nenhuma das anteriores', 0, 361),
(1801, 'PCO2 > pBr2 > pHg', 1, 362),
(1802, 'PCO2 ≈ pBr2 > pHg', 0, 362),
(1803, 'PCO2 ≈ pBr2 ≈ pHg', 0, 362),
(1804, 'PBr2 > pCO2 > pHg', 0, 362),
(1805, 'PBr2 > pCO2 ≈ pHg', 0, 362),
(1806, 'I e III.', 0, 363),
(1807, 'II e IV.', 1, 363),
(1808, 'II e III.', 0, 363),
(1809, 'I e II.', 0, 363),
(1810, 'III e IV.', 0, 363),
(1811, 'O barro isola a água do ambiente, mantendo-a sempre a uma temperatura menor que a dele, como se fosse isopor.', 0, 364),
(1812, 'O barro tem poder de \"gelar\" a água pela sua composição química. Na reação, a água perde calor.', 0, 364),
(1813, 'O barro é poroso, permitindo que a água passe através dele. Parte dessa água evapora, tomando calor da moringa e do restante da água, que são assim resfriadas.', 1, 364),
(1814, 'O barro é poroso, permitindo que a água se deposite na parte de fora da moringa. A água de fora sempre está a uma temperatura maior que a de dentro.', 0, 364),
(1815, 'A moringa é uma espécie de geladeira natural, liberando substâncias higroscópicas que diminuem naturalmente a temperatura da água.', 0, 364),
(1816, '0,65 g', 0, 365),
(1817, '6,8 g', 1, 365),
(1818, '65 g', 0, 365),
(1819, '68 g', 0, 365),
(1820, 'Nenhuma das anteriores', 0, 365),
(1821, 'A evaporação da água é um processo endotérmico e cede calor ao corpo.', 0, 366),
(1822, 'A evaporação da água é um processo endotérmico e retira calor ao corpo.', 1, 366),
(1823, 'A evaporação da água é um processo exotérmico e cede calor ao corpo.', 0, 366),
(1824, 'A evaporação da água é um processo exotérmico e retira calor do corpo.', 0, 366),
(1825, 'Nenhuma das anteriores', 0, 366),
(1826, 'A entalpia da solução é maior que a entalpia do sal e da água separados.', 1, 367),
(1827, 'O resfriamento do sistema é causado pela transferência de calor da água para o cloreto de sódio.', 0, 367),
(1828, 'O resfriamento do sistema é causado pela transferência de calor do cloreto de sódio para a água.', 0, 367),
(1829, 'O sistema libera calor para o ambiente durante a dissolução.', 0, 367),
(1830, 'Nenhuma das anteriores', 0, 367),
(1831, 'KNO3 – endotérmica', 0, 368),
(1832, 'KNO3 – exotérmica', 0, 368),
(1833, 'Pb(NO3)2 – exotérmica', 0, 368),
(1834, 'PbI2 – exotérmica', 0, 368),
(1835, 'PbI2 - endotérmica', 1, 368),
(1836, 'Não haveria razão para que as bexigas natatórias dos dois peixes apresentassem volumes diferentes;', 0, 369),
(1837, 'A bexiga natatória do peixe de água salgada estaria maior do que a do peixe de água doce;', 0, 369),
(1838, 'As bexigas natatórias dos dois peixes teriam o mesmo volume mas, a do peixe de água salgada acumularia mais água;', 0, 369),
(1839, 'A bexiga natatória do peixe de água doce estaria maior do que a do peixe de água salgada;', 1, 369),
(1840, 'As bexigas natatórias dos dois peixes teriam o mesmo volume mas, a do peixe de água doce acumularia mais água.', 0, 369),
(1841, 'De equilíbrio osmótico, representados pela bexiga natatória dos peixes ósseos e pelo fígado dos tubarões;', 0, 370),
(1842, 'De equilíbrio hidrostático, representados pela bexiga natatória dos peixes ósseos e pelo fígado dos tubarões;', 1, 370),
(1843, 'De retenção de gases, como no caso do fígado dos tubarões e da bexiga natatória dos peixes ósseos;', 0, 370),
(1844, 'De retenção de gordura, como no caso da bexiga natatória dos tubarões;', 0, 370),
(1845, 'De retenção da urina, como no caso da bexiga natatória dos peixes ósseos', 0, 370),
(1846, 'O oxigênio entra na circulação dos peixes por meio dos capilares branquiais, dada a sua menor concentração no meio aquático;', 0, 371),
(1847, 'O oxigênio entra na circulação dos peixes por meio dos capilares branquiais, dada a sua maior concentração no meio aquático;', 1, 371),
(1848, 'O dióxido de carbono entra na circulação dos peixes por meio dos capilares branquiais, dada a sua maior concentração no meio aquático;', 0, 371),
(1849, 'O dióxido de carbono sai da circulação dos peixes por meio dos capilares branquiais, dada a sua maior concentração no meio aquático.', 0, 371),
(1850, 'Para fins de respiração, tanto o dióxido de carbono como o oxigênio entram e saem do organismo do peixe, não necessariamente pelas brânquias, mas por qualquer região do corpo desse animal.', 0, 371),
(1851, 'Cóclea.', 0, 372),
(1852, 'Glândulas mucosas.', 0, 372),
(1853, 'Opérculo.', 0, 372),
(1854, 'Fosseta loreal.', 0, 372),
(1855, 'Linha lateral', 1, 372),
(1856, 'Salamandra, sapo, cobras-cegas (Cecília)', 1, 373),
(1857, 'Jacaré, sapo, tartaruga', 0, 373),
(1858, 'Perereca, jiboia, salamandra', 0, 373),
(1859, 'Sapo, salamandra, cobras-cegas (Cecília)', 0, 373),
(1860, 'Cobras-cegas (Cecília), tartaruga, sapo', 0, 373),
(1861, 'V, V, V, F, V', 0, 374),
(1862, 'F, F, V, F, V', 0, 374),
(1863, 'F, V, F, V, F', 0, 374),
(1864, 'V, V, F, V, F', 1, 374),
(1865, 'F, V, V, F, F', 0, 374),
(1866, 'Coração com quatro cavidades.', 0, 375),
(1867, 'Homeotermia.', 0, 375),
(1868, 'Sistema nervoso dividido em central, periférico e autônomo.', 0, 375),
(1869, 'Respiração pulmonar e traqueal.', 1, 375),
(1870, 'Glândulas mamárias.', 0, 375),
(1871, 'Ter dentição diferenciada em dentes incisivos, caninos, pré-molares e molares.', 0, 376),
(1872, 'Apresentar circulação dupla completa, sendo a pequena circulação a que ocorre do coração para o resto do corpo e daí para o coração, e a grande circulação a que ocorre do coração para o pulmão e desse', 1, 376),
(1873, 'Possuir hemácias nucleadas com forma de disco bicôncavo.', 0, 376),
(1874, 'Ter rins funcionais do tipo metanefros.', 0, 376),
(1875, 'Presença de fendas faringeanas.', 0, 376),
(1876, 'Sistema circulatório duplo.', 1, 377),
(1877, 'Glândulas uropigianas.', 0, 377),
(1878, 'Pecilotermia.', 0, 377),
(1879, 'Glândulas mamárias com origem endodérmica.', 0, 377),
(1880, 'Notocorda como principal estrutura de sustentação.', 0, 377),
(1881, 'Ostra - caramujo – lula', 0, 378),
(1882, 'Siri - tatuzinho-de-jardim – camarão', 1, 378),
(1883, 'Craca - lagostim – marisco', 0, 378),
(1884, 'Centopeia - mexilhão – lacraia', 0, 378),
(1885, 'Ouriço-do-mar - caranguejo – anêmona', 0, 378),
(1886, 'Chilopoda', 0, 379),
(1887, 'Arachnida', 0, 379),
(1888, 'Crustacea', 0, 379),
(1889, 'Insecta', 1, 379),
(1890, 'Diplopoda', 0, 379),
(1891, 'Camarão, pulga e aranha', 0, 380),
(1892, 'Traça, siri e lagosta', 0, 380),
(1893, 'Lacraia, pulga e carrapato', 0, 380),
(1894, 'Lagosta, escorpião e abelha', 1, 380),
(1895, 'Caranguejo, lacraia e escorpião', 0, 380),
(1896, 'Estrela-do-mar.', 1, 381),
(1897, 'Caracol.', 0, 381),
(1898, 'Minhoca.', 0, 381),
(1899, 'Hidra.', 0, 381),
(1900, 'Piolho-de-cobra.', 0, 381),
(1901, 'Apresentam exoesqueleto calcário;', 0, 382),
(1902, 'São protostômios;', 0, 382),
(1903, 'São deuterostômios;', 1, 382),
(1904, 'Surgiram aproximadamente na mesma época;', 0, 382),
(1905, 'Apresentam epiderme pluriestratificada.', 0, 382);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_simulado`
--

CREATE TABLE `tb_simulado` (
  `idSimulado` int(11) NOT NULL,
  `DataInicioSimulado` datetime DEFAULT NULL,
  `DataTerminoSimulado` datetime DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `idQuestao` int(11) DEFAULT NULL,
  `acertouQuestao` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_simulado`
--

INSERT INTO `tb_simulado` (`idSimulado`, `DataInicioSimulado`, `DataTerminoSimulado`, `idCliente`, `idQuestao`, `acertouQuestao`) VALUES
(3, '2021-10-29 20:24:12', '2021-10-29 20:24:39', 4, 51, b'0'),
(4, '2021-10-29 20:24:12', '2021-10-29 20:24:39', 4, 44, b'0'),
(5, '2021-10-29 20:24:12', '2021-10-29 20:24:39', 4, 29, b'0'),
(6, '2021-10-29 20:24:12', '2021-10-29 20:24:39', 4, 6, b'0'),
(7, '2021-10-29 20:24:12', '2021-10-29 20:24:39', 4, 26, b'0'),
(8, '2021-10-29 20:24:12', '2021-10-29 20:24:39', 4, 34, b'1'),
(9, '2021-10-29 20:24:12', '2021-10-29 20:24:39', 4, 25, b'1'),
(10, '2021-10-29 20:24:12', '2021-10-29 20:24:39', 4, 56, b'1'),
(11, '2021-10-29 20:24:12', '2021-10-29 20:24:39', 4, 57, b'1'),
(12, '2021-10-29 20:24:12', '2021-10-29 20:24:39', 4, 59, b'0');

--
-- Acionadores `tb_simulado`
--
DELIMITER $$
CREATE TRIGGER `Tgr_SimuladoErros_Insert` AFTER INSERT ON `tb_simulado` FOR EACH ROW BEGIN
    UPDATE tb_cliente SET tb_cliente.erros = tb_cliente.erros + 1
WHERE tb_cliente.idCliente = NEW.idCliente;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Tgr_Simulado_Insert` AFTER INSERT ON `tb_simulado` FOR EACH ROW BEGIN
    UPDATE tb_cliente SET tb_cliente.acertos = tb_cliente.acertos + 1
WHERE tb_cliente.idCliente = NEW.idCliente AND NEW.acertouQuestao = 1;
END
$$
DELIMITER ;

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
-- Extraindo dados da tabela `tb_universidade`
--

INSERT INTO `tb_universidade` (`idUniversidade`, `nomeUniversidade`) VALUES
(1, 'UFRJ'),
(2, 'IF - GO'),
(3, 'ENEM'),
(4, 'UFPB'),
(5, 'UFU-MG'),
(6, 'USP'),
(7, 'IFG'),
(8, 'UFRGS'),
(9, 'MACKENZIE'),
(10, 'PUC'),
(11, 'ITA'),
(12, 'UFRN'),
(13, 'UEJF-MG'),
(14, 'PUCCAMP-SP'),
(15, 'FEI-SP'),
(16, 'PUCMG'),
(17, 'MACKENZIE-SP'),
(18, 'UFPEL'),
(19, 'UNESP'),
(20, 'FUVEST'),
(21, 'FURG'),
(22, 'PUC - RS'),
(23, 'UFC - CE'),
(24, 'UERJ'),
(25, 'PUC-RJ'),
(26, 'FEEQ-CE'),
(27, 'FUVEST-SP'),
(28, 'PUC-PR'),
(29, 'PUC-RIO'),
(30, 'UNISINOS-RS'),
(31, 'Univ. Fed. de Viçosa'),
(32, 'CESGRANRIO'),
(33, 'UFF'),
(34, 'UBERABA'),
(35, 'FEI'),
(36, 'IFSP'),
(37, 'MACKENZIE - Adaptada'),
(38, 'UDESC'),
(39, 'FMU-SP'),
(40, 'FATEC'),
(41, 'PUC-SP'),
(42, 'UNIMONTES'),
(43, 'UFPI'),
(44, 'PUC-MG'),
(45, 'UNB'),
(46, 'UMC'),
(47, 'FAAP'),
(48, 'UEL'),
(49, 'UFFS'),
(50, 'UFPE'),
(51, 'IFPI'),
(52, 'UECE'),
(53, 'UEPB'),
(54, 'UFPA'),
(55, 'FACTEC'),
(56, 'UEPG – PR'),
(57, 'UFAL'),
(58, 'Unifor-CE'),
(59, 'UNB - adaptada'),
(60, 'UFSC'),
(61, 'UNP-RN'),
(62, 'UFSCar'),
(63, 'UFSM'),
(64, 'CEFET-PR'),
(65, 'UNIVALI-SC'),
(66, 'UEL-PR'),
(67, 'UFSCar - SP'),
(68, 'VUNESP'),
(69, 'UFPR'),
(70, 'UFV-MG'),
(71, 'UFMG'),
(72, 'UFRN-RN'),
(73, 'UNIFESP'),
(74, 'UE-G'),
(75, 'UEM-PR'),
(76, 'UEMA'),
(77, 'UFCSPA'),
(78, 'UGF-RJ'),
(79, 'UNIOESTE'),
(80, 'ESPM'),
(81, 'IBMEC'),
(82, 'UFMT'),
(83, 'CESPE'),
(84, 'FCC - AP'),
(85, 'UNIUBE-MG'),
(86, 'UFT-TO'),
(87, 'UFLA MG'),
(88, 'UPE'),
(89, 'FGV-SP'),
(90, 'FIP'),
(91, 'UFG'),
(92, 'UEA'),
(93, 'UEPA'),
(94, 'CFTCE'),
(95, 'UFBA'),
(96, 'IFCE'),
(97, 'UNCISAL'),
(98, 'UFSE'),
(99, 'UNEBE'),
(100, 'CESUMAR-PR'),
(101, 'UEMS'),
(102, 'UFV'),
(103, 'UFTM-MG'),
(104, 'UFG - GO'),
(105, 'UFAM'),
(106, 'U.F. Pelotas-RS'),
(107, 'UFMS'),
(108, 'CESCEM SP');

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
  MODIFY `idAdministrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `tb_area_materia`
--
ALTER TABLE `tb_area_materia`
  MODIFY `idAreaMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `tb_assunto_materia`
--
ALTER TABLE `tb_assunto_materia`
  MODIFY `idAssuntoMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `tb_dificuldade`
--
ALTER TABLE `tb_dificuldade`
  MODIFY `idDificuldade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tb_materia`
--
ALTER TABLE `tb_materia`
  MODIFY `idMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `tb_questao`
--
ALTER TABLE `tb_questao`
  MODIFY `idQuestao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=383;

--
-- AUTO_INCREMENT de tabela `tb_resposta`
--
ALTER TABLE `tb_resposta`
  MODIFY `idResposta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1906;

--
-- AUTO_INCREMENT de tabela `tb_simulado`
--
ALTER TABLE `tb_simulado`
  MODIFY `idSimulado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `tb_sugestao_video`
--
ALTER TABLE `tb_sugestao_video`
  MODIFY `idSugestaoVideo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tb_universidade`
--
ALTER TABLE `tb_universidade`
  MODIFY `idUniversidade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

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
