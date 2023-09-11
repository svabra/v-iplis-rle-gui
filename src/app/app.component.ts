import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'v-iplis-rle-gui';
  imageUrl: string = '';

  constructor(private http: HttpClient, public dialog: MatDialog) { }
  
  refreshGroundPicture() {
    this.http.get('http://127.0.0.1:8000/RecognizedGroundPicture').pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.dialog.open(ErrorDialogComponent, {
            data: { errorMessage: error.error.detail }
          });
        }
        console.error('Error fetching image:', error);
        return throwError(() => error); // Adjusted this line
      })
    ).subscribe(
      (response: any) => {
        this.imageUrl = response.url_path;
      }
    );
  } 
  
}
