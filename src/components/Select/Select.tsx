import cn from 'classnames';
import { memo, useState } from 'react';

import Checkbox from '../CustomCheckbox';
import ArrowDownIcon from '../SVGIcons/ArrowDownIcon';
import classes from './select.module.scss';

interface ISelectProps {
  selectedValues: string[];
  options: string[];
  borderColor: string;
  onChange: (value: string | string[]) => void;
  placeholder: string;
  styles: {
    width?: string;
    height: string;
  }
  multiple: boolean;
}

function Select({
  onChange,
  borderColor,
  options,
  selectedValues,
  placeholder,
  styles,
  multiple,
}: ISelectProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={classes.container}
      role="none"
      onBlur={(event) => {
        if (!event.relatedTarget || !event.relatedTarget?.className) {
          setExpanded(false);
        }
      }}
    >
      <input
        style={{ ...styles, border: `1px solid ${borderColor}` }}
        placeholder={placeholder}
        readOnly
        onClick={() => {
          if (options.length > 0) {
            setExpanded(!expanded);
          }
        }}
      />
      <div
        className={cn({
          [classes.iconContainer]: true,
          [classes.rotatedIcon]: expanded,
        })}
        onClick={() => {
          if (options.length > 0) {
            setExpanded(!expanded);
          }
        }}
        role="none"
      >
        <ArrowDownIcon fill="black" />
      </div>
      <div
        role="button"
        className={cn({
          [classes.menu]: true,
          [classes.expandedMenu]: expanded,
          [classes.hiddenMenu]: !expanded,
        })}
        tabIndex={0}
      >
        {options.map((item) => (
          <div className={classes.option}>
            {multiple && (
            <Checkbox
              checked={selectedValues.some((value) => value === item)}
              onChange={() => onChange(item)}
            />
            )}
            <p role="none" onClick={() => onChange(item)} key={item}>{item}</p>
          </div>
        ))}
        {options.filter((option) => selectedValues.findIndex((value) => value === option) !== -1).length > 0
        && (
        <p
          role="none"
          onClick={() => onChange(selectedValues
            .filter((value) => options.findIndex((option) => option === value) !== -1))}
          className={classes.clearOptions}
        >
          Сбросить
        </p>
        )}
      </div>
    </div>
  );
}

export default memo(Select);
