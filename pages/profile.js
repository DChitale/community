import React, { useState, useCallback, useEffect } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from 'appwrite';
import appwriteClient from '@/libs/appwrite';
import MainLayout from '@/components/Layouts/MainLayout';
import useUser from '@/hooks/useUser';
import { FETCH_STATUS } from '@/utils/constants';

export default function Profile() {
  const { currentAccount } = useUser();
  const [userAvatar, setUserAvatar] = useState('');
  const [profileStatus, setProfileStatus] = useState(FETCH_STATUS.IDLE);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for the hamburger menu
  const [profileForm, setProfileForm] = useState({
    name: '',
    bio: '',
    website: '',
    country: '',
    language: '',
    error: '',
  });

  const displayUserSettings = useCallback(async () => {
    const storage = new Storage(appwriteClient);
    try {
      const usersAvatar = await storage.getFilePreview(
        process.env.NEXT_PUBLIC_BUCKET_ID,
        currentAccount.prefs.avatar
      );
      setUserAvatar(usersAvatar?.href);
    } catch (error) {
      console.log(error);
    }

    setProfileForm({
      name: currentAccount?.name,
      bio: currentAccount.prefs?.bio,
      website: currentAccount.prefs?.website,
      country: currentAccount.prefs?.country,
      language: currentAccount.prefs?.language,
    });
  }, [currentAccount]);

  useEffect(() => {
    if (currentAccount) {
      displayUserSettings();
    }
  }, [currentAccount, displayUserSettings]);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setProfileStatus(FETCH_STATUS.LOADING);
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          avatar: currentAccount.prefs.avatar,
          ...profileForm,
          userId: currentAccount.$id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await response.json();
      if (response.status !== 200) {
        setProfileStatus(FETCH_STATUS.FAIL);
        return;
      }
      setProfileStatus(FETCH_STATUS.SUCCESS);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeProfileImage = async (event) => {
    const avatar = event?.target?.files[0];
    const avatarId = uuidv4();
    const storage = new Storage(appwriteClient);
    await storage.createFile(
      process.env.NEXT_PUBLIC_BUCKET_ID,
      avatarId,
      avatar
    );

    const reader = new FileReader();
    reader.onload = function (e) {
      setUserAvatar(e.target.result);
    };
    reader.readAsDataURL(avatar);

    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        userId: currentAccount.$id,
        ...currentAccount?.prefs,
        avatar: avatarId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await response.json();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <MainLayout>
      <div className="relative w-full">
        {/* Hamburger Menu Button */}
        <button onClick={toggleMenu} className="md:hidden p-2">
          <svg className="w-8 h-8 text-gray-900">
            <path d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Conditionally render the menu based on `isMenuOpen` */}
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-full bg-white z-50">
            {/* Sidebar or Menu content here */}
            <p className="p-4">Menu Content</p>
            <button onClick={toggleMenu} className="absolute top-4 right-4 p-2">
              Close
            </button>
          </div>
        )}

        {/* Profile Content */}
        <div className="text-black px-6 py-8 w-full max-w-2xl mx-auto mt-5 bg-white shadow-lg rounded-lg border-gray-300 md:px-8 md:mr-10 py-20">
          <h1 className="text-2xl md:text-3xl flex justify-center font-semibold mb-6">Edit Profile</h1>
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="flex flex-col items-center">
              <label htmlFor="formFile" className="cursor-pointer flex flex-col items-center space-y-2">
                <div
                  style={{ backgroundImage: `url('${userAvatar}')` }}
                  className="bg-cover w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-300 flex items-center justify-center shadow-md"
                >
                  {!userAvatar && <UserIcon className="text-gray-500 w-10 h-10 md:w-12 md:h-12" />}
                </div>
                <span className="text-sm text-gray-600">Change Avatar</span>
              </label>
              <input
                type="file"
                id="formFile"
                className="hidden"
                accept=".jpeg,.jpg,.png"
                onChange={onChangeProfileImage}
              />
            </div>

            {/* Other form inputs here */}
            <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
              value={profileForm.name}
              onChange={onChangeInput}
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              rows="4"
              name="bio"
              id="bio"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
              value={profileForm.bio}
              onChange={onChangeInput}
              placeholder="Tell us something about yourself!"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              name="website"
              id="website"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
              value={profileForm.website}
              onChange={onChangeInput}
              placeholder="e.g. https://www.johndoe.dev"
            />
          </div>

          {profileStatus === FETCH_STATUS.SUCCESS && (
            <div className="border border-green-500 bg-green-100 text-green-700 py-2 px-4 rounded-md">
              <p>Your settings have been saved successfully!</p>
            </div>
          )}



            <button
              type="submit"
              className="w-full py-2 px-4 rounded-full bg-gradient-to-r from-red-400 to-rose-700 text-white hover:bg-gray-800 transition ease-in-out duration-200"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
