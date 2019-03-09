import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  redirctUrl: string ;
  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  email: any;
  password:any;
  Login(){
    const email = this.email;
    const password=this.password;
    if(email=="agamoni@thirdeyedata.io" && password=="123456")
    {
      alert("Login Successful");
      alert(this.redirctUrl);
      this.router.navigateByUrl(this.redirctUrl);
    }
    else{
      alert("Wrong Credential");
    }
  }
}
