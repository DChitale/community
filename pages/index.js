import React from 'react';

import { Databases } from 'appwrite';
import appwriteClient from '@/libs/appwrite';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Feed from '@/components/Feed';
import MainLayout from '@/components/Layouts/MainLayout';

export default function Home({ posts }) {
  return (
    <MainLayout>
      <Feed posts={posts.documents} />
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const databases = new Databases(appwriteClient);

  const posts = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_POSTS_COLLECTION
  );
  return {
    props: { posts }, // will be passed to the page component as props
  };
}
