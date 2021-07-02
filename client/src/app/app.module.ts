import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { GetContactsComponent } from './component/get-contacts/get-contacts.component';
import { IsNicknamePipe } from './pipe/is-nickname.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GetContactsComponent,
    IsNicknamePipe
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
