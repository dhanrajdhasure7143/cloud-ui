import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, UserService } from 'src/app/_services';
import { SessionService } from './../../_services/session/session';
import { first } from 'rxjs/operators';
import { CookieStore } from 'src/app/_services/cookie.store';
import { APP_CONFIG } from './../../app.config';
import { LoginService } from '../_services/login.service';
import { SharedDataService } from 'src/app/_services/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @ViewChild('password') password: ElementRef;
  @ViewChild('rememberme') checkbox: ElementRef;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    @Inject(APP_CONFIG) private config,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private session: SessionService,
    private loginService: LoginService,
    private sharedData: SharedDataService,
    public userService: UserService
  ) {
    this.session.stopWatching();
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [this.get('username') ? this.get('username') : '', Validators.required],
      password: [this.get('password') ? this.get('password') : '', Validators.required],
      rememberme: [false]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.checkbox.nativeElement.onchange = () => {
      if (this.checkbox.nativeElement.checked === true) {
        this.password.nativeElement.type = 'text';
      } else {
        this.password.nativeElement.type = 'password';
      }
    };
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    localStorage.clear();
    this.submitted = true;
    this.session.stopWatching();

 

    if (this.loginForm.invalid) {
      return;
    }

 

    this.loading = true;
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (this.f.rememberme.value) {
            this.set('username', this.f.username.value, {});
            this.set('password', this.f.password.value, {});
          }
          this.loading = false;
          this.session.startWatching(); 

 

          // user details based on userId
          this.authenticationService.userDetails(this.f.username.value).subscribe(data => this.checkSuccessCallback(data));

 

          this.authenticate();
        },
        error => {
          this.error = "Email or Password is invalid.";
          this.loading = false;
        },
        
      );        
  }

 

  checkSuccessCallback(data:any){
    this.sharedData.setLoggedinUserData(data.firstName);
    this.sharedData.setLoggedinUserFirstLetter(data.firstName.split("")[0])
    console.log("checkSuccessCallback--------login component", data);
    localStorage.setItem('firstName',data.firstName);
    localStorage.setItem('lastName',data.lastName);
    localStorage.setItem('userName',data.userId);
    localStorage.setItem('tenantName',data.tenantId.name);
    localStorage.setItem('phoneNumber',data.phoneNumber);
    localStorage.setItem('company', data.company);
    localStorage.setItem('designation',data.designation);
    localStorage.setItem('country',data.country);
    localStorage.setItem('department', data.department);

    this.userService.getRole(data.company,data.userId).subscribe(data => this.getRoles(data));
  }

  getRoles(data: any): void {
    let name:any = []
    console.log(data)
    data.forEach(element => {
      name.push(element.name)
      if (name == "Admin") {
        localStorage.setItem("roleName", name)
      }
    });
  }

  get(key) {
    key = key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1');

    const regExp = new RegExp('(?:^|; )' + key + '=([^;]*)');
    const matches = document.cookie.match(regExp);

    return matches
      ? decodeURIComponent(matches[1])
      : undefined;
  }


  delete(name) {
    this.set(name, '', { expires: -1 });
  }

  deleteAll() {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
      const index = cookie.indexOf('=');
      const name = ~index ? cookie.substr(0, index) : cookie;
      const expireOn = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365);
      document.cookie = name + '=; expires=' + expireOn.toLocaleString() + ';path=/';
    }
  }

  set(name, value, opts = {}) {
    CookieStore.set(name, value, opts);
  }

  authenticate() {
    this.router.navigate(['/activation']);
  }

  requestDemo() {
    location.href = this.config.portfolioSite;
  }

  googleLogin() {
    this.loginService.googleLogin().subscribe();
  }

  azureLogin() {
    this.loginService.azureLogin().subscribe();
  }
  
}
