import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  #apiSendImageUrl = environment.SEND_FILE_URL;
  #apiDownloadImageUrl = environment.DOWNLOAD_FILE_URL;

  constructor(private http: HttpClient) { }

  public downloadImageByName(nameFile: string): Observable<any> {
    return this.http.get(`${this.#apiDownloadImageUrl}/${nameFile}` )
  }
}
