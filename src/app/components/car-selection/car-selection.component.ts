import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from '../../shared/services/vehicle.service';

interface CommonFilterDto {
  sortBy: string;
  category: string;
  filters: string[];
  pickUpDate: Date;
  returnDate: Date;
}

interface filterDropdownItem {
  name: string;
  value: string;
}

interface filterButton {
  name: string;
  category?: string[];
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
  selectedFilters: Record<string, string> = {};
  carList: any = [];
  selectedCar: any = {};
  showVehicleModal: boolean = false;

  filterDto: CommonFilterDto = {
    sortBy: '',
    category: this.searchParams.category || '',
    filters: [],
    pickUpDate: this.searchParams.pickupDate,
    returnDate: this.searchParams.returnDate
  };

  filterButtonList: filterButton[] = [
    {
      name: 'Sort By',
      category: ['motorcycle', 'car', 'van-shuttle', 'truck'],
      dropdownItems: [
        {name: 'Price low to high', value: 'car.pricePerDay ASC'},
        {name: 'Price high to low', value: 'car.pricePerDay DESC'}
      ]
    },
    {
      name: 'Vehicle Type',
      category: ['car'],
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
      name: 'Vehicle Type',
      category: ['motorcycle'],
      dropdownItems: [
        {name: 'Standard', value: 'car.vehicleType = "Standard"'},
        {name: 'Sport', value: 'car.vehicleType = "Sport"'},
        {name: 'Off Road', value: 'car.vehicleType = "OffRoad"'},
        {name: 'Scooter', value: 'car.vehicleType = "Scooter"'}
      ]
    },
    {
      name: 'Passengers',
      category: ['car'],
      dropdownItems: [
        {name: '2+', value: 'car.seats > 2'},
        {name: '4+', value: 'car.seats > 4'},
        {name: '5+', value: 'car.seats > 5'}
      ]
    },
    {
      name: 'Passengers',
      category: ['truck'],
      dropdownItems: [
        {name: '2', value: 'car.seats = 2'},
        {name: '2+', value: 'car.seats > 2'}
      ]
    },
    {
      name: 'Passengers',
      category: ['van-shuttle'],
      dropdownItems: [
        {name: '4+', value: 'car.seats > 4'},
        {name: '6+', value: 'car.seats > 6'}
      ]
    },
    {
      name: 'Gearshift',
      category: ['car', 'motorcycle', 'van-shuttle', 'truck'],
      dropdownItems: [
        {name: 'Automatic', value: "car.gearType = 'A'"},
        {name: 'Manual', value: "car.gearType = 'M'"}
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private vehicleService: VehicleService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchParams = params;
    });

    this.filterDto.category = this.searchParams.category || '';
    this.filterDto.pickUpDate = this.searchParams.pickupDate;
    this.filterDto.returnDate = this.searchParams.returnDate;

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

  isDropdownItemSelected(filterName: string): boolean {

    if (filterName === 'Sort By') {
      return this.filterDto.sortBy != undefined && this.filterDto.sortBy != null && this.filterDto.sortBy != '';
    }

    return this.selectedFilters[filterName] != undefined || this.selectedFilters[filterName] != null;
  }

  async getCarList() {
    await this.vehicleService.getVehicleList(this.filterDto).then(res => {
      if (res?.status === 200 && res.body) {
        console.log(res)
        this.carList = res.body;
      }
    }).catch(e => {
      // Handle error
    });
  }

  clearFilter() {
    this.selectedFilters = {};
    this.filterDto = {
      sortBy: '',
      category: this.searchParams.category || '',
      filters: [],
      pickUpDate: this.searchParams.pickUpDate,
      returnDate: this.searchParams.returnDate
    };
    this.getCarList();
  }

  openCarModal(car: any) {
    this.selectedCar = car;
    this.showVehicleModal = true;
  }

  handleVehicleDetailsModalClose($event: void) {
    this.showVehicleModal = false;
  }
}
