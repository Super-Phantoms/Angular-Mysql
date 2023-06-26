import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponentsModule } from 'src/app/components/user/components.module';
import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,    
    UserComponentsModule,
  ],
  providers: [],
  declarations: [
    ErrorComponent
  ]

})

export class ErrorLayoutModule {}
