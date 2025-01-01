import { Controller, useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
import { ArticleForm } from '../types/Article.ts';
import { articles } from '../data/articles.ts';
import { redirect } from 'react-router-dom';
// import DOMPurify from 'dompurify';

const articleSchema = z.object({
  title: z.string().min(3, 'Le titre est requis'),
  excerpt: z.string().min(3, "L'extrait est requis"),
  content: z.string().min(3, 'Le contenu est requis'),
  image: z.string().url("L'URL de l'image doit être valide"),
});

export function CreateArticle() {
  const { control, handleSubmit } = useForm<ArticleForm>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      image: '',
    },
  });

  const onSubmit = (data: ArticleForm) => {
    // Assainir les données
    // const sanitizedData = {
    //   title: DOMPurify.sanitize(data.title),
    //   excerpt: DOMPurify.sanitize(data.excerpt),
    //   content: DOMPurify.sanitize(data.content),
    //   image: DOMPurify.sanitize(data.image),
    // };

    articles.push({
      id: articles.length + 1,
      // ...sanitizedData,
      author: 'John Doe', // On part du principe que l'utilisateur est connecté sous ce nom
      date: new Date().toISOString().split('T')[0],
    });
    alert('Article ajouté avec succès !');
    redirect('/');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">
        Ajouter un nouvel article
      </h1>
      <form className="mt-8">
        <Controller
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Titre"
              className="border p-2 my-3 w-1/3 mx-auto block rounded-lg"
            />
          )}
          name="title"
          control={control}
        />
        <Controller
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Extrait"
              className="border p-2 my-3 w-1/3 mx-auto block rounded-lg"
            />
          )}
          name="excerpt"
          control={control}
        />
        <Controller
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Contenu"
              className="border p-2 my-3 w-1/3 mx-auto block rounded-lg"
            />
          )}
          name="content"
          control={control}
        />
        <Controller
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="URL de l'image"
              className="border p-2 my-3 w-1/3 mx-auto block rounded-lg"
            />
          )}
          name="image"
          control={control}
        />
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-amber-600 text-white px-6 py-2 mt-4 block mx-auto rounded-lg"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;
