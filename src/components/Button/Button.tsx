import { memo } from 'react';

import classes from './button.module.scss';

interface IButtonProps {
  title: string;
  onClick: () => void;
}

function Button({ title, onClick }: IButtonProps) {
  return (
    <button onClick={onClick} type="button">{title}</button>
  );
}

export default memo(Button);
