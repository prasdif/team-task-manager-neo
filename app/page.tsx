import Link from "next/link";
import { FolderKanban, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 font-bold text-xl tracking-wider text-black">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white shadow-lg">
                <FolderKanban size={18} />
              </div>
              <span>Tasker</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-semibold text-gray-600 hover:text-black transition-colors">
                Dashboard
              </Link>
              <Link href="/dashboard" className="text-sm font-semibold bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 sm:pt-32 pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our new beta release. <a href="#" className="font-semibold text-black"><span className="absolute inset-0" aria-hidden="true" />Read more <span aria-hidden="true">&rarr;</span></a>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Manage your team's tasks efficiently
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Streamline your workflow, collaborate with your team, and ship projects faster than ever before. All in one minimal, powerful platform.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-gray-800 transition-all hover:gap-3"
            >
              Start for free <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-1 hover:gap-2 transition-all">
              Live demo <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>


      </main>
    </div>
  );
}
