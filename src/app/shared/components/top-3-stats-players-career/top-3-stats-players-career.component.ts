import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Player } from '../../../models/player/player';
import { CareerComponent } from '../../../pages/career/career.component';
import { CareerService } from '../../../pages/services/career.service';
import { PlayerStats } from '../../../models/player/player-stats';
import { Pageable } from '../../../models/player/pageable';

@Component({
    selector: 'app-top-3-stats-players-career',
    imports: [],
    template: `
    <div class="career-lobby-player-stats">
      <h4 class="title-content">Mais Gols</h4>
      <ol class="top-3-players-list">
        @for (player of getMoreGoals(); track player.id; let i = $index) {
          <li>{{ player.firstName }} - {{ player.goals }}</li>
        }
      </ol>
      <h4 class="title-content">Mais Assistências</h4>
      <ol class="top-3-players-list">
        @for (player of getMoreAssists(); track player.id; let i = $index) {
          <li>{{ player.firstName }} - {{ player.assists }}</li>
        }
      </ol>
    </div>`
})
export class Top3StatsPlayersCareerComponent implements OnInit {
  @Input({required: true}) idCareer?: string;

  #careerService = inject(CareerService);

  private pageablePlayers: Pageable = {
    page: 0,
    size: 3
  }

  #setMoreGoals = signal<PlayerStats[] | null>(null);
  get getMoreGoals() {
    return this.#setMoreGoals.asReadonly();
  }

  #setMoreAssists = signal<PlayerStats[] | null>(null);
  get getMoreAssists() {
    return this.#setMoreAssists.asReadonly();
  }

  ngOnInit(): void {
    if (this.idCareer) {
      this.loadPlayerSortedByGoals(this.idCareer)
      .then(() => {
        console.log(`All players by goals loaded:`, this.getMoreGoals())
      });

      this.loadPlayerSortedByAssists(this.idCareer)
      .then(() => {
        console.log(`All players by assists loaded:`, this.getMoreAssists())
      });
    }
  }

  async loadPlayerSortedByGoals(idCareer: string) {
    try {
      const playersByGoals = await this.#careerService.httpGetPlayersTopByGoals(idCareer, this.pageablePlayers);
      this.#setMoreGoals.set(playersByGoals.content);
    }
    catch(err) {
      console.error(err);
    }
  }

  async loadPlayerSortedByAssists(idCareer: string) {
    try {
      const playersByAssists = await this.#careerService.httpGetPlayersTopByAssists(idCareer, this.pageablePlayers);
      this.#setMoreAssists.set(playersByAssists.content);
    }
    catch(err) {
      console.error(err);
    }
  }
}
