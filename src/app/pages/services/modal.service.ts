import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new Subject<any>();
  private confirmSubject = new Subject<boolean>();

  modalState$ = this.modalSubject.asObservable();
  confirmState$ = this.confirmSubject.asObservable();

  showError(errorMessage: string) {
    this.modalSubject.next({ type: 'error', message: errorMessage });
  }

  showConfirmation(message: string, confirmText: string = 'Prosseguir', cancelText: string = 'Cancelar') {
    this.modalSubject.next({ type: 'confirmation', message, confirmText, cancelText });
  }

  closeModal() {
    this.modalSubject.next({ type: 'close' });
  }

  confirmAction(isConfirmed: boolean) {
    this.confirmSubject.next(isConfirmed);
    this.closeModal();
  }
}
