import React from 'react';

interface QuoteProps {
  quote: string;
  author: string;
}

const Quote: React.FC<QuoteProps> = ({ quote, author }) => {
  return (
    <div className='bg-gray-100 p-6 rounded-lg shadow-md mr-12 text-[#792990] flex flex-col items-center'>
      <h3 className='text-xl font-bold text-[#792990] mb-4'>
        Quote of the day
      </h3>
      <div className='relative text-center'>
        <span className='text-3xl leading-none text-[#792990] absolute -left-0 -top-0'>
          “
        </span>
        <p className='text-xl font-medium italic text-[#792990] px-8'>
          “ {quote}
        </p>
        <span className='text-3xl leading-none text-[#792990] absolute -right-8 -bottom-4'>
          ”
        </span>
        <p className='text-xs font-medium italic text-[#792990] px-8'>
          “ {author}
        </p>
      </div>
    </div>
  );
};

export default Quote;
