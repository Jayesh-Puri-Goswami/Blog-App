import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { ADD_POST } from '../graphql/mutations';
import { GET_POSTS } from '../graphql/queries';

export default function NewPost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  const [addPost, { loading }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    onCompleted: () => navigate('/home'),
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!form.content.trim()) {
      setError('Content is required');
      return;
    }

    addPost({ variables: { title: form.title.trim(), content: form.content.trim() } });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Create New Post</h1>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              placeholder="Give your post a title"
            />
          </div>

          <div>
            <label htmlFor="content" className="mb-1 block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              rows={5}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none resize-y"
              placeholder="Write your blog post content..."
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
