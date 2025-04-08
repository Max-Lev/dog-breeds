import { Component, Input } from '@angular/core';
import { NgFor, NgStyle } from '@angular/common';
@Component({
  selector: 'app-album',
  standalone: true,
  imports: [NgFor, NgStyle],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent {

  @Input() albums: string[] = [];

}
