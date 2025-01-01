export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

export interface ArticleForm {
  title: string;
  excerpt: string;
  content: string;
  image: string;
}
