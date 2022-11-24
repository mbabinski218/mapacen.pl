import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from '@modules/home/api/home.service';
import { Category } from '@modules/home/interfaces/home.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items$: Observable<Category>;
  form: FormGroup;

  constructor(
    private homeService: HomeService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
  }

  getAll() {
    this.homeService.getAllCategories().subscribe((res) => console.log(res));
  }

  getOne() {
    this.homeService.getCategory(this.form.get('id').value).subscribe((res) => console.log(res));
  }

  postOne() {
    this.homeService.createCategory(this.form.get('name').value).subscribe((res) => console.log(res));
  }

}
