import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import {CcpComponent} from './ccp/ccp.component';
import { CcpTransComponent } from './ccp-trans/ccp-trans.component';
import { UserAnalysisComponent } from './user-analysis/user-analysis.component';
import { TmsTransactionComponent } from './tms-transaction/tms-transaction.component';
import { TmsCargoComponent } from './tms-cargo/tms-cargo.component';
import { TmsLineComponent } from './tms-line/tms-line.component';
import { TmsCarComponent } from './tms-car/tms-car.component';
import { TmsChargeComponent } from './tms-charge/tms-charge.component';
//用户管理





export const MainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,

    children: [
        {path: '', redirectTo: 'ccp/trans', pathMatch: 'full'},
        {path:'ccp',component: CcpComponent},
        {path:'ccp/trans',component: CcpTransComponent},
        {path:'ccp/user',component: UserAnalysisComponent},
        {path:'tms/trade',component: TmsTransactionComponent},
        {path:'tms/cargo',component: TmsCargoComponent},
        {path:'tms/route',component: TmsLineComponent},
        {path:'tms/car',component: TmsCarComponent},
        {path:'tms/charge',component: TmsChargeComponent},

      
    ]
  }
];

