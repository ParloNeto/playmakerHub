import {
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../pages/services/modal.service';

@Component({
  selector: 'phub-modal',
  standalone: true,
  imports: [NgClass, NgIf],
  template: `
    <div class="modal" [ngClass]="{ show: isOpen }" (click)="onClose()">
  <div class="modal-content" (click)="$event.stopPropagation()">
    <div class="modal-header">
      <span class="close" (click)="onClose()">&times;</span>
      <h2 class="modal-title">{{ title }}</h2>
    </div>
    <div class="modal-body">
      <p>{{ errorMessage }}</p>
      <ng-content></ng-content>
    </div>
    <div class="modal-footer" *ngIf="isConfirmation">
      <button class="btn-primary-red-modal" (click)="onConfirm()">{{ confirmButtonText }}</button>
      <button class="btn-primary-white-modal" (click)="onCancel()">{{ cancelButtonText }}</button>
    </div>
    <div class="modal-footer" *ngIf="!isConfirmation">
      <button class="btn-modal-close" (click)="onClose()">Fechar</button>
    </div>
  </div>
</div>

  `,
})
export class ModalComponent implements OnInit {
  @Input() title: string = 'Modal Title';
  errorMessage!: string;
  isConfirmation: boolean = false;
  confirmButtonText: string = 'Prosseguir';
  cancelButtonText: string = 'Cancelar';
  isOpen = false;


  private subscription!: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.subscription = this.modalService.modalState$.subscribe(state => {
      if (state.type === 'error') {
        this.errorMessage = state.message;
        this.isConfirmation = false;
        this.openModal();
      } else if (state.type === 'confirmation') {
        this.errorMessage = state.message;
        this.isConfirmation = true;
        this.confirmButtonText = state.confirmText;
        this.cancelButtonText = state.cancelText;
        this.openModal();
      } else if (state.type === 'close') {
        this.closeModal();
      }
    });
  }



  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  onConfirm() {
    this.modalService.confirmAction(true);
  }

  onCancel() {
    this.modalService.confirmAction(false);
  }

  onClose() {
    this.closeModal();
  }
}
