"use client";

import { UserIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SignUpRoleSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-2xl w-full space-y-8 glass p-10 rounded-3xl shadow-2xl relative z-10 fade-in">
        <div className="text-center">
          <h2 className="text-4xl font-black text-gray-900">
            Choose Your Role 🎯
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Select how you'll use PeoplePost to make a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link
            href="/signup/citizen"
            className="card-hover group flex flex-col items-center p-8 border-2 border-indigo-200 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 shadow-lg cursor-pointer"
          >
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <span className="mt-4 text-2xl font-bold text-gray-900">
              Citizen
            </span>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Report issues and track their progress in your community
            </p>
            <div className="mt-4 text-indigo-600 font-semibold group-hover:translate-x-1 transition-transform">
              Get Started →
            </div>
          </Link>

          <Link
            href="/signup/official"
            className="card-hover group flex flex-col items-center p-8 border-2 border-teal-200 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 shadow-lg cursor-pointer"
          >
            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <BuildingOfficeIcon className="w-8 h-8 text-white" />
            </div>
            <span className="mt-4 text-2xl font-bold text-gray-900">
              Official
            </span>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Manage and resolve reported issues efficiently
            </p>
            <div className="mt-4 text-teal-600 font-semibold group-hover:translate-x-1 transition-transform">
              Get Started →
            </div>
          </Link>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Already have an account? <span className="underline">Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
