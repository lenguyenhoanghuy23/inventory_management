export interface CreateOrUpdateTransactionTypeInput{
    id: number
    transactionType: string,
    description: string
}
export interface UpdateTransactionTypeInput{
    id: number
    transactionType: string,
    description: string
}
export interface GetAllTransactionType{
    id: number
    transactionType: string,
    description: string
}
export interface GetTransactionTypeOutput{
    id: number
    transactionType: string,
    description: string
}