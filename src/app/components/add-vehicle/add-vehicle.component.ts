import {Component, EventEmitter, OnChanges, Output, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-vehicle',
  standalone: false,

  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss'
})
export class AddVehicleComponent {
  @Output() close = new EventEmitter<void>();

  vehicleTypeOptions: string[] = [''];
  vehicleImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  vehicle = {
    vehicleNo: '',
    model: '',
    vehicleType: '',
    seats: 0,
    gearType: '',
    category: '',
    pricePerDay: 0
  };

  constructor() {
  }

  closeModal() {
    this.close.emit();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.vehicleImage = file;

      // Preview the image
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

    // this.http.post(this.apiUrl, formData).subscribe(
    //   (response) => {
    //     console.log('Vehicle added successfully:', response);
    //     this.closeModal();
    //   },
    //   (error) => {
    //     console.error('Error adding vehicle:', error);
    //   }
    // );
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
}
