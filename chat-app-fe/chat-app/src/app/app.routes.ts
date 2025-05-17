import { Routes } from '@angular/router';

export const routes: Routes=[
{
    path:'customer',
    loadChildren:()=>
    import('./customer-dash-board/customer-dash-board.module').then((m)=>m.CustomerDashBoardModule)
},
]
