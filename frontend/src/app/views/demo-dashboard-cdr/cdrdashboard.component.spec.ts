import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdrdashboardComponent } from './cdrdashboard.component';

describe('CdrdashboardComponent', () => {
  let component: CdrdashboardComponent;
  let fixture: ComponentFixture<CdrdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdrdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdrdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
