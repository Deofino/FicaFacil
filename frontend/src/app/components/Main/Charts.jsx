import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
const data = [
  {
    name: "Geografia",
    nota: 4,
  },
  {
    name: "Matematica",
    nota: 8,
  },
  {
    name: "Portugeus",
    nota: 9,
  },
  {
    name: "Literatura",
    nota: 10,
  },
  {
    name: "Artes",
    nota: 3,
  },
];

/**
 *
 * @param {React.Props} props
 * @returns
 */
export const ChartBar = (props) => {
  return (
    <section
      className={
        props.className !== undefined ? "c-chart " + props.className : "c-chart"
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={props.data !== undefined ? props.data : data}
          barSize={props.barSize !== undefined ? props.barSize : 20}
          margin={props.margin !== undefined ? props.margin : {}}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={
              props.padding !== undefined
                ? props.padding
                : { left: 20, right: 20 }
            }
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="4 4" />
          <Bar dataKey="nota" background />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};
