import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { Comment, User, UserService } from '../core';
import { Subscription } from 'rxjs';
import { AddResponseComponent } from '../response/add-response.component';
import { ResponsesService } from '../core/services/responses.service';
import { CommentsService } from '../core/services/comments.service';
@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private commentService: CommentsService,
    private ResponseService: ResponsesService
  ) {}

  private subscription: Subscription;

  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();
  avoté = new EventEmitter<boolean>();


  canModify: boolean;
  userId: string;
  tagAvotee: boolean;

  ngOnInit() {
    // Load the current user's data
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = (userData.username === this.comment.author.username);
        this.userId = userData.id;
        if (this.comment.utile) {
          if (this.comment.utile.indexOf(userData.id) === -1) {
            Object.assign(this.comment, {tagAvotee: false});
          } else {
            Object.assign(this.comment, {tagAvotee: true});
          }
        }
      }
    );

    console.log(this.comment);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  permute(status) {
    console.log(!status);
    return !status;
  }

  wasUseful(comment) {
    let avoté = false;
    console.log('conteneur iduser' + comment.utile);

    Promise.resolve(

      comment.utile.map(res => {
        if (res === this.userId) {
          return avoté = true;
        } else {
          return avoté = false;
        }

      })).then(resolve => {
        if (avoté) {
          return this.commentService.unvote(comment.id).subscribe(
            res => {
              this.comment.utile.length = res.utile.length;
              this.comment.utile.filter(user => {
                return user !== this.userId;
              });
              console.log('user  ' + JSON.stringify(this.comment));
            }
          );
        } else if (!avoté) {
          return this.commentService.vote(comment.id).subscribe(
            res => {
              console.log('res');
              // si userId dedans
              this.comment.utile.push(this.userId);
              this.comment.utile.length = res.utile.length;
              console.log(JSON.stringify(this.comment));
            }
          );
        }
      });
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }


}
