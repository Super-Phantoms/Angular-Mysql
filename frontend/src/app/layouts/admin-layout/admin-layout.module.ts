import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { AdminComponentsModule } from 'src/app/components/admin/components.module';
import { AdminPageComponentsModule } from 'src/app/pages/admin/components.module';
import { CKEditorModule } from 'src/app/components/ckeditor/ckeditor.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    AdminComponentsModule,
    AdminPageComponentsModule,
    CKEditorModule,
    
  ],
  declarations: [
    
  ],
  exports: [
    AdminComponentsModule,
    AdminPageComponentsModule
  ]
})

export class AdminLayoutModule {}
