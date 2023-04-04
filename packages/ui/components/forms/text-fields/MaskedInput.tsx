import React, { forwardRef, ForwardRefRenderFunction, HTMLProps } from 'react';
import { IMask, IMaskInput } from 'react-imask';

import { InputElement } from '../../../types';

type InputElementProps = HTMLProps<InputElement>;

export type MaskedInputProps = {
  maskOptions: IMask.AllMaskedOptions;
} & Omit<InputElementProps, 'onChange'> & {
    onChange: (param: { name?: string; value: unknown }) => void;
  };

const MaskedInputRender: ForwardRefRenderFunction<InputElement, MaskedInputProps> = ({ onChange, ...props }, ref) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <IMaskInput {...props} inputRef={ref} onAccept={value => onChange({ name: props.name, value })} overwrite />
  );
};

export const MaskedInput = forwardRef(MaskedInputRender);
