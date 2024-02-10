import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  DatasetComponent,
  GridComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  DatasetComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
]);

const RevenueFromEachProducts = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const existingChartInstance = echarts.getInstanceByDom(chartRef.current);
    const myChart = existingChartInstance || echarts.init(chartRef.current);

    const option = {
      dataset: {
        source: [
          ['score', 'amount', 'product'],
          [89.3, 58212, 'Matcha Latte'],
          [57.1, 78254, 'Milk Tea'],
          [74.4, 41032, 'Cheese Cocoa'],
          [50.1, 12755, 'Cheese Brownie'],
          [89.7, 20145, 'Matcha Cocoa'],
          [68.1, 79146, 'Tea'],
          [19.6, 91852, 'Orange Juice'],
          [10.6, 101852, 'Lemon Juice'],
          [32.7, 20112, 'Walnut Brownie']
        ]
      },
      grid: { containLabel: true },
      xAxis: { name: 'amount' },
      yAxis: { type: 'category' },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      series: [
        {
          type: 'bar',
          encode: {
            x: 'amount',
            y: 'product'
          }
        }
      ]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} className='w-full lg:w-auto lg:max-w-lg  ' style={{ width: '', height: '600px' }}></div>;
};

export default RevenueFromEachProducts;
