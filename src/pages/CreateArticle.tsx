import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArticleForm } from '../types/Article';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useEffect } from 'react';

const articleSchema = z.object({
  title: z.string().min(3, 'Le titre est requis'),
  excerpt: z.string().min(3, "L'extrait est requis"),
  content: z.string().min(3, 'Le contenu est requis'),
  image: z.string().url("L'URL de l'image doit être valide"),
});

export function CreateArticle({ modify = false }: Readonly<{ modify?: boolean }>) {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ArticleForm>({
    resolver: zodResolver(articleSchema),
  });

  useEffect(() => {
    if (modify && recipeId) {
      fetch(`https://api.quentinsautiere.com/patate-mag/articles/${recipeId}`)
        .then((response) => response.json())
        .then((data) => {
          reset(data);
        })
        .catch((error) => console.error('Error:', error));
    }
  }, [modify, recipeId, reset]);

  const onSubmit = (data: ArticleForm) => {
    const sanitizedData = {
      title: DOMPurify.sanitize(data.title),
      excerpt: DOMPurify.sanitize(data.excerpt),
      content: DOMPurify.sanitize(data.content),
      image: DOMPurify.sanitize(data.image),
      author: 'Quentin Sautière',
    };

    const requestOptions = {
      method: modify ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedData),
    };

    const url = modify
      ? `https://api.quentinsautiere.com/patate-mag/articles/${recipeId}`
      : 'https://api.quentinsautiere.com/patate-mag/articles';

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        alert(
          modify
            ? 'Article modifié avec succès !'
            : 'Article ajouté avec succès !'
        );
        navigate('/');
      })
      .catch((error) => console.error('Error:', error));
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
                  value={field.value || ''}
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
                  value={field.value || ''}
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
                  value={field.value || ''}
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
                  value={field.value || ''}
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