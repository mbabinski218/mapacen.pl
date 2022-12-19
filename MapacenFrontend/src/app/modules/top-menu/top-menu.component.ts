import { idNameOnly } from './interfaces/top-menu.interface';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TopMenuService } from './api/top-menu.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TopMenuComponent implements OnInit {

  counties: idNameOnly[] = []
  categories: idNameOnly[] = []
  form: FormGroup;
  loginString = 'Zaloguj';

  mySelectedCounty: string;
  filteredCounties: Observable<string[]>;
  myCountyControl = new FormControl('');

  mySelectedCategory: string;
  filteredCategories: Observable<string[]>;
  myCategoryControl = new FormControl('');

  openedCategories = false;
  openedCounties = false;

  constructor(
    private topMenuService: TopMenuService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      product: [null],
    });

    this.topMenuService.getAllCounties().subscribe((res) => {
      if (res) {
        this.counties = res
        this.filteredCounties = this.myCountyControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', 'counties')),
        );
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
  }

  selectedCounty(selected: MatAutocompleteSelectedEvent): void {
    this.mySelectedCounty = selected.option.value;
    // strzał do api po id, chyba sie wali z tym ostatnim wybranym

  }

  selectedCategory(selected: MatAutocompleteSelectedEvent): void {
    this.mySelectedCategory = selected.option.value;
    // strzał do api po id, chyba sie wali z tym ostatnim wybranym
  }

  search() {
    //szuka przedmiotów filtrując po wyszukiwaniu i jak jest to też po kategorii
  }

  reload() {
    window.location.reload();
  }

  logIn() {
    this.dialog.open(LoginDialogComponent, {
      width: '450px',
      height: '650px',
      panelClass: 'loginDialog',
      data: this.counties,
    });
  }

  openState(where: string): void {
    where === 'category' ? this.openedCategories = true : this.openedCounties = true;
  }

  closeState(where: string): void {
    where === 'category' ? this.openedCategories = false : this.openedCounties = false;
  }

  private _filter(value: string, which: string): string[] {
    const filterValue = value.toLowerCase();
    const option = which === 'counties' ? this.counties.map((res) => res.name) : this.categories.map((res) => res.name);
    return option.filter(option => option.toLowerCase().includes(filterValue));
  }
}