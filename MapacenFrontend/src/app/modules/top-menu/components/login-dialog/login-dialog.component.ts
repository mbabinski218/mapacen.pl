import { USERNAME_PATTERN } from './../../../../core/constants/validation-patterns.conts';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { idNameOnly } from '@modules/top-menu/interfaces/top-menu.interface';
import { TopMenuService } from '@modules/top-menu/api/top-menu.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@core/constants/validation-patterns.conts';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginDialogComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;
  login = true;
  countyInput = '';

  currentCounty: string;
  filteredCounties: Observable<string[]>;
  myCountyControl = new FormControl('');

  hiddenPassword = true;
  passwordMode = 'password';
  openedCounties = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public counties: idNameOnly[],
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
    private topMenuService: TopMenuService,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_PATTERN)])],
      password: [null, Validators.compose([Validators.required, Validators.pattern(PASSWORD_PATTERN)])],
    });
    this.registerForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.pattern(USERNAME_PATTERN)])],
      email: [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_PATTERN)])],
      password: [null, Validators.compose([Validators.required, Validators.pattern(PASSWORD_PATTERN)])],
      confirmedPassword: [null, Validators.compose([Validators.required, Validators.pattern(PASSWORD_PATTERN)])],
      countyId: [null, [Validators.required]],
    });

    this.filteredCounties = this.myCountyControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  change(): void {
    this.login = !this.login;
  }

  selectedCounty(selected: MatAutocompleteSelectedEvent): void {
    this.currentCounty = selected.option.value;
    this.registerForm.get('countyId').setValue(this.counties.find((res) => res.name === this.currentCounty).id);
  }

  handleFormSubmit() {
    if (this.login) {
      if (this.loginForm.valid) {
        console.log('ruchanie')
        // this.topMenuService.loginUser(this.loginForm.value).subscribe((res) => console.log(res))
      }
      return;
    }

    if (this.registerForm.valid && this.myCountyControl.valid) {
      console.log('ruchanie')
      // this.topMenuService.registerUser(this.registerForm.value).subscribe((res) => console.log(res))
    }
  }

  checkCountyInput(value: string) {
    this.myCountyControl.setErrors(null);

    if (!this.counties.find((res) => res.name === value)) {
      this.myCountyControl.setErrors({ 'incorrect': true })
    }
  }

  togglePasswordVisibility(): void {
    this.hiddenPassword = !this.hiddenPassword;
    this.passwordMode = this.hiddenPassword ? 'password' : '';
  }

  openState(): void {
    this.openedCounties = true;
  }

  closeState(): void {
    this.openedCounties = false;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const option = this.counties.map((res) => res.name);
    return option.filter(option => option.toLowerCase().includes(filterValue));
  }
}