import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsService } from './services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { InserUserComponent } from './components/inser-user/inser-user.component';
import { LoginComponent } from './components/login/login.component';

const routes : Routes = [
  {path: '', component: MainComponent},
  {path: 'home', component: HomeComponent},
  {path: 'home/:id', component: HomeComponent},
  {path: 'insert-user', component: InserUserComponent},

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MainComponent,
    FooterComponent,
    InserUserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
