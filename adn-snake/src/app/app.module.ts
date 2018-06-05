import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './view/menu/menu.component';
import { NewComponent } from './view/new/new.component';
import { PlayComponent } from './view/play/play.component';
import { ScoresComponent } from './view/scores/scores.component';
import { FinishComponent } from './view/finish/finish.component';
import { HeaderComponent } from './common/header/header.component';
import { BackdropComponent } from './common/backdrop/backdrop.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NewComponent,
    PlayComponent,
    ScoresComponent,
    FinishComponent,
    HeaderComponent,
    BackdropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
