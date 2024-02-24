import React, { useEffect } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent

} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import useProducts from '../../hooks/useProducts';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

const TopSellingP = ({ classN }) => {
  const { products, isLoading, error, refetch } = useProducts()
  const topProducts = products?.sort((a, b) => b.sales - a.sales).slice(0, 15);

  useEffect(() => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);

    const option = {

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        top: 'bottom'
      },


      toolbox: {
        show: true,
        feature: {


          saveAsImage: { show: true }
        }
      },

      series: [
        {
          name: 'Top Selling Products',
          type: 'pie',
          radius: [20, 150],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: topProducts?.map(product => ({
            value: product.sales,
            name: product.name
        }))
        }
      ]
    };

    option && myChart.setOption(option);

    // Clean up the chart on component unmount
    return () => {
      myChart.dispose();
    };
  }, [topProducts]);

  return <div id="main" className={`${classN}, w-full lg:w-auto xl:max-w-lg mx-auto`} style={{ width: '', height: '600px' }} />;
};

export default TopSellingP;
