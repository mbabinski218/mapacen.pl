import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { idNameOnly } from '@modules/top-menu/interfaces/top-menu.interface';

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
  currentCounty: string;

  filteredCounties: Observable<string[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public counties: idNameOnly[],
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.registerForm = this.fb.group({
      email: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      county: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordAgain: [null, [Validators.required]],
    });

    this.filteredCounties = this.registerForm.get('county').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  change(): void {
    this.login = !this.login;
  }

  selectedCounty(chosen: string): void {
    this.currentCounty = chosen;
  }

  handleFormSubmit() {
    if (this.login) {
      if (this.loginForm.valid) {
        const formValue = this.loginForm.value;
        this.dialogRef.close(formValue);
      }
      return;
    }
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      this.dialogRef.close(formValue);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const option = this.counties.map((res) => res.name);
    return option.filter(option => option.toLowerCase().includes(filterValue));
  }
}