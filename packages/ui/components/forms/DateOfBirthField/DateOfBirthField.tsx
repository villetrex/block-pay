import { Dayjs } from 'dayjs';
import { Controller, UseControllerProps } from 'react-hook-form';

import { TextFieldProps } from '../../../TextField';
import { ControlledDatePicker } from './ControlledDatePicker';

export type DateOfBirthFieldProps = UseControllerProps & {
  TextFieldProps: TextFieldProps;
  maxDate: Dayjs;
};

export const DateOfBirthField = ({ control, name, rules, ...props }: DateOfBirthFieldProps) => (
  <Controller
    control={control}
    name={name}
    render={renderProps => (
      <ControlledDatePicker
        {...props}
        {...renderProps}
        disableFuture
        inputFormat="DD/MM/YYYY"
        label="Date of Birth"
        openTo="year"
        views={['year', 'month', 'day']}
      />
    )}
    rules={rules}
  />
);
