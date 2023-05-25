import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChatDemoService } from 'src/app/services/chat-demo.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ChatBot } from 'src/app/Model/chatbot.model';
import { DataTablesModule } from 'angular-datatables';
import { DialogComponent } from '../dialog/dialog.component';



@Component({
  selector: 'app-chat-bot-crud',
  templateUrl: './chat-bot-crud.component.html',
  styleUrls: ['./chat-bot-crud.component.css']
})
export class ChatBotCrudComponent implements OnInit {

  // displayedColumns: string[] = ['id', 'message_type', 'message','next_action','context_id', 'execution_detail', 'payload', 'issue_types','Actions'];
  // dataSource!: MatTableDataSource<ChatBot>;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog :MatDialog,private http: HttpClient, private service: ChatDemoService, private router: Router, private authService: ChatDemoService) { }
  allEmpDetails: any;

  chatBotList: any[] = [];
  dtOptions: any = {};

  ngOnInit(): void {
    this.getAllTemplateData();
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    // lengthMenu : [5, 10, 25],
    //   processing: true
    // };

  }


//   this.http.get('https://www.testjsonapi.com/users/').subscribe(data => {
  
//     this.data = data;
//   setTimeout(()=>{   
//     $('#datatableexample').DataTable( {
//       pagingType: 'full_numbers',
//       pageLength: 5,
//       processing: true,
//       lengthMenu : [5, 10, 25]
//   } );
//   }, 1);
//         }, error => console.error(error));
// }


  // select All template data
  getAllTemplateData() {
    console.log("getAllTemplateData API call==>");
    this.service.getAllTemplate().subscribe((res: any) => {
      console.log("getAllTemplateData::::", res);
      this.chatBotList = res;
      setTimeout(()=>{   
        $('#datatableexample').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu : [5, 10, 25]
      } );
      }, 1);

      // this.dataSource = new MatTableDataSource(res);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });

  }

  // logout application
  logout(): void {
    this.authService.logout();
  }

  // edit template
  editTempalte() {
    console.log("inside edit template here");

  }

  addTemplate() {
    console.log("into the session",sessionStorage.getItem('authGaurd'));
    if (sessionStorage.getItem('authGaurd')) {
      console.log("into the session after the cnd",sessionStorage.getItem('authGaurd'));
    }
    this.router.navigate(['/addTemplate']);
  }


  openDialog(){
    this.dialog.open(DialogComponent, {
      // data: {
      //   animal: 'panda',
      // },
    });
     
  }

  //delete template
  deleteTempalteData(id: any) {
    console.log("inside delete template");
    this.openDialog();
    // alert("Do you want to delete data");

    this.service.deleteTemplate(id).subscribe((res: any) => {
      console.log("getEmployee::::", res);
      this.chatBotList = res;
      this.getAllTemplateData();
      
    });
    // window.location.reload();
  }

  //   deleteData(id:any)
  //   {
  //      console.log("Outside....+",id);
  //      this.hospital.deleteData(id).subscribe(
  //        (data:Hospital) =>{

  //           console.log("helllllllo++++++",id);
  //           this.getAllData();
  //           console.log(data);
  //        });
  //        window.location.reload();
  //  }

}

