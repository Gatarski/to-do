'use client';

import { Modal } from 'antd';
import Button from './UI/Button';
import { FormikProvider, useFormik } from 'formik';
import {
  FIELD_MAX_100_CHARS_VALIDATION_MESSAGE,
  FIELD_MAX_20_CHARS_VALIDATION_MESSAGE,
  FIELD_REQUIRED_VALIDATION_MESSAGE,
  MAX_100_CHARS,
  MAX_20_CHARS,
  EventData,
} from '@/util/common';
import { Input } from './UI/Input';
import { Tabs } from './UI/Tabs';
import { Datepicker } from './UI/Datepicker';
import * as Yup from 'yup';
import { postProjectAPI } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';

interface AddEventModalProps {
  modalOpen: boolean;
  closeModal: Function;
}

const EVENT_SCHEMA = [
  {
    labelText: 'Title',
    name: 'title',
    id: 'title',
    placeholder: 'Title',
    type: 'input',
  },
  {
    labelText: 'Short description',
    name: 'shortDescription',
    id: 'shortDescription',
    placeholder: 'Short description',
    type: 'input',
  },
  {
    labelText: 'Importance',
    name: 'importance',
    id: 'importance',
    options: ['small', 'medium', 'very'],
    type: 'tabs',
  },
  {
    labelText: 'Deadline',
    name: 'deadline',
    id: 'deadline',
    placeholder: 'DD/MM/YYYY',
    type: 'datepicker',
  },
];

const initialValues: EventData = {
  title: '',
  shortDescription: '',
  importance: 'medium',
  deadline: '',
  status: 'pending',
};

export const AddEventModal = ({ modalOpen, closeModal }: AddEventModalProps) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      const formValues = formik.values;
      const response = await postProjectAPI(formValues);
      if (response.status === 201) {
        closeModal();
        formik.resetForm();
        router.refresh();
      }
    },
  });
  
  return (
    <Modal width={'600px'} closable={false} open={modalOpen} footer={<></>}>
      <>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col pl-5 pb-5 gap-2 border-b border-solid">
              <header className="text-base font-semibold">Add new event</header>
              <p className="text-sx font-normal">Complete below form to add new event</p>
            </div>
            <div>
              {EVENT_SCHEMA.map((event, index) => {
                if (event.type === 'input') {
                  return (
                    <Input
                      key={index}
                      labelText={event.labelText}
                      name={event.name}
                      id={event.id}
                      placeholder={event.placeholder as string}
                    />
                  );
                }
                if (event.type === 'tabs') {
                  return (
                    <Tabs
                      key={index}
                      labelText={event.labelText}
                      name={event.name}
                      id={event.name}
                      options={event.options as string[]}
                    />
                  );
                }
                if (event.type === 'datepicker') {
                  return (
                    <Datepicker
                      key={index}
                      labelText={event.labelText}
                      name={event.name}
                      id={event.name}
                      placeholder={event.placeholder as string}
                    />
                  );
                }
              })}
            </div>
            <div className="flex place-content-end gap-3 border-t border-solid pr-5 pt-6">
              <Button
                buttonText="Cancel"
                isDisabled={false}
                onClick={() => {
                  formik.resetForm();
                  closeModal();
                }}
              />
              <Button buttonText="Save" isDisabled={false} type="primary" htmlType="submit" />
            </div>
          </form>
        </FormikProvider>
      </>
    </Modal>
  );
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required(FIELD_REQUIRED_VALIDATION_MESSAGE)
    .max(MAX_20_CHARS, FIELD_MAX_20_CHARS_VALIDATION_MESSAGE.replace('[fieldName]', 'Description')),
  shortDescription: Yup.string()
    .required(FIELD_REQUIRED_VALIDATION_MESSAGE)
    .max(
      MAX_100_CHARS,
      FIELD_MAX_100_CHARS_VALIDATION_MESSAGE.replace('[fieldName]', 'Description'),
    ),
  deadline: Yup.string().required(FIELD_REQUIRED_VALIDATION_MESSAGE),
});
