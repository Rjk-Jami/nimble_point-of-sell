import React from 'react';
import Chart from 'react-apexcharts';

const TransactionsSummary = ({name,value}) => {
  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        max: 200
      },
    },
    labels: [`${name}`],
    colors: ['rgb(248 ,113, 113)']
  };

  const series = [`${value}`];

  return (
    <Chart
      options={options}
      series={series}
      type="radialBar"
      height={350}
    />
  );
};

export default TransactionsSummary;
