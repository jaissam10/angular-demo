import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, HttpClientModule, ToastrModule.forRoot() ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // First Name field will be invalid
  it('First Name field should be invalid', () => {
    let firstName = component.registerForm.controls.firstName;
    firstName.setValue(''); // Blank
    expect(firstName.valid).toBeFalsy();

    firstName.setValue('same'); // Length less than 6
    expect(firstName.valid).toBeFalsy();
  });

  // First Name field will be valid
  it('First Name field should be valid', () => {
    let firstName = component.registerForm.controls.firstName;
    firstName.setValue('Sameer'); // Length greater than 5
    expect(firstName.valid).toBeTruthy();
  });

  // Last Name field will be invalid
  it('Last Name field should be invalid', () => {
    let lastName = component.registerForm.controls.lastName;
    lastName.setValue(''); // Blank
    expect(lastName.invalid).toBeTruthy();

    lastName.setValue('jais'); // Length less than 6
    expect(lastName.invalid).toBeTruthy();
  });

  // Last Name field will be valid
  it('Last Name field should be valid', () => {
    let lastName = component.registerForm.controls.lastName;
    lastName.setValue('Sameer'); // Length greater than 5
    expect(lastName.valid).toBeTruthy();
  });

  // Phone Number field will be invalid
  it('Phone Number field should be invalid', () => {
    let phoneNumber = component.registerForm.controls.phoneNumber;
    phoneNumber.setValue(''); // Blank
    expect(phoneNumber.valid).toBeFalsy();

    // phoneNumber.setValue('abcdef'); // String value instead of number
    // expect(phoneNumber.valid).toBeFalsy();
  });

  // Phone Number field will be valid
  it('Phone Number field should be valid', () => {
    let phoneNumber = component.registerForm.controls.phoneNumber;
    phoneNumber.setValue(9999999999); // Number
    expect(phoneNumber.valid).toBeTruthy();
  });

  // Country field will be invalid
  it('Country field should be invalid', () => {
    let country = component.registerForm.controls.country;
    country.setValue(''); // Blank
    expect(country.valid).toBeFalsy();
  });

  // Country field will be valid
  it('Country field should be valid', () => {
    let country = component.registerForm.controls.country;
    country.setValue('India');
    expect(country.valid).toBeTruthy();
  });


  // Form invalid when all values are set to blank
  it('Register Form should be invalid when all value will be entered as empty', () => {
    let controls = component.registerForm.controls;
    controls.firstName.setValue('');
    controls.lastName.setValue('');
    controls.phoneNumber.setValue('');
    controls.country.setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  });  


});
