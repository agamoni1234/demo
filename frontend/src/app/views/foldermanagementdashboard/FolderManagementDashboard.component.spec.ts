import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldermanagementdashboardComponent } from './foldermanagementdashboard.component';

describe('FoldermanagementdashboardComponent', () => {
  let component: FoldermanagementdashboardComponent;
  let fixture: ComponentFixture<FoldermanagementdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoldermanagementdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldermanagementdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
