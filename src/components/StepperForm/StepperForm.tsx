'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // optional helper for conditional classNames
import { getLocalStorage, setLocalStorage } from '@/utils/local-storage';
import { TuToastify } from '@/lib/reactToastify';

interface ISteps {
  title?: string;
  content?: React.ReactElement | React.ReactNode;
}

interface IStepsProps {
  steps: ISteps[];
  persistKey: string;
  submitHandler: (el: any) => void;
  navigateLink?: string;
}

export default function StepperForm({
  steps,
  submitHandler,
  navigateLink,
  persistKey,
}: IStepsProps) {
  const router = useRouter();

  // read persisted step safely
  const initialStep = useMemo(() => {
    try {
      const raw = getLocalStorage('step');
      if (!raw) return 0;
      const parsed = JSON.parse(raw);
      if (typeof parsed?.step === 'number') return parsed.step;
      if (parsed?.step && !Number.isNaN(Number(parsed.step))) return Number(parsed.step);
      return 0;
    } catch {
      return 0;
    }
  }, []);

  // read persisted form values safely
  const initialValues = useMemo(() => {
    try {
      const raw = getLocalStorage(persistKey);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed ?? {};
    } catch {
      return {};
    }
  }, [persistKey]);

  const [current, setCurrent] = useState<number>(initialStep);
  const methods = useForm({ defaultValues: initialValues });
  const { handleSubmit, reset, watch } = methods;

  // persist current step
  useEffect(() => {
    try {
      setLocalStorage('step', JSON.stringify({ step: current }));
    } catch {
      /* ignore localStorage errors */
    }
  }, [current]);

  // persist form watch values (debounced could be added later)
  useEffect(() => {
    const subscription = watch((values) => {
      try {
        setLocalStorage(persistKey, JSON.stringify(values ?? {}));
      } catch {
        /* ignore */
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, persistKey]);

  const next = () => setCurrent((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrent((s) => Math.max(s - 1, 0));

  const items = steps.map((item) => ({ key: item.title ?? '', title: item.title ?? '' }));

  const handleStudentOnSubmit = (data: any) => {
    // call user's submit handler
    submitHandler(data);

    // success notification
    try {
      TuToastify('Processing complete!', 'success');
    } catch {
      // fallback
      window.alert('Processing complete!');
    }

    // reset form and persisted data
    reset();
    try {
      setLocalStorage('step', JSON.stringify({ step: 0 }));
      setLocalStorage(persistKey, JSON.stringify({}));
    } catch {
      /* ignore */
    }

    // navigate if provided
    if (navigateLink) router.push(navigateLink);
    // reset step UI
    setCurrent(0);
  };

  return (
    <div className='w-full'>
      {/* Simple horizontal stepper */}
      <nav aria-label='Progress' className='mb-6'>
        <ol className='flex items-center gap-4'>
          {items.map((it, idx) => {
            const isActive = idx === current;
            const isDone = idx < current;
            return (
              <li key={String(it.key ?? idx)} className='flex items-center'>
                <div
                  className={cn(
                    'flex items-center justify-center rounded-full w-8 h-8 text-sm font-medium ring-1 ring-inset',
                    isDone
                      ? 'bg-primary text-white ring-primary'
                      : isActive
                      ? 'bg-primary/10 text-primary ring-primary/40'
                      : 'bg-transparent text-muted-foreground'
                  )}
                >
                  {isDone ? '✓' : idx + 1}
                </div>

                <div className='ml-3 hidden sm:block'>
                  <div
                    className={cn(
                      'text-sm',
                      isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {it.title}
                  </div>
                </div>

                {idx < items.length - 1 && (
                  <div className='w-6 h-px bg-border mx-4 hidden sm:block' />
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleStudentOnSubmit)} className='space-y-4'>
          <div>{steps[current]?.content}</div>

          <div className='flex items-center gap-2 mt-4'>
            {current > 0 && (
              <Button variant='ghost' onClick={prev}>
                Previous
              </Button>
            )}

            {current < steps.length - 1 && (
              <Button onClick={next} type='button'>
                Next
              </Button>
            )}

            {current === steps.length - 1 && <Button type='submit'>Done</Button>}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
