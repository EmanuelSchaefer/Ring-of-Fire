import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);
  game!: Game;

  constructor(private router: Router) { }

  async newGame() {
    this.game = new Game();
    await addDoc(collection(this.firestore, 'games'), this.game.toJson()).then((gameInfo:any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }

}