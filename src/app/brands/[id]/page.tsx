import BrandDetailsCard from '@/app/_components/BrandDetailsCard/BrandDetailsCard';
import Image from 'next/image';

export default async function BrandDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return (
        <>
        <BrandDetailsCard id={id} />
        </>
    );
}

