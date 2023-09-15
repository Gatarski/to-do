'use client';
import Button from '../UI/Button';
import { FormikProvider, useFormik } from 'formik';
import { EventData, ModalMessages, ModalType } from '@/types/types';
import {
  FIELD_MAX_100_CHARS_VALIDATION_MESSAGE,
  FIELD_MAX_20_CHARS_VALIDATION_MESSAGE,
  FIELD_REQUIRED_VALIDATION_MESSAGE,
} from '@/constants/messages';
import { MAX_100_CHARS, MAX_20_CHARS } from '@/constants/sizes';
import { Input } from '../UI/Input';
import { Tabs } from '../UI/Tabs';
import { Datepicker } from '../UI/Datepicker';
import * as Yup from 'yup';
import { createProjectAPI, editProjectAPI } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { Modal } from '../Modal';

interface EventModalProps {
  modalOpen: boolean;
  closeModal: Function;
  mode: ModalType;
  eventData?: EventData;
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
    labelText: 'Priority',
    name: 'priority',
    id: 'priority',
    options: ['small', 'medium', 'urgent'],
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

const initValues: EventData = {
  title: '',
  shortDescription: '',
  priority: 'medium',
  deadline: '',
  status: 'pending',
};

export const EventModal = ({ modalOpen, closeModal, mode, eventData }: EventModalProps) => {
  const initialValues = getInitialValues(mode, eventData as EventData);

  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      const formValues = formik.values;
      formValues.deadline = dayjs(formValues.deadline).format('YYYY-MM-DD');
      const response = await formSubmit(mode, formValues);
      if ([200, 201].includes(response.status)) {
        closeModal();
        router.refresh();
      }
    },
  });

  const { title, subtitle } = getModalMessages(mode);

  return (
    <Modal open={modalOpen}>
      <>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col pl-5 pb-5 gap-2 border-b border-solid mobile:pb-2.5">
              <header className="text-base font-semibold">{title}</header>
              <p className="text-sx font-normal mobile:hidden">{subtitle}</p>
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
            <div className="flex place-content-end gap-3 border-t border-solid pr-5 pt-6 mobile:pt-2.5">
              <Button
                buttonText="Cancel"
                isDisabled={false}
                onClick={() => {
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

const getModalMessages = (modalType: ModalType): ModalMessages => {
  switch (modalType) {
    case 'add':
      return { title: 'Add new event', subtitle: 'Complete below form to add new event' };
    case 'edit':
      return {
        title: 'Edit event',
        subtitle: 'Complete below form to edit event',
      };
    default:
      return { title: '', subtitle: '' };
  }
};

const getInitialValues = (modalType: ModalType, eventData: EventData): EventData => {
  switch (modalType) {
    case 'edit':
      eventData.deadline = dayjs(eventData.deadline);
      return eventData;
    case 'add':
    default:
      return initValues;
  }
};

const formSubmit = async (modalType: ModalType, values: EventData) => {
  const apiResult =
    modalType === 'add' ? await createProjectAPI(values) : await editProjectAPI(values);
  return apiResult;
};
