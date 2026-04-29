import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export class ApiError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
        this.name = 'ApiError'

        Object.setPrototypeOf(this, ApiError.prototype)
    }
}

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T>{
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    const cookieStore = await cookies()
    const token = cookieStore.get('TrainLabAuth')?.value

    const headers = {
        "Content-Type": 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
    }

    const response = await fetch(`${baseUrl}${endpoint}`, { ...options, headers })

    if(response.status === 401) {
        redirect('/?message=invalid_token')
    }

    if(!response.ok){
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(errorData.message || 'Erro na API', response.status)
    }

    return response.json()
}