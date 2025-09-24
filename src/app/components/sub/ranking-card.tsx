import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Icons } from '@/lib/icons';
import Image from 'next/image';
import React from 'react';

interface RankingCardProps {
  id?: string;
  title?: string;
  image?: string;
  btnTitle: string;
}

const RankingCard = ({ rankingData }: { rankingData: RankingCardProps }) => {
  return (
    <div>
      <Card className='border-0 shadow-none'>
        <CardContent>
          <Image
            src={`/img/card/${rankingData.image}`}
            alt={`ranking-card-${rankingData.id}`}
            width={400}
            height={300}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </CardContent>
        <CardFooter className='flex flex-col items-start justify-start'>
          <CardTitle>{rankingData.title}</CardTitle>
          <Button className='bg-transparent  text-amber-500 hover:bg-transparent hover:text-amber-600 justify-start  px-0 '>
            <span className='flex items-center gap-2'>
              {rankingData.btnTitle} <Icons.ArrowRight />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RankingCard;
