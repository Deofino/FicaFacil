-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 30-Out-2021 às 01:49
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
(1, 'Gabriely', 'gaby@gmail.com', '$2y$10$Tz.5jxNebPu8yjLYAeWI/eoi9.8zSo.E8nhmSuY3cAf5KmhjPU/Am'),
(2, 'Camylly', 'camy@gmail.com', '$2y$10$liIiqLs5lLCBl0J.1P2Yp./rxdlUnEVa/Cb8qrEErLsyKLUihlTIS'),
(3, 'Vitória', 'vitoria@gmail.com', '$2y$10$1PsrqBA2DeLDjQqfwZidle2bxDq.UMF464UJXDpnHDsWT02JkMEhG'),
(4, 'Delfino', 'delfino@gmail.com', '$2y$10$nEKpRaDC8dXVoMa6QZU/9uE4JmOUDaEvluYqkOmpv7J3tWyFD1MWu'),
(5, 'Paulo', 'paulo@gmail.com', '$2y$10$IPMDFncI.2ydnaOhLh/xH.Uw.g2cAfLlSU.0qOEOiOPznEfUIcV..'),
(6, 'Kaue', 'kaue@gmail.com', '$2y$10$jiwOV4OTP609ttOFLgq8u.ggEsvlSjLF8Lw4.IVrbOoVf10GP8v5i'),
(7, 'Delfino', 'guilhermedelfino25@gmail.com', '$2y$10$RJbOKDpDMi6qMjPRmDB0J.TDauJ9kb4NjfmgTc6pcHVugbwoSez/y'),
(8, 'Delfino', 'guilherme@gmail.com', '$2y$10$pU6WUx0ZuS3gnHlqhxphWeAzateURuHrv/ubIniJ68KZJqpcz5K1K');

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
(27, 'Filosofia Contemporânea', 3);

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
(9, 'Ciências da Natureza', 3);

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
(62, 'Ao jogar um dado', 'Dsadasdsadas', '[\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/f839a6f9698e9abe9a1b3482a33f7a0b.jpg\",\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/15b48779956902e29fdb288f3e400e46.png\",\"http:\\/\\/localhost\\/FicaFacil\\/backend\\/images\\/83d9d18287572a65274bf879298bf022.png\"]', 1, 1, 14, 68);

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
(301, 'Http://localhost/FicaFacil/backend/images/respostas/f839a6f9698e9abe9a1b3482a33f7a0b.jpg', 1, 62),
(302, 'Http://localhost/FicaFacil/backend/images/respostas/15b48779956902e29fdb288f3e400e46.png', 0, 62),
(303, 'Http://localhost/FicaFacil/backend/images/respostas/83d9d18287572a65274bf879298bf022.png', 0, 62),
(304, 'Http://localhost/FicaFacil/backend/images/respostas/3a0c60df7269e2a659243464a6ea30cd.png', 0, 62),
(305, 'Http://localhost/FicaFacil/backend/images/respostas/5249394b859e5400f1ef2f89869ee006.png', 0, 62);

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

--
-- Extraindo dados da tabela `tb_sugestao_video`
--

INSERT INTO `tb_sugestao_video` (`idSugestaoVideo`, `tituloSugestaoVideo`, `thumbnailSugestaoVideo`, `urlSugestaoVideo`, `idQuestao`) VALUES
(2, 'Dasdasdsadsa', 'Dasdasdsadas', 'Dasdadsdas', 62);

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
(5, 'UFMG'),
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
(69, 'UFPR');

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
  MODIFY `idAdministrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `tb_area_materia`
--
ALTER TABLE `tb_area_materia`
  MODIFY `idAreaMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tb_assunto_materia`
--
ALTER TABLE `tb_assunto_materia`
  MODIFY `idAssuntoMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

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
  MODIFY `idMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `tb_questao`
--
ALTER TABLE `tb_questao`
  MODIFY `idQuestao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de tabela `tb_resposta`
--
ALTER TABLE `tb_resposta`
  MODIFY `idResposta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=306;

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
  MODIFY `idUniversidade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

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
