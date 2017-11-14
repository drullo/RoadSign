import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotatingImagesComponent } from './rotating-images.component';

describe('RotatingImagesComponent', () => {
  let component: RotatingImagesComponent;
  let fixture: ComponentFixture<RotatingImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotatingImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotatingImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
