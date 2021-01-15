import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {
  public investmentFormGroup = new FormGroup({
    period: new FormControl(1),
    startSum: new FormControl(0),
    monthlyAddSum: new FormControl(0),
    monthlyRate: new FormControl(0.00)
  });
  public period: number = 1;
  public startSum: number = 0;
  public monthlyAddSum: number = 0;
  public monthlyRate: number = 0.00;
  public yearlyRate: number = this.monthlyRate * 12;
  public totalIncome: number;

  constructor() { }

  ngOnInit() {
  }

}
