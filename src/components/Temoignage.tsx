import React from "react";

const Temoignage: React.FC = () => (
  <section className="py-20 px-6 bg-gray-50">
    <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-14">
      Ce que disent nos volontaires
    </h2>
    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {[
        {
          text: "Grâce à cette application, j'ai pu intervenir rapidement et sauver des vies pendant une inondation à Fès.",
          author: "Ahmed",
          role: "Volontaire",
          avatar: "A",
        },
        {
          text: "C'est incroyable de voir comment la technologie peut nous aider à mieux gérer les catastrophes naturelles.",
          author: "Sofia",
          role: "Expert en risques naturels",
          avatar: "S",
        },
        {
          text: "La coordination et la rapidité d'exécution de cette application ont facilité notre intervention pendant la tempête de sable à Errachidia.",
          author: "Rachid",
          role: "Coordinateur d'équipe",
          avatar: "R",
        },
      ].map(({ text, author, role, avatar }) => (
        <article
          key={author}
          className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 p-10 flex flex-col"
        >
          <p className="text-lg leading-relaxed text-gray-700 mb-8">“{text}”</p>
          <footer className="mt-auto flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-800">
              {avatar}
            </span>
            <div>
              <p className="font-semibold text-gray-900">{author}</p>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
          </footer>
        </article>
      ))}
    </div>
  </section>
);

export default Temoignage;
