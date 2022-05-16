import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { Products } from 'src/app/models/products.model';
import { Product } from 'src/app/models/product.model';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products : any;
  prodID:any;
  id: number;
  form!: FormGroup;
  product:Products = new Products;
  product2:Product = new Product;
  btnUpdateShow:boolean = false;
  btnSaveShow:boolean = true;

  constructor(public prodservice: ProductsService,public userService:UsersService,
    public myActivate:ActivatedRoute,
    private formBuilder:FormBuilder,public router:Router) { 
    this.prodID=this.myActivate.snapshot.params['id'];

  }

  /**
   * Write code on Method
   *
   * @return response()
   */

  ngOnInit(): void {
    this.prodservice.getAllProds().subscribe(
      (response)=>{
          this.products=response;
      },
      (error)=>{
          console.log("error");
      },
    )

    this.form = this.formBuilder.group({
      id:[''],
      name: [''],
      price:[''],
      image: [''],
      description: ['']
    })
    
  }

  
  get f(){

    return this.form.controls;
  }
  
  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }

  Edit(p: Products){
    this.form.controls['id'].setValue(p.id);
    this.form.controls['name'].setValue(p.name);
    this.form.controls['image'].setValue(p.image);
    this.form.controls['price'].setValue(p.price);
    this.form.controls['description'].setValue(p.description);
    this.id = p.id;
    this.UpdateShowBtn();
  }
  
  submit(){
    this.product.id=this.form.value.id;
    this.product.name =this.form.value.name;
    this.product.description =this.form.value.description;
    this.product.price =this.form.value.price;
    this.product.image =this.form.value.image;
    console.log(this.product);
    this.prodservice.editprod(this.id,this.product).subscribe((res:any) => {
      console.log('Post updated successfully!');
      this.resetForm();

      this.getAll();


    })
  }
  getAll(){
    this.prodservice.getAllProds().subscribe(
      (response)=>{
          this.products=response;
      },
      (error)=>{
          console.log("error");
      },
    )
  }
  Deleteprod(id: number){
    this.prodservice.deleteprodByID(id).subscribe(
      (response)=>{
        this.prodservice.getAllProds().subscribe(
          (response)=>{
              this.products=response;
          },
          (error)=>{
              console.log("error");
          },
        )
    },
    (error)=>{
        console.log("error");
    },
    )
  }
  userdata:any;
  cnt:number;
  getUser(user:any){
    this.userdata =user;
    // this.userdata.count=0;
    // console.log(this.userdata.);
    // this.increaseCount();
    this.setCNT();
  }
setCNT(){
  this.cnt=this.userdata.count;
}
  increaseCount(){
    this.userdata.count=this.userdata.count+1;
    // console.log(this.userdata);
    this.cnt=this.userdata.count;

    this.userService.editCount(this.userdata.id,this.userdata).subscribe((res:any)=>{
    console.log(this.userdata);
    },
    (error)=>{
        console.log("error");
    },)

  }

  AddProd(){
    this.SaveShowBtn();
    // this.AddProd2();
  }
  AddProd2(){
    console.log(this.form.value);
    this.product2.name =this.form.value.name;
    this.product2.description =this.form.value.description;
    this.product2.price =this.form.value.price;
    this.product2.image =this.form.value.image;
    this.prodservice.create(this.product2).subscribe((res:any) => {
         console.log('Post created successfully!');
         this.getAll();
         this.resetForm();
    })
  }
    
  resetForm(){
    // this.form.controls['id'].setValue('');
    this.form.controls['name'].setValue('');
    this.form.controls['image'].setValue('');
    this.form.controls['price'].setValue('');
    this.form.controls['description'].setValue('');
  }
}
