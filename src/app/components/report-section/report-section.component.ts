import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ReportService } from '../../shared/services/report.service';

@Component({
  selector: 'app-report-section',
  standalone: false,
  templateUrl: './report-section.component.html',
  styleUrls: ['./report-section.component.scss']
})
export class ReportSectionComponent {
  selectedReportType: string = 'reservations';
  startDate: string | null = null;
  endDate: string | null = null;
  selectedFileFormat: string = 'pdf';
  reportData: any = null;
  reportName = '';
  reportUrl: SafeResourceUrl = '';

  constructor(private reportService: ReportService, private sanitizer: DomSanitizer) {}

  isFormValid(): boolean {
    return this.selectedReportType.trim() !== '' && this.selectedFileFormat.trim() !== '';
  }

  generateReport(): void {
    this.reportData = null;

    const requestData = {
      reportType: this.selectedReportType,
      startDate: this.startDate,
      endDate: this.endDate,
      fileFormat: this.selectedFileFormat
    };

    this.reportService.generateReport(requestData).then((response: any) => {
      if (response.status === 200) {
        const fileContentBase64 = response.body.fileContent;
        const byteCharacters = atob(fileContentBase64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const file = new Blob([byteArray], {
          type: this.selectedFileFormat === 'pdf' ? 'application/pdf' :
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
        this.reportUrl = sanitizedUrl;
        this.reportData = file;
        this.reportName = response.body.fileName;
      }
    }).catch(e => {
      console.error('Error generating report:', e);
    });
  }

  // Download report
  downloadReport(): void {
    if (!this.reportData) return;

    const a = document.createElement('a');
    a.href = this.reportUrl as string; // Cast SafeResourceUrl to string here
    a.download = this.reportName;
    a.click();
    URL.revokeObjectURL(this.reportUrl as string);
  }
}
