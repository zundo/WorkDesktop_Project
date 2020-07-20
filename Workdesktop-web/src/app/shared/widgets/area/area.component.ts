import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  chartOptions: {};

  Highcharts = Highcharts;
  

  constructor() { }

  ngOnInit(): void {
    this.chartOptions =   {
      chart: {
          type: 'area',
          backgroundColor: null,
      },
      title: {
          text: "Chiffre d'affaire annuelle"
      },
      subtitle: {
          text: 'Chiffre démonstratif'
      },
      xAxis: {
          categories: ['2012','2013', '2014', '2015', '2016', '2017', '2018', '2019'],
          tickmarkPlacement: 'on',
          title: {
              enabled: false
          }
      },
      yAxis: {
          title: {
              text: "en Milliers d'€"
          },
          labels: {
              formatter: function () {
                  return this.value / 1000;
              }
          }
      },
      tooltip: {
          split: true,
          valueSuffix: ' 000 €'
      },
      plotOptions: {
          area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                  lineWidth: 1,
                  lineColor: '#666666'
              }
          }
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      series: [{
          name: 'Application-web',
          data: [18, 31, 54, 65, 74, 78, 85, 89]
      }, {
          name: 'Application-mobile',
          data: [12, 18, 25, 42, 47, 51, 55, 61]
      }, {
          name: 'Application-logiciel',
          data: [13, 17, 23, 28, 33, 37, 42, 48]
      }, {
          name: 'Robot-IA',
          data: [8, 14, 17, 21, 25, 28, 35, 42]
      }, {
          name: 'E-commerce',
          data: [4, 8, 12, 15, 20, 24, 29, 35]
      }]
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      )
    }, 300)
  }

}
