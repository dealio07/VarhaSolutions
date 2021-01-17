import {Component, OnInit} from '@angular/core';
import {InvestmentCounterComponent} from "../investment-counter/investment-counter.component";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {
  public investmentCounterComponents: {id: number, component: InvestmentCounterComponent}[] = [];

  constructor() {
    this.addCounter();
  }

  ngOnInit() {}

  public addCounter() {
    this.investmentCounterComponents.push(this.createCounter());
  }

  private createCounter(): {id: number, component: InvestmentCounterComponent} {
    return {id: this.investmentCounterComponents.length, component: new InvestmentCounterComponent(new FormBuilder())};
  }

  public removeCounter(counterId: number) {
    this.investmentCounterComponents = this.investmentCounterComponents.filter(c => c.id !== counterId);
    this.investmentCounterComponents.forEach(c => c.id = this.investmentCounterComponents.indexOf(c));
  }

}
