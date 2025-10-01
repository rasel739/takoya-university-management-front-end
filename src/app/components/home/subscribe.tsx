'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import Footer from './footer';
import Link from 'next/link';

export const Subscribe = () => {
  return (
    <section className='bg-[#36384E] text-white py-16 px-4'>
      {/* Animated container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}
        className='max-w-3xl mx-auto text-center'
      >
        {/* Heading */}
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>Subscribe to our Newsletter</h2>
        <p className='text-gray-300 mb-8'>
          Get expert advice for your journey to university delivered to your inbox each month. It’s
          short, and worthwhile – we promise!
        </p>

        {/* Form */}
        <form className='flex flex-col items-center gap-4'>
          <Input
            type='email'
            placeholder='Enter your email'
            className='w-full max-w-md p-3 text-gray-800'
          />

          <div className='flex items-start gap-2 text-sm max-w-md text-left'>
            <Checkbox id='consent' />
            <label htmlFor='consent' className='text-gray-200'>
              I confirm I am over 16 and agree to the{' '}
              <Link href='#' className='text-blue-400 underline'>
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link href='#' className='text-blue-400 underline'>
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          <Button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md'
          >
            Subscribe now
          </Button>
        </form>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true }}
        className='mt-16 border-t border-gray-600 pt-8'
      >
        <Footer />
      </motion.div>
    </section>
  );
};
