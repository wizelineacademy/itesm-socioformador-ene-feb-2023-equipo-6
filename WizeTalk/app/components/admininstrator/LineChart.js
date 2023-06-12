import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'


export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
        suggestedMin: 0,
        suggestedMax: 10
    }
}
};

function LineChart({ chartData }) {

  return (
    <Bar data={chartData} options={options} />
  );
}
export default LineChart;