'use client';
import Image from 'next/image';
import React from 'react';
import HeroContent from '../sub/hero-content';
import { motion } from 'framer-motion';
import { BackgroundBeamsWithCollision } from '@/components/ui/shadcn-io/background-beams-with-collision';

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <BackgroundBeamsWithCollision className='h-fit mt-5 md:mt-0 md:h-[500px]'>
        <div className='relative w-full h-[500px]'>
          <Image
            src='/img/tu-hero.png'
            alt='takoya-university-hero-bannar'
            fill
            priority
            sizes='(max-width:768px) 100vw,1200px'
            className='object-contain z-20'
          />
          <div className='absolute inset-0 text-center mt-2 ml-4'>
            <h1 className='text-3xl md:text-5xl text-slate-900'>
              Find Your <span className='bg-amber-400 text-white '>Future</span> Today!
            </h1>
            <p className='bg-transparent mt-2  inline-block p-3 text-slate-900 text-2xl'>
              The Ultimate Guide to Universities Worldwide
            </p>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
      <div>
        <HeroContent />
      </div>
    </motion.section>
  );
};

export default Hero;
