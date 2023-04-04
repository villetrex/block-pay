import { AlertColor } from '@mui/material';
import { FC, useMemo } from 'react';

import { Alert, Paper, Slide, SlideProps, Snackbar, Typography } from '@villetrex/ui';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

type Props = {
  status: { variant: string; message: string; severity: AlertColor | undefined };
  relieveStatus: () => void;
};

const SlideSnackbar: FC<Props> = ({ status, relieveStatus }) => {
  const verticalOption = useMemo(() => (status?.variant === 'alert' ? 'bottom' : 'top'), [status]);
  return (
    <Snackbar
      anchorOrigin={{ vertical: verticalOption, horizontal: 'center' }}
      autoHideDuration={3000}
      open={Boolean(status?.message)}
      onClose={relieveStatus}
      TransitionComponent={TransitionLeft}
      key={TransitionLeft.name}
    >
      <div>
        {status?.variant === 'alert' && (
          <Alert severity={status?.severity} onClick={relieveStatus} sx={{ border: 0.5, borderColor: status.severity }}>
            {status?.message}
          </Alert>
        )}
        {status?.variant === 'paper' && (
          <Paper
            onClick={relieveStatus}
            sx={{
              padding: 2,
              width: 328,
            }}
          >
            <Typography sx={{ color: `${status.severity}.dark` }} variant="body2">
              {status?.message}
            </Typography>
          </Paper>
        )}
      </div>
    </Snackbar>
  );
};

export default SlideSnackbar;
