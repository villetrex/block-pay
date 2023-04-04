import { Box, GridContainer, GridItem, Link, MenuItem, TextField, Typography, useMediaQuery } from '@villetrex/ui';
import { ControlledTextField, PhoneField } from '@villetrex/ui/forms';
import { FC, useState } from 'react';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';

import { Button } from 'src/components/Button';
import { PageSectionContainer } from 'src/components/PageSectionContainer';
import { Steps } from 'src/components/Steps';
import AuthService from 'src/services/AuthService';
import theme from 'src/styles/signup-theme';

const defaultPhoneInputFormat = {
  mask: '00 000 0000 00',
  definitions: {
    '#': /[1-9]/,
  },
};

const firstNameRules = {
  required: {
    value: true,
    message: 'First name is required',
  },
};

const lastNameRules = {
  required: {
    value: true,
    message: 'Last name is required',
  },
};

const shopLocationRules = {
  required: {
    value: true,
    message: 'Shop location is required',
  },
};

const emailRules = {
  required: {
    value: true,
    message: 'Email is required',
  },
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: 'Please enter a valid email address',
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

type PartnerSignUpFormProps = {
  states: { code: string }[];
  signUpUrl: string;
  steps: { title: string; description: string }[];
  formTitle: string;
  successMessage: string;
  formSubtitle: string;
  description: string;
};

const defaultValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  location: '',
  state: '',
  refCode: '',
};

export const PartnerSignUpForm: FC<PartnerSignUpFormProps> = props => {
  const { control, handleSubmit, getValues, setValue, watch, reset } = useForm<{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    location: string;
    state: string;
    refCode: string;
  }>({
    defaultValues,
  });
  const state = watch('state');
  const [isSuccessShown, setIsSuccessShown] = useState(false);

  const isMdUpWidth = useMediaQuery(theme.breakpoints.up('md'));

  const renderSteps = () => (
    <GridItem md={5} xs={12}>
      <Steps steps={props.steps} />
    </GridItem>
  );

  const handleFormComplete = async () => {
    const { firstName, lastName, phone, email, location, state, refCode } = getValues();

    await AuthService.submitSignupForm({
      fname: firstName,
      lname: lastName,
      mobilephone: phone,
      email,
      shopaddress: location,
      shopstate: state,
      referrercode: refCode,
    });

    reset(defaultValues);

    setIsSuccessShown(true);
  };

  return (
    <PageSectionContainer color={theme.palette.primary.light} maxWidth={false} disableGutters={false}>
      <Box
        onSubmit={handleSubmit(handleFormComplete)}
        component="form"
        maxWidth="md"
        sx={{
          padding: { xs: theme.spacing(4, 0), md: theme.spacing(6, 6) },
          margin: 'auto',
        }}
      >
        <GridContainer
          sx={{
            mb: 6,
            '& button p': {
              fontSize: '1rem',
            },
          }}
        >
          {isMdUpWidth && renderSteps()}
          <GridItem md={7} xs={12}>
            <Box
              sx={{
                bgcolor: 'background.default',
                borderRadius: 0.5,
                padding: 3,
                mb: { xs: 6, md: 0 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                ...(isMdUpWidth ? { minHeight: '530px' } : {}),
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="overline" sx={{ pl: 2 }}>
                    {isSuccessShown ? 'Success' : props.formTitle}
                  </Typography>
                  <Link
                    sx={{ textDecoration: 'none' }}
                    href={isMdUpWidth ? 'https://www.betking.com/' : 'https://m.betking.com/account/registration'}
                  >
                    <Typography variant="body1">{props.formSubtitle}</Typography>
                  </Link>
                </Box>
                {isSuccessShown ? (
                  <Typography variant="body1">{props.successMessage}</Typography>
                ) : (
                  <Box
                    sx={{
                      '& .MuiTextField-root:last-child': { mb: 0 },
                      '& input, & input::placeholder, label': {
                        fontSize: '0.9rem',
                        lineHeight: 1.5,
                      },
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        '& .MuiTextField-root': {
                          width: `calc(50% - ${theme.spacing(0.5)})`,
                        },
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Controller
                        control={control}
                        name="firstName"
                        render={({ field, ...rest }) => (
                          <ControlledTextField
                            field={field as ControllerRenderProps<any>}
                            {...rest}
                            fullWidth
                            label="First Name"
                            margin="normal"
                            required
                            variant="standard"
                          />
                        )}
                        rules={firstNameRules}
                      />
                      <Controller
                        control={control}
                        name="lastName"
                        render={({ field, ...rest }) => (
                          <ControlledTextField
                            field={field as ControllerRenderProps<any>}
                            {...rest}
                            fullWidth
                            label="Last Name"
                            margin="normal"
                            required
                            variant="standard"
                          />
                        )}
                        rules={lastNameRules}
                      />
                    </Box>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field, ...rest }) => (
                        <ControlledTextField
                          field={field as ControllerRenderProps<any>}
                          {...rest}
                          fullWidth
                          label="Email"
                          margin="normal"
                          required
                          variant="standard"
                        />
                      )}
                      rules={emailRules}
                    />
                    <PhoneField
                      control={control as any}
                      fullWidth
                      inputProps={defaultPhoneInputFormat}
                      margin="normal"
                      name="phone"
                      rules={defaultPhoneInputRules}
                      variant="standard"
                      required
                    />
                    <Controller
                      control={control}
                      name="lastName"
                      render={({}) => (
                        <TextField
                          required
                          margin="normal"
                          fullWidth
                          select
                          label="State"
                          variant="standard"
                          value={state}
                          onChange={e => setValue('state', e.target.value)}
                          style={{
                            marginTop: '0.8125rem',
                          }}
                          inputProps={{
                            id: 'state',
                          }}
                          SelectProps={{
                            MenuProps: {
                              PaperProps: {
                                sx: {
                                  bgcolor: 'common.white',
                                },
                              },
                            },
                          }}
                        >
                          {props.states?.map(item => (
                            <MenuItem key={item.code} value={item.code}>
                              {item.code}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                      rules={lastNameRules}
                    />
                    <Controller
                      control={control}
                      name="location"
                      render={({ field, ...rest }) => (
                        <ControlledTextField
                          field={field as ControllerRenderProps<any>}
                          {...rest}
                          fullWidth
                          label="Shop Location"
                          margin="normal"
                          required
                          variant="standard"
                        />
                      )}
                      rules={shopLocationRules}
                    />
                    <Controller
                      control={control}
                      name="refCode"
                      render={({ field, ...rest }) => (
                        <ControlledTextField
                          field={field as ControllerRenderProps<any>}
                          {...rest}
                          fullWidth
                          label="Referral Code"
                          margin="normal"
                          variant="standard"
                        />
                      )}
                    />
                  </Box>
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {isSuccessShown ? (
                  <Button href="https://www.betking.com/" text={'VISIT BETKING.COM'} />
                ) : (
                  <Button text={'APPLY NOW'} type="submit" />
                )}
              </Box>
            </Box>
          </GridItem>
          {!isMdUpWidth && renderSteps()}
        </GridContainer>
        <Typography
          variant="body1"
          sx={{
            maxWidth: 650,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {props.description}
        </Typography>
      </Box>
    </PageSectionContainer>
  );
};
