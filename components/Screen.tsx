'use client';
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  data: any
}

export default function Screen({
  data,
}: Props) {

  if (!data.length)
    return (
      <section className="bg-black">
        <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-6xl font-extrabold text-white sm:text-center sm:text-6xl">
            No stocks found.
          </p>
        </div>
      </section>
    );

  return (<>
    <section className='flex flex-col min-h-screen justify-center'>

      <div className='flex flex-col items-center mt-32 p-5'>
        <p className=' my-5 text-2xl md:text-4xl font-bold text-center'>Screen <span className='font-bold ml-2 bg-gradient-to-r bg-clip-text text-transparent from-indigo-500 via-orange-500 to-indigo-500 animate-text'>PRO</span>.</p>
        <div className='flex'>
          <form action='' className='flex flex-row relative z-10 items-center'>
            <input type="text" placeholder='aapl' className='flex-grow px-2 py-2 rounded-lg rounded-bl-lg border-2 bg-zinc-800 border-zinc-900 focus:outline-none focus:border-blue-900 focus:ring-0' required />
            <button type='submit' className='absolute right-0 m-2 p-2 rounded-lg rounded-br-lg bg-zinc-900 hover:bg-zinc-800'>
              <Image
                src="/magnifier.svg"
                width={15}
                height={15}
                alt="Search"
              />
            </button>
          </form>
          <button>filter</button>
        </div>
      </div>

      <div className='relative overflow-x-auto'>
        <table className="w-full text-sm text-left text-zinc-400 table-auto">
          <thead className="text-xs uppercase bg-zinc-800 text-zinc-400">
            <tr>
              <th scope="col" className="px-1 py-3">
                Company
              </th>
              {/* <th scope="col" className="px-1 py-3">
              Market Cap.
            </th> */}
              <th scope="col" className="px-1 py-3">
                Dividend
              </th>
              {/* <th scope="col" className="px-1 py-3">
                Cashflow Ratio
              </th> */}
              <th scope="col" className="px-1 py-3">
                Free Cashflow
              </th>
              <th scope="col" className="px-1 py-3">
                Gross Margin
              </th>
              <th scope="col" className="px-1 py-3">
                Operating Margin
              </th>
              <th scope="col" className="px-1 py-3">
                Net Margin
              </th>
              <th scope="col" className="px-1 py-3">
                Return on Assets
              </th>
              <th scope="col" className="px-1 py-3">
                Return on Capital Employed
              </th>
              <th scope="col" className="px-1 py-3">
                Return on Equity
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((doc: any) => (
              <tr className=" border-b bg-zinc-900 border-zinc-800 hover:bg-zinc-800" key={doc.id}>
                <th scope="row" className="px-2 py-1 font-small whitespace-nowrap text-white">

                  <Link
                    href={`/stock/${doc.ticker}`}
                    // className={styles.card}
                    className="flex items-center"
                    key={doc.id}
                  >
                    <Image
                      src={doc.logo}
                      width={25}
                      height={25}
                      alt="company logo"
                      className='object-contain mr-2'
                    />
                    {doc.companyName}
                    <span className='ml-2 text-zinc-600'>{doc.ticker}</span>
                  </Link>
                </th>
                {/* <td className="px-1 py-4">
                {doc.ceo}
              </td> */}
                <td className="px-1 py-4">
                  {doc.fundamentalsAnno[0].dividendPerShare &&
                    '$' + doc.fundamentalsAnno[0].dividendPerShare.toFixed(2)
                  }
                </td>
                {/* <td className="px-1 py-4">
                  {doc.fundamentalsAnno[doc.fundamentalsAnno.length - 1].cashflow}
                </td> */}
                <td className="px-1 py-4">
                  {doc.fundamentalsAnno[doc.fundamentalsAnno.length - 1].cashflow}
                </td>
                <td className="px-1 py-4">
                  {doc.fundamentalsAnno[0].grossMargin &&
                    doc.fundamentalsAnno[doc.fundamentalsAnno.length - 1].grossMargin.toFixed(2) + '%'
                  }
                </td>
                <td className="px-1 py-4">
                  {doc.fundamentalsAnno[0].operatingMargin &&
                    doc.fundamentalsAnno[doc.fundamentalsAnno.length - 1].operatingMargin.toFixed(2) + '%'
                  }
                </td>
                <td className="px-1 py-4">
                  {doc.fundamentalsAnno[0].netMargin &&
                    doc.fundamentalsAnno[doc.fundamentalsAnno.length - 1].netMargin.toFixed(2) + '%'
                  }
                </td>
                <td className="px-1 py-4">
                  {doc.fundamentalsAnno[0].returnOnAssets &&
                    doc.fundamentalsAnno[doc.fundamentalsAnno.length - 1].returnOnAssets.toFixed(2) + '%'
                  }
                </td>
                <td className="px-1 py-4">
                  {doc.fundamentalsAnno[0].returnOnCapitalEmployed &&
                    doc.fundamentalsAnno[doc.fundamentalsAnno.length - 1].returnOnCapitalEmployed.toFixed(2) + '%'
                  }
                </td>
                <td className="px-1 py-4">
                  {doc.fundamentalsAnno[0].returnOnEquity &&
                    doc.fundamentalsAnno[doc.fundamentalsAnno.length - 1].returnOnEquity.toFixed(2) + '%'
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </section>
  </>

  );
}