import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

/**
 * @function Checkbox Component
 * @param isChecked: boolean -- checado sim ou nao
 * @param onChange: callback(e) -- Mudar ao clicar
 * @param ref: Ref -- Referencia
 * @param name: string -- name para formulario
 * @param children: JSX || string -- Aparecera ao lado do checkbox
 *
 */
const CustomCheckbox = (props) => {
  return (
    <FormControlLabel
      className={"c-checkbox " + (props.className || "")}
      control={
        <Checkbox
          checked={props.isChecked || false}
          onChange={props.onChange || null}
          name={props.name || null}
          ref={props.ref || null}
          className="c-checkbox__item"
          color="default"
        />
      }
      label={props.children || "Texto"}
    />
  );
};

export default CustomCheckbox;
