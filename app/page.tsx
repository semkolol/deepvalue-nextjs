import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import Card from '@/components/ui/Card/Card'
import Spacer from '@/components/ui/Spacer/Spacer'

import Search from '@/components/ui/Search/Search';

type Props = {
  params?: {
    num?: string;
  };
  searchParams?: {
    q?: string;
  };
};

async function getData(stock: string) {
  const supabase = createServerComponentClient({ cookies });

  if (stock == undefined) {
    stock = '';
  }

  var { data, error } = await supabase
    .from('stocks')
    .select(`ticker, logo, description, companyName, ceo, website, fundamentals, fundamentalsAnno`)
    .limit(25)
    .ilike('ticker', `%${stock}%`)

  if (!data) {
    console.log(error);
  }

  return data
}

export default async function Home(props: Props) {

  const stocks = await getData(props.searchParams?.q as string);

  async function SearchStock(formData: FormData) {
    "use server"
    //
  }

  return (
    <main className="flex flex-col items-center justify-center h-auto pt-48 md:pt:0">

      <div className='flex py-1 px-4 max-w-xl border text-sm md:text-md rounded-full bg-neutral-700 border-neutral-800 dark:bg-neutral-950'>
        <span className='font-semibold text-neutral-200'>
          Deepvalue is in beta. <span className='font-light'>Report issues</span>
        </span>
        <Link href="/request" className='text-blue-500 font-light px-1'>
          here
        </Link>
      </div>

      <Spacer space={5} />

      <h1 className=' my-5 text-2xl md:text-4xl font-bold text-center font-mono'>Easiest way to research your favorite stocks.</h1>

      <Spacer space={10} />

      <Search />

      <Spacer space={5} />

      <div className="p-5 grid gap-2 grid-cols-1 md:grid-cols-3 w-full max-w-5xl">
        {stocks && stocks?.map((doc: any) => (

          <Card data={doc} />

        ))}
      </div>
    </main>
  )
}

{/* <Head>
        <title>Research and find Stocks with Deepvalue</title>
        <meta name="description" content="Deepvalue provides deep financial insights for Stocks and helps you find Stocks with our powerful Stock Screener Pro. The best alternative to the endless Tables seen on Yahoo Finance, MarketWatch and others." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head> */}