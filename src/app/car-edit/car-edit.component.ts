import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';
import { OwnerService } from '../shared/services/owner.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};
  owners: Array<any>;
  sub: Subscription;
  ownerDni: any;

  existOwner = false;
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private giphyService: GiphyService,
              private ownerService: OwnerService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            this.car = car;
            this.car.href = car._links.self.href;
            this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.router.navigate(['/car-list']);
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getDni(ownerr) {
    console.log(ownerr)
    this.ownerDni = ownerr;
  }
  save(form: NgForm) {
    this.owners = [];
    this.ownerService.getAll().subscribe((owner: any) => {
      this.owners = owner._embedded.owners;
      for (owner of this.owners) {
        if (owner.dni == this.ownerDni) {
          this.existOwner = true;
        }
      }
      if (this.existOwner) {
        this.carService.save(form).subscribe(result => {
          this.router.navigate(['/car-list']);
        });
      } else {
        alert('No se ha encontrado o no se ingreso dueño');
        
        console.log(form)
        
        //this.ngOnDestroy();
  
      }
    });
  }

  remove(href) {
    this.carService.remove(href).subscribe(result => {
      this.router.navigate(['/car-list']);
    }, error => console.error(error));
  }
}

