'use client'
import React, { ButtonHTMLAttributes } from 'react'
import styles from '@/module/button.module.scss'
type Buttonstype = {
    value?: string
    loadingText?: string
    isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Buttons({ value, loadingText, children, isLoading, ...other }: Buttonstype) {
    return (
        <button {...other} className={styles.button}>
            {!isLoading ? value || children : <LoadingSpinner text={loadingText} />}
        </button>
    )
}

const LoadingSpinner = ({ text = 'Loading...' }: { text?: string }) => {
    return (
        <div className={styles.spinnerContainer}>
            {text}
            <svg width="25" height="25" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="20" stroke="#f3f3f3" strokeWidth="4" fill="none" />
                <circle cx="25" cy="25" r="20" stroke="#1a2f43" strokeWidth="4" fill="none" strokeLinecap="round"
                    strokeDasharray="31.4 31.4" strokeDashoffset="31.4">
                </circle>
            </svg>
        </div>
    )
}