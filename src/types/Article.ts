export interface Article {
  _id?: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  createdAt?: string;
}

export interface ArticleForm {
  title: string;
  excerpt: string;
  content: string;
  image: string;
}
