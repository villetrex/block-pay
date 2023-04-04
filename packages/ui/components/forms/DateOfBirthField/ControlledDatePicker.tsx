import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { UseControllerReturn } from 'react-hook-form';

import { TextFieldProps } from '../../../TextField';
import { ControlledTextField } from '../text-fields/MaskedInputField';

type GeneralProps = {
  TextFieldProps: TextFieldProps;
  disableFuture: boolean;
  inputFormat: string;
  label: string;
  openTo: string;
  views: string[];
  maxDate: Dayjs;
};

export type ControlledDatePickerProps = Omit<DatePickerProps<any>, 'renderInput' | 'onChange' | 'value'> &
  UseControllerReturn &
  GeneralProps;

export const ControlledDatePicker = ({
  field: { onChange, value, ...field },
  fieldState,
  formState,
  TextFieldProps,
  InputAdornmentProps,
  ...props
}: ControlledDatePickerProps) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      {...props}
      InputAdornmentProps={InputAdornmentProps}
      onChange={onChange}
      renderInput={params => (
        <ControlledTextField
          {...params}
          {...TextFieldProps}
          field={field as any}
          fieldState={fieldState}
          formState={formState}
        />
      )}
      value={value}
    />
  </LocalizationProvider>
);
