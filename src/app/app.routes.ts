import { Routes } from '@angular/router';
import { LoginComponent } from '../Pages/login/login.component';
import { SignupComponent } from '../Pages/signup/signup.component';
import { BlogsComponent } from '../Pages/blogs/blogs.component';
import { ContactusComponent } from '../Pages/contactus/contactus.component';
import { HomeComponent } from '../Pages/home/home.component';
import { SlotbookingsComponent } from '../Pages/slotbookings/slotbookings.component';
import { StationsComponent } from '../Pages/stations/stations.component';
import { PaymentComponent } from '../Pages/payment/payment.component';
import { StationsDetailsComponent } from '../Pages/stations-details/stations-details.component';
import { HistoryComponent } from '../Pages/history/history.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'history',component:HistoryComponent},
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'blog',component:BlogsComponent},
    {path:'contactus',component:ContactusComponent},
    {path:'slotbooking',component:SlotbookingsComponent},
    {path:'stations',component:StationsComponent},
    {path:'payment',component:PaymentComponent},
    { path: 'stationDetails', component: StationsDetailsComponent } 
];
