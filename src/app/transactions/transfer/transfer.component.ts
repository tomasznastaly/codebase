import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionsService } from '../transactions.service';
import { CreditDebitIndicator, TransactionType } from '../models/transaction-metadata.model';
import { CurrencyCode } from '../models/amount-currency.model';

const defaultAccountFrom = 'Free checking(4962) - $5824.76';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly transactionsService: TransactionsService,
  ) {}

  ngOnInit() {
    this.buildTransferForm();
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

    this.reset();
  }

  private reset() {
    this.transferForm.patchValue({
      amount: '',
      from: defaultAccountFrom,
      to: '',
    });
  }

  private buildTransferForm() {
    this.transferForm = this.formBuilder.group({
      amount: '',
      from: { value: defaultAccountFrom, disabled: true},
      to: '',
    });
  }
}
