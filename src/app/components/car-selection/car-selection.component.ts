import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../shared/services/vehicle.service';

interface CommonFilterDto {
  sortBy: string;
  category: string;
  filters: string[];
}

interface filterDropdownItem {
  name: string;
  value: string;
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
  selectedFilters: Record<string, string> = {};
  carList: any = [];
  activeCollapseIndex: number | null = null;

  filterDto: CommonFilterDto = {
    sortBy: '',
    category: '',
    filters: []
  };

  filterButtonList: filterButton[] = [
    {
      name: 'Sort By',
      dropdownItems: [
        { name: 'Price low to high', value: 'car.priceForDay ASC' },
        { name: 'Price high to low', value: 'car.priceForDay DESC' }
      ]
    },
    {
      name: 'Vehicle Type',
      dropdownItems: [
        { name: 'Sedan', value: 'car.vehicleType = "Sedan"' },
        { name: 'SUV', value: 'car.vehicleType = "SUV"' },
        { name: 'Couple', value: 'car.vehicleType = "Couple"' },
        { name: 'Convertible', value: 'car.vehicleType = "Convertible"' },
        { name: 'Family Car', value: 'car.vehicleType = "Family"' },
        { name: 'Electric Vehicle', value: 'car.vehicleType = "Electric"' },
        { name: 'Luxury Vehicle', value: 'car.vehicleType = "Luxury"' }
      ]
    },
    {
      name: 'Passengers',
      dropdownItems: [
        { name: '2+', value: 'car.seats > 2' },
        { name: '4+', value: 'car.seats > 4' },
        { name: '5+', value: 'car.seats > 5' }
      ]
    },
    {
      name: 'Gearshift',
      dropdownItems: [
        { name: 'Automatic', value: "car.gearType = 'A'" },
        { name: 'Manual', value: "car.gearType = 'M'" }
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

  // Toggle collapse visibility
  toggleCollapse(index: number): void {
    if (this.activeCollapseIndex === index) {
      this.activeCollapseIndex = null;
    } else {
      this.activeCollapseIndex = index;
    }
  }

  // Check if the collapse should be visible for the clicked card
  isCollapseVisible(index: number): boolean {
    return this.activeCollapseIndex === index;
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

  clearFilter() {
    this.selectedFilters = {};
    this.filterDto = {
      sortBy: '',
      category: this.searchParams.category || '',
      filters: []
    };
    this.getCarList();
  }
}
