import React from 'react';
import { Databases, ID } from 'appwrite';

import appwriteClient from '@/libs/appwrite';
import useUser from '@/hooks/useUser';

export default function CreatePostForm({ onPostCreated }) {
  const { currentAccount } = useUser();

  const [postForm, setPostForm] = React.useState({
    text: '',
  });

  const onChangeInput = (event) => {
    const {
      target: { name, value },
    } = event;
    setPostForm((currPostForm) => ({ ...currPostForm, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const databases = new Databases(appwriteClient);

      const post = await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE,
        process.env.NEXT_PUBLIC_POSTS_COLLECTION,
        ID.unique(),
        {
          useremail: currentAccount.email,
          username: currentAccount.name,
          text: postForm.text,
        }
      );
      setPostForm({text: ''})
      onPostCreated(post);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex">
        <div className="flex-1 px-6 pt-2 mt-2">
          <textarea
            onChange={onChangeInput}
            value={postForm.text}
            name="text"
            className=" bg-red-50 outline-none focus:ring-1 focus:ring-rose-200 rounded-lg p-3 text-black placholder:text-gray-400 font-small text-lg w-full"
            rows="2"
            cols="50"
            placeholder="What's happening?"
          ></textarea>
        </div>
      </div>

      <div className="flex">
        <div className="w-10"></div>

        <div className="w-64 px-2">
          {/* <div className="flex items-center bg-red-300">
            <div className="flex-1 text-center px-1 py-1 m-2">
              <a
                href="#"
                className="mt-1 group flex items-center text-rose-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-rose-800 hover:text-rose-300"
              >
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </a>
            </div>

            <div className="flex-1 text-center py-2 m-2">
              <a
                href="#"
                className="mt-1 group flex items-center text-rose-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-rose-800 hover:text-rose-300"
              >
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </a>
            </div>

            <div className="flex-1 text-center py-2 m-2">
              <a
                href="#"
                className="mt-1 group flex items-center text-rose-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-rose-800 hover:text-rose-300"
              >
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </a>
            </div>

            <div className="flex-1 text-center py-2 m-2">
              <a
                href="#"
                className="mt-1 group flex items-center text-rose-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-rose-800 hover:text-rose-300"
              >
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </a>
            </div>
          </div> */}
        </div>

        <div className="flex-1 pb-3 ">
          <button
            type="submit"
            className="bg-gradient-to-r from-red-400 to-rose-700 mt-5 hover:bg-gradient-to-r from-red-500 to-rose-800 text-white font-bold py-2 px-8 rounded-full mr-8 float-right "
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
