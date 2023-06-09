import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLayoutRoutes } from './user-layout.routing';

import { HomeComponent } from 'src/app/pages/user/home/home.component';
import { AboutComponent } from 'src/app/pages/user/about/about.component';
import { ContactComponent } from 'src/app/pages/user/contact/contact.component';
import { AVControlComponent } from 'src/app/pages/user/solutions/avcontrol/avcontrol.component';
import { AudioComponent } from 'src/app/pages/user/solutions/audio/audio.component';
import { VideoComponent } from 'src/app/pages/user/solutions/video/video.component';
import { SecurityComponent } from 'src/app/pages/user/solutions/security/security.component';
import { SupportComponent } from 'src/app/pages/user/solutions/support/support.component';
import { CorporateComponent } from 'src/app/pages/user/markets/corporate/corporate.component';
import { EducationComponent } from 'src/app/pages/user/markets/education/education.component';
import { ControlComponent } from 'src/app/pages/user/markets/control/control.component';
import { EntertainmentComponent } from 'src/app/pages/user/markets/entertainment/entertainment.component';
import { GovernmentComponent } from 'src/app/pages/user/markets/government/government.component';
import { HealthcareComponent } from 'src/app/pages/user/markets/healthcare/healthcare.component';
import { HouseComponent } from 'src/app/pages/user/markets/house/house.component';
import { HttpService } from 'src/app/service/http.service/http.service';
import { UserComponentsModule } from 'src/app/components/user/components.module';
import { StoreService } from 'src/app/service/StoreService/store.service';
import { PrivacyComponent } from 'src/app/pages/user/privacy/privacy.component';
import { TermsComponent } from 'src/app/pages/user/terms/terms.component';
import { DisclaimerComponent } from 'src/app/pages/user/disclaimer/disclaimer.component';
import { BlogComponent } from 'src/app/pages/user/blog/blog/blog.component'; 
import { BlogDetailComponent } from 'src/app/pages/user/blog/detail/detail.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'src/app/components/user/ngx-pagination'; 

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    UserComponentsModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [HttpService],
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    
    AVControlComponent,
    AudioComponent,
    VideoComponent,
    SecurityComponent,
    SupportComponent,

    CorporateComponent,
    EducationComponent,
    ControlComponent,
    EntertainmentComponent,
    GovernmentComponent,
    HealthcareComponent,
    HouseComponent,   

    PrivacyComponent,
    TermsComponent,
    DisclaimerComponent,

    BlogComponent,
    BlogDetailComponent,

    
  ]

})

export class UserLayoutModule {}
