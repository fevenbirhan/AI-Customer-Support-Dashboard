'use client';

import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className="w-full bg-card backdrop-blur-sm border-b border-border transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between text-foreground">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-bold">
            AI Customer Support Dashboard
          </Link>
          <Link href="/dashboard">
              <Button variant="secondary" className="text-sm px-3 py-1">
                Dashboard
              </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div>
            <SignedIn>
              {/* user button from Clerk */}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Sign in</button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}