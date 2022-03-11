import { ChangeDetectionStrategy, Output, EventEmitter, Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-promocode-form',
  templateUrl: './promocode-form.component.html',
  styleUrls: ['./promocode-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromocodeFormComponent implements OnInit {
  @Output() public applyPromocode = new EventEmitter<string>();

  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      promoCode: ['', [Validators.required]]
    })
  }

  public submit(): void {
    if (this.form.invalid) { return; }

    const formsData = this.form.getRawValue();

    this.applyPromocode.emit(formsData.promoCode.trim());

  }
}
