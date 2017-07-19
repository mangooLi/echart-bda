import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { MainRoutes } from './main.router'
import { CcpComponent } from './ccp/ccp.component';
import { MainComponent } from './main.component';
import { CcpTransComponent } from './ccp-trans/ccp-trans.component';
import { UserAnalysisComponent } from './user-analysis/user-analysis.component';
import { NavLeftComponent } from './nav-left/nav-left.component';
import { HeaderComponent } from './header/header.component';
import { TmsTransactionComponent } from './tms-transaction/tms-transaction.component';
import { TmsCargoComponent } from './tms-cargo/tms-cargo.component';
import { TmsLineComponent } from './tms-line/tms-line.component';
import { TmsCarComponent } from './tms-car/tms-car.component';
import { TmsChargeComponent } from './tms-charge/tms-charge.component';
import { PagerComponent } from './../commonComponent/pagination/pager.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MainRoutes),

  ],
  declarations: [
    CcpComponent,
    MainComponent,
    CcpTransComponent,
    UserAnalysisComponent,
    NavLeftComponent,
    HeaderComponent,
    TmsTransactionComponent,
    TmsCargoComponent,
    TmsLineComponent,
    TmsCarComponent,
    TmsChargeComponent,
    PagerComponent
  ]
})
export class MainModule { }
