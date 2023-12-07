'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import randomColor from 'randomcolor';

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
);

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

// NORMAL BAR
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        tooltip: {
            callbacks: {
                label: function (context: any) {
                    var label = context.dataset.label || '';
                    var value: number = context.parsed.y / 1000000000
                    if (label) {
                        label += ': ';
                    }
                    if (value !== null) {
                        label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) + 'B';
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        y: {
            ticks: {
                callback: (value: any) => {
                    if (value !== null) {
                        value = value / 1000000000
                        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) + 'B';
                    }
                }
            }
        }
    }
};

export default function Charts({ stock }: any) {
    const [sub, setSub] = useState()

    useEffect(() => {
        if (stock.sub) {
            const getSub = async () => {
                try {
                    setSub(stock.sub[0].status)
                } catch (error) {

                }
            };
            getSub();
        }
    }, [stock])


    return (<>
        <main className="flex flex-col items-center p-2">
            <div className='pt-28 pb-10'>
                <div className='flex flex-col'>

                    <div className='flex flex-row justify-center items-center'>
                        <Image
                            src={stock.data.logo}
                            width={40}
                            height={40}
                            alt="company logo"
                            className='object-contain'
                        />

                        <div className='flex flex-col ml-2'>
                            <h1>
                                {stock.data.companyName}
                            </h1>
                            <h2 className='text-neutral-500'>
                                {stock.data.ticker}
                            </h2>

                        </div>
                    </div>
                    <div className='flex flex-row items-center mt-10'>
                        <div className='flex flex-col mr-10'>
                            <ul>
                                <li>CEO: {stock.data.ceo}</li>
                                <li>Website: <a href={`${stock.data.website}`}>{stock.data.website}</a></li>
                                {/* <li>Sector: Technology</li>
                                <li>Industry: Consumer Electronics</li>
                                <li>Full Time Employees: 164,000</li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 p-1">
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                'w-full rounded-lg p-2 text-sm font-medium leading-5 text-neutral-700 dark:text-white',
                                selected
                                    ? 'bg-white dark:bg-neutral-700 shadow'
                                    : 'text-blue-100 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                            )
                        }
                    >
                        Annual
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                'w-full rounded-lg p-2 text-sm font-medium leading-5 text-neutral-700 dark:text-white',
                                selected
                                    ? 'bg-white dark:bg-neutral-700 shadow'
                                    : 'text-blue-100 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                            )
                        }
                    >
                        Quarter
                    </Tab>
                </Tab.List>
                <Tab.Panels className="w-full py-10">
                    <Tab.Panel className="TabsContent">
                        <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-center ">
                            {/* <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                    <div className='flex flex-col ml-2'>
                        <div className='flex flex-row justify-between items-center'>
                            <h2 className={sora.className}>
                                Price
                            </h2>
                            <button onClick={() => setShowModal(true)} data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="block text-white hover:bg-neutral-800/50 rounded-lg p-2" type="button">
                                <Image
                                    src="/resize.svg"
                                    width={18}
                                    height={18}
                                    alt="resize"
                                />
                            </button>
                        </div>
                        <Line options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top' as const,
                                },
                            },
                        }} data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                            datasets: [
                                {
                                    label: 'FCF',
                                    data: [1, 2, 3, 4, 5, 6],
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                },
                                {
                                    label: 'SBC',
                                    data: [6, 5, 4, 3, 2, 1],
                                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                },
                            ],
                        }} />
                    </div>
                </div> */}

                            <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 key={stock.data.companyName + ' Revenue, Gross Profit, Net Income'}>
                                            Revenue
                                        </h2>

                                    </div>
                                    <Bar options={options} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        ))
                                        ,
                                        datasets: [{
                                            label: 'Revenue',
                                            data: stock.data.fundamentalsAnno.map((doc: any) => (doc.revenue
                                            )),
                                            backgroundColor: '#DAF7A6',
                                        }, {
                                            label: 'Gross Profit',
                                            data: stock.data.fundamentalsAnno.map((doc: any) => (doc.grossProfit
                                            )),
                                            backgroundColor: '#D35400',
                                        },
                                        {
                                            label: 'Net Income',
                                            data: stock.data.fundamentalsAnno.map((doc: any) => (doc.netIncome
                                            )),
                                            backgroundColor: '#9bd0f5',
                                        },],
                                    }} />
                                </div>
                            </div>


                            <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 key={stock.data.companyName + ' Revenue Segments'}>
                                            Revenue Segments
                                        </h2>
                                        {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                    </div>
                                    <Bar options={options} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        )),
                                        datasets: stock.data.fundamentalsAnno[0].revenueSegments.products.map((product: any, index: number) => ({
                                            label: product,
                                            data: stock.data.fundamentalsAnno.map((doc: any) => doc.revenueSegments.productsSold[index]),
                                            backgroundColor: randomColor(),
                                            stack: 'stack',
                                        })),
                                    }} />
                                </div>
                            </div>


                            {stock.id === "tsla" && <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 key={stock.data.companyName + ' Units Sold'}>
                                            Units Sold
                                        </h2>
                                        {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                    </div>
                                    <Bar options={{
                                        responsive: true,
                                        scales: {
                                            x: {
                                                stacked: true,
                                            },
                                            y: {
                                                stacked: true,
                                                beginAtZero: true,
                                            },
                                        },
                                    }} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        )),
                                        datasets: stock.data.fundamentalsAnno[0].productsUnitsSold.products.map((product: any, index: number) => ({
                                            label: product,
                                            data: stock.data.fundamentalsAnno.map((doc: any) => doc.productsUnitsSold.productsSold[index]),
                                            backgroundColor: randomColor(),
                                            stack: 'stack',
                                        })),
                                    }} />
                                </div>
                            </div>}

                            <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 key={stock.data.companyName + ' Cashflow and Stock Based Compensation'}>
                                            Cashflow & Stock Based Comp
                                        </h2>
                                        {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                    </div>

                                    <Bar options={options} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        )),
                                        datasets: [
                                            {
                                                label: 'Free Cashflow',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => ((doc.cashflow)
                                                )),
                                                backgroundColor: '#2ECC71',
                                            },
                                            {
                                                label: 'Stock Based Comp',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.stockBasedCompensation
                                                )),
                                                backgroundColor: '#a71873'
                                            }
                                        ],
                                    }} />
                                </div>
                            </div>

                            <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 key={stock.data.companyName + ' Stock buybacks'}>
                                            Stock buybacks
                                        </h2>
                                        {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                    </div>

                                    <Bar options={options} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        )),
                                        datasets: [
                                            {
                                                label: 'Stock buybacks',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => ((doc.stockRepurchase)
                                                )),
                                                backgroundColor: '#FF5733',
                                            },
                                        ],
                                    }} />
                                </div>
                            </div>

                            <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 key={stock.data.companyName + ' EBITDA'}>
                                            EBITDA
                                        </h2>
                                        {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                    </div>
                                    <Bar options={options} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        )),
                                        datasets: [
                                            {
                                                label: 'EBITDA',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.ebitda
                                                )),
                                                backgroundColor: '#2980B9',
                                            },
                                        ],
                                    }} />
                                </div>
                            </div>

                            <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 key={stock.data.companyName + ' Gross Margin, Net Margin, Operating Margin'}>
                                            Margin Ratios
                                        </h2>
                                        {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                    </div>
                                    <Bar options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top' as const,
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function (context: any) {
                                                        var label = context.dataset.label || '';
                                                        var value: number = context.parsed.y
                                                        if (label) {
                                                            label += ': ';
                                                        }
                                                        if (value !== null) {
                                                            label += value.toFixed(2) + '%';
                                                        }
                                                        return label;
                                                    }
                                                }
                                            }
                                        },
                                        scales: {
                                            y: {
                                                stacked: false,
                                                ticks: {
                                                    callback: (value: any) => {
                                                        if (value !== null) {
                                                            return value.toFixed(2) + '%';
                                                        }
                                                    }
                                                }
                                            },

                                        },
                                    }} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        )),
                                        datasets: [
                                            {
                                                label: 'Gross Margin',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.grossMargin
                                                )),
                                                backgroundColor: '#0099cc',
                                            },
                                            {
                                                label: 'Net Margin',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.netMargin
                                                )),
                                                backgroundColor: '#ae1955',
                                            },
                                            {
                                                label: 'Operating Margin',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.operatingMargin
                                                )),
                                                backgroundColor: '#00cc00',
                                            },
                                        ],
                                    }} />
                                </div>
                            </div>

                            <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 key={stock.data.companyName + ' Return on Assets, Return on Capital Employed, Return on Equity'}>
                                            Other Ratios
                                        </h2>
                                        {/* <button>

                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                    </div>
                                    <Bar options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top' as const,
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function (context: any) {
                                                        var label = context.dataset.label || '';
                                                        var value: number = context.parsed.y
                                                        if (label) {
                                                            label += ': ';
                                                        }
                                                        if (value !== null) {
                                                            label += value.toFixed(2) + '%';
                                                        }
                                                        return label;
                                                    }
                                                }
                                            }
                                        },
                                        scales: {
                                            y: {
                                                stacked: false,
                                                ticks: {
                                                    callback: (value: any) => {
                                                        if (value !== null) {
                                                            return value.toFixed(2) + '%';
                                                        }
                                                    }
                                                }
                                            },
                                        },
                                    }} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        )),
                                        datasets: [
                                            {
                                                label: 'Return on Assets',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.returnOnAssets
                                                )),
                                                backgroundColor: '#0099cc',
                                            },
                                            {
                                                label: 'Return on Capital Employed',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.returnOnCapitalEmployed
                                                )),
                                                backgroundColor: '#ae1955',
                                            },
                                            {
                                                label: 'Return on Equity',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.returnOnEquity
                                                )),
                                                backgroundColor: '#00647d',
                                            }
                                        ],
                                    }} />
                                </div>
                            </div>

                            <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2>
                                            EPS
                                        </h2>
                                        {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                    </div>

                                    <Bar options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top' as const,
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function (context: any) {
                                                        var label = context.dataset.label || '';
                                                        var value: number = context.parsed.y
                                                        if (label) {
                                                            label += ': ';
                                                        }
                                                        if (value !== null) {
                                                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                                                        }
                                                        return label;
                                                    }
                                                }
                                            }
                                        },
                                        scales: {
                                            x: {
                                                stacked: true,
                                            },
                                            y: {
                                                stacked: true,
                                                ticks: {
                                                    callback: (value: any) => {
                                                        if (value !== null) {
                                                            value = value
                                                            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                                                        }
                                                    }
                                                }
                                            },
                                        },
                                    }} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        )),
                                        datasets: [
                                            {
                                                label: 'EPS',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.eps
                                                )),
                                                backgroundColor: '#00ccff',
                                            },
                                        ],
                                    }} />
                                </div>
                            </div>


                            <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 key={stock.data.companyName + ' Expenses, Capes, R&D'}>
                                            Expenses
                                        </h2>
                                        {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                    </div>
                                    <Bar options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top' as const,
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function (context: any) {
                                                        var label = context.dataset.label || '';
                                                        var value: number = context.parsed.y / 1000000000
                                                        if (label) {
                                                            label += ': ';
                                                        }
                                                        if (value !== null) {
                                                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) + 'B';
                                                        }
                                                        return label;
                                                    }
                                                }
                                            }
                                        },
                                        scales: {
                                            x: {
                                                stacked: true,
                                            },
                                            y: {
                                                stacked: true,
                                                ticks: {
                                                    callback: (value: any) => {
                                                        if (value !== null) {
                                                            value = value / 1000000000
                                                            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) + 'B';
                                                        }
                                                    }
                                                }
                                            },
                                        },
                                    }} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        )),
                                        datasets: [
                                            {
                                                label: 'R&D',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.researchAndDev
                                                )),
                                                backgroundColor: '#8E44AD',
                                            },
                                            {
                                                label: 'Capex',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.capEx
                                                )),
                                                backgroundColor: '#2471A3',
                                            }
                                        ],
                                    }} />
                                </div>
                            </div>

                            <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 key={stock.data.companyName + ' Balance Sheet'}>
                                            Balance
                                        </h2>
                                        {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                    </div>
                                    <Bar options={options} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        )),
                                        datasets: [
                                            {
                                                label: 'Cash & Cash Equivalents',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.cash
                                                )),
                                                backgroundColor: '#16A085',
                                            },
                                            {
                                                label: 'Current Debt',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.debt
                                                )),
                                                backgroundColor: '#cc0000',
                                            },
                                        ],
                                    }} />
                                </div>
                            </div>

                            <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 key={stock.data.companyName + ' Shares Outstanding'}>
                                            Shares Outstanding
                                        </h2>
                                        {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                    </div>

                                    <Bar options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top' as const,
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function (context: any) {
                                                        var label = context.dataset.label || '';
                                                        var value: number = context.parsed.y / 1000000000
                                                        if (label) {
                                                            label += ': ';
                                                        }
                                                        if (value !== null) {
                                                            label += new Intl.NumberFormat('en-US').format(value) + 'B';
                                                        }
                                                        return label;
                                                    }
                                                }
                                            }
                                        },
                                        scales: {
                                            y: {
                                                ticks: {
                                                    callback: (value: any) => {
                                                        if (value !== null) {
                                                            value = value / 1000000000
                                                            return new Intl.NumberFormat('en-US').format(value) + 'B';
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        )),
                                        datasets: [
                                            {
                                                label: 'Shares Outstanding',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.sharesOutstanding
                                                )),
                                                backgroundColor: '#95A5A6',
                                            },
                                        ],
                                    }} />
                                </div>
                            </div>

                            <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 key={stock.data.companyName + ' Employee Count'}>
                                            Employees
                                        </h2>
                                        {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                    </div>

                                    <Bar options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top' as const,
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function (context: any) {
                                                        var label = context.dataset.label || '';
                                                        var value: number = context.parsed.y
                                                        if (label) {
                                                            label += ': ';
                                                        }
                                                        if (value !== null) {
                                                            label += value;
                                                        }
                                                        return label;
                                                    }
                                                }
                                            }
                                        },
                                        scales: {
                                            x: {
                                                stacked: true,
                                            },
                                            y: {
                                                stacked: true,
                                                ticks: {
                                                    callback: (value: any) => {
                                                        if (value !== null) {
                                                            return value;
                                                        }
                                                    }
                                                }
                                            },
                                        },
                                    }} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        )),
                                        datasets: [
                                            {
                                                label: 'Full-Time Employees',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.employees
                                                )),
                                                backgroundColor: '#3366ff',
                                            },
                                        ],
                                    }} />
                                </div>
                            </div>

                            <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                <div className='flex flex-col ml-2'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <h2 key={stock.data.companyName + ' Dividend'}>
                                            Dividend
                                        </h2>
                                        {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                    </div>

                                    <Bar options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top' as const,
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function (context: any) {
                                                        var label = context.dataset.label || '';
                                                        var value: number = context.parsed.y
                                                        if (label) {
                                                            label += ': ';
                                                        }
                                                        if (value !== null) {
                                                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                                                        }
                                                        return label;
                                                    }
                                                }
                                            }
                                        },
                                        scales: {
                                            x: {
                                                stacked: true,
                                            },
                                            y: {
                                                stacked: true,
                                                ticks: {
                                                    callback: (value: any) => {
                                                        if (value !== null) {
                                                            value = value
                                                            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                                                        }
                                                    }
                                                }
                                            },
                                        },
                                    }} data={{
                                        labels: stock.data.fundamentalsAnno.map((doc: any) => (doc.fiscalYear
                                        )),
                                        datasets: [
                                            {
                                                label: 'Dividend',
                                                data: stock.data.fundamentalsAnno.map((doc: any) => (doc.dividendPerShare
                                                )),
                                                backgroundColor: '#566573',
                                            },
                                        ],
                                    }} />
                                </div>
                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className="TabsContent">
                        {(sub === 'active') || (sub === 'trialing') ?
                            <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-center">

                                <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2 key={stock.data.companyName + ' Revenue, Gross Profit, Net Income'}>
                                                Revenue
                                            </h2>
                                            {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                        </div>
                                        <Bar options={options} data={{
                                            labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                            ))
                                            ,
                                            datasets: [{
                                                label: 'Revenue',
                                                data: stock.data.fundamentals.map((doc: any) => (doc.revenue
                                                )),
                                                backgroundColor: '#DAF7A6',
                                            }, {
                                                label: 'Gross Profit',
                                                data: stock.data.fundamentals.map((doc: any) => (doc.grossProfit
                                                )),
                                                backgroundColor: '#D35400',
                                            },
                                            {
                                                label: 'Net Income',
                                                data: stock.data.fundamentals.map((doc: any) => (doc.netIncome
                                                )),
                                                backgroundColor: '#9bd0f5',
                                            },],
                                        }} />
                                    </div>
                                </div>

                                <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2 key={stock.data.companyName + ' Units Sold'}>
                                                Units Sold
                                            </h2>
                                            {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                        </div>
                                        <Bar options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top' as const,
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                        label: function (context: any) {
                                                            var label = context.dataset.label || '';
                                                            var value: number = context.parsed.y
                                                            if (label) {
                                                                label += ': ';
                                                            }
                                                            if (value !== null) {
                                                                label += value;
                                                            }
                                                            return label;
                                                        }
                                                    }
                                                }
                                            },
                                            scales: {
                                                x: {
                                                    stacked: true,
                                                },
                                                y: {
                                                    stacked: true,
                                                    ticks: {
                                                        callback: (value: any) => {
                                                            if (value !== null) {
                                                                return value;
                                                            }
                                                        }
                                                    }
                                                },
                                            },
                                        }} data={{
                                            labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                            )),
                                            datasets: [
                                                {
                                                    label: stock.data.fundamentals[0].revenueSegments.products[0],
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.revenueSegments.productsSold[0]
                                                    )),
                                                    backgroundColor: '#cc3300'
                                                },
                                                {
                                                    label: stock.data.fundamentals[0].revenueSegments.products[1],
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.revenueSegments.productsSold[1]
                                                    )),
                                                    backgroundColor: '#2ECC71'
                                                }
                                            ],
                                        }} />
                                    </div>
                                </div>


                                <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2 key={stock.data.companyName + ' Cashflow and Stock Based Compensation'}>
                                                Cashflow & Stock Based Comp
                                            </h2>
                                            {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                        </div>

                                        <Bar options={options} data={{
                                            labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                            )),
                                            datasets: [
                                                {
                                                    label: 'FCF',
                                                    data: stock.data.fundamentals.map((doc: any) => ((doc.cashflow - doc.capEx)
                                                    )),
                                                    backgroundColor: '#2ECC71',
                                                },
                                                {
                                                    label: 'SBC',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.stockBasedCompensation
                                                    )),
                                                    backgroundColor: '#a71873'
                                                }
                                            ],
                                        }} />
                                    </div>
                                </div>



                                <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2 key={stock.data.companyName + ' EBITDA'}>
                                                EBITDA
                                            </h2>
                                            {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                        </div>
                                        <Bar options={options} data={{
                                            labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                            )),
                                            datasets: [
                                                {
                                                    label: 'EBITDA',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.ebitda
                                                    )),
                                                    backgroundColor: '#2980B9',
                                                },
                                            ],
                                        }} />
                                    </div>
                                </div>


                                <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2 key={stock.data.companyName + ' Return on Assets, Return on Capital Employed, Return on Equity, Return on Capital Invested'}>
                                                Margin Ratios
                                            </h2>
                                            {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                        </div>

                                        <Bar options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top' as const,
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                        label: function (context: any) {
                                                            var label = context.dataset.label || '';
                                                            var value: number = context.parsed.y
                                                            if (label) {
                                                                label += ': ';
                                                            }
                                                            if (value !== null) {
                                                                label += value + '%';
                                                            }
                                                            return label;
                                                        }
                                                    }
                                                }
                                            },
                                            scales: {
                                                y: {
                                                    stacked: false,
                                                    ticks: {
                                                        callback: (value: any) => {
                                                            if (value !== null) {
                                                                return value + '%';
                                                            }
                                                        }
                                                    }

                                                },
                                            },
                                        }} data={{
                                            labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                            )),
                                            datasets: [
                                                {
                                                    label: 'Return on Assets',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.returnOnCapitalEmployed
                                                    )),
                                                    backgroundColor: '#0099cc',
                                                },
                                                {
                                                    label: 'Return on Capital Employed',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.returnOnCapitalEmployed
                                                    )),
                                                    backgroundColor: '#ae1955',
                                                },
                                                {
                                                    label: 'Return on Equity',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.returnOnInvestedCapital
                                                    )),
                                                    backgroundColor: '#00647d',
                                                },
                                                {
                                                    label: 'Return on Capital Invested',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.returnOnInvestedCapital
                                                    )),
                                                    backgroundColor: '#00cc00',
                                                },
                                            ],
                                        }} />
                                    </div>
                                </div>

                                <div className='p-5 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2 justify-center items-center'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2 key={stock.data.companyName + ' Return on Assets'}>
                                                Other Ratios
                                            </h2>
                                        </div>
                                        <Bar options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top' as const,
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                        label: function (context: any) {
                                                            var label = context.dataset.label || '';
                                                            var value: number = context.parsed.y
                                                            if (label) {
                                                                label += ': ';
                                                            }
                                                            if (value !== null) {
                                                                label += value + '%';
                                                            }
                                                            return label;
                                                        }
                                                    }
                                                }
                                            },
                                            scales: {
                                                y: {
                                                    stacked: false,
                                                    ticks: {
                                                        callback: (value: any) => {
                                                            if (value !== null) {
                                                                return value + '%';
                                                            }
                                                        }
                                                    }
                                                },
                                            },
                                        }} data={{
                                            labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                            )),
                                            datasets: [
                                                {
                                                    label: 'Return on Assets',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.returnOnAssets
                                                    )),
                                                    backgroundColor: '#0099cc',
                                                },
                                                {
                                                    label: 'Return on Capital Employed',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.returnOnCapitalEmployed
                                                    )),
                                                    backgroundColor: '#ae1955',
                                                },
                                                {
                                                    label: 'Return on Equity',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.returnOnEquity
                                                    )),
                                                    backgroundColor: '#00647d',
                                                }
                                            ],
                                        }} />

                                    </div>
                                </div>
                                <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2 key={stock.data.companyName + ' EPS, Earnings per Share'}>
                                                EPS
                                            </h2>
                                            {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                        </div>

                                        <Bar options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top' as const,
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                        label: function (context: any) {
                                                            var label = context.dataset.label || '';
                                                            var value: number = context.parsed.y
                                                            if (label) {
                                                                label += ': ';
                                                            }
                                                            if (value !== null) {
                                                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                                                            }
                                                            return label;
                                                        }
                                                    }
                                                }
                                            },
                                            scales: {
                                                x: {
                                                    stacked: true,
                                                },
                                                y: {
                                                    stacked: true,
                                                    ticks: {
                                                        callback: (value: any) => {
                                                            if (value !== null) {
                                                                value = value
                                                                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                        }} data={{
                                            labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                            )),
                                            datasets: [
                                                {
                                                    label: 'EPS',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.eps
                                                    )),
                                                    backgroundColor: '#00ccff',
                                                },
                                            ],
                                        }} />
                                    </div>
                                </div>


                                <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2 key={stock.data.companyName + ' Expenses, Capex, R&D'}>
                                                Expenses
                                            </h2>
                                            {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                        </div>
                                        <Bar options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top' as const,
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                        label: function (context: any) {
                                                            var label = context.dataset.label || '';
                                                            var value: number = context.parsed.y / 1000000000
                                                            if (label) {
                                                                label += ': ';
                                                            }
                                                            if (value !== null) {
                                                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) + 'B';
                                                            }
                                                            return label;
                                                        }
                                                    }
                                                }
                                            },
                                            scales: {
                                                x: {
                                                    stacked: true,
                                                },
                                                y: {
                                                    stacked: true,
                                                    ticks: {
                                                        callback: (value: any) => {
                                                            if (value !== null) {
                                                                value = value / 1000000000
                                                                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) + 'B';
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                        }} data={{
                                            labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                            )),
                                            datasets: [
                                                {
                                                    label: 'R&D',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.researchAndDev
                                                    )),
                                                    backgroundColor: '#8E44AD',
                                                },
                                                {
                                                    label: 'Capex',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.capEx
                                                    )),
                                                    backgroundColor: '#2471A3',
                                                }
                                            ],
                                        }} />

                                    </div>

                                    <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                        <div className='flex flex-col ml-2'>
                                            <div className='flex flex-row justify-between items-center'>
                                                <h2 key={stock.data.companyName + ' Balance Sheet'}>
                                                    Balance
                                                </h2>
                                                {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                            </div>
                                            <Bar options={options} data={{
                                                labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                                )),
                                                datasets: [
                                                    {
                                                        label: 'Cash',
                                                        data: stock.data.fundamentals.map((doc: any) => (doc.cash
                                                        )),
                                                        backgroundColor: '#16A085',
                                                    },
                                                    {
                                                        label: 'Debt',
                                                        data: stock.data.fundamentals.map((doc: any) => (doc.debt
                                                        )),
                                                        backgroundColor: '#cc0000',
                                                    },
                                                ],
                                            }} />
                                        </div>
                                        <Bar options={options} data={{
                                            labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                            )),
                                            datasets: [
                                                {
                                                    label: 'Cash & Cash Equivalents',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.cash
                                                    )),
                                                    backgroundColor: '#16A085',
                                                },
                                                {
                                                    label: 'Current Debt',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.debt
                                                    )),
                                                    backgroundColor: '#cc0000',
                                                },
                                            ],
                                        }} />

                                    </div>

                                    <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                        <div className='flex flex-col ml-2'>
                                            <div className='flex flex-row justify-between items-center'>
                                                <h2 key={stock.data.companyName + ' Dividend'}>
                                                    Dividend
                                                </h2>
                                                {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                            </div>

                                            <Bar options={{
                                                responsive: true,
                                                plugins: {
                                                    legend: {
                                                        position: 'top' as const,
                                                    },
                                                    tooltip: {
                                                        callbacks: {
                                                            label: function (context: any) {
                                                                var label = context.dataset.label || '';
                                                                var value: number = context.parsed.y
                                                                if (label) {
                                                                    label += ': ';
                                                                }
                                                                if (value !== null) {
                                                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                                                                }
                                                                return label;
                                                            }
                                                        }
                                                    }
                                                },
                                                scales: {
                                                    x: {
                                                        stacked: true,
                                                    },
                                                    y: {
                                                        stacked: true,
                                                        ticks: {
                                                            callback: (value: any) => {
                                                                if (value !== null) {
                                                                    value = value
                                                                    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                                                                }
                                                            }
                                                        }

                                                    }
                                                },
                                            }} data={{
                                                labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                                )),
                                                datasets: [
                                                    {
                                                        label: 'Dividend',
                                                        data: stock.data.fundamentals.map((doc: any) => (doc.dividendPerShare
                                                        )),
                                                        backgroundColor: '#566573',
                                                    },
                                                ],
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :

                            <div className="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-center">
                                <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2>
                                                Revenue
                                            </h2>
                                            {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                        </div>
                                        <Bar options={options} data={{
                                            labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                            ))
                                            ,
                                            datasets: [{
                                                label: 'Revenue',
                                                data: stock.data.fundamentals.map((doc: any) => (doc.revenue
                                                )),
                                                backgroundColor: '#DAF7A6',
                                            }, {
                                                label: 'Gross Profit',
                                                data: stock.data.fundamentals.map((doc: any) => (doc.grossProfit
                                                )),
                                                backgroundColor: '#D35400',
                                            },
                                            {
                                                label: 'Net Income',
                                                data: stock.data.fundamentals.map((doc: any) => (doc.netIncome
                                                )),
                                                backgroundColor: '#9bd0f5',
                                            },],
                                        }} />

                                    </div>
                                </div>

                                <div className='p-5 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2 justify-center items-center text-center'>
                                        <h2>
                                            Revenue Segments
                                        </h2>
                                        <a href="/pricing" className='font-semibold py-2 px-4 rounded-lg dark:bg-neutral-900 border-[1px] border-neutral-700 hover:bg-neutral-300'>14-Day free trial</a>
                                    </div>
                                </div>

                                <div className='p-5 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2 justify-center items-center'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2>
                                                Cashflow & Stock Based Comp
                                            </h2>
                                        </div>
                                        <div className='flex items-center'>
                                            <a href="/pricing" className='font-semibold py-2 px-4 rounded-lg dark:bg-neutral-900 border-[1px] border-neutral-700 hover:bg-neutral-300'>14-Day free trial</a>
                                        </div>
                                    </div>
                                </div>




                                <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2>
                                                EBITDA
                                            </h2>
                                            {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                        </div>
                                        <Bar options={options} data={{
                                            labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                            )),
                                            datasets: [
                                                {
                                                    label: 'EBITDA',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.ebitda
                                                    )),
                                                    backgroundColor: '#2980B9',
                                                },
                                            ],
                                        }} />

                                    </div>
                                </div>

                                <div className='p-5 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2 justify-center items-center'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2>
                                                Margin Ratios
                                            </h2>
                                        </div>
                                        <div className='flex items-center'>
                                            <a href="/pricing" className='font-semibold py-2 px-4 rounded-lg dark:bg-neutral-900 border-[1px] border-neutral-700 hover:bg-neutral-300'>14-Day free trial</a>
                                        </div>
                                    </div>
                                </div>

                                <div className='p-5 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2 justify-center items-center'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2 >
                                                Other Ratios
                                            </h2>
                                        </div>
                                        <div className='flex items-center'>
                                            <a href="/pricing" className='font-semibold py-2 px-4 rounded-lg dark:bg-neutral-900 border-[1px] border-neutral-700 hover:bg-neutral-300'>14-Day free trial</a>
                                        </div>
                                    </div>
                                </div>

                                <div className='p-5 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2 justify-center items-center'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2 >
                                                EPS
                                            </h2>
                                        </div>
                                        <div className='flex items-center'>
                                            <a href="/pricing" className='font-semibold py-2 px-4 rounded-lg dark:bg-neutral-900 border-[1px] border-neutral-700 hover:bg-neutral-300'>14-Day free trial</a>
                                        </div>
                                    </div>
                                </div>

                                <div className='p-5 border dark:border-black dark:bg-neutral-900/40 rounded-lg h-full'>
                                    <div className='flex flex-col ml-2 justify-center items-center'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2 >
                                                Expenses
                                            </h2>

                                        </div>
                                        <div className='flex items-center'>
                                            <a href="/pricing" className='font-semibold py-2 px-4 rounded-lg dark:bg-neutral-900 border-[1px] border-neutral-700 hover:bg-neutral-300'>14-Day free trial</a>
                                        </div>
                                    </div>
                                </div>


                                <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2 >
                                                Balance
                                            </h2>
                                            {/* <button>
                                    <Image
                                        src="/resize.svg"
                                        width={18}
                                        height={18}
                                        alt="resize"
                                    />
                                </button> */}
                                        </div>
                                        <Bar options={options} data={{
                                            labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                            )),
                                            datasets: [
                                                {
                                                    label: 'Cash & Cash Equivalents',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.cash
                                                    )),
                                                    backgroundColor: '#16A085',
                                                },
                                                {
                                                    label: 'Current Debt',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.debt
                                                    )),
                                                    backgroundColor: '#cc0000',
                                                },
                                            ],
                                        }} />

                                    </div>
                                </div>

                                <div className='p-2 border dark:border-black dark:bg-neutral-900/40 rounded-lg'>
                                    <div className='flex flex-col ml-2'>
                                        <div className='flex flex-row justify-between items-center'>
                                            <h2>
                                                Dividend
                                            </h2>
                                            {/* <button>
																	<Image
																			src="/resize.svg"
																			width={18}
																			height={18}
																			alt="resize"
																	/>
															</button> */}
                                        </div>


                                        <Bar options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top' as const,
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                        label: function (context: any) {
                                                            var label = context.dataset.label || '';
                                                            var value: number = context.parsed.y
                                                            if (label) {
                                                                label += ': ';
                                                            }
                                                            if (value !== null) {
                                                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                                                            }
                                                            return label;
                                                        }
                                                    }
                                                }
                                            },
                                            scales: {
                                                x: {
                                                    stacked: true,
                                                },
                                                y: {
                                                    stacked: true,
                                                    ticks: {
                                                        callback: (value: any) => {
                                                            if (value !== null) {
                                                                value = value
                                                                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
                                                            }
                                                        }
                                                    }

                                                }
                                            },
                                        }} data={{
                                            labels: stock.data.fundamentals.map((doc: any) => ('Q' + doc.fiscalQuarter + ' ' + doc.fiscalYear
                                            )),
                                            datasets: [
                                                {
                                                    label: 'Dividend',
                                                    data: stock.data.fundamentals.map((doc: any) => (doc.dividentPerShare
                                                    )),
                                                    backgroundColor: '#566573',
                                                },
                                            ],
                                        }} />
                                    </div>
                                </div>
                            </div>
                        }
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            <div className='flex flex-col text-center max-w-xl text-sm'>
                <p className='text-neutral-500'>If you found an error or have feedback, please reach out via the 'Feedback' button above.</p>
                <p className='text-neutral-600'>All data and information is provided “as is” for informational purposes only, Deepvalues' data is not intended for any purposes besides information, like accounting, investment, financial, legal or similar. All information is from the Companies SEC Filings or official Press-Releases, however, because of human error the data could not be 100% accurate.</p>
            </div>
        </main>
    </>)


}
