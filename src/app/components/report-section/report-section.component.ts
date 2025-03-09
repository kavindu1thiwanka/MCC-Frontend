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
  excelReportGenerated = false;

  constructor(private reportService: ReportService, private sanitizer: DomSanitizer) {}

  isFormValid(): boolean {
    return this.selectedReportType.trim() !== '' && this.selectedFileFormat.trim() !== '';
  }

  generateReport(): void {
    this.reportData = null;
    this.excelReportGenerated = false;

    const requestData = {
      reportType: this.selectedReportType,
      startDate: this.startDate,
      endDate: this.endDate,
      fileFormat: this.selectedFileFormat
    };

    this.reportService.generateReport(requestData).then((response: any) => {
      if (response.status === 200) {

        if (!response.body) {
          return;
        }

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

        if (this.selectedFileFormat === 'pdf') {
          const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
          this.reportUrl = sanitizedUrl;
          this.reportData = file;
        } else if (this.selectedFileFormat === 'xlsx') {
          this.reportData = file;
          this.excelReportGenerated = true;
        }
        this.reportName = response.body.fileName;
      }
    }).catch(e => {
      console.error('Error generating report:', e);
    });
  }

  downloadReport(fileName: string, downloadUrl?: string ): void {
    const a = document.createElement('a');
    if (!downloadUrl) {
      downloadUrl = URL.createObjectURL(this.reportData);
    }
    a.href = downloadUrl;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(downloadUrl);
  }
}
