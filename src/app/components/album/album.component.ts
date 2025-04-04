import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { IAlbum } from '../../core/models/breeds.model';
@Component({
  selector: 'app-album',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent {

  @Input() albums:string[] = [];

}
