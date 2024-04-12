import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'start', component: StartScreenComponent },
    { path: 'game/:id', component: GameComponent },
    { path: '', redirectTo: '/start', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }