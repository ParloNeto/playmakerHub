import { Component, Input, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../pages/services/modal.service';
import { ModalState } from '../../../models/enums/modal-state';
import { Player } from '../../../models/player/player';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule, MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'phub-modal',
  standalone: true,
  imports: [NgClass, NgIf, JsonPipe, MatCheckboxModule, MatListModule],
  template: `
    <div class="modal" [ngClass]="{ show: isOpen }" (click)="onClose()">
      <div
        class="modal-content modal-content__{{ state() }}"
        (click)="$event.stopPropagation()"
      >
        <div class="modal-header">
          <span class="close" (click)="onClose()">&times;</span>
          <h2 class="modal-title modal-title__{{ state() }}">{{ title }}</h2>
        </div>
        <div class="modal-body">
          <p *ngIf="message">{{ message }}</p>
          <ng-content></ng-content>
          @if (players()) {
        <mat-selection-list class="modal-list-checkbox-player" #playerSelected [multiple]="false">
          @for (player of players(); track player.id) {
          <mat-list-option class="modal-options-checkbox-player" [value]="player">{{ player.firstName }} {{ player.lastName }}</mat-list-option>
          }
        </mat-selection-list>
        }
        </div>


        <div class="modal-footer" *ngIf="isConfirmation">
          <button class="btn-primary-red-modal" (click)="onConfirm()">
            {{ confirmButtonText }}
          </button>
          <button class="btn-primary-white-modal" (click)="onCancel()">
            {{ cancelButtonText }}
          </button>
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
  @Input() public players = signal<Player[] | null>(null);
  @ViewChild('playerSelected') playerSelected!: MatSelectionList;

  message: string | null = null;
  isConfirmation: boolean = false;
  confirmButtonText: string = 'Prosseguir';
  cancelButtonText: string = 'Cancelar';
  isOpen = false;

  private subscription: Subscription = new Subscription();

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    // this.playerSelected.selectedOptions.hasValue()
    console.log(this.state());
    this.subscription.add(
      this.modalService.modalState$.subscribe((state) => {
        console.log(state);
        this.state.set(state.type);
        this.handleModalState(state);
      })
    );
    console.log(this.state());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private handleModalState(state: any) {

    switch (state.type) {
      case 'error':
        this.title = 'Erro';
        this.message = state.message;
        this.isConfirmation = false;
        this.openModal();
        break;
      case 'confirmation':
        this.message = state.message;
        this.isConfirmation = true;
        this.confirmButtonText = state.confirmText || 'Prosseguir';
        this.cancelButtonText = state.cancelText || 'Cancelar';

        this.openModal();
        break;
      case 'player-transfer':
        this.title = "Transferência de Jogadores";
        this.message = state.message;
        this.isConfirmation = true;
        this.confirmButtonText = state.confirmText || 'Adicionar';
        this.cancelButtonText = state.cancelText || 'Cancelar';
        if (state.data) {
          this.players.set(state.data as Player[]);
        }
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
    this.message = null;
  }

  onConfirm() {
    if (this.state() === ModalState.PlayerTransfer) {
      if (this.playerSelected.selectedOptions.hasValue()) {
        const selectedPlayer = this.playerSelected.selectedOptions.selected[0].value;
        console.log('Player selecionado:', selectedPlayer);
        return this.modalService.confirmActionTransferPlayer(selectedPlayer);
      }
    } else {
      this.modalService.confirmAction(true);
    }
  }

  onCancel() {
    this.modalService.confirmAction(false);
  }

  onClose() {
    this.closeModal();
  }
}
