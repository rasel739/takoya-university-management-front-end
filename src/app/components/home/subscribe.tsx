'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from './footer';

export const Subscribe = () => {
  return (
    <section className='bg-[#36384E] text-white py-12 px-4'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}
        className='container mx-auto'
      >
        <div className='text-center mb-8'>
          <h2 className='text-2xl md:text-3xl font-bold text-center mb-8'>
            Subscribe to our Newsletter
          </h2>
          <p className='text-gray-200'>
            <span className='block'>
              Get expert advice for your journey to university delivered to your inbox each
            </span>
            <span className='block mt-1'>month. It’s short, and worthwhile – we promise!</span>
          </p>
        </div>
        <form className='flex flex-col items-center'>
          <input
            type='email'
            placeholder='Enter your email'
            className='border border-gray-300 rounded-md p-2 mb-4 w-full max-w-md'
          />
          <div className='mb-4'>
            <input type='checkbox' id='consent' className='mr-2 ' />
            <label htmlFor='consent' className='text-sm'>
              I confirm I am over 16 and I agree to the Terms and Conditions and Privacy Notice.
              <Link href='#' className='text-blue-500 underline ml-2'>
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          <Button
            type='submit'
            className='bg-gray-400 text-white rounded-md px-4 py-2 hover:bg-blue-600'
          >
            Subscribe now
          </Button>
        </form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true }}
        className='flex flex-col justify-end  mt-20 border-t-2 border-gray-400'
      >
        <Footer />
      </motion.div>
    </section>
  );
};
