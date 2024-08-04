import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { LoaderModule } from './loader.module';

@Component({
  selector: 'phub-loader',
  standalone: true,
  imports: [LoaderModule],
  template: `
    <ngx-spinner
      bdColor="rgba(0,0,0,0.5)"
      size="medium"
      color="#fff"
      type="ball-clip-rotate-multiple"
      [fullScreen]="fullScreen"
      ><h2 class="semi-bold">{{ loadingMessage }}</h2></ngx-spinner
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  constructor() {}

  private _loadingMessage = signal<string>('Loading...');
  private _fullScreen = signal<boolean>(true);

  @Input() set loadingMessage(message: string) {
    this._loadingMessage.set(message);
  }

  get fullScreen() {
    return this._fullScreen();
  }

  @Input() set fullScreen(cond: boolean) {
    this._fullScreen.set(cond);
  }

  get loadingMessage() {
    return this._loadingMessage();
  }


}
