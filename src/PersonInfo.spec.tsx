import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PersonInfo from './PersonInfo';

const mockData = {
  firstNameLastName: 'John Doe',
  jobTitle: 'Software Engineer',
  emailAddress: 'johndoe@example.com'
};

describe('PersonInfo', () => {
  it('renders the first name, last name, job title, and email address', () => {
    render(<PersonInfo data={mockData} />);
    // eslint-disable-next-line array-callback-return
    Object.values(mockData).map(v => {
      expect(screen.getByText(v)).toBeInTheDocument();
    });
  });

  it('has a red border when selected', () => {
    const { container } = render(<PersonInfo data={mockData} selected />);
    const personInfo = container.querySelector('.person-info');
    expect(personInfo).toHaveStyle('border: 2px solid hsl(var(--red))');
  });

  it('calls the onClick function when clicked', async () => {
    const onClick = jest.fn();
    render(<PersonInfo data={mockData} onClick={onClick} />);
    await userEvent.click(screen.getByText(mockData.firstNameLastName));
    expect(onClick).toHaveBeenCalled();
  });
});
