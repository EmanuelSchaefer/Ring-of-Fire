import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent, PlayerMobileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  game!: Game;
  gameId!: string;
  gameOver = false;
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      this.subGamesRef();
    });
  }

  async newGame() {
    this.game = new Game();
  }

  goToStart(): void {
    this.router.navigateByUrl('/start');
  }

  async subGamesRef() {
    const q = this.getSingleDocRef(this.gameId);
    return onSnapshot(q, (docSnapshot) => {
      if (docSnapshot.exists()) {
        let gameData = docSnapshot.data();
        this.game.currentPlayer = gameData['currentPlayer'];
        this.game.playedCards = gameData['playedCards'];
        this.game.players = gameData['players'];
        this.game.player_images = gameData['player_images'];
        this.game.stack = gameData['stack'];
        this.game.pickCardAnimation = gameData['pickCardAnimation'];
        this.game.currentCard = gameData['currentCard'];
      }
    });
  }

  getGameRef() {
    return doc(this.firestore, 'games', this.gameId);
  };

  getSingleDocRef(docId: string) {
    return doc(this.firestore, 'games', docId);
  }

  takeCard() {
    if (this.game.players.length < 2) {
      return;
    }
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.updateGame();
      setTimeout(() => {
        if (this.game.currentCard !== undefined) {
          this.game.playedCards.push(this.game.currentCard);
          this.game.pickCardAnimation = false;
          this.updateGame();
        }
      }, 1000);
    }
  }

  editPlayer(playerId: number) {
    console.log('Edit Player', playerId);
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      console.log('Received change', change);
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        } else {
          this.game.player_images[playerId] = change;
        }
        this.updateGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('man.jpg');
        this.updateGame();
      }
    });
  }

  async updateGame() {
    let docRef = this.getSingleDocRef(this.gameId);
    await updateDoc(docRef, this.game.toJson());
  }
}
