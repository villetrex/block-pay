import { FieldValues, UseControllerReturn } from 'react-hook-form';

import { MaskProps } from './types';
import { TextField, TextFieldProps } from '../../TextField';

export type MaskedInputFieldProps<T extends FieldValues> = UseControllerReturn<T> &
  TextFieldProps & { maskProps?: MaskProps };

export const MaskedInputField = <T extends FieldValues>({
  field: { ref, ...field },
  fieldState: { error, invalid },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formState, // do not pass formState
  helperText,
  maskProps,
  ...restProps
}: MaskedInputFieldProps<T>) => {
  return (
    <TextField
      inputProps={{ ...maskProps }}
      inputRef={ref}
      {...field}
      {...restProps}
      error={Boolean(error ?? invalid)}
      helperText={error?.message ?? helperText}
    />
  );
};
