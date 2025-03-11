import { Component, signal, input, effect, inject } from '@angular/core';
import { CommentFormComponent } from "../comment-form/comment-form.component";
import { Comment } from '../../interfaces/comment.interface';
import { CommentService } from '../../services/comment.service';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommentFormComponent, DatePipe],
  templateUrl: './comment.component.html',
  styles: [],
})
export class CommentComponent {

  isExpanded = signal(false);
  isReplying = signal(false);
  comment = input<Comment>();
  nestedComments = signal<Comment[]>([]);
  commentService : CommentService = inject(CommentService);
  userService : UserService = inject(UserService);

  nestedCommentsEffect = effect(() => {
    if(this.isExpanded()){
      this.commentService.getComments(this.comment()?._id)
      .subscribe(comments => {
        this.nestedComments.set(comments);
      })
    }
  })

  createComment(formValues: { text: string }) {
    const { text } = formValues;
    const user = this.userService.getUserFromStorage();
    if (!user) return;
    this.commentService
      .createComment({
        text,
        userId: user._id,
        parentId: this.comment()?._id
      })
      .subscribe((createdComment) => {
        this.nestedComments.set([createdComment, ...this.nestedComments()]);
      });
  }

  toggleReplying() {
    this.isReplying.set(!this.isReplying());
    if (this.isReplying()) {
      this.isExpanded.set(true);
    }
  }
  toggleExpanded() {
    this.isExpanded.set(!this.isExpanded());
  }
}
