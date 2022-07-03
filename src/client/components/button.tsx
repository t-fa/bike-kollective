import * as React from 'react';

interface Props {
  color: string;
}

// this is just an example file for anyone who hasn't worked with react/typescript
// feel free to delete and/or edit. it's missing some things you'd want a button to do

export const Button: React.FC<Props> = ({ color, children }) => {
  return <button className={color}>{children}</button>;
};
