import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard/customer-dashboard.component';
import { RouterModule, Routes } from '@angular/router';  // ← add this
import { AddDashboardComponent } from './add-dashboard/add-dashboard/add-dashboard.component';

@NgModule({
  declarations: [CustomerDashboardComponent,AddDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CustomerDashboardComponent },
       { path: 'add',     component: AddDashboardComponent }
    ])
  ]
})
export class CustomerDashBoardModule { }
