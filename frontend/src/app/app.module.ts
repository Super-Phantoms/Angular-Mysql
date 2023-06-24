import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AppRoutingModule } from './app.routing';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { UserLayoutModule } from './layouts/user-layout/user-layout.module';

import { CKEditorModule } from './components/ckeditor/ckeditor.module';
import { UserComponentsModule } from './components/user/components.module';
import { AdminComponentsModule } from './components/admin/components.module';
import { HttpService } from './service/http.service/http.service';
import { BlockUIModule } from 'ng-block-ui';

import { ErrorLayoutModule } from './pages/user/error/error.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AdminLayoutModule,
    RouterModule,    
    AppRoutingModule,
    CKEditorModule,
    UserComponentsModule,
    AdminComponentsModule,
    BlockUIModule.forRoot(),
    ErrorLayoutModule
  ],
  declarations: [
    AppComponent,
    UserLayoutComponent,
    AdminLayoutComponent,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

