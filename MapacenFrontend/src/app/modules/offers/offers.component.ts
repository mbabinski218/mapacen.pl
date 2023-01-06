import { OffersService } from '@modules/offers/api/offers.service';
import { Offers } from '@modules/offers/interfaces/offers.interface';
import { OfferContent } from '@modules/top-menu/interfaces/top-menu.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
        this.offer = res.offers;
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
  offer: Offers[];
  totalSites: number;
  isAdmin: boolean;
  isNotLogged: boolean;
  isFavourites = false;
  pageSize = 5;

  constructor(
    private offersService: OffersService,
    private myLocalStorageService: MyLocalStorageService,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.myLocalStorageService.isAdmin();
    this.isNotLogged = !this.myLocalStorageService.isLogged();
    this.isFavourites = false;
    this.refreshOffers();
  }

  changePage(number: number) {
    this.page = this.page + number;
    this.refreshOffers();
  }

  private refreshOffers(): void {
    const county = Number(localStorage.getItem('userLocalCountyId'));
    this.countyId = county ? county : Number(localStorage.getItem('userProfileCountyId'));
    this.offersService.getAllOffers(this.countyId, this.search, this.categoryId, this.page, this.pageSize).subscribe((res) => {
      this.offer = res.offers;
      this.totalSites = Math.ceil(res.count / this.pageSize);
    });
  }
}
