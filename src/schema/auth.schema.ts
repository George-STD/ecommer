import * as zod from 'zod'

export const RegisterSchema = zod.object({
    name: zod.string().nonempty('Name Is Required').min(3, 'Minmum 3 Chars').max(20, 'Maxmum 20 Chars'),
    email: zod.email('Email Must Be Valid').nonempty('Email is Required'),
    password: zod.string().nonempty('Password Is Required').regex(/^[A-Z][A-Za-z0-9]{5,}$/, 'Password Must Start With Capital Letter Followed By Atleast 5 Chars'),
    rePassword: zod.string().nonempty('Password Is Required').regex(/^[A-Z][A-Za-z0-9]{5,}$/, 'Password Must Start With Capital Letter Followed By Atleast 5 Chars'),
    phone: zod.string().nonempty('Phone Is Required').regex(/^01[0125][0-9]{8}$/, 'Phone Must Be Egyption Number')
}).refine((object) => object.password === object.rePassword, {
    path: ['rePassword'],
    message: 'Confirm Password Is Not Match Password'
});

export type RegisterType = zod.infer<typeof RegisterSchema>




export const LoginSchema = zod.object({
    email: zod.email('Email Must Be Valid').nonempty('Email is Required'),
    password: zod.string().nonempty('Password Is Required').regex(/^[A-Z][A-Za-z0-9]{5,}$/, 'Password Must Start With Capital Letter Followed By Atleast 5 Chars'),
})

export type LoginType = zod.infer<typeof LoginSchema>




export const ForgetSchema = zod.object({
    email: zod.email('Email Must Be Valid').nonempty('Email is Required'),
})

export type ForgetType = zod.infer<typeof ForgetSchema>




export const VerifySchema = zod.object({
    resetCode: zod.string('').nonempty('Reset Code is Required'),
})

export type VerifyType = zod.infer<typeof VerifySchema>




export const ResetSchema = zod.object({
    email: zod.email('Email Must Be Valid').nonempty('Email is Required'),
    newPassword: zod.string().nonempty('Password Is Required').regex(/^[A-Z][A-Za-z0-9]{5,}$/, 'Password Must Start With Capital Letter Followed By Atleast 5 Chars'),
})

export type ResetType = zod.infer<typeof ResetSchema>