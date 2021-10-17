import React, { Fragment } from "react";
import { Tab, Tabs } from "@material-ui/core";

import {
  FormularioAreaMateria,
  FormularioAssuntoMateria,
  FormularioMateria,
} from "./";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <section className="c-tab">{children}</section>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function FormularioMaterias() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Fragment>
      <div className="c-forms">
        <div className="c-forms__title">
          <h2 className="c-forms__question">Matérias</h2>
        </div>
        <div className="c-forms__quite"></div>
        <section className="l-tabs">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Área" {...a11yProps(0)} />
            <Tab label="Matéria" {...a11yProps(1)} />
            <Tab label="Assunto" {...a11yProps(2)} />
          </Tabs>
        </section>
        <TabPanel value={value} index={0}>
          <FormularioAreaMateria />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormularioMateria />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FormularioAssuntoMateria />
        </TabPanel>
      </div>
    </Fragment>
  );
}
