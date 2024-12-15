import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(author: string, title: string, content: string) {
    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
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
