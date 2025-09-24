import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/lib/icons';
import Image from 'next/image';

interface CardPros {
  title: string;
  content: string;
  icon?: React.ReactNode | React.ReactElement;
}

const CourseCard = ({ cardData }: { cardData: CardPros }) => {
  return (
    <div className='w-full p-6 flex justify-center'>
      <Card className='w-full max-w-sm flex justify-around '>
        <div className='mt-5 ml-4'>
          <Image
            src={`/img/icons/${cardData.icon}`}
            alt={String(cardData.icon)}
            width={75}
            height={75}
          />
        </div>
        <div>
          <CardHeader>
            <CardTitle>{cardData.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{cardData.content}</p>
          </CardContent>
          <CardFooter>
            <Button className='bg-transparent text-amber-500 hover:bg-amber-300 hover:text-amber-600'>
              GET STARTED <Icons.ArrowRight />
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default CourseCard;
