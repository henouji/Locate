import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LoadingController,ModalController } from '@ionic/angular';
import 'here-js-api/scripts/mapsjs-clustering';
// Modal
import { StationPage } from '../station/station.page';
import 'here-js-api/scripts/mapsjs-core';
import 'here-js-api/scripts/mapsjs-mapevents';
import 'here-js-api/scripts/mapsjs-places';
import 'here-js-api/scripts/mapsjs-service';
import 'here-js-api/scripts/mapsjs-ui';
// For JAWG 
import mapboxgl from 'mapbox-gl';
import { async } from 'q';


declare var H : any;



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Variable Declaration
  private User : user = {
    name: 'User',
    dis: 0,
    prf: 0,
    lat: 14.5888,
    lng: 121.0641
  };
  public boundData: any;
  geoencoderOptions: 
  NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  
  @ViewChild("map")
  public mapElement: ElementRef;
  map: any;

  public error: any;
  station : gasStation;

  private platform : any;

  // Codes 
  constructor(
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private modal: ModalController
  ) {
    this.platformInit()
  }

  ionViewWillEnter(){    
    console.log('Loading Map');
    this.mapInit(this.User.lat,this.User.lng);
  }
   
  ngOnInit(){    
    console.log("Setting up environment");
    this.getGeolocation();
  }
  
  start(){
    this.markUser(this.User.lat,this.User.lng,300);
    this.getStations(this.User.lat,this.User.lng);
  }

  //Get Location
  getGeolocation(){
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    this.User.lat = data.coords.latitude
    this.User.lng = data.coords.longitude
    });
  } 

  platformInit(){
    this.platform = new H.service.Platform({
      'app_id': 'C5TQ7TEvkh6RRxoyLuUg',
      'app_code': 'vucRfNCQRqEouA5POg64-Q'
    });
  }

  mapInit(latitude, longitude){
    let defaultLayers = this.platform.createDefaultLayers();
      this.map = new H.Map(document.getElementById('map'),
      defaultLayers.normal.map, {
      center: {lat: latitude, lng: longitude},
      zoom: 10
      });
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
  }

  getStations(latitude, longitude){
    // Search for Gas Stations using user lat and lng
    let latlng = latitude + ',' + longitude;
    let search = new H.places.Search(this.platform.getPlacesService()), result, error;
    let params = {
      'q': 'gas station',
      'at': latlng
    };
    // Get gas station data
    function getData(data){
      addPlacesToMap(data.results);
    }
    function getError(data){
      error = data;
    }
    // Create Marker Group
    let group = new H.map.Group();
    // Init UI
    let ui = H.ui.UI.createDefault(this.map, this.platform.createDefaultLayers());
    this.map.addObject(group);
    // Add event listener for taps
    group.addEventListener('tap', 
      function (evt) {
        // event target is the marker itself, group is a parent event target
        // for all objects that it contains
        let bubble =  new H.ui.InfoBubble(evt.target.getPosition(), {
          // read custom data
          content: evt.target.getData()
        });
        // Show Modal
        dataBind(evt.target.getData());
      }
    , false);
    console.log("Added event Listener");
    // Get custom Icon
    let icon = new H.map.Icon('../assets/icon/gas.png',{size: {w: 64, h: 64}});  
    // Mark result to map
    function addPlacesToMap(result) {
        result.items.map(function (place) {
          let coordinates = {lat : place.position[0], lng: place.position[1]}; 
          markStation(coordinates,place.title);
          });
          function markStation(coordinates,place){
            let marker = new H.map.Marker(coordinates,{icon: icon});
            marker.setData(place);
            group.addObject(marker);
          }
    }
    const dataBind= (data) => {
      this.callModal(data);
    }
    // Send parameters to API
    search.request(params, {}, getData, getError); 
  }

  markUser(latitude,longitude,radius){  
    this.map.setZoom(16, true);  
    this.map.setCenter({lat: latitude, lng: longitude})
    let circle = new H.map.Circle({lat: latitude, lng: longitude}, radius);
    this.map.addObject(circle);
  }

  callModal(data){
    this.openStationInfo(data);
  }

  // Modal Opener
  async openStationInfo(data){
    const stationInfo = await this.modal.create({
      component: StationPage,
      componentProps : {data : data},
    });
    return await stationInfo.present();
  }

  // Setters
  setPref(){
    this.User.prf = 1
  }

  setDis(){
    this.User.dis = 30
  }

}

interface gasStation{
  name : string,
  address: string,
  dsl: number,
  unl: number,
  prm: number,
  lat: number,
  lng: number,
}

interface user{
  name: String,
  dis: number,
  prf: number,
  lat: number,
  lng: number,
}
