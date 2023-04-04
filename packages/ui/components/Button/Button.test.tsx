import { render, screen } from '@testing-library/react';

import { Button } from './index';

describe('Button', () => {
  const testId = 'button';

  it('should render', () => {
    render(<Button data-testid={testId}>Button</Button>);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
