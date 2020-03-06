import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GiphyService } from '../shared/giphy/giphy.service';
import { OwnerService } from '../shared/services/owner.service';

@Component({
  selector: 'app-owner-car',
  templateUrl: './owner-car.component.html',
  styleUrls: ['./owner-car.component.css']
})
export class OwnerCarComponent implements OnInit {

  cars: any[];
  ownerList: any[];
  owners: any[];
  ownerName: any;

  constructor(private carService: CarService, private giphyService: GiphyService,
              private route: ActivatedRoute, private router: Router, private ownerService: OwnerService) { }
              
  ngOnInit() {
    this.owners = [];
    this.ownerList = [];
    //Lista de duenos
    this.ownerService.getAll().subscribe((owner: any) => {
      this.owners = owner._embedded.owners;
      //Lista de carros
      this.carService.getAll().subscribe(carsList => {
        this.cars = carsList;
        for (let car of this.cars) {
          this.giphyService.get(car.name).subscribe(url => {
            car.giphyUrl = url;
            for (let owner of this.owners) {
              if (owner.dni === car.ownerDni) {
                this.ownerList.push({
                  carName: car.name,
                  ownerDni: car.ownerDni,
                  ownerName: owner.name,
                  giphyUrl: car.giphyUrl
                });
              }
            }
          });
        }
      });
    });
    } 
  }


