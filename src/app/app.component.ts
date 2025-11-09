import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderModule } from './shared/components/loader/loader.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderModule],
  template: `<router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

}
