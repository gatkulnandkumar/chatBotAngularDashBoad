import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
// import { MaterialForm } from './material-form';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatDemoService } from 'src/app/services/chat-demo.service';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})
export class AddTemplateComponent implements OnInit {
  ismessage_typeGenerated:boolean =false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private service: ChatDemoService, private toastr: ToastrService,private router : Router) { }

  ngOnInit(): void {

  }
  form = this.formBuilder.group({
    // Define your form fields and their validators
    message_type: ['', Validators.required],
    message: ['', Validators.required],
    context_id: ['', Validators.required],
    next_action: ['', Validators.required],
    execution_detail: ['', Validators.required],
    issue_types: ['', Validators.required],
    payload: ['', Validators.required],

    // email: ['', [Validators.required, Validators.email]],
    // Add more fields as needed
  });


  onSubmit(): void {
    console.log('inside onSubmit');
    // Send the form data to the Spring Boot REST API
    const formData = this.form.value;
    console.log("formData===>", formData);
    this.service.insertTemplate(formData).subscribe((res: any) => {
      console.log("getEmployee::::", res);
      this.toastr.success('Templae added Successfully', 'Success', {
        timeOut: 2000,
      });
      this.form.reset();
    },
      error => {
        console.error('Error adding data:', error);
      });
      this.router.navigate(['/BotCrud']);
      // window.location.reload();
  }
  
  // edit template
  editTempalte() {
    console.log("inside edit template here");
  }

  // update(formData: any){
  //   console.log("My Data is here===>" ,formData);
  //   this.service.update(formData).subscribe();
  //   this.toastr.success('Templae updated Successfully', 'Success', {
  //     timeOut: 2000,
  //   });

  // }

  clearForm() {
    this.form.reset();
    this.router.navigate(['/BotCrud']);
  }

}



