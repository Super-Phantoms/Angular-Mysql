import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';

import { SolutionComponent } from './solution/solution.component';
import { ServiceComponent } from './service/service.component';
import { MaterialExampleModule } from 'src/material.module';
import { CKEditorModule } from 'src/app/components/ckeditor/ckeditor.module';
import { AdminComponentsModule } from 'src/app/components/admin/components.module';

import { TeamComponent } from './team/team.component';
import { LoginComponent } from './login/login.component'
import { PartnerComponent } from '../../pages/admin/partner/partner.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialExampleModule,
    CKEditorModule,
    AdminComponentsModule,
    BlockUIModule.forRoot()
  ],
  declarations: [
    SolutionComponent,
    ServiceComponent,
    TeamComponent,
    LoginComponent,
    PartnerComponent,
    ContactUsComponent,
    FooterComponent,
    BlogComponent,
  ],
  exports: [
    SolutionComponent,
    FormsModule,
    MaterialExampleModule,
    TeamComponent,
    LoginComponent,
    PartnerComponent,
  ]
})
export class AdminPageComponentsModule { }
