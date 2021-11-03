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
  PieChart,
  Pie,
  Sector,
  Cell,
  Area,
  AreaChart,
} from "recharts";
const data = [
  {
    name: "Geografia",
    nota: 4,
    color: "#f00",
  },
  {
    name: "Matematica",
    nota: 8,
    color: "#0f0",
  },
  {
    name: "Portugeus",
    nota: 9,
    color: "#00f",
  },
  {
    name: "Literatura",
    nota: 10,
    color: "#ff0",
  },
  {
    name: "Artes",
    nota: 3,
    color: "#0ff",
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
        props.className !== undefined
          ? "c-chart bar " + props.className
          : "c-chart bar"
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
          <Bar
            dataKey={props.dataKey !== undefined ? props.dataKey : "nota"}
            background
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export const ChartPie = (props) => {
  let data = props.data || [
    {
      name: "Literatura",
      nota: 10,
      color: "#55f",
    },
    {
      name: "Artes",
      nota: 3,
      color: "#990",
    },
  ];
  let innerRadius = props.innerRadius || 100;
  let outerRadius = props.outerRadius || 140;
  let dataKey = props.dataKey || "nota";
  return (
    <section
      className={
        props.className !== undefined
          ? "c-chart pie " + props.className
          : "c-chart pie"
      }
    >
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={5}
            label
            dataKey={dataKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={data[index].color || "#34f"} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
};

export const ChartArea = (props) => {
  let color = props.color || "#55f";
  let keyData = props.keyData || "nota";
  let keyName = props.keyName || "name";

  return (
    <section
      className={
        props.className !== undefined
          ? "c-chart area " + props.className
          : "c-chart area"
      }
    >
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart data={props.data || data}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey={keyName} />
          <Tooltip />
          <YAxis />
          <Legend />
          <Area type="monotone" dataKey={keyData} fill={color} stroke={color} />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
};
