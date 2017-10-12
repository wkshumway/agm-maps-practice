import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';


@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.css']
})
export class GMapComponent implements OnInit { 
  public searchControl: FormControl;
  autocomplete: google.maps.places.Autocomplete;


  @ViewChild("search")
  public searchElementRef: ElementRef;

  lat: number = 31.451044;
  lng: number = -110.220515;
  zm: number = 9;
  
  constructor( private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
     //create search FormControl
    this.searchControl = new FormControl();
     //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
      this.autocomplete =
          new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
              types: []
          });
      this.autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
              //get the place result
              let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

              //verify result
              if (place.geometry === undefined || place.geometry === null) {
                  return;
              }

              this.lat = (place.geometry.location.lat());
              this.lng = (place.geometry.location.lng());

              this.markers.push({
                lat: this.lat,
                lng: this.lng,
                label: 'new',
                draggable: true,
                infoWindowContent: "Your new item",
              });


                });
            });
        });
    }

    // From: http://plnkr.co/edit/YX7W20?p=preview
    markers: marker[] = [
        {
            lat: 31.451044,
            lng: -110.220515,
            label: 'A',
            draggable: true,
            infoWindowContent: "My house!",
        },
        {
            lat: 32.111861,
            lng: -110.791679,
            label: 'B',
            draggable: false,
            infoWindowContent: "Colton's house!",
        },
        {
            lat: 31.111861,
            lng: -110.791679,
            label: 'C',
            draggable: false,
            infoWindowContent: "Ethel Emu's house!",
        }
    ]
}

// From: http://plnkr.co/edit/YX7W20?p=preview
// just an interface for type safety.
interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    infoWindowContent: string;
}

//   saveEventData(location: string, time: string, numGuests, description: string, title: string, tags: string) {
//     this.user.subscribe((user) => {
//         if (user) {
//             const newRef = this.events.push(null);
//             const newEvent = {
//                 id: newRef.key,
//                 location: .place_id,
//                 time: time,
//                 numGuests: numGuests,
//                 hostid: user.uid,
//                 description: description,
//                 title: title,
//                 tags: tags,
//                 visibility: this.eventVis,
//                 timestamp: firebase.database.ServerValue.TIMESTAMP
//             };
//             newRef.set(newEvent);
//             this.db.object('/users/' + user.uid + '/hosting/' + newRef.key).set(true);
//             let place = this.autocomplete.getPlace();
//             this.db.object('/places/' + place.place_id + '/events/' + newRef.key).set(true);
//             const newPlace = {
//                 name: place.name,
//                 latlong: place.geometry.location.toString(),
//                 address: place.formatted_address,
//                 url: place.url
//             }
//             this.db.object('/places/' + place.place_id).update(newPlace);
//             this.dialogRef.close(newEvent);
//         } else {
//             this.dialogRef.close();
//         }
//     });
// }
