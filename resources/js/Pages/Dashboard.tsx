import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div className="p-6 text-gray-900">You're logged in!</div> */}
                        <div className='p-5 grid grid-cols-2 items-center text-center'>
                            <Link className='bg-indigo-400 p-4 m-2 rounded-lg text-white font-bold text-xl' href='/trade-types'>Trade type</Link>
                            <Link className='bg-indigo-400 p-4 m-2 rounded-lg text-white font-bold text-xl' href='/trades'>Trades</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
