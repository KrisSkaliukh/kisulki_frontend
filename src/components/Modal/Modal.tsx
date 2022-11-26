import { memo } from 'react';

import classes from './modal.module.scss';

interface ILessonCardProps {
  width: string;
  height: string;
  renderContent: () => JSX.Element ;
}

function Modal({
  width,
  height,
  renderContent,
}: ILessonCardProps) {
  return (
    <>
      <div className={classes.background} />
      <div style={{ width, height }} className={classes.container}>
        {renderContent()}
      </div>
    </>
  );
}

export default memo(Modal);
