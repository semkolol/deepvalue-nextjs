"use client"
import Image from 'next/image';
import Link from 'next/link';

export default function Card({ data }: any) {
  return (
    <Link key={data.id} href={`/stock/${data.ticker}`} className="flex flex-row items-center px-4 py-2 border rounded-xl space-x-2 bg-white dark:border-black dark:bg-zinc-900 hover:cursor-pointer hover:bg-zinc-100 dark:hover:bg-neutral-800">

      <Image
        src={data.logo}
        width={35}
        height={35}
        alt="company logo"
        className='object-contain'
      />

      <div className='flex flex-col px-2'>
        <h2 className='font-bold'>
          {data.companyName}
        </h2>
        <p className='font-semibold uppercase text-neutral-400'>
          {data.ticker}
        </p>
      </div>

    </Link>
  );
}
