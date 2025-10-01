'use client';

import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { Input } from './input';

type UploadImageProps = {
  name: string;
  maxSizeMB?: number;
  acceptedFormats?: string[];
};

const UploadImage: React.FC<UploadImageProps> = ({
  name,
  maxSizeMB = 2,
  acceptedFormats = ['image/jpeg', 'image/png'],
}) => {
  const { setValue } = useFormContext();
  const [imageUrl, setImageUrl] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!acceptedFormats.includes(file.type)) {
      setError('Only JPG/PNG files are allowed.');
      return;
    }

    // Validate file size
    if (file.size / 1024 / 1024 > maxSizeMB) {
      setError(`File must be smaller than ${maxSizeMB}MB.`);
      return;
    }

    setError(undefined);
    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
      setLoading(false);
      setValue(name, file); // set file in react-hook-form
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageUrl(undefined);
    setValue(name, null);
  };

  return (
    <div className='flex flex-col items-center gap-2'>
      {imageUrl ? (
        <div className='relative w-32 h-32'>
          <Image
            src={imageUrl}
            alt='uploaded image'
            width={128}
            height={128}
            className='rounded-md object-cover w-full h-full'
          />
          <Button
            variant='destructive'
            size='icon'
            className='absolute top-0 right-0 p-1'
            onClick={removeImage}
            aria-label='Remove image'
          >
            <Trash2 className='w-4 h-4' />
          </Button>
        </div>
      ) : (
        <label
          htmlFor={`upload-${name}`}
          className={cn(
            'cursor-pointer border border-dashed border-gray-300 rounded-md w-32 h-32 flex flex-col items-center justify-center',
            loading && 'opacity-50'
          )}
        >
          <Input
            id={`upload-${name}`}
            type='file'
            accept={acceptedFormats.join(',')}
            onChange={handleFileChange}
            className='hidden'
          />
          {loading ? (
            <span>Loading...</span>
          ) : (
            <span className='text-center text-sm text-gray-500'>Click to upload</span>
          )}
        </label>
      )}
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

export default UploadImage;
