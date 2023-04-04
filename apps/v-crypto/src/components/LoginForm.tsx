import { Box, Button, ButtonLink, CircularProgress, ControlledTextField, TextField, Typography } from '@villetrex/ui';
import { signIn } from 'next-auth/react';
import React, { FC, memo, useEffect } from 'react';
import { useState } from 'react';
import { Controller, UseControllerReturn, useForm } from 'react-hook-form';

import { useSignIn } from 'src/hooks/useSignIn';
import theme from 'src/providers/mui/theme';

const inputRules = {
  email: {
    required: {
      value: true,
      message: 'Email is required',
    },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Please enter a valid email address',
    },
  },
  password: {
    required: {
      value: true,
      message: 'Password is required',
    },
    minLength: {
      value: 4,
      message: 'password is too short',
    },
  },
};
const defaultValues = {
  email: '',
  password: '',
};

const LoginForm: FC = () => {
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const { control, handleSubmit, getValues, setValue, watch, reset } = useForm<{
    email: string;
    password: string;
  }>({
    mode: 'onChange',
    defaultValues,
  });

  const { mutate: signIn, data, isLoading, error } = useSignIn();

  const handleLogin = async () => {
    const { email, password } = getValues();
    setIsLoginLoading(true);
    signIn({ email, password });
    setIsLoginLoading(false);

    // await AuthService.submitSignupForm({
    //   email,
    //   password,
    // });

    // reset(defaultValues);

    // // setIsLoginActive(false);
  };

  return (
    <Box
      maxWidth="md"
      sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Box sx={{ position: 'relative' }}>
        {/* <Image
            src={'/svg/superpicks_logo.svg'}
            alt={process.env.NEXT_PUBLIC_COMPANY_NAME.toUpperCase()}
            width={60}
            height={60}
          /> */}
        <Typography variant="h4">Welcome Back 🤝</Typography>
      </Box>
      <Box onSubmit={handleSubmit(handleLogin)} component="form">
        <Controller
          control={control as any}
          name={'email'}
          render={({ field: { ref, ...field }, fieldState: { error, invalid }, formState }: UseControllerReturn) => (
            <TextField
              inputRef={ref}
              {...field}
              error={Boolean(error ?? invalid)}
              helperText={(invalid || error) && error?.message}
              variant="standard"
              value={watch('email')}
              label={'email'}
              name="email"
              fullWidth
              style={{
                marginTop: '0.8125rem',
              }}
              inputProps={{
                id: 'email',
              }}
            />
          )}
          rules={inputRules.email}
        />
        <Controller
          control={control as any}
          name={'password'}
          render={({ field: { ref, ...field }, fieldState: { error, invalid }, formState }: UseControllerReturn) => (
            <TextField
              inputRef={ref}
              {...field}
              error={Boolean(error ?? invalid)}
              helperText={(invalid || error) && error?.message}
              variant="standard"
              value={watch('password')}
              label={'password'}
              name="password"
              fullWidth
              style={{
                marginTop: '0.8125rem',
              }}
              inputProps={{
                id: 'password',
              }}
            />
          )}
          rules={inputRules.password}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', my: 1 }}>
          <ButtonLink href={''} variant="link" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" sx={{ color: 'info.contrastText' }}>
              forgot password?
            </Typography>
          </ButtonLink>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
          <Button variant="contained" size="large" sx={{ px: 8, py: 1 }} onClick={handleLogin}>
            {isLoginLoading ? <CircularProgress size={30} color="info" /> : 'login'}
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3, gap: 0.5 }}>
            <Typography variant="h6" sx={{ gap: 0.3 }}>
              No account yet?
            </Typography>
            <ButtonLink href={''} variant="link" style={{ textDecoration: 'none' }}>
              <Typography variant="h6" sx={{ color: 'info.contrastText' }}>
                Create an account
              </Typography>
            </ButtonLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(LoginForm);
