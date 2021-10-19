import React from "react";
import { Checkbox, Button } from "../../Form/";
import reactDom from "react-dom";
import { ToastInformation } from "../../Alert/Toast";

export default function Termos() {
  const [check, setCheck] = React.useState(false);
  return (
    <div className="c-termos">
      <h4 className="c-termos__titulo">Leia os Termos de Uso e Privacidade</h4>
      <article className="c-termos__content">
        <span className="c-termos__texto bold">Bem-vindo ao Fica Fácil.</span>
        <span className="c-termos__texto">
          O Fica Fácil é uma plataforma de estudos online, buscando oferecer um
          programa de aprendizado de diversos níveis e para todas as etapas de
          vida do usuário. O Fica Fácil apresenta os Termos de Uso de seu
          website (www.ficafacil.com.br), sua plataforma e serviços
          estabelecidos nesse documento. Os Termos de Uso são válidos para todos
          os usuários de nossa Plataforma e são aplicáveis para todas as
          categorias do Fica Fácil.
        </span>
        <span className="c-termos__texto">
          Os Termos de Uso e a Política de Privacidade são válidos para todos os
          usuários de nossa Plataforma e são aplicáveis para todas as categorias
          do Fica Fácil.
        </span>
        <span className="c-termos__texto">
          O uso constante da nossa plataforma constitui na aceitação de qualquer
          tipo de alteração ou modificação feita nos Termos de Uso.
        </span>
        <span className="c-termos__texto bold">
          1. Aceitação aos Termos de Uso
        </span>
        <span className="c-termos__texto">
          1.1 Ao se cadastrar em nossa Plataforma, você concorda, expressa e
          voluntariamente, com todas as cláusulas destes Termos de Uso. Ao
          acessar e/ou usar os serviços do Fica Fácil, aulas recomendadas,
          questionários, simulados, análise de desempenho, fornecimento de
          material e suporte e demais serviços oferecidos nossa plataforma
          (“Serviços”), você concorda com os Termos de Uso, suas cláusulas e
          condições, conforme abaixo detalhadas.
        </span>
        <span className="c-termos__texto">
          1.2. Você está autorizado a utilizar os Serviços do Fica Fácil somente
          se você concorda com todas regras e condições estabelecidas nos Termos
          de Uso.
        </span>

        <span className="c-termos__texto">
          1.3. Se você não concorda com estes Termos de Uso, você não está
          autorizado a acessar ou utilizar os Serviços oferecidos em nossa
          Plataforma. A utilização dos Serviços Fica Fácil está expressamente
          condicionada ao seu consentimento às regras dos Termos de Uso,
          conforme solicitado quando do seu cadastro em nossa Plataforma.
        </span>

        <span className="c-termos__texto">
          1.4. Senha e Segurança: Quando você completar o seu processo de
          registro, você criará uma senha que habilitará seu acesso à nossa
          Plataforma. Você concorda em manter a confidencialidade da sua senha e
          é inteiramente responsável por qualquer dano resultante da não
          manutenção dessa confidencialidade e de todas as atividades que
          ocorrerem através do uso de sua senha. Você concorda em nos notificar
          imediatamente em caso de qualquer acesso não autorizado de sua senha
          ou outra quebra de segurança
        </span>
        <span className="c-termos__texto bold">
          2. Restrições e privacidade
        </span>
        <span className="c-termos__texto">
          2.1. Restrições: Ao usar nossa Plataforma, você concorda que as Suas
          Informações: (a) não devem ser fraudulentas; (b) não devem infringir
          nenhum direito autoral de terceiros, patente, marca registrada,
          direito de distribuição ou outro direito de propriedade intelectual,
          de publicação ou privacidade; (c) não devem violar nenhuma lei,
          estatuto, ordenação ou regulamento; (d) não devem ser difamatórias,
          caluniosas, ameaçadoras ou abusivas; (e) não devem ser obscenas ou
          conter pornografia, pornografia infantil, ou fotos de pessoas
          despidas; (f) não devem conter vírus, cavalos de troia, worms, time
          bombs, cancelbots, easter eggs, malwares em geral ou outras rotinas de
          programação que possam danificar, interferir, interceptar ou
          desapropriar qualquer sistema, dado ou informação pessoal; (g) não
          devem nos responsabilizar ou fazer com que percamos (total ou
          parcialmente) o serviço do nosso Provedor de Internet ou outros
          fornecedores; (h) não devem criar links direta ou indiretamente a
          qualquer material que você não tenha direito de incluir ou linkar.
        </span>
        <span className="c-termos__texto">
          2.2. Obrigações: Você concorda também que deverá nos informar um
          endereço válido de e-mail, tanto na hora de seu registro conosco
          quanto a cada vez que o seu e-mail mudar
        </span>
        <span className="c-termos__texto bold">
          3. Restrições no Nosso Uso de Suas Informações
        </span>
        <span className="c-termos__texto">
          3.1. Restrições no Nosso Uso de Suas Informações: Nós não venderemos,
          alugaremos ou divulgaremos nenhuma parte de Suas Informações para
          terceiros.
        </span>
        <span className="c-termos__texto">
          3.2. Ao aceitar estes Termos de Uso, você tem o direito não exclusivo,
          intransferível, não sub-licenciável e limitado de entrar em nossa
          Plataforma, acessar e usar os Serviços, unicamente para uso pessoal e
          não comercial.
        </span>
        <span className="c-termos__texto">
          3.3. Todos os direitos não previstos expressamente nestes Termos de
          Uso estão reservados ao Fica Fácil.
        </span>
        <span className="c-termos__texto">
          3.4. Você concorda que os Serviços são para o seu uso pessoal e não
          comercial e que ninguém além de você usará os Serviços. Você não tem
          direitos de cópia, reprodução ou alteração no todo ou em parte, de
          qualquer parte dos Serviços de propriedade do Fica Fácil.
        </span>
        <span className="c-termos__texto">
          3.5. Além da licença limitada de uso estabelecida nestes Termos de
          Uso, você não tem qualquer outro direito, título ou propriedade sobre
          os Serviços. Você entende e reconhece que, em quaisquer
          circunstâncias, os seus direitos com relação ao Serviços serão
          limitados pelos direitos autorais e/ou leis de propriedade intelectual
          aplicáveis e ainda por estes Termos de Uso.
        </span>
        <span className="c-termos__texto">
          3.6. O Fica Fácil poderá modificar os Serviços e/ou Conteúdo ou
          descontinuar a sua disponibilidade a qualquer momento. Os serviços
          oferecidos nos aplicativos podem ser diferentes dos serviços
          oferecidos no site do Fica Fácil.
        </span>
        <span className="c-termos__texto">
          3.7. Você não deve tentar nem apoiar as tentativas de terceiros para
          driblar, reverter a engenharia, decodificar, decompilar, desmontar ou
          fraudar ou interferir de qualquer forma com aspectos dos Serviços.
          Você não deve distribuir, intercambiar, modificar, vender ou revender
          ou retransmitir a qualquer pessoa qualquer parte dos Serviços.
        </span>
        <span className="c-termos__texto bold">
          4. Requisitos de condições técnicas
        </span>
        <span className="c-termos__texto">
          4.1. O Membro entende que os Cursos do Fica Fácil requerem condições
          técnicas mínimas nas máquinas onde se pretenda assistir às videoaulas.
          É de sua inteira responsabilidade providenciar equipamentos/máquinas
          que atendam tais condições, e o Fica Fácil não será responsável por
          qualquer dificuldade técnica ou queda de qualidade da
          imagem/transmissão relacionada ao não atendimento a tais condições
          técnicas. As condições técnicas mínimas são: (a) Conexão de Internet:
          Conexão de banda larga de 3Mbps dedicada* ou superior. O Membro se
          responsabiliza por todas as tarifas de acesso à Internet. Consulte seu
          provedor de internet para obter informações sobre os custos de
          utilização de dados. *Em redes compartilhadas a configuração
          recomendada é de 3Mbps multiplicada pelo número de dispositivos. (b)
          Configurações de software: - Sistema operacional: Windows 10, Ubuntu
          10 posterior ou semelhante; - Versão mais recente do Google Chrome,
          Firefox, MS Edge ou Safari. (c) Configurações mínimas para o
          computador: - Memória RAM 4GB ou superior; - Memória gráfica 450 MB
          (placa de vídeo) ou superior; - Monitor 1366x768 pixels.
        </span>
      </article>
      <Checkbox
        className="c-termos__checkbox"
        isChecked={check}
        onChange={() => setCheck(!check)}
      >
        Eu li e aceito os Termos de Uso e Políticas de Privacidade.
      </Checkbox>
      <div className="c-termos__buttons">
        <Button
          onClick={() => {
            if (check) {
              CloseTermos();
              localStorage.setItem("cookie", true);
            } else {
              ToastInformation({ text: "Preencha o Checkbox" });
            }
          }}
          className="c-termos__button c-termos__button--accept"
        >
          Aceitar
        </Button>
        <Button
          onClick={() => {
            CloseTermos();
            localStorage.setItem("cookie", false);
          }}
          className="c-termos__button c-termos__button--reject"
        >
          Rejeitar
        </Button>
      </div>
    </div>
  );
}

export const CloseTermos = () => {
  let termos = document.querySelector("#termos");
  let cookie = document.querySelector("#cookie");
  termos.classList.remove("open");
  cookie.firstChild.classList.toggle("close");

  setTimeout(() => {
    cookie.parentNode.removeChild(cookie);
    reactDom.unmountComponentAtNode(termos);
  }, 500);
};
