import Image from 'next/image';
import { getSession } from '@/app/supabase-server';
import AuthUI from './AuthUI';

import { redirect } from 'next/navigation';
import Logo from '/public/logo.png';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect('/account');
  }

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 py-12 m-auto w-80 ">
        <div className="flex justify-center py-12 ">
          <Image src={Logo} alt='limegigs' height={69} width={69} />
        </div>
        <AuthUI />
      </div>
    </div>
  );
}
