import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute ,Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  form!: FormGroup;
  flag: boolean=false;
  user:any;
  // id:number;
  @Output() LogEvent = new EventEmitter();
 
  constructor(
    public userservice: UsersService,
    private router: Router,
    public myActivate:ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Email:[''],
      Password:['']
    })
  }
     
  get f(){
    return this.form.controls;
  }
  
   submit(){
    this.http.get<any>("http://localhost:27969/api/Users").subscribe(res=>{
       const user = res.find((a:any)=>{
        if((a.email == this.form.value.Email && a.password == this.form.value.Password) || this.flag){
          this.flag=true;
           this.user= a;
           return true;
        }else{
          return false;
        }
      });
      

      if(user){
        alert("Login Success!");
        this.form.reset();
        // this.router.navigateByUrl("");
      }else{
        alert("Login Failed!");
      
      }
      this.LogEvent.emit(this.user);
    }, err=>{
        alert("somthig went wrong");
      })
      
  }
 

}
