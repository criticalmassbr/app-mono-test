import { NextResponse } from 'next/server';

export type SerializeResponse<T> = {
    status: number;
    statusText?: string;
    body?: T;
    error?: any;
    ok: boolean;
}
class Serializer {
    private static instance: Serializer;

    private constructor() {
    }

    public static getInstance(): Serializer {
        if (!Serializer.instance) {
            Serializer.instance = new Serializer();
        }
        return Serializer.instance;
    }

    public async response<T>(response: Response | NextResponse): Promise<SerializeResponse<T>> {
        const { status, statusText } = response;
        if (response.ok) {
            const body = await response.json();
            return { status, statusText, body, ok: response.ok } as SerializeResponse<T>;
        }
        return { status, statusText, error: statusText, ok: false } as SerializeResponse<T>;
    }
}

export default Serializer.getInstance(); 