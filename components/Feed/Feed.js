import React from 'react';
import Post from '@/components/Tweet';
import CreatePostForm from '@/components/CreateTweetForm';
import SideNavigation from '@/components/SideNavigation';

export default function Feed({ posts: postsProp }) {
  const [posts, setPosts] = React.useState(postsProp);
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  const onPostCreated = (newPost) => {
    setPosts((currPosts) => [newPost, ...currPosts]);
  };

  const onPostRemoved = (postToRemove) => {
    setPosts((currPosts) =>
      currPosts.filter((post) => post.$id !== postToRemove.$id)
    );
  };

  const onLikePostCallback = (newPost) => {
    setPosts((currPosts) =>
      currPosts.map((post) => {
        if (post.$id === newPost.$id) {
          return newPost;
        }
        return post;
      })
    );
  };

  const postsSortedByCreatedDate = posts.sort((a, b) => {
    return new Date(b.$createdAt) - new Date(a.$createdAt);
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* SideNavigation for mobile and desktop */}
      <SideNavigation onClose={toggleSidebar} isOpen={isSidebarOpen} />

      <div className="max-w-3xl ml-20 mx-auto p-6 flex-1 bg-gray-50 shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          {/* Mobile Hamburger Icon */}
          <button className="md:hidden p-2 text-gray-700" onClick={toggleSidebar}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <h1 className="text-2xl  text-gray-500">Home</h1>
        </div>

        {/* Post Creation Form */}
        <div className="mb-6 bg-white p-4 shadow rounded-lg">
          <CreatePostForm onPostCreated={onPostCreated} />
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {postsSortedByCreatedDate?.map((post) => (
            <div
              key={post.$id}
              className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow"
            >
              <Post
                onLikePostCallback={onLikePostCallback}
                onPostRemoved={onPostRemoved}
                post={post}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
