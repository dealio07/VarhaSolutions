import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-investment-counter',
  templateUrl: './investment-counter.component.html',
  styleUrls: ['./investment-counter.component.css']
})
export class InvestmentCounterComponent implements OnInit {
  @Input("id") public id: number;
  public investmentFormGroup: FormGroup;
  public period: number = 1;
  public startSum: number = 0;
  public monthlyAddSum: number = 0;
  public monthlyRate: number = 0.00;
  public yearlyRate: number = 0;
  public totalIncome: number = 0.00;

  @Output() removeCounter = new EventEmitter<number>(true);

  constructor(public formBuilder: FormBuilder) {
    this.investmentFormGroup = formBuilder.group({
      "period": formBuilder.control(this.period),
      "startSum": formBuilder.control(this.startSum),
      "monthlyAddSum": formBuilder.control(this.monthlyAddSum),
      "monthlyRate": formBuilder.control(this.monthlyRate),
    });
  }

  ngOnInit() {
    if (!!this.investmentFormGroup.get("period")) {
      this.investmentFormGroup.get("period").valueChanges.subscribe((value: number) => {
        this.updateValue(value);
        this.updateTotalIncome();
      });
    }
    if (!!this.investmentFormGroup.get("startSum")) {
      this.investmentFormGroup.get("startSum").valueChanges.subscribe((value: number) => {
        this.updateValue(null, value);
        this.updateTotalIncome();
      });
    }
    if (!!this.investmentFormGroup.get("monthlyAddSum")) {
      this.investmentFormGroup.get("monthlyAddSum").valueChanges.subscribe((value: number) => {
        this.updateValue(null, null, value);
        this.updateTotalIncome();
      });
    }
    if (!!this.investmentFormGroup.get("monthlyRate")) {
      this.investmentFormGroup.get("monthlyRate").valueChanges.subscribe((value: number) => {
        this.updateValue(null, null, null, value);
        this.updateTotalIncome();
      });
    }
  }

  public updateValue(period: number = null, startSum: number = null, monthlyAddSum: number = null, monthlyRate: number = null) {
    if (!!period)
      this.period = period;
    if (!!startSum)
      this.startSum = startSum;
    if (!!monthlyAddSum)
      this.monthlyAddSum = monthlyAddSum;
    if (!!monthlyRate)
      this.monthlyRate = monthlyRate;
  }

  public updateTotalIncome() {
    this.totalIncome = +this.startSum;
    this.yearlyRate = +this.monthlyRate * 12;
    for (let i = 0; i < +this.period; i++) {
      if (i == 0) {
        this.totalIncome += +this.monthlyAddSum;
        continue;
      }

      this.totalIncome += +this.totalIncome * (+this.monthlyRate / 100.00) + +this.monthlyAddSum;
    }
  }

  public remove() {
    this.removeCounter.emit(this.id);
  }

}
