import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit {

  @Input() name: string | undefined;
  @Input() image = 'man.jpg';
  @Input() playerActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
    
  }

}