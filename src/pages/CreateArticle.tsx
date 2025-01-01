import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArticleForm } from '../types/Article.ts';
import { articles } from '../data/articles.ts';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

const articleSchema = z.object({
  title: z.string().min(3, 'Le titre est requis'),
  excerpt: z.string().min(3, "L'extrait est requis"),
  content: z.string().min(3, 'Le contenu est requis'),
  image: z.string().url("L'URL de l'image doit être valide"),
});

export function CreateArticle({
  modify = false,
}: Readonly<{ modify?: boolean }>) {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const articleToEdit = modify
    ? articles.find((article) => article.id === Number(recipeId))
    : null;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleForm>({
    resolver: zodResolver(articleSchema),
    defaultValues: articleToEdit || {
      title: '',
      excerpt: '',
      content: '',
      image: '',
    },
  });

  const onSubmit = (data: ArticleForm) => {
    // Assainir les données
    const sanitizedData = {
      title: DOMPurify.sanitize(data.title),
      excerpt: DOMPurify.sanitize(data.excerpt),
      content: DOMPurify.sanitize(data.content),
      image: DOMPurify.sanitize(data.image),
    };

    if (modify && articleToEdit) {
      // Update existing article
      Object.assign(articleToEdit, sanitizedData);
      alert('Article modifié avec succès !');
    } else {
      // Add new article
      articles.push({
        id: articles.length + 1,
        ...sanitizedData,
        author: 'John Doe', // On part du principe que l'utilisateur est connecté sous ce nom
        date: new Date().toISOString().split('T')[0],
      });
      alert('Article ajouté avec succès !');
    }

    navigate('/');
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">
        {modify ? "Modifier l'article" : 'Ajouter un nouvel article'}
      </h1>
      <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-1/3 mx-auto">
          <Controller
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  placeholder="Titre"
                  className="border p-2 my-3 block w-full rounded-lg"
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </>
            )}
            name="title"
            control={control}
          />
        </div>
        <div className="w-1/3 mx-auto">
          <Controller
            render={({ field }) => (
              <>
                <textarea
                  {...field}
                  placeholder="Extrait"
                  className="border p-2 my-3 block w-full rounded-lg"
                />
                {errors.excerpt && (
                  <p className="text-red-500">{errors.excerpt.message}</p>
                )}
              </>
            )}
            name="excerpt"
            control={control}
          />
        </div>
        <div className="w-1/3 mx-auto">
          <Controller
            render={({ field }) => (
              <>
                <textarea
                  {...field}
                  placeholder="Contenu"
                  className="border p-2 my-3 block w-full rounded-lg"
                />
                {errors.content && (
                  <p className="text-red-500">{errors.content.message}</p>
                )}
              </>
            )}
            name="content"
            control={control}
          />
        </div>
        <div className="w-1/3 mx-auto">
          <Controller
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  placeholder="URL de l'image"
                  className="border p-2 my-3 block w-full rounded-lg"
                />
                {errors.image && (
                  <p className="text-red-500">{errors.image.message}</p>
                )}
              </>
            )}
            name="image"
            control={control}
          />
        </div>
        <button
          type="submit"
          className="bg-amber-600 text-white px-6 py-2 mt-4 block mx-auto rounded-lg"
        >
          {modify ? 'Modifier' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;
