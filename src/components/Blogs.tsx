import React from "react";

interface BlogPost {
  title: string;
  date: string; // ISO or formatted
  excerpt: string;
  link: string;
}

interface BlogsProps {
  posts: BlogPost[];
}

const Blogs: React.FC<BlogsProps> = ({ posts }) => {
  return (
    <section id="blog" className="py-20 px-6 bg-gradient-to-br from-white to-slate-50">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-14">
        Derniers articles
      </h2>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {posts.map((post) => (
          <article
            key={post.title}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 flex-grow leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            <div className="px-8 pb-8 flex items-center justify-between text-sm text-gray-500">
              <time dateTime={post.date}>{post.date}</time>
              <a
                href={post.link}
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Lire l'article →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
