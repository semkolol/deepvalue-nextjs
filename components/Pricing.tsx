'use client';

import { Database } from '@/types_db';
import { postData } from '@/utils/helpers';
import { getStripe } from '@/utils/stripe-client';
import { Session, User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  session: Session | null;
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = 'lifetime' | 'year' | 'month';

export default function Pricing({
  session,
  user,
  products,
  subscription
}: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      return router.push('/signin');
    }
    if (subscription) {
      return router.push('/account');
    }
    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price }
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  if (!products.length)
    return (
      <section>
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-black dark:text-white sm:text-center sm:text-6xl">
            Nothing here.
          </p>
        </div>
      </section>
    );

  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto py-28 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-black dark:text-white sm:text-center sm:text-6xl">
            Pricing
          </h1>
          <div className="relative self-center mt-6 bg-zinc-200 dark:bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-400 dark:border-zinc-800">
            {intervals.includes('month') && (
              <button
                onClick={() => setBillingInterval('month')}
                type="button"
                className={`${billingInterval === 'month'
                  ? 'relative w-1/2 bg-zinc-100 dark:bg-zinc-700 border-zinc-400 dark:border-zinc-800 shadow-sm text-black dark:text-white'
                  : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                  } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
              >
                Monthly billing
              </button>
            )}
            {intervals.includes('year') && (
              <button
                onClick={() => setBillingInterval('year')}
                type="button"
                className={`${billingInterval === 'year'
                  ? 'relative w-1/2 bg-zinc-100 dark:bg-zinc-700 border-zinc-400 dark:border-zinc-800 shadow-sm text-black dark:text-white'
                  : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                  } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
              >
                Yearly billing
              </button>
            )}
          </div>
        </div>
        <div className="py-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          <div
            key={'free-tier'}
            className={cn(
              'rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-100 dark:bg-zinc-900 border border-zinc-600'
            )}
          >
            <div className="p-6">
              <h2 className="py-4 text-2xl font-semibold leading-6 text-black dark:text-white">
                Free
              </h2>
              {/* <p className="mt-4 text-zinc-300">{product.description}</p> */}

              <p className='py-4'>
                <span className="text-5xl font-extrabold white">
                  $0
                </span>
                <span className="text-base font-medium dark:text-zinc-100">
                  /m
                </span>
              </p>

              <div className="p-4 text-zinc-700 dark:text-zinc-300">
                <ul className='list-disc'>
                  <li>Annual Reports</li>
                  <li>Basic Access</li>
                </ul>
              </div>
              <button
                type="button"
                disabled={true}
                // loading={priceIdLoading === price.id}
                className="block w-full py-2 text-sm font-semibold text-center text-white rounded-md bg-neutral-950 hover:bg-neutral-800"
              >
                {products[0].name ===
                  subscription?.prices?.products?.name
                  ? 'Manage'
                  : 'Current Plan'}
              </button>
            </div>
          </div>
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency!,
              minimumFractionDigits: 0
            }).format((price?.unit_amount || 0) / 100);
            return (
              <div
                key={product.id}
                className={cn(
                  'rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-100 dark:bg-zinc-900',
                  {
                    'border border-green-600': subscription
                      ? product.name === subscription?.prices?.products?.name
                      : product.name === 'Deepvalue Pro' || 'Deepvalue Pro Yearly'
                  }
                )}
              >
                <div className="p-6">
                  <h2 className="py-4 text-2xl font-semibold leading-6 text-black dark:text-white">
                    {product.name}
                  </h2>
                  {/* <p className="mt-4 text-zinc-300">{product.description}</p> */}

                  <p className='py-4'>
                    <span className="text-5xl font-extrabold white">
                      {priceString}
                    </span>
                    <span className="text-base font-medium dark:text-zinc-100">
                      /{price.interval}
                    </span>
                  </p>

                  <div className="p-4 text-zinc-700 dark:text-zinc-300">
                    <ul className='list-disc'>
                      <li>Annual and Quarterly Reports</li>
                      <li>Access to Pro-Data</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    disabled={false}
                    // loading={priceIdLoading === price.id}
                    onClick={() => handleCheckout(price)}
                    className="block w-full py-2 text-sm font-semibold text-center text-white rounded-md bg-neutral-950 hover:bg-neutral-800"
                  >
                    {products[0].name ===
                      subscription?.prices?.products?.name
                      ? 'Manage'
                      : 'Start Free Trial'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

