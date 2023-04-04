import { FC } from 'react';

export type AuthEnabledComponentConfig = {
  auth: { role: 'admin' | 'user'; loading: FC; unauthorizedFallback: string };
};

export type ComponentWithAuth<T = any> = FC<T> & AuthEnabledComponentConfig;
