import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import {
  FooterComponent,
  HeaderComponent,
  ChatComponent,
  PrivateChatComponent,
  SharedModule
} from './shared';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin-routing.module';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent, ChatComponent, PrivateChatComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AdminModule,
    AuthModule,
    AppRoutingModule,
    AdminRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
