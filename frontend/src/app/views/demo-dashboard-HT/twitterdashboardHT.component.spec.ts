import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterdashboardHTComponent } from './twitterdashboardHT.component';

describe('TwitterdashboardComponent', () => {
  let component: TwitterdashboardHTComponent;
  let fixture: ComponentFixture<TwitterdashboardHTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterdashboardHTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterdashboardHTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
