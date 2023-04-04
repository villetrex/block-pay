import { Button, ControlledTextField, useMediaQuery } from '@villetrex/ui';
// import { ControlledTextField } from "@villetrex/ui/components/forms/text-fields/ControlledTextField";
import { GetStaticProps } from 'next/types';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const defaultPhoneInputFormat = {
  mask: '00 000 0000 00',
  definitions: {
    '#': /[1-9]/,
  },
};

const defaultPhoneInputRules = {
  required: {
    value: true,
    message: 'Phone number is required',
  },
  minLength: {
    value: 3,
    message: 'Phone number is too short',
  },
};

export default function Web() {
  const { t, i18n } = useTranslation();
  // const { t } = useTranslation("common");

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  // const isMdUpWidth = useMediaQuery(theme.breakpoints.up("md"));
  const defaultValues = {
    firstName: '',
    lastName: '',
    phone: '123545',
    email: '',
    location: '',
    state: '',
    refCode: '',
  };

  const handleRegistration = (data: any) => {
    console.log('data', data);
    reset(defaultValues);
  };
  const handleError = (errors: any) => {
    console.log(errors);
  };

  const { control, handleSubmit, getValues, setValue, watch, reset } = useForm<{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    location: string;
    state: string;
    refCode: string;
  }>({
    mode: 'onBlur',
    defaultValues,
  });

  useEffect(() => {
    console.log(t('description'));
    // console.log("hellow rold");
  }, [t]);

  return (
    <>
      <form onSubmit={handleSubmit(handleRegistration, handleError)}>
        <ControlledTextField
          control={control as any}
          fullWidth
          maskProps={defaultPhoneInputFormat}
          margin="normal"
          name="phone"
          rules={defaultPhoneInputRules}
          variant="outlined"
          value={watch('phone')}
          required
          label={'phone number'}
        />
        {`watched phone ${watch('phone')}`}
        <Button
          onClick={() =>
            signIn('email', {
              redirect: false,
              email: 'villetrex@gmail.com',
              callbackUrl: 'http://localhost:3000/foo',
            })
          }
        >
          signin{' '}
        </Button>
      </form>
      <p> quick i18n</p>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en-ng', ['common'])),
    },
  };
};
