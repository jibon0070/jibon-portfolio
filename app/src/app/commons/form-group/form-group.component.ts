import {
  Component, EventEmitter,
  Input,
  OnInit, Output
} from '@angular/core';
import {AbstractControl, ControlContainer, FormGroup, FormGroupDirective, NgForm} from "@angular/forms";
import {ErrorStateMatcher} from '@angular/material/core';
import {Helpers} from "../../helpers/Helpers";

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {

  @Output() icon_click = new EventEmitter<boolean>();
  @Output() change = new EventEmitter<boolean>();
  @Input() identification!: string;
  @Input() label!: string;
  @Input() type: 'text' | 'number' | 'select' | 'date' | 'password' | 'textarea' | 'file' = "text";
  @Input() fcn!: string;
  @Input() icon: string | null = null
  @Input() multiple = false;
  form!: FormGroup;
  @Input() opts: { account: string, value: string }[] = [];
  @Input() clicked: boolean = false;
  @Input() placeholder: string = ""
  @Input() accept: string | null = null;

  constructor(readonly rootFromGroup: ControlContainer) {
  }

  customErrorStateMatcher = new CustomErrorStateMatcher(this);


  ngOnInit(): void {
    this.form = <FormGroup>this.rootFromGroup.control
  }

  select($event: MouseEvent, abstractControl: AbstractControl, callback: any = null, context: any = null) {
    Helpers.select($event, abstractControl, callback, context);
  }

  icon_click_internal() {
    this.icon_click.emit(true);
  }

  change_call() {
    this.change.emit(true);
  }
}

class CustomErrorStateMatcher implements ErrorStateMatcher {
  constructor(private readonly context: any) {
  }

  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control?.errors && (control?.touched || control.dirty)) || (control?.errors && this.context.clicked);
  }

}
