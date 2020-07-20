import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  bigChart() {
    return [{
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
  }

  cards() {
    return [71, 78, 39, 66];
  }

  pieChart() {
    return [{
      name: 'Chrome',
      y: 61.41,
      sliced: true,
      selected: true
  }, {
      name: 'Internet Explorer',
      y: 11.84
  }, {
      name: 'Firefox',
      y: 10.85
  }, {
      name: 'Edge',
      y: 4.67
  }, {
      name: 'Safari',
      y: 4.18
  }, {
      name: 'Sogou Explorer',
      y: 1.64
  }, {
      name: 'Opera',
      y: 1.6
  }, {
      name: 'QQ',
      y: 1.2
  }, {
      name: 'Other',
      y: 2.61
  }]
  }
}
