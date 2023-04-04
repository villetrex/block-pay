import { createContext, FC, ReactNode, useCallback, useContext, useState } from 'react';

const AppProcessStatusContext = createContext<AppProcessStatusContextType>({} as AppProcessStatusContextType);

export const useAppProcessStatus = () => {
  return useContext(AppProcessStatusContext);
};

export type Props = {
  children: ReactNode;
};

export type AppProcessStatus = {
  message: string;
  severity: 'error' | 'info' | 'warning' | 'success';
  variant: 'alert' | 'paper';
  action?: string;
  actionHandler?: () => void;
};

export type AppProcessStatusContextType = {
  status: AppProcessStatus;
  addStatus: (status: AppProcessStatus) => void;
  relieveStatus: () => void;
};

export const defaultStatusOptions: AppProcessStatus = {
  message: 'Apologies, we are facing some technical issues. Please try again later.',
  severity: 'warning',
  variant: 'paper',
};

export const AppProcessStatusProvider: FC<Props> = ({ children }) => {
  const [state, setState] = useState<AppProcessStatus[]>([]);
  const addStatus = useCallback(
    (status: AppProcessStatus) => {
      setState(state => state.concat(status));
    },
    [setState],
  );

  const relieveStatus = useCallback(() => {
    setState(state => state.slice(1));
  }, [setState]);

  const value = {
    status: state[0],
    addStatus,
    relieveStatus,
  };

  return <AppProcessStatusContext.Provider value={value}>{children}</AppProcessStatusContext.Provider>;
};
