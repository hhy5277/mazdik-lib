import { Page } from '../page';
import '@mazdik-lib/chart-slider';
import { ChartSliderComponent, ChartInterval } from '@mazdik-lib/chart-slider';

export default class ChartSliderDemo implements Page {

  get template(): string {
    return `<web-chart-slider></web-chart-slider>`;
  }

  load() {
    const component = document.querySelector('web-chart-slider') as ChartSliderComponent;
    const now = new Date();
    component.dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
    component.dateTo = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    component.intervals = getTestChartIntervals();
  }

}

function getTestChartIntervals(): ChartInterval[] {
  const now = new Date();
  return [
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 1),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 2),
      label: 'Test1',
      color: '#F5A363',
    },
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 4),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 5),
      label: 'Test2',
      color: '#7FB6EA',
    },
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 10),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 11),
      label: 'Test3',
      color: '#7FB6EA',
    },
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 15),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 17),
      label: 'Test4',
      color: '#B87FE5',
    },
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 16),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 17),
      label: 'Test5',
      color: '#F5A363',
    },
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 16),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 17),
      label: 'Test6',
      color: '#7FB6EA',
    },
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 22),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 26),
      label: 'Test7',
      color: '#7FB6EA',
    },
  ];
}
