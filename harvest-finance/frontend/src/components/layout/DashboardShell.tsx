"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, User as UserIcon, X } from "lucide-react";
import { NotificationCenter } from "@/components/Notification/NotificationCenter";
import { Sidebar, dashboardNavItems } from "@/components/layout/Sidebar";
import { ThemeToggle } from "@/components/ui";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1f12] flex">
      <Sidebar />

      <div className="flex-1 flex min-w-0 flex-col overflow-hidden h-screen">
        <header className="md:hidden sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 dark:border-[rgba(141,187,85,0.15)] bg-white dark:bg-[#162a1a] px-4">
          <Link href="/" className="text-lg font-bold text-harvest-green-600 dark:text-harvest-green-400">
            Harvest
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NotificationCenter />
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className="rounded-md p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:hover:bg-[#1a3020] hover:text-gray-900 dark:hover:text-gray-100"
              aria-label="Open dashboard navigation"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>

        <header className="hidden h-16 items-center justify-between border-b border-gray-200 dark:border-[rgba(141,187,85,0.15)] bg-white dark:bg-[#162a1a] px-8 md:flex">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </span>
              <input
                type="text"
                placeholder="Search vaults, assets, and advice..."
                className="block w-full rounded-lg border border-gray-200 dark:border-[rgba(141,187,85,0.25)] bg-gray-50 dark:bg-[#1a3020] py-2 pl-10 pr-3 text-sm leading-5 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all focus:border-harvest-green-500 focus:outline-none focus:ring-1 focus:ring-harvest-green-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <NotificationCenter />
            <div className="h-8 w-px bg-gray-200 dark:bg-[rgba(141,187,85,0.2)]" />
            <button className="flex items-center gap-3 rounded-full p-1 transition-colors hover:bg-gray-50 dark:hover:bg-[#1a3020]">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-harvest-green-100 dark:bg-harvest-green-900 text-harvest-green-700 dark:text-harvest-green-400">
                <UserIcon className="h-5 w-5" />
              </div>
            </button>
          </div>
        </header>

        {isMobileNavOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <div
              className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-[#162a1a] shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-[rgba(141,187,85,0.15)] px-4 py-4">
                <span className="text-lg font-semibold text-harvest-green-700 dark:text-harvest-green-400">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="rounded-md p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:hover:bg-[#1a3020] hover:text-gray-900 dark:hover:text-gray-100"
                  aria-label="Close dashboard navigation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="space-y-1 px-3 py-4">
                {dashboardNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileNavOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition hover:bg-harvest-green-50 dark:hover:bg-[#1a3020] hover:text-harvest-green-700 dark:hover:text-harvest-green-300"
                    >
                      <Icon className="h-5 w-5 text-gray-400" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
