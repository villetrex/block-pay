import { useMemo } from 'react';
import { Controller, UseControllerProps } from 'react-hook-form';

import { TextFieldMasker } from './TextFieldMasker';
import { MaskProps } from './types';
import { masker } from '../../../utils';
import { TextFieldProps } from '../../TextField';

export type InputControlProviderProps = UseControllerProps & TextFieldProps & { maskProps?: MaskProps };

const defaultPhoneInputFormat = {
  mask: '00 000 0000 0',
  definitions: {
    '#': /^[a-z0-9]+$/i,
  },
};

export const ControlledTextField = ({
  control,
  maskProps = defaultPhoneInputFormat,
  name,
  rules,
  ...props
}: InputControlProviderProps) => {
  const transformer = useMemo(
    () =>
      masker({
        masked: maskProps,
      }),
    [maskProps],
  );

  return (
    <Controller
      control={control}
      name={name}
      render={renderProps => (
        <TextFieldMasker
          {...props}
          {...renderProps}
          maskProps={maskProps}
          transform={{
            input: ({ value }) => value,
            output: ({ value }) => transformer.transform(value),
          }}
        />
      )}
      rules={rules}
    />
  );
};
