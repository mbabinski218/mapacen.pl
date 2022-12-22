import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TopMenuService } from '@modules/top-menu/api/top-menu.service';
import { idNameOnly } from '@modules/top-menu/interfaces/top-menu.interface';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MyLocalStorageService } from '@shared/services/my-local-storage.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LoginDialogComponent } from '@modules/top-menu/components/login-dialog/login-dialog.component';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TopMenuComponent implements OnInit {

  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;
  counties: idNameOnly[] = []
  categories: idNameOnly[] = []
  form: FormGroup;
  userName = '';
  userEmail = '';
  userCounty = '';

  mySelectedCounty: string;
  filteredCounties: Observable<string[]>;
  myCountyControl = new FormControl('');

  mySelectedCategory: string;
  filteredCategories: Observable<string[]>;
  myCategoryControl = new FormControl('');

  openedCategories = false;
  openedCounties = false;
  showUserInfo = false;
  logged: boolean;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private topMenuService: TopMenuService,
    private myLocalStorageService: MyLocalStorageService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      product: [null],
    });

    this.topMenuService.getAllCounties().subscribe((res) => {
      if (res) {
        this.filteredCounties = this.myCountyControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', 'counties')),
        );

        this.counties = res
        this.userCounty = this.counties.find((res) => res.id.toString() === localStorage.getItem('userCountyId'))?.name;
        this.userName = localStorage.getItem('userName');
        this.userEmail = localStorage.getItem('userEmail');

        this.userCounty = this.userCounty ? this.userCounty : '';
      }
    })

    this.topMenuService.getAllCategories().subscribe((res) => {
      if (res) {
        this.categories = res
        this.filteredCategories = this.myCategoryControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', 'categories')),
        );
      }
    })

    this.logged = !!localStorage.getItem('userToken');
  }

  selectedCounty(selected: MatAutocompleteSelectedEvent): void {
    this.userCounty = selected.option.value;
    localStorage.setItem('userCountyId', this.counties.find((res) => res.name === this.userCounty)?.id.toString());
    this.topMenuService.updateCounty(localStorage.getItem('userId'), localStorage.getItem('userCountyId')).subscribe((res) => console.log(res));
  }

  selectedCategory(selected: MatAutocompleteSelectedEvent): void {
    this.mySelectedCategory = selected.option.value;
  }

  search() {
    const searchValue = this.form.get('product').value;
    //szuka przedmiotów filtrując po powiacie, wyszukiwaniu i jak jest to też po kategorii

  }

  reload() {
    window.location.reload();
  }

  logIn() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '450px',
      height: '650px',
      panelClass: 'loginDialog',
      data: this.counties,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'logged') {
        this.userCounty = this.counties.find((res) => res.id.toString() === localStorage.getItem('userCountyId'))?.name;
        this.userCounty = this.userCounty ? this.userCounty : '';
        this.userName = localStorage.getItem('userName');
        this.userEmail = localStorage.getItem('userEmail');
      }
    });
  }

  logout() {
    this.myLocalStorageService.removeStorage();
    this.logged = false;
    window.location.reload();
  }

  openState(where: string): void {
    where === 'category' ? this.openedCategories = true : this.openedCounties = true;
  }

  closeState(where: string): void {
    where === 'category' ? this.openedCategories = false : this.openedCounties = false;
  }

  chooseFirstOption(): void {
    this.matAutocomplete.options.first.select();
  }

  private _filter(value: string, which: string): string[] {
    const filterValue = value.toLowerCase();
    const option = which === 'counties' ? this.counties.map((res) => res.name) : this.categories.map((res) => res.name);
    return option.filter(option => option.toLowerCase().includes(filterValue));
  }
}