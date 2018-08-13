
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'; 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { editMenuComponent } from './editMenuHome/editMenu/editMenu.component';
import { PageNotFoundComponent } from './PageNotFound/pageNotFound.component';
import { editMenuHomeComponent } from './editMenuHome/editMenuHome.component';
import { menuLoginComponent } from './editMenuHome/login/menuLogin.component';
import { editUsersHomeComponent } from './editUsersHome/editUsersHome.component';
import { usersLoginComponent } from './editUsersHome/login/usersLogin.component';
import { editUsersComponent } from './editUsersHome/editUsers/editUsers.component';
import { menuDisplayComponent } from './menuPage/menuDisplay.component';

const appRoutes: Routes = [
  { path: 'menu', component: menuDisplayComponent },
  { path: 'edit-menu', component: editMenuHomeComponent},
  { path: 'edit-users', component: editUsersHomeComponent},
  { path: '', redirectTo: '/menu', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    editMenuComponent,
    PageNotFoundComponent,
    editMenuHomeComponent,
    menuLoginComponent,
    editUsersHomeComponent,
    usersLoginComponent,
    editUsersComponent,
    menuDisplayComponent
  ],
  imports: [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
