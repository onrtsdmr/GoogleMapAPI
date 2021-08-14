/*
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import "./style.css";

let map: google.maps.Map;

function initMap(): void {
  const latLongs = [
    { lat: 38.734802, lng: 35.467987 },
    { lat: 38.626995, lng: 34.719975 },
    { lat: 37.783333, lng: 29.094715 }
  ];
  let index = 1;

  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 8,
    center: latLongs[0],
  });

  const marker = addMarker(latLongs[2].lat, latLongs[2].lng, map, "KAYSERI");

  map.addListener("center_changed", () => {
    setInterval(() => {
      // GoFuckYourSelf();
    }, 5000);
  })

  function GoFuckYourSelf() {
    if (index > latLongs.length) {
      index = 0;
    }
    marker.setPosition(latLongs[index]);
    console.log(marker.getPosition);
    index++;
  }

  marker.addListener("click", () => {
    map.setZoom(8);
    map.setCenter(marker.getPosition() as google.maps.LatLng);
  });

  map.addListener("click", (e) => {
    placeMarkerAndPanTo(e.latLng, map);
  });



  function addMarker(lat: number, long: number, map: google.maps.Map, title: string) {
    return new google.maps.Marker({
      position: {lat: lat, lng: long},
      map: map,
      title: title,
    });
  }

  function placeMarkerAndPanTo(latLng: google.maps.LatLng, map: google.maps.Map) {
    new google.maps.Marker({
      position: latLng,
      map: map,
    });
    map.panTo(latLng);
  }
}
export { initMap };
