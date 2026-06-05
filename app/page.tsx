"use client";

import Image from "next/image";
import { useState } from "react";
import { cvData } from "@/data/cvData";

export default function Home() {
  const [showEmail, setShowEmail] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    "Tümü",
    ...Array.from(new Set(cvData.projects.map((project) => project.category))),
  ];

  const filteredProjects =
    activeCategory === null
      ? []
      : activeCategory === "Tümü"
      ? cvData.projects
      : cvData.projects.filter((project) => project.category === activeCategory);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(cvData.personal.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (error) {
      console.error("Clipboard write failed", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-900">
      {/* 1. HERO / GİRİŞ BÖLÜMÜ */}
      <header className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center md:text-left md:flex md:items-center md:justify-between">
        <div className="md:flex md:items-center md:gap-6">
          <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden mx-auto md:mx-0 mb-4 md:mb-0 border border-white/10 shadow-lg">
            <Image
              src={cvData.personal.photo}
              alt={`${cvData.personal.name} profile`}
              fill
              priority
              quality={100}
              sizes="(max-width: 768px) 176px, 224px"
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              {cvData.personal.name}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-slate-400 mt-3">{cvData.personal.title}</p>
            <p className="text-sm text-slate-500 mt-2">📍 {cvData.personal.location} • Doğum: {cvData.personal.born} • Mezuniyet: {cvData.personal.graduated}</p>

            {/* İletişim Butonları */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
              <button
                type="button"
                onClick={() => setShowEmail(true)}
                className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold px-5 py-2.5 rounded-full transition-all"
              >
                Bana Ulaşın
              </button>
              <a
                href={cvData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-700 hover:border-slate-500 text-slate-300 px-5 py-2.5 rounded-full transition-all"
              >
                LinkedIn Profile
              </a>
            </div>
            {showEmail && (
              <div className="mt-4 text-center md:text-left">
                <p className="text-sm text-slate-400 flex items-center justify-center md:justify-start gap-2">
                  E-posta:
                  <a href={`mailto:${cvData.personal.email}?subject=Portföy%20üzerinden%20iletişim`} className="text-teal-300 hover:text-teal-200">
                    {cvData.personal.email}
                  </a>
                  <span
                    role="button"
                    onClick={copyEmail}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80 text-teal-300 transition shadow-sm hover:bg-slate-700 hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    title="Maili kopyala"
                  >
                    <span className="relative inline-flex h-6 w-6">
                      <span className="absolute left-0 top-0 h-4 w-4 rounded-md border border-teal-300/70 bg-slate-900/80"></span>
                      <span className="absolute left-1 top-1 h-4 w-4 rounded-md border border-teal-300/70 bg-slate-900/80"></span>
                    </span>
                  </span>
                </p>
                {emailCopied && (
                  <p className="text-xs text-teal-300 mt-2">E-posta adresi kopyalandı!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ANA İÇERİK KONTEYNERİ */}
      <div className="max-w-5xl mx-auto px-6 space-y-20 pb-24">
        {/* 2. HAKKIMDA */}
        <section className="border-t border-slate-800 pt-10">
          <h2 className="text-2xl font-bold text-slate-200 mb-4">Hakkımda</h2>
          <p className="text-slate-400 leading-relaxed max-w-3xl">{cvData.personal.about}</p>
        </section>

        {/* 3. DENEYİMLER */}
        <section className="border-t border-slate-800 pt-10">
          <h2 className="text-2xl font-bold text-slate-200 mb-8">Deneyimler</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-slate-800">
            {cvData.experiences.map((exp, index) => (
              <div key={index} className="relative pl-10 group">
                {/* Zaman Çizelgesi Noktası */}
                <div className="absolute left-2 top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-teal-500 group-hover:bg-teal-500 transition-all"></div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                  <h3 className="text-lg font-semibold text-slate-100 group-hover:text-teal-400 transition-colors">
                    {exp.role} — <span className="text-slate-400 font-normal">{exp.company}</span>
                  </h3>
                  <span className="text-sm text-slate-500 font-medium md:mt-0 mt-1">{exp.date}</span>
                </div>
                <p className="text-slate-400 mt-2 text-sm md:text-base leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PROJELER */}
        <section className="border-t border-slate-800 pt-10">
          <h2 className="text-2xl font-bold text-slate-200 mb-6">Projeler</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-teal-500 text-slate-900"
                    : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {activeCategory !== null && (
            filteredProjects.length === 0 ? (
              <p className="text-slate-500">Bu kategori için proje bulunamadı.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredProjects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/40 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-teal-400 mb-2">{project.title}</h3>
                      <p className="text-slate-300 leading-relaxed mb-4">{project.description}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="text-xs font-mono text-slate-500 bg-slate-900/50 p-2 rounded border border-slate-800/80">
                        {project.tech}
                      </div>
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-300 transition hover:bg-teal-500/20 hover:text-white"
                        >
                          GitHub Repo
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </section>

        {/* 5. YETENEKLER & EĞİTİM */}
        <div className="grid md:grid-cols-2 gap-10 border-t border-slate-800 pt-10">
          {/* Yetenekler */}
          <div>
            <h2 className="text-2xl font-bold text-slate-200 mb-6">Teknik Yetkinlikler</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Eğitim */}
          <div>
            <h2 className="text-2xl font-bold text-slate-200 mb-6">Eğitim</h2>
            <div className="space-y-4">
              {cvData.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-slate-800 pl-4">
                  <h3 className="text-sm font-semibold text-slate-200">{edu.school}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{edu.faculty}</p>
                  <p className="text-xs text-slate-500 mt-1">{edu.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} {cvData.personal.name}. Tüm Hakları Saklıdır. Next.js ile geliştirilmiştir.
      </footer>
    </main>
  );
}
