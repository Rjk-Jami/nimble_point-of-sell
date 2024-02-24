import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import useProducts from '../../hooks/useProducts';

const RevenueFromEachProducts = () => {
  const { products, isLoading, error, refetch } = useProducts()
    const [sortedProducts, setSortedProducts] = useState([]);

    useEffect(() => {
      if (products) {
        const updatedProducts = products.map(product => ({
          ...product,
          revenue: (product.sales || 0) * (product.price || 0)
        }));

        const sorted = updatedProducts.sort((a, b) => b.revenue - a.revenue).slice(0, 15);
        setSortedProducts(sorted);
      }
    }, [products]);
    console.log(sortedProducts)
    const options = {

      colors: ['rgb(248 ,113, 113)'],
      series: [{
        data: sortedProducts?.map(product => 
          product.revenue
      )
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
        categories: sortedProducts?.map(product => 
          product.name
      ),
      },
      
      tooltip: {
        theme: 'dark',
        x: {
          show: false
        },
       
        y: {
          
          title: {
            formatter: function (val, opt) {
        return `${opt.w.globals.labels[opt.dataPointIndex]}:${val}`;
      }
          }
        }
        
      }
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
