import {
  Injectable,
  ComponentRef,
  ApplicationRef,
  Injector,
  createComponent,
  EnvironmentInjector,
} from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ModalState } from '../../models/enums/modal-state';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new Subject<any>();
  private confirmSubject = new Subject<boolean>();

  modalState$ = this.modalSubject.asObservable();
  confirmState$ = this.confirmSubject.asObservable();
  private modalRef!: ComponentRef<ModalComponent> | null;

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {}

  private createModalComponent() {
    if (this.modalRef) {
      return;
    }

    const modalComponentRef = createComponent(ModalComponent, {
      environmentInjector: this.environmentInjector,
    });

    this.appRef.attachView(modalComponentRef.hostView);

    const domElement = (modalComponentRef.hostView as any)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);

    this.modalRef = modalComponentRef;
  }

  showError(errorMessage: string) {
    this.createModalComponent();

    setTimeout(() => {
      this.modalSubject.next({ type: ModalState.Error, message: errorMessage });
    }, 0);
  }

  showConfirmation(
    message: string,
    confirmText: string = 'Prosseguir',
    cancelText: string = 'Cancelar'
  ) {
    this.createModalComponent();

    setTimeout(() => {
      this.modalSubject.next({
        type: ModalState.Confirmation,
        message,
        confirmText,
        cancelText,
      });
    }, 0);
  }

  closeModal() {
    this.modalSubject.next({ type: 'close' });
    this.destroyModalComponent();
  }

  confirmAction(isConfirmed: boolean) {
    this.confirmSubject.next(isConfirmed);
    this.closeModal();
  }

  private destroyModalComponent() {
    if (this.modalRef) {
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.modalRef = null;
    }
  }

  public confirmState(): Observable<boolean> {
    return this.confirmState$.pipe(take(1));
  }
}
