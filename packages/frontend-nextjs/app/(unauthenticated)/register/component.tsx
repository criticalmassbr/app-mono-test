"use client";

import { FormEvent, FC, useState } from 'react';
import { Typography } from '@mui/material';
import { RegisterButton, RegisterCard, RegisterChangeMode, RegisterContainer, RegisterError, RegisterField } from '@/src/components/auth/register/style';
import { useRouter } from 'next/navigation';

const RegisterPageComponent: FC = () => {
    const { replace } = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (e.currentTarget) {
                const formData = new FormData(e.currentTarget);
                if (formData) {
                    const email = formData.get("email");
                    const password = formData.get("password");
                    const body = { email, password };
                    const response = await fetch('/api/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body),
                    });
                    if (!response.ok || response.status != 200) {
                        if (response.status == 404) throw new Error("E-mail or password not match");
                        throw new Error("Server Error");
                    }
                    setError(null);
                }
                throw new Error("No form data");
            }
            throw new Error("Form wrong")
        } catch (error) {
            setError(error instanceof Error ? error.message : "NextJS Error");
        }
    };

    return (
        <RegisterContainer maxWidth="xs">
            <RegisterCard className='shadow-lg'>
                <Typography variant="h4" component="h1" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <RegisterField required size='small' name="email" label="Email" type="email" fullWidth />
                    <RegisterField required size='small' name="password" label="Password" type="password" fullWidth />
                    <RegisterButton variant='contained' color='info' type="submit" fullWidth sx={{ mt: 2 }}>
                        Register
                    </RegisterButton>
                    <RegisterChangeMode onClick={() => replace("/login")}>{"Already have an account? Login here"}</RegisterChangeMode>
                    {error && <RegisterError>{error}</RegisterError>}
                </form>
            </RegisterCard>
        </RegisterContainer>
    );
};

export default RegisterPageComponent;