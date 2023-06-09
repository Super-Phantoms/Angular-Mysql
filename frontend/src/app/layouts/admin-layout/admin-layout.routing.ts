import { Routes } from '@angular/router';

import { SolutionComponent } from 'src/app/pages/admin/solution/solution.component';
import { ServiceComponent } from 'src/app/pages/admin/service/service.component';
import { TeamComponent } from 'src/app/pages/admin/team/team.component';
import { LoginComponent } from 'src/app/pages/admin/login/login.component';
import { PartnerComponent} from 'src/app/pages/admin/partner/partner.component';
import { ContactUsComponent } from 'src/app/pages/admin/contact-us/contact-us.component';
import { FooterComponent } from 'src/app/pages/admin/footer/footer.component';
import { BlogComponent } from 'src/app/pages/admin/blog/blog.component';
export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'aboutus/:sid', component: SolutionComponent },
    { path: 'home/:sid', component: SolutionComponent },
    { path: 'solution/:sid', component: SolutionComponent },
    { path: 'market/:sid', component: SolutionComponent },
    { path: 'career/:sid', component: SolutionComponent },
    { path: 'team', component: TeamComponent },
    { path: 'partner', component: PartnerComponent},
    { path: 'contactus', component: ContactUsComponent},
    { path: 'footer/:sid', component: FooterComponent},
    { path: 'blog/:sid', component: BlogComponent},

    // { path: '', redirectTo:'/admin/home/1', pathMatch: 'full' }
];
