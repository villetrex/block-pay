import { memo } from 'react';
import { FieldValues } from 'react-hook-form';

import { MaskedInput } from './MaskedInput';
import { MaskedInputField, MaskedInputFieldProps } from './MaskedInputField';

export type InputMaskProviderProps = MaskedInputFieldProps<FieldValues> & { transform: MaskedTransformer };

type MaskedTransformer = {
  input: (input: MaskedTransformerInput) => string;
  output: (input: MaskedTransformerInput) => string;
};

type MaskedTransformerInput = {
  name: string;
  value: string;
};

export const TextFieldMasker = ({ field, transform, maskProps, ...props }: InputMaskProviderProps) => {
  return (
    <MaskedInputField
      field={{
        ...field,
        onChange: ev => {
          field.onChange(transform.output({ name: field.name, value: ev.value }));
        },
      }}
      {...props}
      maskProps={maskProps}
      InputProps={{ inputComponent: MaskedInput as any }}
      // value={transform.input(field as MaskedTransformerInput)}
    />
  );
};

export default memo(TextFieldMasker);
