import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChatDemoService } from 'src/app/services/chat-demo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatBot } from 'src/app/Model/chatbot.model';

@Component({
  selector: 'app-update-template',
  templateUrl: './update-template.component.html',
  styleUrls: ['./update-template.component.css']
})
export class UpdateTemplateComponent implements OnInit {
  result: ChatBot | undefined;
  // isUpdateOperation: boolean = true;
  constructor(private router: ActivatedRoute,private routerNV : Router, private formBuilder: FormBuilder, private http: HttpClient, private service: ChatDemoService, private toastr: ToastrService) { }

  form = this.formBuilder.group({
    
    id :  ['', Validators.required],
    message_type: ['', Validators.required],
    message: ['', Validators.required],
    context_id: ['', Validators.required],
    next_action: ['', Validators.required],
    execution_detail: ['', Validators.required],
    issue_types: ['', Validators.required],
    payload: ['', Validators.required],
    
  });

  ngOnInit(): void {
    console.log(this.router.snapshot.params.id);
    this.service.getById(this.router.snapshot.params.id).subscribe((result) => {
      console.log("result=>", result);
      const id = result.id;
      console.log("abccccccc",id);
        this.updateForm(result);
    })

  }
  protected updateForm(result: ChatBot): void {
    this.form.patchValue({
      id: result.id,
      message_type: result.message_type,
      message: result.message,
      context_id: result.context_id,
      next_action: result.next_action,
      execution_detail: result.execution_detail,
      issue_types: result.issue_types,
      payload: result.payload,
    });

  }

  onSubmit(form: any): void {
    console.log('inside onSubmit');
    // Send the form data to the Spring Boot REST API
    console.log("form ---------", form);
    const formData = this.form.value;
    console.log("formData===>", formData);
    this.service.updateTemplateData(formData).subscribe();
    console.log("formdata here id===>",formData.id);
    
    if(formData.id != null){
      this.toastr.success('Template updated Successfully', 'Success', {
        timeOut: 2000,
      });
      this.routerNV.navigate(['/BotCrud']);
    }else{
      this.toastr.error('Invalid ID to update', 'Error', {
        timeOut: 2000,
      });
    }
   
  }

  // update(form: any){
  //   console.log("My Data is here===>" ,formData);
  //   this.service.update(formData).subscribe();
  // }

  clearForm() {
    // this.form.reset();
    this.routerNV.navigate(['/BotCrud']);
  }

}
