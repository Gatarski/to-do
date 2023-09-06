'use client';
import { FormikProvider, useFormik } from 'formik';
import { Input } from './UI/Input';
import { FIELD_MAX_50_CHARS_VALIDATION_MESSAGE, MAX_50_CHARS, ProfileData } from '@/utils/common';
import Button from './UI/Button';
import * as Yup from 'yup';
import { editProfileAPI } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import { useValidationMessage } from '@/utils/utils';
import { useState } from 'react';

export const ProfileForm = ({ profileData }: { profileData: ProfileData }) => {
  const router = useRouter();
  const [apiMessage, setApiMessage] = useState('');

  const formik = useFormik({
    initialValues: profileData,
    validationSchema: validationSchema,
    onSubmit: async () => {
      const editedProfileData: ProfileData = { name: formik.values.name };
      const response = await editProfileAPI(editedProfileData);

      if (response.status === 200) {
        setApiMessage(response.message);
        router.refresh();
      }
    },
  });

  const isButtonDisabled = profileData.name === formik.values.name;

  useValidationMessage(apiMessage, 'success', setApiMessage);

  return (
    <div className="flex flex-col text-center">
      <FormikProvider value={formik}>
        <h2 className="self-center text-2xl mb-3 p-1">Edit your profile</h2>
        <form onSubmit={formik.handleSubmit}>
          <Input labelText="Email" name="email" id="email" placeholder="Email" disabled={true} />
          <Input
            labelText="Display name (optional)"
            name="name"
            id="name"
            placeholder="Your name"
          />
          <Button isDisabled={isButtonDisabled} htmlType="submit" buttonText="Change" />
        </form>
      </FormikProvider>
    </div>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string().max(
    MAX_50_CHARS,
    FIELD_MAX_50_CHARS_VALIDATION_MESSAGE.replace('[fieldName]', 'Name'),
  ),
});
