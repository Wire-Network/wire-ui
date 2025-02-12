import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WireUiComponent } from './wire-ui.component';

describe('WireUiComponent', () => {
  let component: WireUiComponent;
  let fixture: ComponentFixture<WireUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WireUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WireUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
