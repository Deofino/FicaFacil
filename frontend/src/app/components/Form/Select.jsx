import React from "react";
import TextField from "@material-ui/core/TextField";

/**
 * @function SelectComponent
 * @param value : string -- value padrao do componente
 * @param label :string -- label do componente
 * @param onChange: callback()-- onChange selection data
 * @param children: JSX MENUITEM ou Value -- children Menu Items do select
 */
const CustomSelect = React.forwardRef((props, ref) => (
  <div className="select">
    <label htmlFor={props.id}>{props.label || "Selecione:"}</label>
    <div
      className={`c-select ${props.class || ""} ${
        props.error && " c-select--error"
      }`}
    >
      {props.helper && <div className="c-select__icon">{props.helper}</div>}
      <input
        id={props.id || null}
        name={props.name || null}
        list={props.id + "list"}
        value={props.value || ""}
        onChange={props.onChange || null}
      />
    </div>
    {props.error && <small className="select--error">{props.error}</small>}
    <datalist id={props.id + "list"}>{props.children}</datalist>
  </div>
));

export default CustomSelect;
