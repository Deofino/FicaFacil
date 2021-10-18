import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import reactDOM from "react-dom";
import { Button, Checkbox } from "../../Form";
import Cookie from "../../../../img/project/cookie.svg";
const Termos = () => {
  const [check, setCheck] = React.useState(false);
  return (
    <div className="c-termos">
      <h4 className="c-termos__titulo">termos de uso bla bla bla</h4>
      <article className="c-termos__content">
        <span className="c-termos__texto">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus,
          vero! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Pariatur, sunt distinctio quos, nostrum veritatis deserunt quibusdam
          esse optio voluptas rerum, praesentium illum? Ipsum odio voluptates
          quia modi numquam dolores doloribus id inventore, excepturi voluptate
          et reprehenderit tenetur quibusdam quaerat eum perspiciatis eos
          corrupti, illum eius, illo itaque architecto. Aut debitis reiciendis
          itaque libero, quidem porro aspernatur voluptatibus ipsa aliquam
          excepturi provident, nobis eos animi labore accusamus assumenda odio!
          Aspernatur minus incidunt fuga itaque voluptate ab, mollitia
          provident, eos ea maiores fugiat inventore debitis nesciunt sed veniam
          tempora illum quisquam impedit reprehenderit eveniet vero. Dolorum
          quaerat, provident quidem magnam exercitationem harum! Lorem, ipsum
          dolor sit amet consectetur adipisicing elit. Ea rerum, soluta quas aut
          tempore alias facere doloribus quam expedita quis excepturi unde
          accusamus neque quae vel consectetur autem nam odit ipsum voluptates
          quasi quo illum. Perferendis corporis quam suscipit laborum sit. Est
          quis hic illo expedita, temporibus quod vitae. Repellendus voluptas
          minima quae magnam ad odit enim quidem aliquam facere. Porro doloribus
          in obcaecati aut quis voluptatem, ut consectetur velit odio iure
          facilis, dignissimos possimus nisi consequatur nemo. Sapiente, ipsa.
          Laboriosam magni, accusantium qui impedit magnam dolorum sint dolor
          possimus quaerat error, aliquid voluptatem. Consequatur perspiciatis
          tenetur, obcaecati ex incidunt amet eum nemo commodi, blanditiis
          aperiam ab quos sequi culpa maxime corporis? Autem sit, vel
          praesentium ea ex, perspiciatis libero atque officiis neque esse
          accusantium dolorem laudantium, provident architecto doloremque
          laborum placeat sapiente sint? Harum consectetur adipisci odio
          reprehenderit itaque nemo cum quia deleniti, aspernatur saepe
          distinctio rerum repellendus ut voluptates accusamus culpa delectus
          accusantium repudiandae natus modi eveniet non debitis sequi!
          Praesentium delectus blanditiis adipisci aperiam magni tempora, unde
          consequuntur similique repellendus recusandae hic porro! Neque ipsam
          natus dignissimos delectus ipsum laboriosam, debitis dolorem minima
          autem odit doloribus corrupti incidunt libero ullam totam repudiandae
          aut quibusdam, dicta eos. Consectetur.
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
            CloseTermos();
          }}
          className="c-termos__button c-termos__button--accept"
        >
          Aceitar
        </Button>
        <Button
          onClick={() => {
            CloseTermos();
          }}
          className="c-termos__button c-termos__button--reject"
        >
          Rejeitar
        </Button>
      </div>
    </div>
  );
};

const CloseTermos = () => {
  let termos = document.querySelector("#termos");
  termos.classList.remove("open");
  reactDOM.unmountComponentAtNode(termos);
};
export default function ComponentCookie() {
  const ModalTerms = () => {
    let termos = document.querySelector("#termos");
    termos.classList.add("open");
    reactDOM.render(<Termos />, termos);
  };

  return (
    <Fragment>
      <div className="c-cookie" id="cookie">
        <div className="c-cookie__img">
          <img src={Cookie} alt="Cookie" />
        </div>
        <div className="c-cookie__content">
          <h3 className="c-cookie__content__title">Cookies | Fica Fácil</h3>
          <p className="c-cookie__content__text">
            Nós armazenamos dados temporariamente para melhorar a sua
            experiência e para obter conteúdos de seu interesse. Ao utilizar
            nossos serviços, você concorda com tal monitoramento.
          </p>
          <span
            className="c-cookie__content__politica"
            onClick={() => ModalTerms()}
          >
            Política de Privacidade
          </span>
        </div>
        <div className="c-cookie__buttons">
          <Button className="c-cookie__buttons accept">Aceitar</Button>
          <Link to="#" className="c-cookie__buttons noaccept">
            Rejeitar
          </Link>
        </div>
      </div>
      <section className="l-termos" id="termos"></section>
    </Fragment>
  );
}
