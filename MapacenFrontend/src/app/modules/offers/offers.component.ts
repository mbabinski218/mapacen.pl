import { Component, Input, OnInit } from '@angular/core';
import { OffersService } from '@modules/offers/api/offers.service';
import { Offers } from '@modules/offers/interfaces/offers.interface';
import { OfferContent } from '@modules/top-menu/interfaces/top-menu.interface';
import { MyLocalStorageService } from '@shared/services/my-local-storage.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  @Input() set filterOffers(value: OfferContent) {
    if (value) {
      this.countyId = Number(localStorage.getItem('userLocalCountyId'));
      this.search = value.search;
      this.categoryId = Number(value.category);
      this.refreshOffers();
    }
  }

  countyId: number;
  search: string;
  categoryId: number;
  page = 1;
  offer: Offers[];
  totalSites: number;
  isAdmin: boolean;
  isNotLogged: boolean;

  constructor(
    private offersService: OffersService,
    private myLocalStorageService: MyLocalStorageService,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.myLocalStorageService.isAdmin();
    this.isNotLogged = !this.myLocalStorageService.isLogged();
    const county = Number(localStorage.getItem('userLocalCountyId'));
    this.countyId = county ? county : Number(localStorage.getItem('userProfileCountyId'))
    this.refreshOffers();
  }

  changePage(number: number) {
    this.page = this.page + number;
    this.refreshOffers();
  }

  private refreshOffers(): void {
    const pageSize = 5;
    this.offersService.getAllOffers(this.countyId, this.search, this.categoryId, this.page, pageSize).subscribe((res) => {
      this.offer = res.offers;
      this.totalSites = Math.ceil(res.count / pageSize);
      console.log(this.offer);
    });
  }
}
