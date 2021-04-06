import {Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {MatFormField} from "@angular/material/form-field";

@Component({
  selector: 'app-item-catalog',
  templateUrl: './item-catalog.component.html',
  styleUrls: ['./item-catalog.component.css']
})
export class ItemCatalogComponent implements OnInit {
  public http: HttpClient;
  public baseUrl: string;
  public baseUrlItems = 'items';
  public items = new MatTableDataSource<Item>();
  public itemTableColumns = ["name", "amountTotal", "amountLeft", "info", "price", "pricePerUnit", "actions"];
  public addCardIsActive: boolean;
  public itemTypeEnumValues = [
    {
      type: ItemTypeEnum.Chemicals,
      name: 'Chemicals'
    },
    {
      type: ItemTypeEnum.Food,
      name: 'Food'
    },
    {
      type: ItemTypeEnum.Other,
      name: 'Other'
    },
  ];
  public userTypeEnumValues = [
    {
      type: UserTypeEnum.Animal,
      name: 'Animal'
    },
    {
      type: UserTypeEnum.House,
      name: 'House'
    },
    {
      type: UserTypeEnum.Human,
      name: 'Human'
    },
  ];
  public unitEnumValues = [
    {
      type: UnitEnum.Item,
      name: 'Item'
    },
    {
      type: UnitEnum.Kilogram,
      name: 'Kilogram'
    },
    {
      type: UnitEnum.Liter,
      name: 'Liter'
    },
  ];

  public itemName: string = "";
  public itemType: number = 0;
  public itemUnit: number = 0;
  public itemUserType: number = 0;
  public itemTotalAmount: number = 0;
  public itemPrice: number = 0;

  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
    this.http.get<Item[]>(`${this.baseUrl}${this.baseUrlItems}`).subscribe((result: Item[]) => {
      this.items.data = result;
    }, error => console.error(error));
  }

  toggleAddCard() {
    this.addCardIsActive = !this.addCardIsActive;
    this.itemName = "";
    this.itemType = 0;
    this.itemUnit = 0;
    this.itemUserType = 0;
    this.itemTotalAmount = 0;
    this.itemPrice = 0;
  }

  addItem() {
    if (this.itemName.trim().length === 0)
      return;

    let item: Item = {
      name: this.itemName,
      type: +this.itemType,
      unit: +this.itemUnit,
      userType: +this.itemUserType,
      amountTotal: +this.itemTotalAmount,
      price: +this.itemPrice
    };
    this.http.post(`${this.baseUrl}${this.baseUrlItems}/create`, item).subscribe((result: Item) => {
      this.items.data.push(result);
      this.table.renderRows();
      this.toggleAddCard();
    }, error => console.error(error));
  }

  updateItem(item: Item) {
    if (!item.isEditing) {
      item.isEditing = !item.isEditing;
      return;
    }

    this.http.post(`${this.baseUrl}${this.baseUrlItems}/update/${item.id}`, item).subscribe((result: Item) => {
      let oldItemIndex = this.items.data.indexOf(item);
      item.isEditing = false;
      this.items.data[oldItemIndex] = result;
      this.table.renderRows();
    }, error => console.error(error));
  }

  removeItem(itemId: string) {
    this.http.post(`${this.baseUrl}${this.baseUrlItems}/delete/${itemId}`, null).subscribe((result: Item) => {
      this.items.data = this.items.data.filter(p => p.id != itemId);
    }, error => console.error(error));
  }

  getItemType(type: ItemTypeEnum): string {
    switch (type) {
      case ItemTypeEnum.Food: return "Food";
      case ItemTypeEnum.Chemicals: return "Chemicals";
      case ItemTypeEnum.Other: return "Other";
    }
  }

  getUserType(type: UserTypeEnum): string {
    switch (type) {
      case UserTypeEnum.Human: return "Human";
      case UserTypeEnum.Animal: return "Animal";
      case UserTypeEnum.House: return "House";
    }
  }

  getUnit(type: UnitEnum): string {
    switch (type) {
      case UnitEnum.Item: return "";
      case UnitEnum.Kilogram: return "kg";
      case UnitEnum.Liter: return "l";
    }
  }
}

interface Item {
  id?: string,
  name: string,
  type: ItemTypeEnum,
  unit: UnitEnum,
  userType: UserTypeEnum,
  amountTotal: number,
  amountLeft?: number,
  price?: number,
  pricePerUnit?: number,
  created?: Date,
  updated?: Date,
  isEditing?: boolean,
}

enum ItemTypeEnum {
  Food,
  Chemicals,
  Other,
}

enum UserTypeEnum {
  Human,
  Animal,
  House,
}

enum UnitEnum {
  Item,
  Kilogram,
  Liter,
}
