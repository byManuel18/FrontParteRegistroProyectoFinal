import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEditRawMaterialRecordPage } from './add-edit-raw-material-record.page';

describe('AddEditRawMaterialRecordPage', () => {
  let component: AddEditRawMaterialRecordPage;
  let fixture: ComponentFixture<AddEditRawMaterialRecordPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditRawMaterialRecordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditRawMaterialRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
