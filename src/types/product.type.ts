export type ProductType = {
    sold:number,
    images:string[],
    subcategory:SubcategoryType[],
    ratingsQuantity:number,
    _id:string,
    title:string,
    slug:string,
    description:string,
    quantity:number,
    price:number,
    imageCover:string,
    category:CategoryType,
    brand:BrandType,
    ratingsAverage:number,
    createdAt:string,
    updatedAt:string,
    id:string,
}

type SubcategoryType = {
    _id:string,
    name:string,
    category:string,
    slug:string
}

export type CategoryType = {
    image:string,
    name:string,
    slug:string,
    _id:string,
}

type BrandType = {
    image:string,
    name:string,
    slug:string,
    _id:string,
}