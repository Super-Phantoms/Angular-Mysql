import { Routes } from '@angular/router';

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
import { EntertainmentComponent } from 'src/app/pages/user/markets/entertainment/entertainment.component';
import { GovernmentComponent } from 'src/app/pages/user/markets/government/government.component';
import { HealthcareComponent } from 'src/app/pages/user/markets/healthcare/healthcare.component';
import { HouseComponent } from 'src/app/pages/user/markets/house/house.component';
import { ControlComponent } from 'src/app/pages/user/markets/control/control.component';
import { PrivacyComponent } from 'src/app/pages/user/privacy/privacy.component';
import { TermsComponent } from 'src/app/pages/user/terms/terms.component';
import { DisclaimerComponent } from 'src/app/pages/user/disclaimer/disclaimer.component';
import { BlogComponent } from 'src/app/pages/user/blog/blog/blog.component'; 
import { BlogDetailComponent } from 'src/app/pages/user/blog/detail/detail.component';


export const UserLayoutRoutes: Routes = [
    { path: 'home',                             component: HomeComponent },
    { path: 'about-us',                         component: AboutComponent },
    { path: 'contact-us',                       component: ContactComponent },

    { path: 'solutions/av-control-systems',     component: AVControlComponent },
    { path: 'solutions/audio-solutions',        component: AudioComponent },
    { path: 'solutions/video-solutions',        component: VideoComponent },
    { path: 'solutions/security-solutions',     component: SecurityComponent },
    { path: 'solutions/support-services',       component: SupportComponent },

    { path: 'markets/corporate',                component: CorporateComponent },
    { path: 'markets/education',                component: EducationComponent },
    { path: 'markets/entertainment',            component: EntertainmentComponent },
    { path: 'markets/government-civic',         component: GovernmentComponent },
    { path: 'markets/healthcare',               component: HealthcareComponent },
    { path: 'markets/house-of-worship',         component: HouseComponent },
    { path: 'markets/control-rooms',            component: ControlComponent },

    { path: 'blog',                             component: BlogComponent },
    { path: 'blog/detail/:id',                  component: BlogDetailComponent },

    { path: 'privacy-policy',                   component: PrivacyComponent},
    { path: 'terms-of-use',                     component: TermsComponent},
    { path: 'disclaimer',                       component: DisclaimerComponent},

    
];
