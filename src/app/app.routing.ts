import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
 import { HomeComponent } from './home/home.component';
// import { ConfigComponent } from './config/config.component';



const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'config', component: HomeComponent},
  {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
