import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  countries: any=[];
  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [ '', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^(?!\s*$)[a-zA-Z\s]*$/)]) ],
      lastName: [ '', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^(?!\s*$)[a-zA-Z\s]*$/)]) ],
      phoneNumber: ['', Validators.required],
      country: ['', Validators.required]
    })

    this.getCountryList();
  }

  // For taking number into input
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // For fetching country list from json file which is under assets folder
  getCountryList() {
    this.http.get('assets/countries.json')
    .subscribe((res: any) => {
      console.log('res -> ', res);
      ({countries: this.countries} = res);
    }, err => {
      console.log('err -> ', err);
    })
  }

  register() {
    console.log(this.registerForm.value);
    this.toastr.success('Your account has been created');
    this.registerForm.reset({
      country: ''
    });
  }

}
