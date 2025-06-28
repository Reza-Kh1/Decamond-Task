'use client'
import React from 'react'
import styles from './style.module.scss'
import Buttons from '@/components/shared/Buttons'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
export default function Page() {
    const router = useRouter()
    const logout = () => {
        router.replace('/auth')
        deleteCookie('task')
        localStorage.setItem('task', '')
    }
    return (
        <div className={styles.countainer}>
            <h1 className={styles.text}>Welcome to the Dashboard</h1>
            <Buttons onClick={() => logout()}>
                Log out
            </Buttons>
        </div>
    )
}
