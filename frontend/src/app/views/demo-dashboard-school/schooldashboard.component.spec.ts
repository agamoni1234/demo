import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchooldashboardComponent } from './schooldashboard.component';

describe('SchooldashboardComponent', () => {
  let component: SchooldashboardComponent;
  let fixture: ComponentFixture<SchooldashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchooldashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchooldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
