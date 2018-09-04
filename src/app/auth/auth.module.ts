import { NgModule } from "../../../node_modules/@angular/core";

import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { AngularMaterialModule } from "../angular-material.module";
import { CommonModule } from "../../../node_modules/@angular/common";
import { FormsModule } from "../../../node_modules/@angular/forms";
import { AuthRoutingModule } from "./auth.routing";

@NgModule({
    declarations:[
        LoginComponent,
        SignupComponent,
    ],

    imports: [
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        AuthRoutingModule
    ]

})
export class AuthModule{}