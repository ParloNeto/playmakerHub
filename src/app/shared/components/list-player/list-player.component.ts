import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Player } from '../../../models/player/player';
import { ShowPlayersComponent } from './show-players/show-players.component';

@Component({
  selector: 'phub-list-player',
  standalone: true,
  imports: [ShowPlayersComponent],
  template: `
    <div class="list-players">
      @if (players()) {
      <div class="goalkeepers">
        <h2 class="position-title">Goleiro</h2>

        <phub-show-players [typePlayer]="goalkeepers" />
      </div>
      <div class="defenders">
        <h2 class="position-title">Defensores</h2>

        <phub-show-players [typePlayer]="centralBack" />
        <phub-show-players [typePlayer]="rightBack" />
        <phub-show-players [typePlayer]="leftBack" />
      </div>
      <div class="midfielders">
        <h2 class="position-title">Meio-Campistas</h2>

        <phub-show-players [typePlayer]="centralDefensiveMidfielder" />
        <phub-show-players [typePlayer]="centralMidfielder" />
        <phub-show-players [typePlayer]="centerAttackingMidfielder" />
        <phub-show-players [typePlayer]="leftMidfielder" />
        <phub-show-players [typePlayer]="rightMidfielder" />
      </div>
      <div class="attackers">
        <h2 class="position-title">Atacantes</h2>

        <phub-show-players [typePlayer]="rightWinger" />
        <phub-show-players [typePlayer]="leftWinger" />
        <phub-show-players [typePlayer]="striker" />
      </div>
      }
    </div>
  `,
  styleUrl: './list-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPlayerComponent {
  public players = input.required<Player[] | null>({
    alias: "setPlayer"
  });

  goalkeepers = computed(
    () => this.players()!.filter((player) => player.position === 'GOL') ?? []
  );
  centralBack = computed(
    () => this.players()!.filter((player) => player.position === 'ZAG') ?? []
  );
  rightBack = computed(
    () => this.players()!.filter((player) => player.position === 'LD') ?? []
  );
  leftBack = computed(
    () => this.players()!.filter((player) => player.position === 'LE') ?? []
  );
  centralDefensiveMidfielder = computed(
    () => this.players()!.filter((player) => player.position === 'VOL') ?? []
  );
  centralMidfielder = computed(
    () => this.players()!.filter((player) => player.position === 'MC') ?? []
  );
  centerAttackingMidfielder = computed(
    () => this.players()!.filter((player) => player.position === 'MEI') ?? []
  );
  leftMidfielder = computed(
    () => this.players()!.filter((player) => player.position === 'ME') ?? []
  );
  rightMidfielder = computed(
    () => this.players()!.filter((player) => player.position === 'MD') ?? []
  );
  rightWinger = computed(
    () => this.players()!.filter((player) => player.position === 'PD') ?? []
  );
  leftWinger = computed(
    () => this.players()!.filter((player) => player.position === 'PE') ?? []
  );
  striker = computed(
    () => this.players()!.filter((player) => player.position === 'ATA') ?? []
  );
}
