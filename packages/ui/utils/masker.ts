import { ChangeEvent } from 'react';
import { IMask } from 'react-imask';

import { InputElement } from '../types';

export const masker = ({ masked, transform, maskDefault }: { masked: any; transform?: any; maskDefault?: any }) => {
  const mask = IMask.createPipe(masked, IMask.PIPE_TYPE.UNMASKED, IMask.PIPE_TYPE.MASKED);

  const unmask = IMask.createPipe(masked, IMask.PIPE_TYPE.MASKED, IMask.PIPE_TYPE.UNMASKED);

  const onChange = (e: ChangeEvent<InputElement>) => {
    const unmasked = unmask(e.target.value);
    const newValue = mask(unmasked);
    e.target.value = newValue;
  };

  return {
    mask,
    onChange,
    transform: transform || unmask,
    unmask,
    maskDefault: maskDefault || mask,
  };
};
