'use client'
import React, { InputHTMLAttributes } from 'react';
import styles from '@/module/input.module.scss';

type PhoneInputProps = {
    label: string;
    placeholder?: string;
    name: string;
    errorMsg?: string | null;
} & InputHTMLAttributes<HTMLInputElement>;

export default function PhoneInput({ errorMsg, label, placeholder, name, ...other }: PhoneInputProps) {
    return (
        <label className={styles.label} htmlFor={name}>
            <span>{label}</span>
            <input
                className={`${styles.input} ${errorMsg ? styles.error : ''}`}
                name={name}
                id={name}
                placeholder={placeholder || "e.g. 09390199977"}
                autoComplete="off"
                data-lpignore="true"
                maxLength={11}
                type="text"
                {...other}
            />
            {errorMsg && <span className={styles.errorMessage}>{errorMsg}</span>}
        </label>
    );
}