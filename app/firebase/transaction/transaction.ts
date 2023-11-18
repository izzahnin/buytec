export interface TransactionProps {
    id: string,
    userId: string
    perfumeId: string[],
    amount: number[],
    totalAmount: number[],
    packageStatus: string,
}

export function jsonToTransaction(json: { [key: string]: any}): TransactionProps {
    return {
        id: json.id || "",
        userId: json.userId || "",
        perfumeId: Array.isArray(json.perfumeId) ? json.perfumeId : [],
        amount: Array.isArray(json.amount) ? json.amount : [],
        totalAmount: Array.isArray(json.totalAmount) ? json.totalAmount : [],
        packageStatus: json.packageStatus || "",
    }
}