import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private messageService: MessageService) {}

  handleError(error: any, customMessage?: string) {
    let errorMessage = 'An error occurred';

    if (error instanceof HttpErrorResponse) {
      // Handle HTTP errors
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (error.error?.error) {
        errorMessage = error.error.error;
      } else if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.status === 0) {
        errorMessage = 'Unable to connect to the server';
      } else if (error.status === 404) {
        errorMessage = 'Requested resource not found';
      } else if (error.status === 403) {
        errorMessage = 'Access denied';
      } else if (error.status === 500) {
        errorMessage = 'Internal server error';
      }
    } else if (error instanceof Error) {
      // Handle JavaScript errors
      errorMessage = error.message;
    }

    // Use custom message if provided
    if (customMessage) {
      errorMessage = customMessage;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
      life: 5000
    });
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000
    });
  }

  showWarning(message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
      life: 4000
    });
  }

  showInfo(message: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Information',
      detail: message,
      life: 3000
    });
  }
} 