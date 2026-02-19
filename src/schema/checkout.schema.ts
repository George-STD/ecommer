import * as zod from 'zod'

export const checkOutSckema = zod.object({
    details:zod.string('Details Must Be String').nonempty('Details Is Required'),
    phone:zod.string('Phone Must Be String').nonempty('Phone Is Required').regex(/^(\+2)?01[0125][0-9]{8}$/ ,'Phone Must Be Egyption , Country Code Is Optional'),
    city:zod.string('City Must Be String').nonempty('City Is Required'),
})

export type CheckOutType = zod.infer<typeof checkOutSckema>
