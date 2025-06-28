'use client'
import Buttons from '@/components/shared/Buttons'
import Inputs from '@/components/shared/Inputs'
import React, { useCallback, useState, FormEvent } from 'react'
import styles from '@/module/global.module.scss'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next'

export default function Page() {
    const [error, setError] = useState<string | null>(null)
    const [valueInput, setValueInput] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const submitAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const validationError = validatePhone(valueInput)
        setError(validationError)

        if (!validationError) {
            setLoading(true)
            try {
                const response = await fetch('https://randomuser.me/api/?results=1&nat=us')
                const data = await response.json()

                if (data?.results[0]?.name) {
                    localStorage.setItem('task', JSON.stringify(data?.results[0]?.name))
                    setCookie('task', JSON.stringify(data.results[0].name), {
                        maxAge: 60 * 60 * 24 * 7,
                        path: '/',
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax'
                    });
                    router.push('/dashboard')
                }
            } catch (_err) {
                setError('Please try again')
            } finally {
                setLoading(false)
            }
        }
        setLoading(false)
    }

    const validatePhone = useCallback((value: string): string | null => {
        if (!value) return "Phone number is required"
        if (!/^[0-9]*$/.test(value)) return "Only digits are allowed"
        if (!value.startsWith('09')) return "Phone must start with 09"
        if (value.length !== 11) return "Phone must be 11 digits (09...)"
        return null
    }, [])

    const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.slice(0, 11)
        setError(validatePhone(value))
        setValueInput(value)
    }, [validatePhone])

    return (
        <div className={styles.countainer}>
            <h1>Login</h1>
            <form className={styles.form} onSubmit={submitAction}>
                <Inputs
                    errorMsg={error}
                    onChange={handlePhoneChange}
                    value={valueInput}
                    label='Phone Number :'
                    required
                    name='phone'
                    placeholder='type phone number'
                />
                <Buttons
                    type='submit'
                    isLoading={loading}
                    disabled={!!error || valueInput.length !== 11}
                >
                    Login
                </Buttons>
            </form>
        </div>
    )
}