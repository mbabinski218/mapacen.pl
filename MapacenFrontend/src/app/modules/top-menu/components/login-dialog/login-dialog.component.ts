import { Inject } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TopMenuService } from '@modules/top-menu/api/top-menu.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { idNameOnly } from '@modules/top-menu/interfaces/top-menu.interface';
import { USERNAME_PATTERN } from '@core/constants/validation-patterns.conts';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyLocalStorageService } from '@shared/services/my-local-storage.service';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@core/constants/validation-patterns.conts';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginDialogComponent {

  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;
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

  registerValid = false;
  loginValid = false;

  constructor(
    private fb: FormBuilder,
    private topMenuService: TopMenuService,
    private toastMessageService: ToastMessageService,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private myLocalStorageService: MyLocalStorageService,
    @Inject(MAT_DIALOG_DATA) public counties: idNameOnly[],
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

    this.registerForm.valueChanges.subscribe((res) => {
      if (res.password === res.confirmedPassword) {
        this.registerForm.get('confirmedPassword').setErrors(null)
        this.registerForm.setErrors(null)
      }
      else {
        this.registerForm.get('confirmedPassword').setErrors({ 'incorrect': true })
        this.registerForm.setErrors({ 'incorrect': true })
      }

      this.registerValid = this.registerForm.valid;
    })

    this.loginForm.valueChanges.subscribe(() => {
      this.loginValid = this.loginForm.valid;
    })
  }

  change(): void {
    this.login = !this.login;

    this.loginForm.reset();
    this.registerForm.reset();
    this.myCountyControl.reset();
  }

  selectedCounty(selected: MatAutocompleteSelectedEvent): void {
    this.currentCounty = selected.option.value;
    this.registerForm.get('countyId').setValue(this.counties.find((res) => res.name === this.currentCounty).id);
  }

  handleFormSubmit() {
    if (this.login) {
      if (this.loginForm.valid) {
        this.topMenuService.loginUser(this.loginForm.value).subscribe((res) => {
          this.myLocalStorageService.setStorage(res)
          this.dialogRef.close();
          this.refresh();
        })
      }
      return;
    }

    if (this.registerForm.valid && this.myCountyControl.valid) {
      this.topMenuService.registerUser(this.registerForm.value).subscribe(() => {
        this.toastMessageService.notifyOfSuccess('Rejestracja powiodła się! Teraz możesz się zalogować')
        this.change();
      })
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

  chooseFirstOption(): void {
    this.matAutocomplete.options.first.select();
  }

  private refresh() {
    setTimeout(() => window.location.reload(), 10)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const option = this.counties.map((res) => res.name);
    return option.filter(option => option.toLowerCase().includes(filterValue));
  }
}