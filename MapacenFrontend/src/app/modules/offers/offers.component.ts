import { FormBuilder, FormGroup } from '@angular/forms';
import { OffersService } from '@modules/offers/api/offers.service';
import { OfferContent } from '@modules/top-menu/interfaces/top-menu.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyComment, Offers } from '@modules/offers/interfaces/offers.interface';
import { MyLocalStorageService } from '@shared/services/my-local-storage.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  @Input() set filterOffers(value: OfferContent) {
    this.isFavourites = false;
    this.page = 1;
    if (value) {
      this.search = value.search;
      this.categoryId = Number(value.category);
      this.refreshOffers();
    }
  }

  @Input() set getFavourites(value: string) {
    this.isFavourites = true;
    this.page = 1;
    if (value) {
      this.offersService.getFavourites(Number(value), this.page, this.pageSize).subscribe((res) => {
        this.offers = res.offers;
        this.totalSites = Math.ceil(res.count / this.pageSize);
        this.resetFavourites.emit('');
      });
    }
  }

  @Output() resetFavourites = new EventEmitter<string>();

  countyId: number;
  search: string;
  categoryId: number;
  page = 1;
  offers: Offers[];
  totalSites: number;
  isAdmin: boolean;
  isNotLogged: boolean;
  isFavourites = false;
  pageSize = 5;
  panelOpenState = false;
  form: FormGroup;

  constructor(
    private offersService: OffersService,
    private myLocalStorageService: MyLocalStorageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      comment: [null],
    });

    this.isAdmin = this.myLocalStorageService.isAdmin();
    this.isNotLogged = !this.myLocalStorageService.isLogged();
    this.isFavourites = false;
    this.refreshOffers();
  }

  getComments(offer: Offers): void {
    this.offersService.getComments(offer.id).subscribe((res) => offer.comments = res);
  }

  comment(offer: Offers): void {
    const value = this.form.get('comment').value;
    const userId = Number(localStorage.getItem('userId'));
    if (value) {
      this.offersService.addComment(value, userId, offer.id).subscribe((res) => {
        offer.comments.unshift({
          likes: 0,
          disLikes: 0,
          content: value,
          author: localStorage.getItem('userName'),
          authorId: userId,
          id: res,
        })
      });
      this.form.reset();
    }
  }










  banUser(id: number) {
    //strzał z banem
  }

  toggleFavourite(offer: Offers): void {
    // this.offersService.updateFavourites(offer.id, Number(localStorage.getItem('favouritesId'))).subscribe();
    offer.favourite = !offer.favourite;
  }

  like(comment: MyComment): void {
    // this.offersService.like(comment.id).subscribe();
    comment.likes = comment.likes + 1;
  }

  dislike(comment: MyComment): void {
    // this.offersService.dislike(comment.id).subscribe();
    comment.disLikes = comment.disLikes + 1;
  }









  changePage(number: number): void {
    this.page = this.page + number;
    this.panelOpenState = false;
    this.refreshOffers();
  }

  private refreshOffers(): void {
    const county = Number(localStorage.getItem('userLocalCountyId'));
    this.countyId = county ? county : Number(localStorage.getItem('userProfileCountyId'));
    this.offersService.getAllOffers(this.countyId, this.search, this.categoryId, this.page, this.pageSize).subscribe((res) => {
      this.offers = res.offers;
      this.totalSites = Math.ceil(res.count / this.pageSize);
    });
  }
}
