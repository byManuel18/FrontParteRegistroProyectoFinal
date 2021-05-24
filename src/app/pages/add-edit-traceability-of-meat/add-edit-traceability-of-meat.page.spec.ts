import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEditTraceabilityOfMeatPage } from './add-edit-traceability-of-meat.page';

describe('AddEditTraceabilityOfMeatPage', () => {
  let component: AddEditTraceabilityOfMeatPage;
  let fixture: ComponentFixture<AddEditTraceabilityOfMeatPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditTraceabilityOfMeatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditTraceabilityOfMeatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
