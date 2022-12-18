import { idNameOnly } from './interfaces/top-menu.interface';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TopMenuService } from './api/top-menu.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

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

  selectedCounty(selected: string): void {
    this.mySelectedCounty = selected;
    console.log(selected)
    // strzał do api po id, chyba sie wali z tym ostatnim wybranym

  }

  selectedCategory(selected: string): void {
    this.mySelectedCategory = selected;
    console.log(selected)
    // strzał do api po id, chyba sie wali z tym ostatnim wybranym
  }

  search() {
    //szuka przedmiotów filtrując po wyszukiwaniu i jak jest to też po kategorii
  }

  logIn() {
    this.dialog.open(LoginDialogComponent, {
      width: '450px',
      height: '650px',
      panelClass: 'loginDialog',
      data: this.counties,
    });
  }

  private _filter(value: string, which: string): string[] {
    const filterValue = value.toLowerCase();
    const option = which === 'counties' ? this.counties.map((res) => res.name) : this.categories.map((res) => res.name);
    return option.filter(option => option.toLowerCase().includes(filterValue));
  }
}