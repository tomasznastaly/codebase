import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { CreditDebitIndicator, TransactionType } from '../models/transaction-metadata.model';
import { CurrencyCode } from '../models/amount-currency.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;
  balance = 5824.62;
  isSubmitted = false;
  private readonly balanceThreshold = -500;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly transactionsService: TransactionsService,
  ) {}

  ngOnInit() {
    this.buildTransferForm();
  }

  submit() {
    this.isSubmitted = true;
  }

  hasOverDraft(): boolean {
    return this.balance - this.transferForm.get('amount')?.value < this.balanceThreshold;
  }

  makeTransfer() {
    this.transactionsService.addTransaction({
      dates: {
        valueDate: new Date().getTime(),
      },
      categoryCode: 'DSD455XX',
      merchant: {
        name: 'backbase',
        accountNumber: 'SI64397745065188826',
      },
      transaction: {
        creditDebitIndicator: CreditDebitIndicator.DBIT,
        type: TransactionType.ONLINE_TRANSFER,
        amountCurrency: {
          amount: Number(this.transferForm.value.amount),
          currencyCode: CurrencyCode.EUR,
        },
      }
    });

    this.updateBalance();
    this.reset();
  }

  private reset() {
    this.isSubmitted = false;
    this.transferForm.patchValue({
      amount: '',
      from: this.getFromAccount(),
      to: '',
    });
  }

  private buildTransferForm() {
    this.transferForm = this.formBuilder.group({
      amount: ['', { validators: [Validators.required, Validators.min(0)] }],
      from: { value: this.getFromAccount(), disabled: true },
      to: ['', { validators: [Validators.required] }],
    });
  }

  private updateBalance() {
    this.balance = this. balance - this.transferForm.value.amount;
  }

  private getFromAccount() {
    return `Free checking(4962) - ${this.balance}`;
  }
}
