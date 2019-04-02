import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterdashboardComponent } from './twitterdashboard.component';

describe('TwitterdashboardComponent', () => {
  let component: TwitterdashboardComponent;
  let fixture: ComponentFixture<TwitterdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
