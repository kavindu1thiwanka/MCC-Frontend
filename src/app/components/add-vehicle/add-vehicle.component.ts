import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {VehicleService} from '../../shared/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  standalone: false,

  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss'
})
export class AddVehicleComponent implements OnChanges {
  @Input() isEdit: boolean = false;
  @Input() vehicleNumber: string = '';
  @Output() close = new EventEmitter<void>();

  vehicleTypeOptions: string[] = [''];
  vehicleImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  vehicle = {
    vehicleNo: '',
    vehicleModel: '',
    vehicleType: '',
    seats: 0,
    gearType: '',
    category: '',
    pricePerDay: 0
  };

  constructor(private vehicleService: VehicleService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEdit'] && this.isEdit) {
      if (!this.vehicleNumber || this.vehicleNumber === '') {
        throw new Error('vehicleId is required');
      }
      this.getVehicleDetails();
    }
  }

  closeModal() {
    this.close.emit();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.vehicleImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    const formData = new FormData();
    formData.append('vehicleImage', this.vehicleImage as Blob);
    formData.append('vehicleMstDto', new Blob([JSON.stringify(this.vehicle)], {type: 'application/json'}));

    this.vehicleService.addVehicle(formData).then(res => {
      if (res?.status === 201) {
        this.closeModal();
      }
    }).catch(e => {

    });
  }

  loadVehicleTypeOptions() {
    this.vehicleTypeOptions = [];

    switch (this.vehicle.category) {
      case 'Motorcycle':
        this.vehicleTypeOptions = ['Standard', 'Sport', 'Off Road', 'Scooter'];
        break;
      case 'Car':
        this.vehicleTypeOptions = ['Sedan', 'SUV', 'Couple', 'Convertible', 'Family Car', 'Electric Vehicle', 'Luxury Vehicle'];
        break;
      case 'Van':
        this.vehicleTypeOptions = ['Passenger Van', 'Mini Van'];
        break;
      case 'Truck':
        this.vehicleTypeOptions = ['Pickup Truck', 'Heavy Duty Truck', 'Box Truck', 'Flatbed Truck', 'Tow Truck'];
        break;
      default:
    }
  }

  async getVehicleDetails() {
    await this.vehicleService.getVehicleDetails(this.vehicleNumber).then(res => {
      if (res?.status === 200 && res.body) {
        this.vehicle.category = (res.body as any).category;
        this.loadVehicleTypeOptions();
        this.vehicle = res.body as any;
        this.imagePreview = (res.body as any).vehicleImage;
      }
    }).catch(e => { });
  }
}
