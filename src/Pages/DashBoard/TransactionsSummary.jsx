import React from 'react';
import Chart from 'react-apexcharts';

const TransactionsSummary = ({name,value}) => {
  const options = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '40%',
        },
       
      },
    },
    labels: [`${name}`],
    colors: ['rgb(248 ,113, 113)']
  };

  const series = [`${value}`];

  return (
    <div className="">
      <Chart
      options={options}
      series={series}
      type="radialBar"
      height={250}
      
    />
    </div>
  );
};

export default TransactionsSummary;
