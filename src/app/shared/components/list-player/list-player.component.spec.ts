import { mockPlayer } from './../../utils/test/mock-utils';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListPlayerComponent } from './list-player.component';
import { ShowPlayersComponent } from './show-players/show-players.component';
import { Player } from '../../../models/player/player';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ListPlayerComponent', () => {
  let component: ListPlayerComponent;
  let fixture: ComponentFixture<ListPlayerComponent>;

  const mockPlayers: Player[] = [
    { ...mockPlayer, position: 'GOL' },
    { ...mockPlayer, position: 'ZAG' },
    {  ...mockPlayer, position: 'LD' },
    { ...mockPlayer, position: 'MEI' },
    { ...mockPlayer, position: 'ATA' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPlayersComponent ,ListPlayerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPlayerComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'players', {
      writable: true,
      value: () => mockPlayers,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter players by position correctly', () => {
    fixture.detectChanges();

    expect(component.goalkeepers()).toEqual([mockPlayers[0]]);
    expect(component.centralBack()).toEqual([mockPlayers[1]]);
    expect(component.rightBack()).toEqual([mockPlayers[2]]);
    expect(component.centerAttackingMidfielder()).toEqual([mockPlayers[3]]);
    expect(component.striker()).toEqual([mockPlayers[4]]);
  });

  it('should render the correct number of phub-show-players components', () => {
    fixture.detectChanges();

    const showPlayersComponents = fixture.debugElement.queryAll(
      By.directive(ShowPlayersComponent)
    );

    expect(showPlayersComponents.length).toBe(12);
  });

});
