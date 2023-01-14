import { Api } from '@core/enums/api.enum';
import { MatPaginator } from '@angular/material/paginator';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserInfo } from '@modules/top-menu/interfaces/top-menu.interface';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { Category, Offers, Product, SalesPoint } from '@modules/offers/interfaces/offers.interface';
import { DropDownText } from '@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-show-table',
  templateUrl: './admin-show-table.component.html',
  styleUrls: ['./admin-show-table.component.scss']
})
export class AdminShowTableComponent implements OnInit {

  @Input() operationText: DropDownText;
  @ViewChild(MatTable) table: MatTable<any[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[];
  data: any[] = [];
  tempData: any[];
  dataSource: MatTableDataSource<any[]>;
  deleteApi: string;

  constructor(
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit(): void {
    switch (this.operationText) {
      case 'Kategoria': {
        this.data = this.adminStorageService.getDataForTable(this.operationText) as Category[];
        this.displayedColumns = ['id', 'name', 'delete'];
        this.deleteApi = Api.CATEGORY;
        break;
      }
      case 'Oferta': {
        this.tempData = this.adminStorageService.getDataForTable(this.operationText) as Offers[];
        this.tempData.map((res) => {
          this.data.push({
            id: res.id,
            price: res.price,
            productName: res.product.name,
            productCategoryName: res.product.category.name,
            salesPointName: res.salesPoint.name,
            salesPointAddressCountyName: res.salesPoint.address.county.name,
            salesPointAddressCity: res.salesPoint.address.city,
            salesPointAddressStreet: res.salesPoint.address.street,
            salesPointAddressNumber: res.salesPoint.address.number,
          })
        });

        this.displayedColumns = ['id', 'productName', 'price', 'productCategoryName', 'salesPointName', 'salesPointAddressCountyName', 'salesPointAddressCity', 'salesPointAddressStreet', 'salesPointAddressNumber', 'delete'];
        this.deleteApi = Api.OFFER_DELETE;
        break;
      }
      case 'Produkt': {
        this.tempData = this.adminStorageService.getDataForTable(this.operationText) as Product[];
        this.tempData.map((res) => {
          this.data.push({
            id: res.id,
            name: res.name,
            categoryName: res.category.name,
          })
        });

        this.displayedColumns = ['id', 'name', 'categoryName', 'delete'];
        this.deleteApi = Api.PRODUCT_UPDATE;
        break;
      }
      case 'Punkt sprzedaży': {
        this.tempData = this.adminStorageService.getDataForTable(this.operationText) as SalesPoint[];
        this.tempData.map((res) => {
          this.data.push({
            id: res.id,
            name: res.name,
            addressCity: res.address.city,
            addressStreet: res.address.street,
            addressNumber: res.address.number,
            addressCountyName: res.address.county.name,
          })
        });

        this.displayedColumns = ['id', 'name', 'addressCity', 'addressStreet', 'addressNumber', 'addressCountyName', 'delete'];
        this.deleteApi = Api.SALES_POINT_UPDATE;
        break;
      }
      case 'Użytkownik': {
        this.tempData = this.adminStorageService.getDataForTable(this.operationText) as UserInfo[];
        this.tempData.map((res) => {
          this.data.push({
            id: res.id,
            email: res.email,
            name: res.name,
            canComment: res.canComment,
            roleName: res.roleName,
            countyName: res.county.name,
          })
        });

        this.displayedColumns = ['id', 'email', 'name', 'canComment', 'roleName', 'countyName'];
        break;
      }
      default: {
        break;
      }
    }
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(event: any) {
    if (event?.id) {
      this.adminStorageService.deleteData(event?.id, this.deleteApi).subscribe(() => {
        const index = this.data.findIndex((res) => res.id === event.id);
        this.data.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.table.renderRows();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}