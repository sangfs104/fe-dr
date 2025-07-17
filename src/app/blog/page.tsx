"use client";
import PostList from "../components/post/PostList";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

export default function PostsPage({ userToken }: { userToken: string }) {
  return (
    <>
      <Header />
      <main>
        <PostList userToken={userToken} />
      </main>
      <Footer />
    </>
  );
}
