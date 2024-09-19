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
      {/* Render SideNavigation for mobile, but always display it on the left for desktop */}
      <SideNavigation onClose={toggleSidebar} isOpen={isSidebarOpen} />

      <div className="max-w-3xl mx-auto p-4 flex-1">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          {/* Hamburger Icon for Mobile */}
          <button className="md:hidden p-2" onClick={toggleSidebar}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <CreatePostForm onPostCreated={onPostCreated} />

        <div>
          {postsSortedByCreatedDate?.map((post) => (
            <Post
              onLikePostCallback={onLikePostCallback}
              onPostRemoved={onPostRemoved}
              key={post.$id}
              post={post}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
