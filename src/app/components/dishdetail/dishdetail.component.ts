import { Component, OnInit } from '@angular/core';

import { Dish } from '../../shared/dish';
import { DishService } from '../../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;
  formErrors = {
    name: '',
    message: ''
  };

  validationMessages = {
    'name': {
      'required': 'Your name is required',
      'minlength': 'Your name must be at least 2 characters',
      'maxlength': 'Your name must be less than 25 characters'
    },
    'message': {
      'required': 'Comment cannot be blank'
    }
  };

  constructor( private dishService: DishService,
               private route: ActivatedRoute,
               private location: Location,
               private fb: FormBuilder) {
      this.createForm();
  }

  ngOnInit() {
   this.dishService.getDishIds()
    .subscribe(dishIds => this.dishIds = dishIds);

   this.route.params
     .switchMap((params: Params ) => this.dishService.getDish(+params['id']))
     .subscribe(dish => { this.dish = dish; this.findPrevNext(this.dish.id); });
  }

  findPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      message: ['', Validators.required ]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange(); // reset form validation messages
  }

  onValueChange(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log('comment: ', this.comment);
    this.commentForm.reset({
      name: '',
      rating: 5,
      message: ''
    });
  }

}
