import { useQuery } from '@apollo/client/react';
import { GET_POSTS } from '../graphql/queries';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';

export default function Home() {
  const { data, loading, error } = useQuery(GET_POSTS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading && !data) return <Spinner />;

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-lg bg-red-50 px-6 py-4 text-sm text-red-600">
          Failed to load posts. Please try again later.
        </div>
      </div>
    );
  }

  const posts = data?.getPosts || [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Recent Posts</h1>

      {posts.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 py-16 text-center">
          <p className="text-lg font-medium text-gray-500">No posts yet</p>
          <p className="mt-1 text-sm text-gray-400">Be the first to create one!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
