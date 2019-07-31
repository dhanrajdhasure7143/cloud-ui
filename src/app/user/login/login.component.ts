import { Component, OnInit, Injector, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services';
import { SessionService } from './../../_services/session/session';
import { first } from 'rxjs/operators';
import { CookieStore } from 'src/app/_services/cookie.store';

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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private session: SessionService
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

          const udata = JSON.parse(data);

          if (udata && udata['Message'] === `User Doesn't Exists`) {
            this.error = udata['Message'];
            this.loading = false;
          } else {
            this.session.startWatching();
            this.authenticate();
          }
        },
        error => {
          this.error = error.error.error_description;
          this.loading = false;
        }
      );
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
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
  }

  set(name, value, opts = {}) {
    CookieStore.set(name, value, opts);
  }

  authenticate() {
    this.router.navigate(['/pages/dashboard']);
  }

}
