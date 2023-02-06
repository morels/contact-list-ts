import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Loadmore } from './Loadmore';

describe('Loadmore', () => {
  it('renders the label when not loading', () => {
    const label = 'Load More';
    const { getByText } = render(<Loadmore label={label} loading={false} />);
    expect(getByText(label)).toBeInTheDocument();
  });

  it('renders "Loading..." when loading', () => {
    const { getByText } = render(<Loadmore label="Load More" loading={true} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('disables the button when loading', () => {
    const { getByText } = render(<Loadmore label="Load More" loading={true} />);
    const button = getByText('Loading...').closest('button');
    expect(button).toBeDisabled();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Loadmore label="Load More" onClick={onClick} loading={false} />);
    const button = getByText('Load More').closest('button');
    // @ts-expect-error ts(2345)
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
