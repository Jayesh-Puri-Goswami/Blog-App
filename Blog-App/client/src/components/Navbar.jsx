import { Link, useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client/react';

export default function Navbar() {
  const navigate = useNavigate();
  const client = useApolloClient();

  const handleLogout = () => {
    localStorage.removeItem('token');
    client.clearStore();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/home" className="text-xl font-bold tracking-tight text-indigo-600">
          BlogApp
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/new"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-95"
          >
            New Post
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
