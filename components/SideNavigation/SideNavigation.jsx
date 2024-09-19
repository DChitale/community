import useUser from '@/hooks/useUser';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function SideNavigation({ onClose, isOpen }) {
  const { currentAccount, logout } = useUser();

  return (
    <div className="relative">
      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden p-2" // Only show on mobile
        onClick={onClose}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 bg-white shadow-lg transform transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="w-64 text-black h-1/2 py-4 relative">
          {/* Close Button for Mobile */}
          <button 
            className="absolute top-4 right-4"
            onClick={onClose}
          >
            <svg 
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="px-4">
            <Image
              src="https://i.ibb.co/GCDyZM6/logo-removebg-preview.png"
              alt="Logo"
              width={100}
              height={100}
              className="h-34 w-auto mb-4"
            />
          </div>

          <nav className="mt-5 px-2">
            <Link
              href="/"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-red-200 text-black"
              onClick={onClose}
            >
              <svg className="mr-4 h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6" />
              </svg>
              Home
            </Link>
            <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-red-200 text-black">
              <svg className="mr-4 h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
              </svg>
              Explore
            </a>

            <Link
              href="/profile"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-red-200 text-black"
              onClick={onClose}
            >
              <svg className="mr-4 h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Profile
            </Link>
          </nav>

          <div className="flex-shrink-0 flex-col gap-4 flex hover:bg-red-00 rounded-full p-4 mt-12 mr-2">
            <p className="capitalize">Hi, {currentAccount?.name}!</p>
            <button
              className="flex-shrink-0 group block border-none bg-transparent"
              onClick={logout}
            >
              <div className="flex items-start flex-col">
                <div className="flex gap-4 items-center">
                  <p className="text-base leading-6 font-medium text-black">Logout</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 w-64 h-full bg-white shadow-lg">
        <div className="py-4">
          <Image
            src="https://i.ibb.co/GCDyZM6/logo-removebg-preview.png"
            alt="Logo"
            width={100}
            height={100}
            className="h-34 w-auto mb-4"
          />
          <nav className="mt-5 px-2">
            <Link
              href="/"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-red-200 text-black"
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-red-200 text-black"
            >
              Explore
            </Link>
            <Link
              href="/profile"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-red-200 text-black"
            >
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
