import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../pages/services/modal.service';
import { ModalState } from '../../../models/enums/modal-state';

@Component({
  selector: 'phub-modal',
  standalone: true,
  imports: [NgClass, NgIf],
  template: `
    <div class="modal" [ngClass]="{ show: isOpen }" (click)="onClose()">
      <div class="modal-content modal-content__{{  state()  }}" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <span class="close" (click)="onClose()">&times;</span>
          <h2 class="modal-title modal-title__{{  state()  }}">{{ title }}</h2>
        </div>
        <div class="modal-body">
          <p *ngIf="errorMessage">{{ errorMessage }}</p>
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
export class ModalComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Modal Title';
  public state = signal<ModalState>(ModalState.Confirmation);
  errorMessage: string | null = null;
  isConfirmation: boolean = false;
  confirmButtonText: string = 'Prosseguir';
  cancelButtonText: string = 'Cancelar';
  isOpen = false;

  private subscription: Subscription = new Subscription();

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    console.log(this.state())
    this.subscription.add(
      this.modalService.modalState$.subscribe(state => {
        this.state.set(state.type);
        this.handleModalState(state);
      })
    );
    console.log(this.state())

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private handleModalState(state: any) {
    switch (state.type) {
      case 'error':
        this.title = 'Erro';
        this.errorMessage = state.message;
        this.isConfirmation = false;
        this.openModal();
        break;
      case 'confirmation':
        this.errorMessage = state.message;
        this.isConfirmation = true;
        this.confirmButtonText = state.confirmText || 'Prosseguir';
        this.cancelButtonText = state.cancelText || 'Cancelar';
        this.openModal();
        break;
      case 'close':
        this.closeModal();
        break;
    }
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.errorMessage = null;
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
