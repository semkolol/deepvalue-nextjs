import Image from 'next/image'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/app/supabase-server';

import ThemeSwitcher from '@/components/ui/ThemeSwitcher/ThemeSwitcher'
import NavMenu from '../NavMenu/NavMenu';

import SignOutButton from './SignOutButton';

export default async function NavBar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <header className="fixed top-0 left-0 right-0 p-3 z-10">
      <div className='flex flex-row justify-between items-center px-3 py-1 border rounded-xl bg-white/90 dark:bg-black/90 dark:border-zinc-800'>
        <div className='flex flex-row m-2'>
          <Link href="/">
            <Image
              src="/logo.png"
              height={48}
              width={48}
              alt="deepvalue"
            />
          </Link>
        </div>

        <div className='md:flex flex-row py-2 hidden space-x-3'>
          <Link href="/pricing" className="relative group mx-2">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative py-1 px-2 font-semibold rounded-lg text-black dark:text-white dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer">Try for free</div>
          </Link>
          {user && user ?
            <>
              <Link href="/account" className='py-1 px-2 items-center rounded-lg hover:bg-slate-200 dark:hover:bg-neutral-900'>
                Account
              </Link>
              <SignOutButton />

            </>
            :
            <Link href="/signin" className='py-1 px-2 items-center rounded-lg hover:bg-slate-200 dark:hover:bg-neutral-900'>Sign in</Link>
          }
          <ThemeSwitcher />
        </div>
        <NavMenu user={user} />
      </div>
    </header>
  )
}
