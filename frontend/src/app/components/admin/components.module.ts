import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { MaterialExampleModule } from 'src/material.module';
import { ToastrComponent } from './toastr/toastr.component';
import { CKEditorModule } from 'src/app/components/ckeditor/ckeditor.module';
import { NgAxiosComponent } from '../../service/ng-axios/ng-axios.component';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { SingleDescriptionEditorComponent } from './single-description-editor/single-description-editor.component';
import { SingleImageUploadComponent } from './single-image-upload/single-image-upload.component';
import { DtmngSectionComponent } from './dtmng-section/dtmng-section.component';
import { IntroSectionComponent } from './intro-section/intro-section.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AlarmDialogComponent } from './alarm-dialog/alarm-dialog.component';
import { TeamDescriptionEditorComponent } from './team-description-editor/team-description-editor.component';
import { TeamImageUploadComponent } from './team-image-upload/team-image-upload.component';
import { PwdcngDialogComponent } from './pwdcng-dialog/pwdcng-dialog.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { LogoComponent } from './logo/logo.component';
import { PartnerBrandsComponent } from './partner-brands/partner-brands.component';
import { ContactComponent } from './contact/contact.component';
import { AddressComponent } from './address/address.component';
import { DtmngBriefSectionComponent } from './dtmng-brief-section/dtmng-brief-section.component';
import { SingleBlogEditorComponent } from './single-blog-editor/single-blog-editor.component';
import { BlogSectionComponent } from './blog-section/blog-section.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialExampleModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SingleDescriptionEditorComponent,
    SingleImageUploadComponent,
    TeamDescriptionEditorComponent,
    TeamImageUploadComponent,
    TeamMemberComponent,

    DtmngSectionComponent,
    IntroSectionComponent,
    ModalDialogComponent,
    ConfirmDialogComponent,
    AlarmDialogComponent,
    ToastrComponent,
    PwdcngDialogComponent,
    LogoComponent,
    PartnerBrandsComponent,
    ContactComponent,
    AddressComponent,
    DtmngBriefSectionComponent,
    SingleBlogEditorComponent,
    BlogSectionComponent,
  ],
  exports: [
    MaterialExampleModule,

    FooterComponent,
    NavbarComponent,
    SidebarComponent,

    SingleDescriptionEditorComponent,
    SingleImageUploadComponent,
    TeamDescriptionEditorComponent,
    TeamImageUploadComponent,
    DtmngSectionComponent,
    IntroSectionComponent,
    ModalDialogComponent,
    ConfirmDialogComponent,
    AlarmDialogComponent,
    ToastrComponent,
    PwdcngDialogComponent,
    TeamMemberComponent,
    LogoComponent,
    PartnerBrandsComponent,
    ContactComponent,
    AddressComponent,
    DtmngBriefSectionComponent,
    SingleBlogEditorComponent,
    BlogSectionComponent,
  ]
})
export class AdminComponentsModule { }
