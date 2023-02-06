import React, { ButtonHTMLAttributes } from 'react';

type Props = {
  label: string;
  loading: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Loader = ({onClick, label, loading}:Props) => {
  return <button onClick={onClick} disabled={loading}>{loading ? "Loading..." : label}</button>;
};