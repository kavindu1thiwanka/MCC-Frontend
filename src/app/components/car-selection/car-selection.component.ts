import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-car-selection',
  standalone: false,

  templateUrl: './car-selection.component.html',
  styleUrl: './car-selection.component.scss'
})
export class CarSelectionComponent implements OnInit {

  searchParams: any = {};

  carList = [
    { name: 'Tesla Model S', type: 'Electric', seats: 5, pricePerDay: 120, image: '/assets/cars/tesla-model-s.jpg' },
    { name: 'BMW X5', type: 'SUV', seats: 5, pricePerDay: 150, image: '/assets/cars/bmw-x5.jpg' },
    { name: 'Mercedes-Benz E-Class', type: 'Sedan', seats: 5, pricePerDay: 130, image: '/assets/cars/mercedes-e-class.jpg' },
    { name: 'Ford Mustang', type: 'Sports', seats: 4, pricePerDay: 180, image: '/assets/cars/ford-mustang.jpg' },
    { name: 'Toyota Camry', type: 'Sedan', seats: 5, pricePerDay: 90, image: '/assets/cars/toyota-camry.jpg' },
    { name: 'Honda CR-V', type: 'SUV', seats: 5, pricePerDay: 100, image: '/assets/cars/honda-crv.jpg' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      console.log('Search Parameters:', this.searchParams);
    });
  }

  selectCar(car: any) {
    alert(`You selected ${car.name}`);
    // Redirect to car details page (optional)
    // this.router.navigate(['/car-details'], { queryParams: { carName: car.name } });
  }
}
