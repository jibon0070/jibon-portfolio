import {AbstractControl} from "@angular/forms";
// import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {Config} from "./config";
import {UsersService} from "../services/users.service";
import {Router} from "@angular/router";
import {of} from "rxjs";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

export class Helpers {
  static time_difference: number = 21600;

  static dateFormat(date: Date): string {
    return `${this.numberPadding(date.getFullYear())}-${this.numberPadding(date.getMonth() + 1)}-${this.numberPadding(date.getDate())}`
  }

  static numberPadding(n: number): string {
    return n < 10 ? `0${n}` : `${n}`
  }

  static firstDateOfTheMonth(date: Date) {
    return `${this.numberPadding(date.getFullYear())}-${this.numberPadding(date.getMonth() + 1)}-${this.numberPadding(1)}`
  }

  static lastDateOfTheMonth(date: Date) {
    date = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    return `${this.numberPadding(date.getFullYear())}-${this.numberPadding(date.getMonth() + 1)}-${this.numberPadding(date.getDate())}`
  }

  static select($event: MouseEvent, abstractControl: AbstractControl, onChange: ((value: string, context: any) => void) | null = null, context: any | null = null) {
    document.body.style.overflow = "hidden";
    const select = (<HTMLSelectElement>$event.target);
    const options = select.querySelectorAll("option");
    const body = document.createElement('div');
    body.style.position = "fixed";
    body.style.top = "0";
    body.style.right = "0";
    body.style.bottom = "0";
    body.style.left = "0";
    document.body.appendChild(body);
    const container = document.createElement("div");
    body.appendChild(container);
    container.style.background = "#cb8d33";
    container.style.position = "absolute"
    container.style.top = `${select.getBoundingClientRect().y + select.offsetHeight + 5}px`
    container.style.left = `${select.getBoundingClientRect().x}px`
    container.style.width = `${select.offsetWidth}px`
    container.style.maxHeight = `${window.innerHeight / 3}px`
    container.style.padding = "1em";
    container.style.overflowY = "auto";
    const search = document.createElement("input");
    container.appendChild(search);
    search.focus();

    search.style.padding = ".5em 1em";
    search.style.width = "100%";
    search.style.outline = "none";
    search.style.marginBottom = ".75em";


    const ul = document.createElement("ul");
    ul.classList.add('select');
    container.appendChild(ul);

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.getAttribute("value") == "") continue;
      const li = document.createElement("li");
      li.innerText = option.innerText;
      li.setAttribute('value', option.getAttribute('value')!);
      if (abstractControl.value == option.getAttribute('value')) {
        li.classList.add('active');
        li.style.background = "#6a6a6a";
      }
      ul.appendChild(li);
      li.addEventListener('click', () => {
        if (abstractControl.value != option.value) {
          abstractControl.setValue(option.value);
          if (onChange)
            onChange?.(option.getAttribute('value')!, context!);
        }
        body.remove();
      });
    }

    search.addEventListener('keyup', () => {
      let search_value = new RegExp(search.value.toLowerCase().split('').join('.*') + ".*");
      const lis = ul.querySelectorAll('li')
      lis.forEach(li => {
        const value = li.innerText.trim().toLowerCase();
        if (search_value.test(value)) {
          li.style.display = "block";
        } else {
          li.style.display = "none";
        }
      });
    });


    body.addEventListener('click', e => {
      //top of container
      if (
        //top
        e.clientY < container.getBoundingClientRect().y ||
        //left
        e.clientX < container.getBoundingClientRect().x ||
        //bottom
        e.clientY > container.getBoundingClientRect().y + container.offsetHeight ||
        //right
        e.clientX > container.getBoundingClientRect().x + container.offsetWidth
      ) {
        body.remove();
        document.body.style.overflow = "auto";
      }
    });
  }

  static titlecase(str: string): string {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  static login_with_google_popup(socialAuthService: SocialAuthService, callback: (disabled: boolean) => void) {
    socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).catch(e => {
      if (e == 'Login providers not ready yet. Are there errors on your console?') {
        setTimeout(() => {
          this.login_with_google_popup(socialAuthService, callback);
        }, 500);
      } else if (e.error == 'popup_closed_by_user') {
        callback(false);
      }
    });
  }

  static google_login_listener(authService: SocialAuthService, usersService: UsersService, callback: (r: any) => void) {
    let authStateSubscription = authService.authState.subscribe((user: SocialUser) => {
      if (user) {
        let token = user.idToken;
        const login_with_google_subscription = usersService.loginWithGoogle(token).subscribe({
          next: r => {
            login_with_google_subscription.unsubscribe();
            if (r.token) {
              authStateSubscription.unsubscribe();
            }
            callback(r);
          }
        });
      }
    });
  }
}
