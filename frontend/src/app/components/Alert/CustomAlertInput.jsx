import React from "react";
import reactDom from "react-dom";
import { Input, Button } from "../Form";
/**
 * @description
 * @author Delfino
 * @date 29/11/2021
 * @export
 * @param {import("react").Props} props
 * @returns {*}
 */
export default function CustomAlertInput(props) {
  const { titulo, children, className, dnone } = props;
  return (
    <section
      className={`c-alertInput ${!dnone && "active"} ` + className || ""}
    >
      <h3 className="c-alertInput__span">{titulo || "Titulo Do alert"}</h3>
      {children}
    </section>
  );
}

export function TesteAlert() {
  const [dnone, setDnone] = React.useState(true);
  function chamarBackdrop() {
    console.log("ola");
    setDnone(!dnone);
  }
  return (
    <React.Fragment>
      <Button onClick={() => chamarBackdrop()}>Chamar</Button>
      <CustomAlertInput dnone={dnone}>
        <form action="">
          <Input
            title={"E-mail"}
            id={"id"}
            label="foasae"
            className=""
            name={"email"}
            type={"email"}
            //   value={"Valor"}
            // error={}
            onChange={(e) => {
              // setAttMateria(e.target.value);
            }}
            inputMode="text"
          />
          <Button type="submit" className="mt">
            Atualizar E-mail
          </Button>
        </form>
      </CustomAlertInput>
    </React.Fragment>
  );
}
