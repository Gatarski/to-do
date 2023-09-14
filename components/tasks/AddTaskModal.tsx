'use client';
import Button from '../UI/Button';
import { FormikProvider, useFormik } from 'formik';
import { TaskData } from '@/types/types';
import {
  FIELD_MAX_70_CHARS_VALIDATION_MESSAGE,
  FIELD_REQUIRED_VALIDATION_MESSAGE,
} from '@/constants/validationMessages';
import { MAX_70_CHARS } from '@/constants/charactersLimits';
import { TextArea } from '../UI/TextArea';
import { Tabs } from '../UI/Tabs';
import * as Yup from 'yup';
import { createTaskAPI } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import { Modal } from '../Modal';

interface AddTaskModalProps {
  modalOpen: boolean;
  closeModal: Function;
  eventId?: number;
}

const initialValues: TaskData = {
  task: '',
  priority: 'medium',
  isDone: false,
};

export const AddTaskModal = ({ modalOpen, closeModal, eventId }: AddTaskModalProps) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      const formValues = formik.values;
      const response = await createTaskAPI({ ...formValues, ProjectId: eventId });
      if (response.status === 201) {
        closeModal();
        router.refresh();
      }
    },
  });

  return (
    <Modal open={modalOpen}>
      <>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col pl-5 pb-5 gap-2 border-b border-solid mobile:pb-2.5">
              <header className="text-base font-semibold">Add new task</header>
              <p className="text-sx font-normal">Complete below form to add new task</p>
            </div>
            <div>
              <TextArea
                labelText="Task"
                name="task"
                id="task"
                placeholder="Add your task"
                maxLength={MAX_70_CHARS}
              />
              <Tabs
                labelText="Priority"
                name="priority"
                id="priority"
                options={['small', 'medium', 'urgent']}
              />
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
  task: Yup.string()
    .required(FIELD_REQUIRED_VALIDATION_MESSAGE)
    .max(MAX_70_CHARS, FIELD_MAX_70_CHARS_VALIDATION_MESSAGE.replace('[fieldName]', 'Task')),
});
