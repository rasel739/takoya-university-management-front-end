import React from 'react';

const Title = ({ title }: { title: string }) => {
  return (
    <div>
      <div className=' text-center '>
        <h2 className='text-2xl after:border-b-4 after:border-amber-300 after:w-20 after:block after:mx-auto after:mt-2 mb-10 after:rounded'>
          {title}
        </h2>
      </div>
    </div>
  );
};

export default Title;
