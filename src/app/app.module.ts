import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatBotCrudComponent } from './component/chat-bot-crud/chat-bot-crud.component';
// import { DemoComponent } from './component/services/demo.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatDemoService } from './services/chat-demo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import { AddTemplateComponent } from './component/add-template/add-template.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './component/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UpdateTemplateComponent } from './component/update-template/update-template.component';
import { DataTablesModule } from 'angular-datatables';
import { DialogComponent } from './component/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';





@NgModule({
  declarations: [
    AppComponent,
    ChatBotCrudComponent,
    AddTemplateComponent,
    LoginComponent,
    UpdateTemplateComponent,
    DialogComponent,
    // DemoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    
    DataTablesModule,
    ToastrModule.forRoot()
  ],
  providers: [ChatDemoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
