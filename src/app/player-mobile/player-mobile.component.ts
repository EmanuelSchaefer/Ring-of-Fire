import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  standalone: true,
  imports: [],
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss'
})

export class PlayerMobileComponent {
  @Input() playerActive: boolean = false;
  @Input() name!: string;
  @Input() image: string = 'man.jpg';
}