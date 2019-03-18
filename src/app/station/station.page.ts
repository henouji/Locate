import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';


@Component({
  selector: 'app-station',
  templateUrl: './station.page.html',
  styleUrls: ['./station.page.scss'],
})
export class StationPage implements OnInit {

  stations =[
    {
      name: 'Petron',
      ron97: '50.21 - 57.84',
      ron95: '49.21 - 57.71',
      ron91: '47.29 - 54.31',
      diesel: '42.07 - 44.99',
      dieselP : '42.00 - 46.99',
      kerosene: '45.17 - 53.31'
    },
    {
      name: 'Shell',
      ron97: '50.45 - 57.31',
      ron95: '49.19 - 55.31',
      ron91: '47.19 - 54.31',
      diesel: '41.89 - 45.04',
      dieselP : '44.29 - 48.39',
      kerosene: 'None'
    },
    {
      name: 'Caltex',
      ron97: 'None',
      ron95: '50.99 - 54.30',
      ron91: '49.99 - 52.94',
      diesel: '41.40 - 44.78',
      dieselP : 'None',
      kerosene: '48.67 - 53.58'
    },
    {
      name: 'Total',
      ron97: 'None',
      ron95: '49.48 - 54.04',
      ron91: '48.48 - 53.46',
      diesel: '42.39 - 45.20',
      dieselP : '45.09 - 49.42',
      kerosene: 'None'
    },
    {
      name: 'Flying V',
      ron97: 'None',
      ron95: '48.85 - 49.78',
      ron91: '48.48 - 50.09',
      diesel: '41.94 - 42.36',
      dieselP : 'None',
      kerosene: 'None'
    },
    {
      name: 'Unioil',
      ron97: 'None',
      ron95: '51.74 - 53.05',
      ron91: '50.10 - 51.55',
      diesel: '42.80 - 43.75',
      dieselP : 'None',
      kerosene: 'None'
    },
    {
      name: 'Seaoil',
      ron97: '47.40 - 55.80',
      ron95: 'None',
      ron91: '46.40 - 53.88',
      diesel: '39.90 - 43.39',
      dieselP : 'None',
      kerosene: 'None'
    },
  ]
  constructor(private navParams: NavParams) { }

  stationTitle: any = this.navParams.get('data'); 
  gs : display = {
    r97: 'None',
    r95: 'None',
    r91: 'None',
    dies: 'None',
    diesP: 'None',
    kero: 'None'
  };

  ngOnInit() {
    console.log(this.navParams.get('data'));
    for (let i = 0; i < this.stations.length; i++) {
      if(this.stationTitle.includes(this.stations[i].name))
      {
        console.log(this.stations[i]);
        this.gs.r97 = this.stations[i].ron97;
        this.gs.r95 = this.stations[i].ron95;
        this.gs.r91 = this.stations[i].ron91;
        this.gs.dies = this.stations[i].diesel;
        this.gs.diesP = this.stations[i].dieselP;
        this.gs.kero = this.stations[i].kerosene;
      }
    }
  }

}
interface display {
  r97: any,
  r95: any,
  r91: any,
  dies: any,
  diesP: any,
  kero: any
};
