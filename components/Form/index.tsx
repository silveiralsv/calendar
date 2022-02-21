import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { Input } from './input';

const ReminderForm: React.FC = () => {
  const formRef = useRef();

  const handleSubmitForm = (data: any) => {
    console.log('@@@@@@', data);
  };

  return (
    <Form ref={formRef as any} onSubmit={handleSubmitForm}>
      <Input name="date" type="datetime-local" label="Data" placeholder="Eg: Interview" />
      <Input name="title" type="text" label="Title" placeholder="Eg: Interview" maxLength={10} />
      <Input name="description" type="text" label="Description" placeholder="Eg: Interview with FANG" />
      <Input name="color" type="color" label="Color" />
      <button type="submit">Teste</button>
    </Form>
  );
};

export default ReminderForm;
