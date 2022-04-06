import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormGroupComponent} from './form-group/form-group.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {LoadingComponent} from "./loading/loading.component";


@NgModule({
  declarations: [
    PageNotFoundComponent,
    FormGroupComponent,
    LoadingComponent
  ],
  exports: [
    FormGroupComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class CommonsModule {
}
