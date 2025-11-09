import { mockSeason } from './../../shared/utils/test/mock-utils';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SeasonService } from './season.service';
import { environment } from '../../../environments/environment';
import { Season } from '../../models/career/season';

describe('SeasonService', () => {
  let service: SeasonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeasonService],
    });

    service = TestBed.inject(SeasonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#httpGetAllSeasons', () => {
    it('should fetch all seasons and update signal', (done) => {
      const mockSeasons = ['2023', '2024'];
      service.httpGetAllSeasons().subscribe((seasons) => {
        expect(seasons).toEqual(mockSeasons);
        expect(service.getSeasons()).toEqual(mockSeasons);
        done();
      });

      const req = httpTestingController.expectOne(environment.GET_ALL_SEASONS_URL);
      expect(req.request.method).toBe('GET');
      req.flush(mockSeasons);
    });

    it('should handle error when fetching all seasons', (done) => {
      service.httpGetAllSeasons().subscribe({
        next: () => fail('Expected error, but got a successful response'),
        error: (error) => {
          expect(error.status).toBe(500);
          done();
        },
      });

      const req = httpTestingController.expectOne(environment.GET_ALL_SEASONS_URL);
      req.flush('Error fetching seasons', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('#httpUpdateSeason', () => {
    it('should update a season and return the updated season', async () => {
      const seasonId = '123';
      const seasonData: Partial<Season> = {
        games: 12,
        wins: 6,
        draws: 3,
        losses: 3,
        goalsConceded: 10,
        goalsScored: 18,
        titles: [],
      };
      const updatedSeason: Season = {
        games: 18,
        wins: 12,
        draws: 3,
        losses: 3,
        goalsConceded: 11,
        goalsScored: 21,
        titles: [],
      } as Season;

      const promise = service.httpUpdateSeason(seasonId, seasonData);

      const req = httpTestingController.expectOne(`${environment.SEASONS_URL}/${seasonId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedSeason);

      const result = await promise;
      expect(result).toEqual(updatedSeason);
    });

    it('should handle error when updating a season', async () => {
      const seasonId = '123';
      const seasonData: Partial<Season> = {
        games: 12,
        wins: 6,
        draws: 3,
        losses: 3,
        goalsConceded: 10,
        goalsScored: 18,
        titles: [],
      };

      const promise = service.httpUpdateSeason(seasonId, seasonData);

      const req = httpTestingController.expectOne(`${environment.SEASONS_URL}/${seasonId}`);
      req.flush('Error updating season', { status: 500, statusText: 'Internal Server Error' });

      await expectAsync(promise).toBeRejectedWithError('Error updating season');
    });
  });

  describe('#httpRemovePlayerFromSeason', () => {
    it('should remove a player from a season and return the updated season', async () => {
      const seasonId = '123';
      const playerId = '456';
      const updatedSeason: Season = { mockSeason } as Season;

      const promise = service.httpRemovePlayerFromSeason(seasonId, playerId);

      const req = httpTestingController.expectOne(`${environment.SEASONS_URL}/${seasonId}/remove-player/${playerId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedSeason);

      const result = await promise;
      expect(result).toEqual(updatedSeason);
    });

    it('should handle error when removing a player from a season', async () => {
      const seasonId = '123';
      const playerId = '456';

      const promise = service.httpRemovePlayerFromSeason(seasonId, playerId);

      const req = httpTestingController.expectOne(`${environment.SEASONS_URL}/${seasonId}/remove-player/${playerId}`);
      req.flush('Error removing player', { status: 500, statusText: 'Internal Server Error' });

      await expectAsync(promise).toBeRejectedWithError('Error removing player');
    });
  });
});
