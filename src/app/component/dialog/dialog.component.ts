import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatBotCrudComponent } from '../chat-bot-crud/chat-bot-crud.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  openConfirmationDialog(): MatDialogRef<any> {
    return this.dialog.open(ChatBotCrudComponent, {
      width: '300px',
      data: {
        message: 'Are you sure you want to delete this entry?'
      }
    });
  }

}
