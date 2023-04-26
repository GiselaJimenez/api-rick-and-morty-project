import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharacterslistComponent } from './components/characterslist/character-list/characterslist.component';
import { CharacterDetailsComponent } from './components/characterslist/character-details/character-details.component';

const routes: Routes = [
  { path:'', redirectTo:'home', pathMatch: 'full' },
  { path:"home", component: HomeComponent },
  { path:"characters-list", component: CharacterslistComponent },
  { path:"character-details/:id", component:CharacterDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
