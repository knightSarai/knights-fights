import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EstimateComponent } from './estimate/estimate.component';
import { FightComponent } from './fight/fight.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    EstimateComponent,
    FightComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
