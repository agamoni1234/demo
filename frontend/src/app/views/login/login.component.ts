import { Component, OnInit, NgModule } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  environment
}
from '../../../environments/environment';
import {
  AppServiceBackendApi
}
from '../../app.servicebackendapi';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
	username: any;
	password: any;
	error=false;
	errorMessage:string;
  loginForm: FormGroup;
  modal_value : string;
  submitted = false;
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  



  constructor(public AppServiceBackendApiObj:AppServiceBackendApi,private formBuilder: FormBuilder,private router : Router,private http: HttpClient,private AppServiceObj:AppService) { }

  ngOnInit() {

    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      // 'z-index': 99999,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
  };

  this.myParams = {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#000000"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#000000",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
    };

    localStorage.removeItem("token");
    localStorage.removeItem("userId" );

    this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
    // particlesJS.load('/assets/JS/particles.js', '/assets/JS/particles.json', null);
  }

  get f() { return this.loginForm.controls; }


  login():any {
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }

		this.error= false;
		let _this=this;
		this.AppServiceObj.loginApi(this.username,this.password ,function(returnObj)
		{
			if (returnObj.auth)
			{
				localStorage.setItem("token", returnObj.token);
				localStorage.setItem("userId", returnObj.result[0].id);
        localStorage.setItem("username", returnObj.result[0].username);
        
        //File Management
        var userId = returnObj.result[0].id;
        var userFolderName =_this.username+"_"+userId;
        var token = returnObj.token;
        console.log(token)
        var KeyDataJson = {
          "accessKey":environment.accessKey,
          "secretKey":environment.secretKey,
          "bucketName":environment.s3bucket,
          "verifyToken":token,
          "folderName":userFolderName
        };
        console.log("Folder Creation data is "+KeyDataJson);
        _this.AppServiceObj.CheckExistingFolder(KeyDataJson,function(data){
          console.log(data);
          if(data.message == "Folder is found"){
            console.log("Folder exists ")
;          }
          else{
                _this.AppServiceObj.CreateFolder(KeyDataJson, function(data) {
                  console.log("Key Data is "+JSON.stringify(KeyDataJson));
                  console.log("Data is : "+JSON.stringify(data));
                  if(data.status=="1"){
                    console.log("Folder is created successfully")
                  }
              });
            }
        });
				_this.router.navigate(['console']);
			}
			else
			{
        console.log("ERROR IN LOGIN : ",_this.error);
        alert("Invalid Credentials!");
				_this.error= true;
				_this.errorMessage= "Username & Password is Incorrect";
			}
    });
  }
}
