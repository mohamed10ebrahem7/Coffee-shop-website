import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute ,Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-inser-user',
  templateUrl: './inser-user.component.html',
  styleUrls: ['./inser-user.component.css']
})
export class InserUserComponent implements OnInit {
  form!: FormGroup;
  user: User;

  constructor(
    public userservice: UsersService,
    private router: Router,
    public myActivate:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Phone: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required)
    });
  }
     
  get f(){
    return this.form.controls;
  }
  submit(){
    console.log(this.form.value);
    this.userservice.create(this.form.value).subscribe((res:any) => {
         console.log('Post created successfully!');
         this.router.navigateByUrl('/home');
    })



}
}
