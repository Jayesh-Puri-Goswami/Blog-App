import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { GET_POST } from '../graphql/queries';
import Spinner from '../components/Spinner';

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_POST, { variables: { id } });

  if (loading) return <Spinner />;

  if (error || !data?.getPost) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-lg bg-red-50 px-6 py-4 text-sm text-red-600">
          Post not found.
        </div>
        <button
          onClick={() => navigate('/home')}
          className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          &larr; Back to Home
        </button>
      </div>
    );
  }

  const post = data.getPost;
  const date = new Date(Number(post.createdAt)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <button
        onClick={() => navigate('/home')}
        className="mb-6 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition"
      >
        &larr; Back to Home
      </button>

      <article className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900">
          {post.title}
        </h1>

        <div className="mb-6 flex items-center gap-3 text-sm text-gray-500">
          <span className="font-medium text-gray-700">{post.author.username}</span>
          <span className="text-gray-300">&middot;</span>
          <time>{date}</time>
        </div>

        <div className="prose prose-gray max-w-none whitespace-pre-wrap text-gray-700 leading-relaxed">
          {post.content}
        </div>
      </article>
    </div>
  );
}
