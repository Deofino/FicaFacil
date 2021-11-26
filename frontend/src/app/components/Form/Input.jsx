import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";
import MaskedInput from "react-text-mask";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      // mask={ [ '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ] }
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={props.mask}
      placeholderChar={"_"}
    />
  );
}
/**
 * @function Input
 * @param error: string  -- Modo erro no helper text
 * @param title: string  -- Label
 * @param id: string  -- id
 * @param icon: JSX Icon || string || null  -- icone comeco... Sem icone Label maior e animado
 * @param name: string  -- name
 * @param type: string  -- type input 'text,email,password,tel, etc'
 * @param inputMode: string  -- inputMode 'text,email,tel,numeric, numpad,etc'
 * @param iconEnd: JSX Icon || string || null  -- icone Final
 * @param required: boolean  -- campo requirido ou nao
 * @param ref: Ref  -- Referencia do input
 * @param value: string  -- value ou state
 * @param onChange: void()  -- callback oq fazer com valor
 * @param mask: array regex ou funcao  -- mascara
 * @param multiline: boolean - pode ser multilinha
 * @param rows: int - numeros de linha
 *
 */

const Input = forwardRef((props, ref) => (
  <TextField
    helperText={props.error || null}
    error={props.error ? true : false}
    label={props.title || null}
    rows={props.rows || null}
    className={
      props.error
        ? "c-input c-input--error " + props.className
        : "c-input " + props.className
    }
    variant={props.icon ? "standard" : "filled"}
    InputLabelProps={{ htmlFor: props.id || null }}
    size="small"
    InputProps={{
      inputComponent: props.mask && TextMaskCustom,
      inputProps: {
        mask: props.mask,
        multiple: props.multiple || null,
        accept: props.accept || null,
      },
      placeholder: props.placeholder || null,
      startAdornment: props.icon ? (
        <p className="c-input__icon">{props.icon}</p>
      ) : null,
      type: props.type || "text",
      value: props.value,
      inputRef: ref || null,
      onChange: props.onChange,
      name: props.name || null,
      id: props.id || null,
      inputMode: props.inputMode || "none",
      required: props.required || null,
      endAdornment: props.iconEnd ? (
        <p className="c-input__icon">{props.iconEnd}</p>
      ) : null,
    }}

    multiline={props.multiline ? true : false}
  />
));
export default Input;
