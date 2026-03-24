import z from 'zod'

export const RegisterSchema = z.object({
    name: z
        .string()
        .min(2, 'Seu nome deve conter pelo menos 2 caracteres')
        .max(32, 'Seu nome deve conter no máximo 32 caracteres'),

    email: z
        .string()
        .min(6, 'Seu email deve conter no máximo 6 caracteres')
        .max(50, 'Seu email deve conter no máximo 50 caracteres'),
    
    password: z
        .string()
        .min(8, 'A senha deve conter no mínimo 8 caracteres')
        .max(14, 'A senha deve conter no mínimo 14 caracteres'),

    password2: z
        .string()
        .min(8, 'A senha deve conter no mínimo 8 caracteres')
        .max(14, 'A senha deve conter no mínimo 14 caracteres')
})
.refine((data) => data.password === data.password2, {
    message: 'As senhas não coincidem',
    path: ['password', 'password2']
})

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, 'Campo vazio'),
    
    password: z
        .string()
        .min(1, 'Campo vazio')
})

export type RegisterInput = z.infer<typeof RegisterSchema>
export type LoginInput = z.infer<typeof LoginSchema>