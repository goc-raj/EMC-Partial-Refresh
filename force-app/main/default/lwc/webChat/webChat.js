import { LightningElement,api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import jQueryMinified from '@salesforce/resourceUrl/jQueryMinified';
import zendesk from '@salesforce/resourceUrl/zendesk';
import { setMarker, customIcon, geocode } from 'c/mapUtils';
const CONTAINER_HTML = `<div>Some HTML</div>`;
const google = window.google = window.google ? window.google : {}
export default class WebChat extends LightningElement {
    chatJsInitialised = false;
    map;
    @api startLocationLt = "";
    @api startLocationLg = "";
    @api endLocationLt = "";
    @api endLocationLg = "";
    @api recordId;
    @api timeZone;
    connectedCallback() {
        let element = document.createElement('div');
        element.setAttribute('id', `map-canvas${this.recordId}`);
        element.setAttribute('style', 'height: 230px;width:100%')
        //document.body.appendChild(element);
        setTimeout(() =>{
            if( this.template.querySelector('.map-holder')){
                this.template.querySelector('.map-holder').appendChild(element);
            }
        }, 10)
    }
        
    renderedCallback() {
        console.log("inside rendered")
        if (this.chatJsInitialised) {
            return;
        }
       // const container = this.template.querySelector('.container');
       // container.innerHTML = CONTAINER_HTML;
        // ..Do some logic with the container ...
      /*  loadScript(this, zendesk)
        .then(() => {
            console.log('zendesk loaded')
        }).catch((error)=>{
            console.log("Errr--", error)
        })*/
    }

    /* Map location */

    @api initMap(targetId){
        var mapLocation
       // targetId = event.currentTarget.dataset.id;
        //var mapLocation = '[{"startLocation":{"Latitude":35.74773,"Longitude":-119.24879},"endLocation":{"Latitude":36.33765,"Longitude":-119.64669},"timeZone":"US/Pacific","waypoints":[]}]'
        mapLocation = [{
            startLocation: {
              Latitude: this.startLocationLt,
              Longitude: this.startLocationLg
            },
            endLocation: {
              Latitude: this.endLocationLt,
              Longitude: this.endLocationLg
            },
            timeZone: this.timeZone,
            waypoints: []
          }];
        console.log("", this.template.querySelectorAll('.map-holder'))
        this.dispatchEvent(new CustomEvent("initGoogleMap", { detail: { data: JSON.stringify(mapLocation), element: this.template.querySelector(`[data-id="${targetId}"`) }, bubbles: true, composed: true  }));
        // console.log("google--", window, window.google)
        // this.map = new window.google.maps.Map(this.template.querySelector('.map'), {
        //     zoom: 18,
        //     center: { lat: 41.85, lng: -87.65 },
        //     mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        //     controlSize: 30
        // });
    }

    locate(){
        var mapLocation = '[{"startLocation":{"Latitude":33.79963,"Longitude":-118.21229},"endLocation":{"Latitude":34.16769,"Longitude":-118.36323},"timeZone":"US/Eastern","waypoints":[]}]'
        if (mapLocation) {
            console.log(window.testVar)
            var maplocation = JSON.parse(mapLocation);
            geocoder = new google.maps.Geocoder();
            console.log("map data", mapLocation);
            /* console.log("geocoder", geocoder); */
            var waypoint = maplocation[0].waypoints;
            var waypts = [];
            for (var i = 0; i < waypoint.length; i++) {
                waypts.push({
                    location: new google.maps.LatLng(waypoint[i].latitude, waypoint[i].longitude),
                    stopover: false
                });
            }

              /* Custom map marker */
            var image = {
                start: {
                    url: `{!URLFOR($Resource.mapIcons, 'icons/icon_marker_start_2.png')}`,
                    // This marker is 26 pixels wide by 40 pixels high.
                    size: new google.maps.Size(26, 40),
                    // The origin for this image is (0, 0).
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at (15, 40).
                    anchor: new google.maps.Point(15, 40)
                },
                end: {
                    url: `{!URLFOR($Resource.mapIcons, 'icons/icon_marker_stop_2.png')}`,
                    // This marker is 20 pixels wide by 32 pixels high.
                    size: new google.maps.Size(26, 40),
                    // The origin for this image is (0, 0).
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at (0, 32).
                    anchor: new google.maps.Point(13, 39)
                },
                wpt: {
                    url: `{!URLFOR($Resource.mapIcons, 'icons/icon_marker_pin_2.png')}`,
                    size: new google.maps.Size(8, 8),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(3.5, 5)
                }
            };

            if (
                maplocation[0].startLocation.Latitude != undefined &&
                maplocation[0].endLocation.Latitude != undefined &&
                maplocation[0].startLocation.Longitude != undefined &&
                maplocation[0].endLocation.Longitude != undefined
            ) {
                var originPlace = new google.maps.LatLng(maplocation[0].startLocation.Latitude, maplocation[0].startLocation.Longitude);
                var destinationPlace = new google.maps.LatLng(maplocation[0].endLocation.Latitude, maplocation[0].endLocation.Longitude);
                var directionsService = new google.maps.DirectionsService();
                var directionsDisplay = new google.maps.DirectionsRenderer({
                    suppressMarkers: true
                });

                directionsDisplay.setMap(map);

                var request = {
                    origin: originPlace,
                    destination: destinationPlace,
                    waypoints: waypts,
                    optimizeWaypoints: true,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };



                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        var route = response.routes[0].legs[0];
                        // custom icon on map
                        setMarker(route.start_location, image.start, route.start_address, map);
                        setMarker(route.end_location, image.end, route.end_address, map);
                        customIcon(route.via_waypoints, image.wpt, map, waypoint, maplocation[0].timeZone);
                    }
                });
            } else {
                if (maplocation[0].startLocation.Latitude != undefined && maplocation[0].startLocation.Longitude != undefined && maplocation[0].waypoints.length === 0) {
                    geocode({ location: new google.maps.LatLng(maplocation[0].startLocation.Latitude, maplocation[0].startLocation.Longitude) }, image.start, map);
                } else if (maplocation[0].endLocation.Latitude != undefined && maplocation[0].endLocation.Longitude != undefined && maplocation[0].waypoints.length === 0) {
                    geocode({ location: new google.maps.LatLng(maplocation[0].endLocation.Latitude, maplocation[0].endLocation.Longitude) }, image.end, map);
                } else if (maplocation[0].endLocation.Latitude === undefined && maplocation[0].endLocation.Longitude === undefined && maplocation[0].waypoints.length != 0) {
                    var originPlace = new google.maps.LatLng(maplocation[0].startLocation.Latitude, maplocation[0].startLocation.Longitude);
                    var wayLen = maplocation[0].waypoints.length - 1;
                    var endLat = maplocation[0].waypoints[wayLen].latitude;
                    var endLon = maplocation[0].waypoints[wayLen].longitude;
                    console.log("destination latitude", endLat, endLon);
                    var destinationPlace = new google.maps.LatLng(endLat, endLon);
                    var directionsService = new google.maps.DirectionsService();
                    var directionsDisplay = new google.maps.DirectionsRenderer({
                        suppressMarkers: true
                    });

                    directionsDisplay.setMap(map);

                    var request = {
                        origin: originPlace,
                        destination: destinationPlace,
                        waypoints: waypts,
                        optimizeWaypoints: true,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };



                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            console.log(response);
                            directionsDisplay.setDirections(response);
                            var route = response.routes[0].legs[0];
                            // custom icon on map
                            setMarker(route.start_location, image.start, route.start_address, map);
                            //  setMarker(route.end_location, image.end, route.end_address, map);
                            customIcon(route.via_waypoints, image.wpt, map, waypoint, maplocation[0].timeZone);
                        }
                    });
                } else if (maplocation[0].startLocation.Latitude === undefined && maplocation[0].startLocation.Longitude === undefined && maplocation[0].waypoints.length != 0) {
                    var destinationPlace = new google.maps.LatLng(maplocation[0].endLocation.Latitude, maplocation[0].endLocation.Longitude);
                    var startLat = maplocation[0].waypoints[0].latitude;
                    var startLon = maplocation[0].waypoints[0].longitude;
                    // console.log("origin latitude", startLat, startLon);
                    var originPlace = new google.maps.LatLng(startLat, startLon);
                    var directionsService = new google.maps.DirectionsService();
                    var directionsDisplay = new google.maps.DirectionsRenderer({
                        suppressMarkers: true
                    });

                    directionsDisplay.setMap(map);

                    var request = {
                        origin: originPlace,
                        destination: destinationPlace,
                        waypoints: waypts,
                        optimizeWaypoints: true,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };



                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            console.log(response);
                            directionsDisplay.setDirections(response);
                            var route = response.routes[0].legs[0];
                            // custom icon on map
                            //setMarker(route.start_location, image.start, route.start_address, map);
                            setMarker(route.end_location, image.end, route.end_address, map);
                            customIcon(route.via_waypoints, image.wpt, map, waypoint, maplocation[0].timeZone);
                        }
                    });
                }
            }
        }
    }
}