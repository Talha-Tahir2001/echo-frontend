import { Component, inject, OnInit, signal } from '@angular/core';
import { CommentComponent } from '../components/comment/comment.component';
import { CommentService } from '../services/comment.service';
import { Comment } from '../interfaces/comment.interface';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommentComponent, CommentFormComponent],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent implements OnInit {
  comments = signal<Comment[]>([]);
  commentService: CommentService = inject(CommentService);
  userService: UserService = inject(UserService);

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();
    if (!user) return;
    this.commentService
      .createComment({
        text,
        userId: user._id,
      })
      .subscribe((createdComment) => {
        this.comments.set([createdComment, ...this.comments()]);
      });
  }

  commentTrackBy(comment: Comment){
    return comment._id;
  }


  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments);
    });
  }
}
