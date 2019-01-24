import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { Comment, User, UserService } from '../core';
import { Subscription } from 'rxjs';
import { AddResponseComponent } from '../response/add-response.component';
import { ResponsesService } from '../core/services/responses.service';
import { CommentsService } from '../core/services/comments.service';
@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html'
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
  @Output() liked;

  canModify: boolean;
  userId: string;

  ngOnInit() {
    // Load the current user's data
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = (userData.username === this.comment.author.username);
        this.userId = userData.id;
        if (this.comment.utile) {
          if (this.comment.utile.indexOf(userData.id) === -1) {
              console.log('ce fils de pute a pas encore voté pour :' + this.comment.body);
              console.log(userData.id);
          } else {
            console.log('ce batard de sa mère a déja voté pour :' + this.comment.body);
              console.log(userData.id);
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
    return !status;
  }

  wasUseful(comment) {
    this.permute(this.liked);
    let avoté = false;
    Promise.resolve(
    comment.utile.map(res => {
      if (res === this.userId) {
        return avoté = true;
      } else { return avoté = false; }
    })).then(resolve => {
      if (avoté) {
        console.log('supprimer vote');
        return this.commentService.unvote(comment.id).subscribe(
          res => {
            console.log(res);
          }
        );
      } else if (!avoté) {
        console.log('ajouter vote');
        return this.commentService.vote(comment.id).subscribe(
          res => {
            console.log(res);
          }
        );
      }
    });
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }


}
