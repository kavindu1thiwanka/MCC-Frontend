import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from '../../shared/services/vehicle.service';
import {AppConstant} from '../../shared/utils/app-constant';

interface CommonFilterDto {
  sortBy: string;
  pickUpDate: any;
  returnDate: any;
  filters: string[];
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
  filterDto: CommonFilterDto = {
    sortBy: '',
    pickUpDate: new Date(),
    returnDate: new Date(),
    filters: []
  };

  selectedFilters: Record<string, string> = {};

  filterButtonList: filterButton[] = [
    {
      name: 'Sort By',
      dropdownItems: [
        {name: 'Price low to high', value: 'car.price ASC'},
        {name: 'Price high to low', value: 'car.price DESC'}
      ]
    },
    {
      name: 'Vehicle Type',
      dropdownItems: [
        {name: 'Sedan', value: 'car.vehicleType = "Sedan"'},
        {name: 'SUV', value: 'car.vehicleType = "SUV"'},
        {name: 'Couple', value: 'car.vehicleType = "Couple"'},
        {name: 'Convertible', value: 'car.vehicleType = "Convertible"'},
        {name: 'Family Car', value: 'car.vehicleType = "Family"'},
        {name: 'Electric Vehicle', value: 'car.vehicleType = "Electric"'},
        {name: 'Luxury Vehicle', value: 'car.vehicleType = "Luxury"'}
      ]
    },
    {
      name: 'Passengers',
      dropdownItems: [
        {name: '2+', value: 'car.seats > 2'},
        {name: '4+', value: 'car.seats > 4'},
        {name: '5+', value: 'car.seats > 5'}
      ]
    },
    {
      name: 'Gearshift',
      dropdownItems: [
        {name: 'Automatic', value: "car.gearType = 'A'"},
        {name: 'Manual', value: "car.gearType = 'M'"}
      ]
    }
  ];

  carList: any = [];

  constructor(private route: ActivatedRoute, private router: Router, private vehicleService: VehicleService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchParams = params;
    });

    this.getCarList();
  }

  // Helper function to apply selected filter
  applyFilter(filterName: string, filterItem: filterDropdownItem) {
    if (this.selectedFilters[filterName] === filterItem.value) {
      delete this.selectedFilters[filterName];
    } else {
      this.selectedFilters[filterName] = filterItem.value;
    }
    this.updateFilterDto();
  }

  // Update the filterDto with the selected filters
  updateFilterDto() {
    this.filterDto.filters = [];
    for (let filterName in this.selectedFilters) {

      if (filterName === 'Sort By') {
        this.filterDto.sortBy = this.selectedFilters[filterName];
        continue;
      }

      this.filterDto.filters.push(this.selectedFilters[filterName]);
    }

    this.getCarList();
  }

  // Helper function to check if filter is selected
  isFilterSelected(filterName: string, filterItem: filterDropdownItem): boolean {
    return this.selectedFilters[filterName] === filterItem.value;
  }

  async getCarList() {
    await this.vehicleService.getVehicleList(this.filterDto).then(res => {
      if (res?.status === 200 && res.body) {
        this.carList = res.body;
      }
    }).catch(e => {
      // Handle error
    });
  }

  selectCar(car: any) {
    alert(`You selected ${car.name}`);
    // Redirect to car details page (optional)
    // this.router.navigate(['/car-details'], { queryParams: { carName: car.name } });
  }
}
