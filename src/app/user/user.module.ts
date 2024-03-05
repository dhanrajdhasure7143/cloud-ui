import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { CompareValidatorDirective } from './shared/compare-validator.directive';
import { SocialLoginComponent } from './social-login/social-login.component';
import { CreataccountComponent } from './creataccount/creataccount.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { RedirectsignoutComponent } from './redirectsignout/redirectsignout.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserInfoComponent } from './user-info/user-info.component';
import { ActiveComponent } from './active/active.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PasswordModule } from 'primeng/password';
import { PrimengCustomModule } from '../primeng-custom/primeng-custom.module';
import { UserPageComponent } from './user-page/user-page.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { SubscriptionComponent } from './subscription/subscription.component';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';
import { FailPaymentComponent } from './fail-payment/fail-payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [LoginComponent, RegisterComponent, ForgotpasswordComponent, NewpasswordComponent, CompareValidatorDirective, SocialLoginComponent, CreataccountComponent, ChangepasswordComponent, RedirectsignoutComponent, UserInfoComponent, ActiveComponent, UserPageComponent,SignUpComponent, SubscriptionComponent, OrderPaymentComponent, SuccessPaymentComponent, FailPaymentComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        FormsModule, ReactiveFormsModule, ModalModule,
        SharedModule,
        NgxSpinnerModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        Ng2TelInputModule,
        PasswordModule,
        PrimengCustomModule,
        CdkStepperModule,
        NgxStripeModule.forRoot(environment.stripeKey)
    ],
    exports: [LoginComponent],
    providers: []
})
export class UserModule { }
