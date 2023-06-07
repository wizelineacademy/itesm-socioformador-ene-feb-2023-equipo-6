import React from "react";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'


export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

function LineChart({chartData}) {
        
    return (
        <Line data={chartData} options={options} />
    );
}
export default LineChart;