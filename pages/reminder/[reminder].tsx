import React, { useState } from 'react';
import type { NextPage } from 'next';
// import { useRouter } from 'next/router';
import { Input } from '../../components/Form/input';

export type FormType = {
  id?: string;
  title?: string;
  description?: string;
  city?: string;
  color: string;
  date: string;
};

const Reminder: NextPage = () => {
  // const router = useRouter();

  const [form, setForm] = useState<FormType>({
    title: undefined,
    description: undefined,
    color: '#e81a4b',
  } as FormType);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: keyof FormType) => {
    setForm((old) => ({
      ...old,
      [name]: event.target.value,
    }));
  };

  return (
    <div
      className={`
        
        absolute top-0 bottom-0 z-50 w-full h-full animate-blur  bg-gray-700 bg-opacity-60
      `}
    >
      <div className=" absolute w-full h-full flex items-center justify-center drop-shadow-2xl motion-safe:animate-fade-in">
        <form
          className=" bg-gray-50 opacity-100 rounded flex flex-col max-w-fit p-8 gap-y-3"
          // onSubmit={handleSubmit}
        >
          <Input
            value={form?.date || ''}
            onChange={(event) => handleChange(event, 'date')}
            type="datetime-local"
            label="Data"
            placeholder="Eg: Interview"
          />
          <Input
            value={form?.title || ''}
            onChange={(event) => handleChange(event, 'title')}
            type="text"
            label="Title"
            placeholder="Eg: Interview"
            maxLength={10}
          />
          <Input
            value={form?.description || ''}
            onChange={(event) => handleChange(event, 'description')}
            type="text"
            label="Description"
            placeholder="Eg: Interview with FANG"
          />
          <Input
            value={form?.color || ''}
            onChange={(event) => handleChange(event, 'color')}
            type="color"
            label="Color"
          />
          {/* <Map date={date} /> */}
          <div className="flex items-center justify-evenly">
            {/* <SubmitBtn text="Create" />
            <SeccondaryBtn
              text="Cancel"
              onClick={() => {
                setVisible(false);
              }}
            /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reminder;
