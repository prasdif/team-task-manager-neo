import Link from "next/link";
import { FolderKanban, ArrowRight, Zap, Users, BarChart3, Clock, Shield, CheckCircle2 } from 'lucide-react';
import DashboardPreview from '@/components/landing/DashboardPreview';
import HeroAnimation from '@/components/landing/HeroAnimation';
import FeatureShowcase from '@/components/landing/FeatureShowcase';
import TaskBoardCard from '@/components/landing/TaskBoardCard';
import TeamWorkloadCard from '@/components/landing/TeamWorkloadCard';
import SprintProgressCard from '@/components/landing/SprintProgressCard';
import TaskActivityCard from '@/components/landing/TaskActivityCard';
import PremiumFeatures from '@/components/landing/PremiumFeatures';

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
      <main className="pt-24 sm:pt-32 pb-16 px-6 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start overflow-hidden">

            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Announcing our new beta release. <a href="#" className="font-semibold text-black"><span className="absolute inset-0" aria-hidden="true" />Read more <span aria-hidden="true">&rarr;</span></a>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Manage your team's tasks efficiently
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Streamline your workflow, collaborate with your team, and ship projects faster than ever before. All in one minimal, powerful platform.
              </p>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
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

            {/* Right Column - Strictly Contained Animation */}
            <div
              className="hidden lg:flex items-start justify-center"
              style={{
                width: '100%',
                maxWidth: '580px',
                height: '520px',
                overflow: 'hidden',
                margin: '0 auto'
              }}
            >
              <HeroAnimation />
            </div>
          </div>
        </div>
      </main>

      {/* Dashboard Preview Section */}
      <DashboardPreview />

      {/* Feature Showcase Sections */}
      <section className="bg-white">
        {/* Section 1: Task Board Overview - Card on Right, Text on Left */}
        <FeatureShowcase
          label="Task Board Overview"
          heading="Track sprint progress in real time"
          description="Visualize your team's workflow with intuitive Kanban boards. See tasks moving through To Do, In Progress, and Completed columns. Monitor sprint completion, assign work to team members, and keep everyone aligned on project goals with drag-and-drop simplicity."
          ctaText="View Dashboard"
          ctaLink="#"
          visualComponent={<TaskBoardCard />}
          reversed={false}
        />

        {/* Section 2: Team Workload - Card on Left, Text on Right */}
        <FeatureShowcase
          label="Team Workload"
          heading="Understand team workload at a glance"
          description="Balance work distribution across your team effectively. View individual task loads, completion rates, and capacity utilization. Identify who's overloaded or available for new work. Make smart assignment decisions with real-time workload visibility and team performance metrics."
          ctaText="View Team Stats"
          ctaLink="#"
          visualComponent={<TeamWorkloadCard />}
          reversed={true}
        />

        {/* Section 3: Sprint Progress - Card on Right, Text on Left */}
        <FeatureShowcase
          label="Sprint Progress"
          heading="See what's moving forward and what's blocked"
          description="Stay on top of sprint timelines with daily completion tracking. Monitor progress across the sprint duration, identify bottlenecks early, and ensure your team hits every milestone. View completed, in-progress, and remaining tasks with clear visual indicators and status updates."
          ctaText="View Progress"
          ctaLink="#"
          visualComponent={<SprintProgressCard />}
          reversed={false}
        />

        {/* Section 4: Live Activity Feed - Card on Left, Text on Right */}
        <FeatureShowcase
          label="Live Activity Feed"
          heading="Stay updated with real-time team activity"
          description="Never miss a beat with live activity updates. See who's working on what, track task completions, and monitor team collaboration in real time. Get instant notifications for comments, reviews, and status changes. Keep the entire team informed and connected."
          ctaText="Explore Activity"
          ctaLink="#"
          visualComponent={<TaskActivityCard />}
          reversed={true}
        />
      </section>

      {/* Premium Features Section */}
      <PremiumFeatures />

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">Ready to get started?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of teams already using Tasker to ship faster.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-gray-800 transition-all"
          >
            Get started for free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-lg text-black">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
              <FolderKanban size={16} />
            </div>
            <span>Tasker</span>
          </div>
          <p className="text-sm text-gray-500">© 2026 Tasker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
