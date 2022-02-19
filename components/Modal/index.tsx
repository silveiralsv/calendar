import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { useReminder } from '../../hooks/reminder';
import { SeccondaryBtn } from '../Buttons/seccondary';
import { SubmitBtn } from '../Buttons/submit';
import { Input } from '../Form/input';

type CreateReminderProps = {
  visible: boolean;
  date: Date;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export type FormType = {
  title?: string;
  description?: string;
  city?: string;
  color: string;
  date: Date;
};

export const Modal: React.FC<CreateReminderProps> = ({ visible, date, setVisible }) => {
  const [form, setForm] = useState<FormType>({
    title: undefined,
    description: undefined,
    city: undefined,
    color: '#e96783',
  } as FormType);
  const { addReminder } = useReminder();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: keyof FormType) => {
    setForm((old) => ({
      ...old,
      [name]: event.target.value,
    }));
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (form.title && form.description && form.city) {
      addReminder({
        ...form,
        date,
      });
    }
    setVisible(false);
  };

  return (
    <div
      className={`
        ${visible ? 'block' : 'hidden'}
        absolute top-0 bottom-0 z-50 w-full h-full animate-blur  bg-gray-700 bg-opacity-60
      `}
    >
      <div className=" absolute w-full h-full flex items-center justify-center drop-shadow-2xl animate-fade-in">
        <form className=" bg-gray-50 opacity-100 rounded flex flex-col max-w-fit p-8 gap-y-3" onSubmit={handleSubmit}>
          <Input
            value={form?.title || ''}
            onChange={(event) => handleChange(event, 'title')}
            type="text"
            label="Title"
            placeholder="Eg: Interview"
          />
          <Input
            value={form?.description || ''}
            onChange={(event) => handleChange(event, 'description')}
            type="text"
            label="Description"
            placeholder="Eg: Interview with FANG"
          />
          <Input
            value={form?.city || ''}
            onChange={(event) => handleChange(event, 'city')}
            type="text"
            label="City"
            placeholder="Eg: Dublin"
          />
          <Input
            value={form?.color || ''}
            onChange={(event) => handleChange(event, 'color')}
            type="color"
            label="Color"
          />
          <div className="flex items-center justify-evenly">
            <SubmitBtn text="Create" />
            <SeccondaryBtn
              text="Cancel"
              onClick={() => {
                setForm((old) => ({
                  ...old,
                  title: undefined,
                  description: undefined,
                  city: undefined,
                }));
                setVisible(false);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
