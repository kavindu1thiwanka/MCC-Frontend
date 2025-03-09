import { Component } from '@angular/core';
import {ReportService} from '../../shared/services/report.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-report-section',
  standalone: false,
  templateUrl: './report-section.component.html',
  styleUrls: ['./report-section.component.scss']
})
export class ReportSectionComponent {
  selectedReportType: string = 'reservations'; // Default
  startDate: string | null = null;
  endDate: string | null = null;
  selectedFileFormat: string = 'pdf';
  reportData: any = null;
  reportUrl: string = '';

  isFormValid(): boolean {
    return <boolean>(this.selectedReportType && this.selectedReportType !== '' && this.selectedFileFormat && this.selectedFileFormat !== '');
  }

  // Handle form submission and generate report
  generateReport(): void {
    const requestData = {
      reportType: this.selectedReportType,
      startDate: this.startDate,
      endDate: this.endDate,
      fileFormat: this.selectedFileFormat
    };

    // this.http.post(`${environment.apiUrl}/generate-report`, requestData, { responseType: 'arraybuffer' })
      // .subscribe(
      //   (response: any) => {
      //     // Convert response byte array to a Blob and generate a URL
      //     const file = new Blob([response], { type: this.selectedFileFormat === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      //     this.reportUrl = URL.createObjectURL(file);
      //     this.reportData = response; // Store the data for download
      //   },
      //   (error) => {
      //     console.error('Error generating report:', error);
      //   }
      // );
  }

  downloadReport(): void {
    const file = new Blob([this.reportData], { type: this.selectedFileFormat === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = `report.${this.selectedFileFormat}`;
    a.click();
  }
}
