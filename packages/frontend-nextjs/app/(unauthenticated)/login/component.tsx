"use client";

import { FormEvent, FC, useState } from 'react';
import { Typography } from '@mui/material';
import { LoginButton, LoginCard, LoginChangeMode, LoginContainer, LoginError, LoginField } from '@/src/components/auth/login/style';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';

const LoginPageComponent: FC = () => {
    const { replace } = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log(e.currentTarget)
            if (e.currentTarget) {
                const formData = new FormData(e.currentTarget);
                if (formData) {
                    const email = formData.get("email");
                    const password = formData.get("password");
                    const body = { email, password };
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API ?? ""}/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body),
                    }) as NextResponse;
                    if (!response.ok || response.status != 200) {
                        setError(response?.statusText ?? "Error");
                    }
                    replace("/posts");
                }
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "NextJS Error");
        }
    };

    return (
        <LoginContainer maxWidth="xs">
            <LoginCard className='shadow-lg'>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <LoginField required size='small' name="email" label="Email" type="email" fullWidth />
                    <LoginField required size='small' name="password" label="Password" type="password" fullWidth />
                    <LoginButton variant='contained' color='info' type="submit" fullWidth sx={{ mt: 2 }}>
                        Login
                    </LoginButton>
                    <LoginChangeMode onClick={() => replace("/register")}>{"Do not have an account? Register here"}</LoginChangeMode>
                    {error && <LoginError>{error}</LoginError>}
                </form>
            </LoginCard>
        </LoginContainer>
    );
};

export default LoginPageComponent;