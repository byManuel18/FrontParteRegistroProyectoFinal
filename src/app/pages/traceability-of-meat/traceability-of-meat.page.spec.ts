import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TraceabilityOfMeatPage } from './traceability-of-meat.page';

describe('TraceabilityOfMeatPage', () => {
  let component: TraceabilityOfMeatPage;
  let fixture: ComponentFixture<TraceabilityOfMeatPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TraceabilityOfMeatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TraceabilityOfMeatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
