'use client';

import React, {FormEvent, useState, useRef} from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';
import applyMask from './mask.ts';

export type InputProps = {
  defaultValue?: string | number;
  value?: string | number | readonly string[];
  disabled?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: string) => void;
  error?: string;
  label?: string;
  placeholder?: string;
  size?: '60' | '50';
  readOnly?: boolean;
  onClick?: () => void;
  inputMode?: 'url' | 'none' | 'email' | 'decimal' | 'numeric' | 'tel' | 'search' | 'text';
  type?: 'email' | 'hidden' | 'number' | 'password' | 'search' | 'text' | 'tel' | 'url';
  autoComplete?: string;
  mask?: 'phone'; // Прокс для маски
};

export function Input(props: InputProps) {
  const {
    defaultValue,
    value,
    type = 'text',
    inputMode = 'text',
    error,
    disabled,
    onBlur,
    onFocus,
    onChange,
    onClick,
    autoComplete,
    label,
    placeholder,
    readOnly,
    size = '60',
    mask
  } = props;

  const [isFocus, setIsFocus] = useState<boolean | 'value'>(value && label ? 'value' : false);

  const inputRef = useRef<HTMLInputElement>(null);

  const actionFocus = () => {
    if (label && isFocus !== 'value') {
      setIsFocus(true);
    }
    onFocus?.();
  };

  const actionBlur = () => {
    if (label && isFocus !== 'value') {
      setIsFocus(false);
    }
    onBlur?.();
  };

  const actionInput = (e?: FormEvent<HTMLInputElement>) => {
    const target = e?.target as HTMLInputElement;

    if (label && !target.value) {
      setIsFocus(true);
    }
    if (label && isFocus !== 'value') {
      setIsFocus('value');
    }
    if (mask) {
      const value = applyMask[mask](target.value);
      onChange?.(value);
    } else {
      onChange?.(target.value);
    }
  };

  const handleDivClick = () => {
    inputRef.current?.focus();
    onClick?.();
  };

  return (
    <div className={styles['input-wrapper']}>
      <div
        className={clsx(styles['input-container'], styles[`size-${size}`], disabled ? styles['disabled'] : styles['enabled'])}
        onClick={handleDivClick}
      >
        {label && <label className={clsx(styles['input-label'], isFocus && styles['focused'])}>{label}</label>}
        <input
          ref={inputRef}
          defaultValue={defaultValue}
          value={value || ''}
          className={clsx(styles['input-field'], isFocus && styles['focused'], disabled && styles['disabled'])}
          readOnly={readOnly}
          inputMode={inputMode}
          disabled={disabled}
          onBlur={actionBlur}
          onFocus={actionFocus}
          onInput={actionInput}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {error && <span className={styles['input-error']}>{error}</span>}
      </div>
    </div>
  );
}
