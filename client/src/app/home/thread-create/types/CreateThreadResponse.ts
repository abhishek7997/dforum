export type CreateThreadResponse = {
    threadId?: number;
    title?: string;
    content?: string;
    createdAt?: Date;
    user?: User;
}

export type User = {
    userId?: number;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
    username?: string;
}
