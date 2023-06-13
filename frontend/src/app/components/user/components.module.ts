// core modules...
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { UserFooterComponent } from './footer/footer.component';
import { HomeLogoComponent } from './homelogo/homelogo.component';
import { StoryComponent } from './story/story.component';
import { AboutComponent } from './about/about.component';
import { CommonComponent } from './common/common.component';
import { JoinComponent } from './join/join.component';
import { PartnerComponent } from './partner/partner.component';
import { MarketComponent } from './market/market.component';
import { HomeSolutionComponent } from './homesolution/homesolution.component';
import { SubmitComponent } from './submit/submit.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LogoComponent } from './logo/logo.component';
import { NotificationComponent } from './notification/notification.component';
import { VideoComponent } from './video/video.component';
import { TeamComponent } from './team/team.component';
import { ProductComponent } from './product/product.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule.forRoot(),
  ],

  declarations: [
    HeaderComponent,
    UserFooterComponent,
    HomeLogoComponent,
    StoryComponent,
    AboutComponent,
    CommonComponent,
    JoinComponent,
    PartnerComponent,
    MarketComponent,
    HomeSolutionComponent,
    SubmitComponent,
    GalleryComponent,
    LogoComponent,
    NotificationComponent,
    VideoComponent,
    TeamComponent,
    ProductComponent,
    PrivacyComponent
  ],
  exports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,

    HeaderComponent,
    UserFooterComponent,
    HomeLogoComponent,
    StoryComponent,
    AboutComponent,
    CommonComponent,
    JoinComponent,
    PartnerComponent,
    MarketComponent,
    HomeSolutionComponent,
    SubmitComponent,
    GalleryComponent,
    LogoComponent,
    NotificationComponent,
    VideoComponent,
    TeamComponent,
    ProductComponent,
    PrivacyComponent
  ],
  
})
export class UserComponentsModule { }
