// "use client";
// import PostList from "../components/post/PostList";
// import Header from "../components/ui/Header";
// import Footer from "../components/ui/Footer";

// export default function PostsPage({ userToken }) {
//   return (
//     <>
//       <Header />
//       <main>
//         <PostList userToken={userToken} />
//       </main>
//       <Footer />
//     </>
//   );
// }
// pages/posts/page.tsx
"use client";
import PostList from "../components/post/PostList";


export default function PostsPage() {
  return (
    <>
      <main>
        <PostList />
      </main>
    </>
  );
}
