import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTable } from '@angular/material/table';

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
      type: ItemTypeEnum.CHEMICALS,
      name: 'Chemicals'
    },
    {
      type: ItemTypeEnum.FOOD,
      name: 'Food'
    },
    {
      type: ItemTypeEnum.OTHER,
      name: 'Other'
    },
  ];
  public userTypeEnumValues = [
    {
      type: UserTypeEnum.ANIMAL,
      name: 'Animal'
    },
    {
      type: UserTypeEnum.HOUSE,
      name: 'House'
    },
    {
      type: UserTypeEnum.HUMAN,
      name: 'Human'
    },
  ];

  public itemName: string = "";
  public itemType: number = 0;
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
      case ItemTypeEnum.FOOD: return "Food";
      case ItemTypeEnum.CHEMICALS: return "Chemicals";
      case ItemTypeEnum.OTHER: return "Other";
    }
  }

  getUserType(type: UserTypeEnum): string {
    switch (type) {
      case UserTypeEnum.HUMAN: return "Human";
      case UserTypeEnum.ANIMAL: return "Animal";
      case UserTypeEnum.HOUSE: return "House";
    }
  }
}

interface Item {
  id?: string,
  name: string,
  type: ItemTypeEnum,
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
  FOOD,
  CHEMICALS,
  OTHER,
}

enum UserTypeEnum {
  HUMAN,
  ANIMAL,
  HOUSE,
}
