import React from 'react';
import Chart from 'react-apexcharts';

const RevenueFromEachProducts = () => {
  const options = {
   
    colors: ['rgb(248 ,113, 113)'],
    series: [{
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }],
    chart: {
      type: 'bar',
      height: 600
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
        'United States', 'China', 'Germany'
      ],
    },
    formatter: function (val, opt) {
      return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return ''
          }
        }
      }}
  };

  return (
    <Chart
      options={options}
      series={options.series}
      type="bar"
      height={options.chart.height}
    />
  );
};

export default RevenueFromEachProducts;
