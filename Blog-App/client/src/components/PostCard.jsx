import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  const preview =
    post.content.length > 100
      ? post.content.substring(0, 100) + '...'
      : post.content;

  const date = new Date(Number(post.createdAt)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link to={`/post/${post.id}`} className="group block">
      <article className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {post.title}
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-gray-500">
          {preview}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="font-medium text-gray-600">
            {post.author.username}
          </span>
          <time>{date}</time>
        </div>
      </article>
    </Link>
  );
}
