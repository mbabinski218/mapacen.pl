import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShowoffService } from '@modules/showoff/api/showoff.service';
import { Category } from '@modules/showoff/interfaces/showoff.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-showoff',
  templateUrl: './showoff.component.html',
  styleUrls: ['./showoff.component.scss']
})
export class ShowoffComponent implements OnInit {

  item$: Observable<Category>;
  items$: Observable<Category[]>;
  form: FormGroup;

  idNotValid = true;
  nameNotValid = true;

  constructor(
    private showoffService: ShowoffService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });

    this.form.valueChanges.subscribe(() => {
      this.idNotValid = this.form.get('id').value ? false : true;
      this.nameNotValid = this.form.get('name').value ? false : true;
    }
    )
  }

  getAll() {
    this.item$ = of();
    this.items$ = this.showoffService.getAllCategories();
  }

  getOne() {
    this.items$ = of([]);
    this.item$ = this.showoffService.getCategory(this.form.get('id').value);
  }

  postOne() {
    this.items$ = of([]);
    this.item$ = this.showoffService.createCategory(this.form.get('name').value);
  }

  getOneProduct() {
    this.items$ = of([]);
    this.item$ = this.showoffService.getProduct(this.form.get('name').value, this.form.get('id').value);
  }

  postOneProduct() {
    this.items$ = of([]);
    this.item$ = this.showoffService.createProduct(this.form.get('name').value, this.form.get('id').value);
  }
}
