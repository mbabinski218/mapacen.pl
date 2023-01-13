import { Api } from '@core/enums/api.enum';
import { MatPaginator } from '@angular/material/paginator';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserInfo } from '@modules/top-menu/interfaces/top-menu.interface';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { Category, Offers, Product, SalesPoint } from '@modules/offers/interfaces/offers.interface';
import { DropDownText } from '@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface';

@Component({
  selector: 'app-admin-show-table',
  templateUrl: './admin-show-table.component.html',
  styleUrls: ['./admin-show-table.component.scss']
})
export class AdminShowTableComponent implements OnInit {

  @Input() operationText: DropDownText;
  @ViewChild(MatTable) table: MatTable<any[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[];
  data: any[];
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
        this.data = this.adminStorageService.getDataForTable(this.operationText) as Offers[];
        this.displayedColumns = ['id', 'product.name', 'price', 'product.category.name', 'salesPoint.name', 'salesPoint.address.county.name', 'salesPoint.address.city', 'salesPoint.address.street', 'salesPoint.address.number', 'delete'];
        this.deleteApi = Api.OFFER_DELETE;
        break;
      }
      case 'Produkt': {
        this.data = this.adminStorageService.getDataForTable(this.operationText) as Product[];
        this.displayedColumns = ['id', 'name', 'category.name', 'delete'];
        this.deleteApi = Api.PRODUCT_UPDATE;
        break;
      }
      case 'Punkt sprzedaży': {
        this.data = this.adminStorageService.getDataForTable(this.operationText) as SalesPoint[];
        this.displayedColumns = ['id', 'name', 'address.city', 'address.street', 'address.number', 'address.county.name', 'delete'];
        this.deleteApi = Api.SALES_POINT_UPDATE;
        break;
      }
      case 'Użytkownik': {
        this.data = this.adminStorageService.getDataForTable(this.operationText) as UserInfo[];
        this.displayedColumns = ['id', 'email', 'name', 'canComment', 'roleName', 'county.name'];
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
  }

  delete(event: any) {
    if (event?.id) {
      this.adminStorageService.deleteData(event?.id, this.deleteApi).subscribe(() => {
        const index = this.data.findIndex((res) => res.id === event.id);
        this.data.splice(index, 1)
        this.table.renderRows();
      });
    }
  }
}