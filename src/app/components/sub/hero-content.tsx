import { FlipButton } from '@/components/ui/shadcn-io/flip-button';
import React from 'react';

const HeroContent = () => {
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col justify-center items-center py-5'>
        <p className='text-center w-full md:w-4xl text-slate-900'>
          Explore your options and make informed decisions with our comprehensive guide to
          universities around the world. Discover top-ranked institutions, explore diverse programs,
          and connect with like-minded individuals to build your academic future. With easy-to-use
          search tools, in-depth profiles, and trusted ratings and reviews, we provide everything
          you need to make the right choice for your academic journey. Start your search today and
          find your perfect fit!
        </p>
        <div className='mt-5'>
          <FlipButton frontText='Get Started' backText='Login' frontClassName='bg-green-500' />
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
