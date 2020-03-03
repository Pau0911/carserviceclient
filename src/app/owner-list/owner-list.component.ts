import { Component, OnInit } from '@angular/core';
import {OwnerService} from '../shared/services/owner.service';
import { CarService } from '../shared/car/car.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  owners: Array<any>;
  owner: any;
  selected: Array<any> = [] ;

  constructor(private route: ActivatedRoute, private router: Router, private ownerService: OwnerService, private carService: CarService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
    });
  }
  selectedItem(owner: any) {
    this.selected.push(owner);
    this.router.navigate(['/owner-list'])
  }

  removeOwner() {
    for (let owner of this.selected) {
      this.ownerService.remove(owner._links.self.href).subscribe(data => {
        let ownerDni = owner.dni;
        this.carService.getAll().subscribe((result) => {
          for (let car of result) {
            if (car.ownerDni === ownerDni) {
              car.ownerDni = null;
              this.carService.save(car).subscribe(() => {
              });
            }
          }
        });
        this.ngOnInit();
      }, error => console.error(error));
    }
  }
}
