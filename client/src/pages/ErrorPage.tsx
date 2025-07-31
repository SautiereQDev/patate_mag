import { Link } from 'react-router-dom';

export function ErrorPage() {
  return (
    <div className="text-center">
      <h1 className='text-4xl mb-4'>Error 404</h1>
      <p className="text-lg mb-5">La page à laquelle vous tentez d'accéder n'existe pas</p>
      <Link to={'/'} className="border-2 px-4 py-2 rounded-md">
        Retourner à l'accueille
      </Link>
    </div>
  );
}
