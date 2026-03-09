import Link from 'next/link';
import { ArrowRight, Sparkles, Terminal, Layers, Component } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function HomePage() {
  return (
    <main className="flex flex-col flex-1 relative overflow-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-500">

      {/* Header with Theme Toggle */}
      <header className="absolute top-0 right-0 p-6 z-50">
        <ThemeToggle />
      </header>

      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-500/10 dark:from-indigo-500/20 via-transparent to-transparent pointer-events-none blur-3xl transition-colors duration-500" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[128px] pointer-events-none transition-colors duration-500" />
      <div className="absolute top-40 -left-40 w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[128px] pointer-events-none transition-colors duration-500" />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center px-4 py-20 max-w-5xl mx-auto w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md shadow-sm transition-colors duration-500">
          <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Welcome to Hello SVG</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-zinc-900 dark:text-white transition-colors duration-500">
          Supercharge Your
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-sm">
            Vector Graphics
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed transition-colors duration-500">
          The all-in-one platform for powerful SVG rendering, intuitive code display, and AI-driven insights. Built with modern web standards to elevate your workflow.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap w-full max-w-2xl">
          <Link
            href="/app"
            className="group flex items-center justify-center gap-2 bg-indigo-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-600 transition-all shadow-[0_0_20px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.7)] hover:-translate-y-0.5 w-full sm:w-auto min-w-[160px]"
          >
            Try SVG Editor
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/docs"
            className="group flex items-center justify-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 px-8 py-4 rounded-full font-semibold hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-[0_0_20px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 w-full sm:w-auto min-w-[160px]"
          >
            Read Docs
          </Link>
          <Link
            href="https://github.com/your-username/Hello-SVG"
            target="_blank"
            className="flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 px-8 py-4 rounded-full font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-white w-full sm:w-auto min-w-[160px]"
          >
            <Terminal className="w-4 h-4" />
            GitHub
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group flex flex-col items-start text-left p-8 rounded-[2rem] bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700/50 transition-all backdrop-blur-sm">
          <div className="p-3 rounded-2xl bg-indigo-500/10 mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
            <Layers className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 transition-colors duration-500">Rich Ecosystem</h3>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-500">
            Beautifully crafted components and seamless MDX integration powered by Fumadocs for an unmatched authoring experience.
          </p>
        </div>

        <div className="group flex flex-col items-start text-left p-8 rounded-[2rem] bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700/50 transition-all backdrop-blur-sm">
          <div className="p-3 rounded-2xl bg-purple-500/10 mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
            <Sparkles className="w-7 h-7 text-purple-500 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 transition-colors duration-500">AI-Powered</h3>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-500">
            Leverage advanced AI tools directly within your workflow to generate, summarize, and understand complex vector graphics.
          </p>
        </div>

        <div className="group flex flex-col items-start text-left p-8 rounded-[2rem] bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700/50 transition-all backdrop-blur-sm">
          <div className="p-3 rounded-2xl bg-pink-500/10 mb-6 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-300">
            <Component className="w-7 h-7 text-pink-500 dark:text-pink-400" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 transition-colors duration-500">Interactive UI</h3>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-500">
            Highly responsive, glassmorphic design that adapts to your needs. Bring your SVG previews to life with modern aesthetics.
          </p>
        </div>
      </section>
    </main>
  );
}
