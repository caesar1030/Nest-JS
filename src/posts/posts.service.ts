import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'd',
    commentCount: 2,
    content: 'dd',
    likeCount: 3,
    title: 'd',
  },
  {
    id: 2,
    author: 'd',
    commentCount: 2,
    content: 'dd',
    likeCount: 3,
    title: 'd',
  },
  {
    id: 3,
    author: 'd',
    commentCount: 2,
    content: 'dd',
    likeCount: 3,
    title: 'd',
  },
];

@Injectable()
export class PostsService {
  getAllPosts() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  createPost(author: string, title: string, content: string) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      commentCount: 0,
      likeCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  updatePost(postId: number, author: string, title: string, content: string) {
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => (prevPost.id === postId ? post : prevPost));

    return post;
  }

  removePost(postId: number) {
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      throw new NotFoundException();
    }

    const filteredPosts = posts.filter((post) => post.id !== postId);
    posts = filteredPosts;

    return postId;
  }
}