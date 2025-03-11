import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comment } from '../interfaces/comment.interface';

type CreateCommentDto = {
  parentId?: string;
  text: string;
  userId: string;
};

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor() {}
 
  http = inject(HttpClient);

  getComments(parentId: string = '') {
    let url = `${environment.PROD_BACKEND_URL}/comments`; 
    if (parentId) {
      url += `?parentId=${parentId}`;
    }
    return this.http.get<Comment[]>(url);
  }

  createComment(comment: CreateCommentDto) {
    return this.http.post<Comment>(
      `${environment.PROD_BACKEND_URL}/comments`,
      comment
    )
  }
}
