'use client';
import { Modal } from 'antd';
import Button from './UI/Button';
import { FormikProvider, useFormik } from 'formik';
import {
  FIELD_MAX_200_CHARS_VALIDATION_MESSAGE,
  FIELD_MAX_20_CHARS_VALIDATION_MESSAGE,
  FIELD_REQUIRED_VALIDATION_MESSAGE,
  MAX_200_CHARS,
  MAX_20_CHARS,
  ModalMessages,
  ModalType,
  NoteData,
} from '@/utils/common';
import { TextArea } from './UI/TextArea';
import * as Yup from 'yup';
import { createNoteAPI, editNoteAPI } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import { Input } from './UI/Input';
import { Switch } from './UI/Switch';

interface NoteModalProps {
  modalOpen: boolean;
  mode: ModalType;
  closeModal: Function;
  noteData?: NoteData;
}

const initValues: NoteData = {
  title: '',
  note: '',
  isImportant: false,
};

export const NoteModal = ({ modalOpen, closeModal, mode, noteData }: NoteModalProps) => {
  const initialValues = mode === 'add' ? initValues : (noteData as NoteData);

  const { title, subtitle } = getModalMessages(mode);

  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      const formValues = formik.values;
      const response = await formSubmit(mode, formValues);
      if ([200, 201].includes(response.status)) {
        closeModal();
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
              <header className="text-base font-semibold">{title}</header>
              <p className="text-sx font-normal">{subtitle}</p>
            </div>
            <div>
              <Input labelText="Title" name="title" id="title" placeholder="Add note title" />
              <TextArea
                labelText="Note"
                name="note"
                id="note"
                placeholder="Add your note"
                maxLength={MAX_200_CHARS}
              />
              <Switch labelText="Important" name="isImportant" id="isImportant" />
            </div>
            <div className="flex place-content-end gap-3 border-t border-solid pr-5 pt-6">
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
    .max(MAX_20_CHARS, FIELD_MAX_20_CHARS_VALIDATION_MESSAGE.replace('[fieldName]', 'Title')),
  note: Yup.string()
    .required(FIELD_REQUIRED_VALIDATION_MESSAGE)
    .max(MAX_200_CHARS, FIELD_MAX_200_CHARS_VALIDATION_MESSAGE.replace('[fieldName]', 'Note')),
});

const getModalMessages = (modalType: ModalType): ModalMessages => {
  switch (modalType) {
    case 'add':
      return { title: 'Add new note', subtitle: 'Complete below form to add new note' };
    case 'edit':
      return {
        title: 'Edit note',
        subtitle: 'Complete below form to edit note',
      };
    default:
      return { title: '', subtitle: '' };
  }
};

const formSubmit = async (modalType: ModalType, values: NoteData) => {
  const apiResult = modalType === 'add' ? await createNoteAPI(values) : await editNoteAPI(values);
  return apiResult;
};
