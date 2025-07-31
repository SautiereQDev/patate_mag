import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArticleForm } from '../types/Article.ts';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useEffect } from 'react';

const articleSchema = z.object({
  title: z.string().min(3, 'Le titre est requis'),
  excerpt: z.string().min(3, "L'extrait est requis"),
  content: z.string().min(3, 'Le contenu est requis'),
});

export function CreateArticle({
  modify = false,
}: Readonly<{ modify?: boolean }>) {
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
          throw new Error('The article creation has failed');
        }
      })
      .then(() => {
        const formData: FormData = new FormData();
        formData.append('image', data.image[0]);
        const imageUrl = modify
          ? `https://api.quentinsautiere.com/patate-mag/images/${recipeId}`
          : 'https://api.quentinsautiere.com/patate-mag/images/upload';
        fetch(imageUrl, {
          method: modify ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('The image upload has failed');
            }
            alert(
              modify
                ? 'Article modifié avec succès !'
                : 'Article ajouté avec succès !'
            );
            navigate('/');
          })
          .catch((error) => {
            console.error('Error:', error);
            alert("Une erreur est survenue lors de la création de l'article");
          });
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Une erreur est survenue lors de la création de l'article");
      });
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
                  className="block w-full p-2 my-3 border rounded-lg"
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
                  className="block w-full p-2 my-3 border rounded-lg"
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
                  className="block w-full p-2 my-3 border rounded-lg"
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
                <input type="file" {...field} accept={'image/*'} required />
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
          className="block px-6 py-2 mx-auto mt-4 text-white rounded-lg bg-amber-600"
        >
          {modify ? 'Modifier' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;
