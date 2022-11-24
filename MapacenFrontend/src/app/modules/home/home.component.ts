import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from '@modules/home/api/home.service';
import { Category } from '@modules/home/interfaces/home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items$: Observable<Category>;

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {

  }

  getAll() {
    this.homeService.getAllCategories().subscribe((res) => console.log(res));
  }

  getOne(id: number) {
    this.homeService.getCategory(id).subscribe((res) => console.log(res));
  }

  postOne(name: string) {
    this.homeService.createCategory(name).subscribe((res) => console.log(res));
  }

}
