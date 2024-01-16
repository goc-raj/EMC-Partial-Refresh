/* Geocode API used in case of single location with no waypoints */
export function geocode(request, image, map) {
    return (geocoder
            .geocode(request)
            .then((result) => {
                const { results } = result;
                console.log(results);
                map.setCenter(results[0].geometry.location);
                this.setMarker(results[0].geometry.location, image, results[0].formatted_address, map);
                // map.setCenter(results[0].geometry.location);
                // marker.setPosition(results[0].geometry.location);
                // marker.setMap(map);
                // responseDiv.style.display = "block";
                // response.innerText = JSON.stringify(result, null, 2);
                return results;
            })
            .catch((e) => {
                console.log("Geocode was not successful for the following reason: " + e);
            })
    );
}

/* convert datetime to specific time zone based on IANA database */
function convertTime(timeObj, timezone) {
    var setZone = "";
    if (timezone != undefined) {
        if (timezone === 'US/Eastern') {
            setZone = "America/New_York";
        } else if (timezone === 'US/Pacific') {
            setZone = "America/Los_Angeles";
        } else if (timezone === 'US/Mountain') {
            setZone = "America/Denver";
        } else if (timezone === 'US/Central' || timezone === 'America/Chicago') {
            setZone = "America/Chicago";
        } else if (timezone === 'America/El_Salvador') {
            setZone = "America/El_Salvador";
        }
    }
    if (timeObj != undefined) {
        let startendTime = new Date(timeObj);
        let convertedTime = startendTime.toLocaleTimeString("en-US", {
            timeZone: setZone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        return convertedTime;
    } else {
        return "";
    }
}

  // Custom icon on map
  export function setMarker(position, icon, title, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title,
        //  animation: google.maps.Animation.DROP,
        icon: icon
    });
    var infowindow = new google.maps.InfoWindow({
        content: title,
        position: position,
        pixelOffset: new google.maps.Size(0, 10)
    });
    google.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close();
    });
}

/* function to display custom markers with information of address and timezone for waypoints */
/*[{"startLocation":{"Latitude":33.79963,"Longitude":-118.21229},"endLocation":{"Latitude":34.16769,"Longitude":-118.36323},"timeZone":"US/Eastern","waypoints":[]}]*/
export function customIcon(waypt, icon, map, infoarr, timeZone) {
        for (var i = 0; i < waypt.length; i++) {
            var customMarker = new google.maps.Marker({
                position: waypt[i],
                map: map,
                icon: icon
            });
            var contentInfo = this.convertTime(infoarr[i].time, timeZone);
            // var contentInfo = convertTime(infoarr[i].time,timeZone) +'  '+ '@'+'  '+ infoarr[i].speed+'mph';
            var infowindow2 = new google.maps.InfoWindow();
            google.maps.event.addListener(customMarker, 'mouseover', (function (customMarker, contentInfo, infowindow2) {
                return function () {
                    infowindow2.setContent(contentInfo);
                    infowindow2.open(map, customMarker);
                };

            })(customMarker, contentInfo, infowindow2));
            google.maps.event.addListener(customMarker, 'mouseout', (function (customMarker, infowindow2) {
                return function () {
                    infowindow2.close();
                }
            })(customMarker, infowindow2));

        }
}