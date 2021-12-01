import React from "react";
import { Input, Button } from "../Form";
import { FaTimes } from "react-icons/fa";
import { IconButton, Tooltip } from "@material-ui/core";
/**
 * @description
 * @author Delfino
 * @date 29/11/2021
 * @export
 * @param {import("react").Props} props
 * @returns {*}
 */
export default function CustomAlertInput(props) {
  const { titulo, children, className, dnone, close } = props;

  return (
    <section
      className={`c-alertInput ${!dnone && "active"} ` + className || ""}
    >
      <div className={`c-alertInput__alert`}>
        <h3 className="c-alertInput__span">{titulo || "Atualizar"}</h3>
        {children}
      </div>
      <div className="relative">
        <Tooltip
          className="c-alertInput__icon"
          title="Fechar"
          enterDelay={400}
          enterNextDelay={200}
        >
          <IconButton onClick={() => close()}>
            <FaTimes />
          </IconButton>
        </Tooltip>
      </div>
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
