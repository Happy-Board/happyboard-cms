'use client'

import { useRouter } from 'next/navigation';

function Home() {
    const route = useRouter();
    route.push('/dashboard');
}

export default Home;