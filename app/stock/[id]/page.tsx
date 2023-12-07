import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Charts from '../../../components/Charts'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

async function getData({ id }: { id: string }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession();

  var { data: sub } = await supabase
    .from('subscriptions')
    .select(`status`)
    .eq('user_id', session?.user.id)

  var { data } = await supabase
    .from('stocks')
    .select(`ticker, logo, description, companyName, ceo, website, fundamentals, fundamentalsAnno`)
    .eq('ticker', id)
    .single()

  if (!data) {
    throw new Error('Failed to fetch data');
  }

  const stockAndData = {
    user: session?.user,
    sub: sub,
    data,
    id: id
  }
  return stockAndData
}


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = createServerComponentClient({ cookies })
  const id = params.id;

  var { data } = await supabase
    .from('stocks')
    .select(`ticker, logo, description, companyName, ceo, website, fundamentals, fundamentalsAnno`)
    .eq('ticker', id)
    .single()

  return {
    title: data?.companyName + ' Fundamentals, Stock Charts, Revenue, Cashflow and more',
    description: data?.companyName + ' Fundamentals and Stock Charts, like Stock Based Compensation, Free Cashflow, Revenue Segments, Margin, Balance Sheet and more',
  }
}

export default async function StockPage({ params }: { params: { id: string } }) {

  const data = await getData(params)

  return (
    <>
      <Charts stock={data} />
    </>
  )
}
