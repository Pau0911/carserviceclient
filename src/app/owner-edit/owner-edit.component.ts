import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { OwnerService } from '../shared/services/owner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {

  owner: any = {};
  owners: Array<any>;
  sub: Subscription;
  
  constructor(private route: ActivatedRoute, private router: Router, private ownerService: OwnerService, private _carService: CarService) { }

  ngOnInit() {
    this.owners = [];
    this.sub = this.route.params.subscribe(params => {
      let id = params["id"];
      if (id) {
        this.ownerService.getAll().subscribe((owner: any) => {
          this.owners = owner._embedded.owners;
          for (owner of this.owners) {
            if (owner.dni == id) {
              this.owner = owner;
              this.owner.href = owner._links.self.href;
            }
          }
        });
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  remove(href) {
    for (let owner of this.owners) {
      this.ownerService.remove(href).subscribe(result => {
        this.router.navigate(['/owner-list']);        
        let ownerDni = owner.dni;
        this._carService.getAll().subscribe((cars) => {
          for (let car of cars) {
            if (car.ownerDni === ownerDni) {
              car.ownerDni = null;
              this._carService.save(car).subscribe(() => {
              });
            }
          }
        });

      }, error => console.error(error));
    }
  }
  
  saveOwner(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.router.navigate(['/owner-list']);
    }, error => console.error(error));
  }


}
