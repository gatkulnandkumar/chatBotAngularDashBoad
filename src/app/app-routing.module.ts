import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddTemplateComponent } from './component/add-template/add-template.component';
import { ChatBotCrudComponent } from './component/chat-bot-crud/chat-bot-crud.component';
import { LoginComponent } from './component/login/login.component';
import { UpdateTemplateComponent } from './component/update-template/update-template.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'BotCrud', component: ChatBotCrudComponent, canActivate:[AuthGuard], },
  { path: 'addTemplate', component: AddTemplateComponent, canActivate:[AuthGuard],},
  { path: 'updateTemplate/:id', component: UpdateTemplateComponent,canActivate:[AuthGuard],}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
