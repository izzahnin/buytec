import { ReviewProps } from "../review/review";

export interface PerfumeProps {
    id: string,
    name: string,
    image: string,
    price: number,
    brand: string,
    occasion: string,
    size: number,
    concentration: string,
    origin: string,
    topNotes: string[],
    middleNotes: string[],
    baseNotes: string[],
    gender: string,
    description: string,
    stock: number,
    reviews: ReviewProps[],
}

export function jsonToParfume(json: { [key: string]: any}): PerfumeProps {
    return {
        id: json.id || "",
        name: json.name || "",
        image: json.image || "",
        price: json.price || "",
        brand: json.brand || "",
        occasion: json.occasion || "",
        size: json.size || "",
        concentration: json.concentration || "",
        origin: json.origin || "",
        topNotes: Array.isArray(json.topNotes) ? json.topNotes : [],
        middleNotes: Array.isArray(json.middleNotes) ? json.middleNotes : [],
        baseNotes: Array.isArray(json.baseNotes) ? json.baseNotes : [],
        gender: json.gender || "",
        description: json.description || "",
        stock: json.stock || "",
        reviews: Array.isArray(json.revies) ? json.reviews : [],
    }
}