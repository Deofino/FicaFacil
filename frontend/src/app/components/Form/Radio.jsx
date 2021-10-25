import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

/**
 * @function RadioButtonComponent
 * @param {value} value value do radio
 * @param {label} label label do radio
 */
const CustomRadioButton = (props) => {
  return (
    <FormControlLabel
      className="c-radio"
      value={props.value || null}
      control={<Radio id={props.id || null} className="c-radio__item" />}
      label={props.label || null}
    />
  );
};

export default CustomRadioButton;
