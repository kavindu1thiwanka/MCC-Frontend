import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

interface carFilter {
  type: string;
  seats: number;
  gearshift: string;
  pickUpDate: any;
  pickUpLocation: any;

  orderBy: string;
}

interface filterDropdownItem {
  name: string;
  value: string;
  icon?: string;
}

interface filterButton {
  name: string;
  dropdownItems: filterDropdownItem[];
}

@Component({
  selector: 'app-car-selection',
  standalone: false,

  templateUrl: './car-selection.component.html',
  styleUrls: ['./car-selection.component.scss']
})
export class CarSelectionComponent implements OnInit {

  searchParams: any = {};

  filterButtonList: filterButton[] = [
    {
      name: 'Sort By',
      dropdownItems: [
        { name: 'Price low to high', value: 'car.price ASC' },
        { name: 'Price high to low', value: 'car.price DESC' }
      ]
    },
    {
      name: 'Vehicle Type',
      dropdownItems: [
        { name: 'Sedan', value: 'car.type = "Sedan"' },
        { name: 'SUV', value: 'car.type = "SUV"' },
        { name: 'Couple', value: 'car.type = "Couple"' },
        { name: 'Convertible', value: 'car.type = "Convertible"' },
        { name: 'Family Car', value: 'car.type = "Family"' },
        { name: 'Electric Vehicle', value: 'car.type = "Electric"' },
        { name: 'Luxury Vehicle', value: 'car.type = "Luxury"' }
      ]
    },
    {
      name: 'Passengers',
      dropdownItems: [
        { name: '2+', value: 'car.seats > 2' },
        { name: '4+', value: 'car.seats > 4' },
        { name: '5+', value: 'car.seats > 5"' }
      ]
    },
    {
      name: 'Gearshift',
      dropdownItems: [
        { name: 'Automatic', value: 'car.gearshift = "A"' },
        { name: 'Manual', value: 'car.gearshift = "M"' }
      ]
    }
  ];

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
