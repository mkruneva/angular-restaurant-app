import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { DishService } from '../../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { visibility } from '../../animations/app.animation';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    visibility()
  ]
})

export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  errMsg: string;
  visibility = 'shown';

  @ViewChild(FormGroupDirective) commentFormDirective;
  userComment: Comment;
  formErrors = {
    comment: '',
    author: ''
  };

  validationMessages = {
    'comment': {
      'required': 'Comment cannot be blank'
    },
    'author': {
      'required': 'Author name is required',
      'minlength': 'Author name must be at least 2 characters',
    }
  };

  constructor( private dishService: DishService,
               private route: ActivatedRoute,
               private location: Location,
               private fb: FormBuilder,
               @Inject('BaseURL') private BaseURL) {
      this.createForm();
  }

  ngOnInit() {
   this.dishService.getDishIds()
    .subscribe(dishIds => this.dishIds = dishIds);

   this.route.params
     .switchMap((params: Params ) => { this.visibility = 'hidden'; return this.dishService.getDish(+params['id']); } )
     .subscribe(dish => { this.visibility = 'shown'; this.dish = dish; this.dishcopy = dish; this.findPrevNext(this.dish.id); },
                errmsg => this.errMsg = <any>errmsg);
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
      rating: 5,
      comment: ['', Validators.required ],
      author: ['', [Validators.required, Validators.minLength(2)]]
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
    this.userComment = this.commentForm.value;
    const d = new Date();
    this.userComment.date = d.toISOString();
    this.dishcopy.comments.push(this.userComment);
    this.dishcopy.save()
      .subscribe(dish => { this.dish = dish; console.log(this.dish); });
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: ''
    });
    this.commentFormDirective.resetForm();
  }

}
