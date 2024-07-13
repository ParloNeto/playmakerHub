import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Player } from '../../../models/player/player';

@Component({
  selector: 'icon-player',
  standalone: true,
  imports: [NgIf],
  template: `
  @if (player) {
    <div class="box-player">
      <p class="number-player">{{ player.kitNumber }}</p>
      <img
        class="image-player"
        src="../../../../assets/images/players/dudu.svg"
        alt="Foto de {{ player.firstName }} {{ player.lastName }}."
      />
      <div class="box-player__info">
        <p class="name-player">{{ player.firstName }}</p>
        <div class="box-player__info__statistics">
          @if (player.getStatisticsBySeasons) {
            @if (player.getStatisticsBySeasons.goals === 1) {
          <p class="goals-player">
            {{ player.getStatisticsBySeasons.goals }} Gol
          </p>
          <p class="goals-player">
            {{ player.getStatisticsBySeasons.goals }} Gols
          </p>
          <p class="goals-player">
            {{ player.getStatisticsBySeasons.assists }} Assistências
          </p>
          }
          }


        </div>
        <button class="circle-edit-player">
          <img
            src="../../../../assets/icons/edit-player.svg"
            alt="Edit player"
          />
        </button>
      </div>
      <p class="position-player">{{ player.position }}</p>
    </div>
  }
  `,
  styleUrl: './icon-player.component.scss',
})
export class IconPlayerComponent {
  @Input({ required: true, alias: 'getPlayer' }) player!: Player;
}
