// 'use client";';
// import PostList from "../components/post/PostList";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// export default function PostsPage({ userToken }) {
//   return <PostList userToken={userToken} />;
// }

// // "use client";
// // import PostList from "../components/post/PostList";
// // import Header from "../components/Header";
// // import Footer from "../components/Footer";

// // export default function PostsPage() {
// //   return (

// //       <Header />

// //       <main>
// //         <PostList />
// //       </main>

// //       <Footer />

// //   );
// // }
"use client";
import PostList from "../components/post/PostList";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

export default function PostsPage({ userToken }) {
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
