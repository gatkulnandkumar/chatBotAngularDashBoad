import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatBot } from 'src/app/Model/chatbot.model';
import { ChatDemoService } from 'src/app/services/chat-demo.service';
import { CustomvalidationService } from 'src/app/services/customvalidation-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authenticationError = false;
  showModal = false;
  ispasswordGenerated: boolean = false;
  isuserNameGenerated:boolean =false;
  hide = true;

  loginForm = this.fb.group({
    // username: [null, [Validators.required]],
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,}$')]],
    password: [null, [Validators.required]],
    consent: ['', [Validators.required]],

  });

  //Modal SignUp

  signUpForm = this.fb.group({
    uname: [null, [Validators.required]],
    pass: [null, [Validators.required, this.passwordValidator]],    
    cnfpassword: ['', [Validators.required, this.passwordValidator, Validators.minLength(5)]]
    // cnfpassword: [null, [Validators.required]]
  }, { validator: this.passwordMatchValidator });


  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private service: ChatDemoService, private customValidator: CustomvalidationService,) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  

  // login method not working

  // login() {
  //   console.log("Reactive form data==>", this.loginForm.get('username')!.value);
  //   this.service.login({
  //     username: this.loginForm.get('username')!.value,
  //     password: this.loginForm.get('password')!.value,
  //     rememberMe: this.loginForm.get('rememberMe')!.value,
  //   }).subscribe((res: any) => {
  //     console.log("token login call::::", res);
  //     if (res == undefined) {
  //       alert("res here is undefined")
  //     }
  //     this.toastr.success('login  Successfully', 'Success', {
  //       timeOut: 2000,
  //     });
  //     this.router.navigate(['/BotCrud']);
  //   },
  //     (error: any) => {
  //       console.error("Error in login:", error);
  //       this.toastr.error('Invalid username and password', 'Error', {
  //         timeOut: 2000,
  //       });
  //       this.router.navigate(['/login']);
  //     }
  //   );
  // }


  // login method working

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
  console.log("valueeee",value);
  
    if (value === null) {
      return null; // Skip validation if value is null
    }
  
    const hasCapitalLetter = /[A-Z]/.test(value);
    const hasSmallLetter = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
    const hasMinimumLength = value.length >= 6;
  
    if (
      hasCapitalLetter &&
      hasSmallLetter &&
      hasNumber &&
      hasSpecialCharacter &&
      hasMinimumLength
    ) {
      return null; // password is valid
    }
  
    return { invalidPassword: true }; // password is invalid
  }


   passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('pass');
    const confirmPassword = control.get('cnfpassword');
  
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
  
    return null;
  }
  
  

  Logging() {

    const payload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      userconsent: this.loginForm?.get('consent')?.value ? "yes" : "no", // Capture the value of the consent checkbox
    }
    console.log("payload data check here", payload.userconsent, payload.username, payload.password);

    console.log("this.loginForm.value", this.loginForm.value);
    this.service.logging(payload).subscribe(
      (res: any) => {
        console.log("token login call::::", res);

        localStorage.setItem('authenticationToken', res.id_token);
        sessionStorage.setItem('authGaurd', res.id_token);
        console.log("token===>", res.id_token);

        this.toastr.success('login  Successfully', 'Success', {
          timeOut: 2000,
        });
        this.router.navigate(['/BotCrud']);

      },
      (error: any) => {
        console.error("Error in login:", error);
        this.toastr.error('Invalid username and password', 'Error', {
          timeOut: 2000,
        });
        this.router.navigate(['/login']);
      }
    );

  }

  loginCancel() {
    this.loginForm.reset();
  }

  closeModal() {
    this.showModal = false;
    this.signUpForm.reset();
  }
  openModal() {
    this.showModal = true;
  }
  onSingUp() {
    console.log("this isss singUpForm data===>", this.signUpForm.value.uname);
    const username = this.signUpForm.value.uname;
    const password = this.signUpForm.value.pass;

    const cnfpassword = this.signUpForm.value.cnfpassword;

    console.log("this username password singUpForm data===>", username, password, cnfpassword);
    // Create the payload object with the correct structure
    const payload = {
      username: username,
      password: password
    };
  
    console.log("payload is here===>", payload);
    console.log("this isss singUpForm data===>", this.signUpForm.value.uname);

    if(cnfpassword == password){
      this.service.signUp(payload).subscribe(
        (res: any) => {
          console.log("insertUserData login call::::", res);
  
          this.toastr.success('Register  Successfully', 'Success', {
            timeOut: 2000,
          });
          this.showModal = false;
          this.signUpForm.reset();
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error("Error in login:", error);
          this.toastr.error('Unable to Register', 'Error', {
            timeOut: 2000,
          });
          this.router.navigate(['/login']);
        }
      );
    }else{
      console.log("elseeee invalide password");
      this.toastr.error('Passwords do not match', 'Error', {
        timeOut: 2000,
      });
      
    }
 
  }
  cancel() {
    this.showModal = false;
    this.signUpForm.reset();
    this.router.navigate(['/login']);
  }

}
