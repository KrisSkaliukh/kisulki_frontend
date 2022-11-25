import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';

interface TitleType {
  title: string
}

function onChange(e: CheckboxChangeEvent) {
  console.log(`checked = ${e.target.checked}`);
}

function CheckBox({ title } : TitleType) {
  return (
    <Checkbox onChange={onChange}>{title}</Checkbox>
  );
}

export default CheckBox;
