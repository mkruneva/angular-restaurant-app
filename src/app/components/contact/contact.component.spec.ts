import { ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationBuilder } from '@angular/platform-browser/animations/src/animation_builder';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

import { Feedback, ContactType } from '../../shared/feedback';
import { FeedbackService } from '../../services/feedback.service';

import { ContactComponent } from './contact.component';

class MdDialogRefMock {
}

const FeedbackServiceStub = {
  submitFeedback: function() {
    // does something
  }
};

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      imports: [ BrowserAnimationsModule, MaterialModule, FlexLayoutModule,
        FormsModule, ReactiveFormsModule ],
      providers: [ {provide: FeedbackService, useValue: FeedbackServiceStub }, FormBuilder ]
    })
    .compileComponents();

    let feedbackService = TestBed.get(FeedbackService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
