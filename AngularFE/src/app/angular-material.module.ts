import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular//material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  exports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
})
export class AngularMaterialModule {}
