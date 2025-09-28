'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from './button';
import { daysOptions } from '@/constants/global';
import FormSelectField from '../forms/FormSelectField';
import FormTimePicker from '../forms/FormTimePicker';
import CoreFacultyField from '../forms/CoreFacultyField';
import BuildingField from '../forms/BuildingField';
import RoomField from '../forms/RoomField';

const FormDynamicFields = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'classSchedules',
  });

  return (
    <>
      <div>
        {fields.length > 0 ? (
          fields.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  marginBottom: '5px',
                  padding: '20px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                }}
              >
                <div className='grid grid-cols-12 gap-4'>
                  <div className='col-span-12 md:col-span-4'>
                    <FormSelectField
                      options={daysOptions}
                      name={`classSchedules.${index}.dayOfWeek`}
                      label='Day of week'
                    />
                  </div>
                  <div className='col-span-12 md:col-span-4'>
                    <div>
                      <FormTimePicker
                        name={`classSchedules.${index}.startTime`}
                        label='Start time'
                      />
                    </div>
                  </div>
                  <div className='col-span-12 md:col-span-4'>
                    <div>
                      <FormTimePicker name={`classSchedules.${index}.endTime`} label='End time' />
                    </div>
                  </div>
                  <div className='col-span-12 md:col-span-4'>
                    <BuildingField />
                  </div>
                  <div className='col-span-12 md:col-span-4'>
                    <RoomField name={`classSchedules.${index}.roomId`} />
                  </div>
                  <div className='col-span-12 md:col-span-4'>
                    <CoreFacultyField name={`classSchedules.${index}.facultyId`} />
                  </div>
                </div>

                <Button
                  variant='destructive'
                  onClick={() => remove(index)}
                  style={{ margin: '5px 0px' }}
                >
                  Delete
                </Button>
              </div>
            );
          })
        ) : (
          <p>No Schedule. Please add one.</p>
        )}
      </div>
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Button variant='default' onClick={() => append(undefined)}>
          Add Schedule
        </Button>
      </div>
    </>
  );
};

export default FormDynamicFields;
