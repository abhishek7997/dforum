export type PostsPaginated = {
    content?: Content[];
    pageable?: Pageable;
    last?: boolean;
    totalElements?: number;
    totalPages?: number;
    size?: number;
    number?: number;
    sort?: Sort;
    first?: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type Content = {
    threadId?: number;
    postId?: number;
    userId?: number;
    username?: string;
    postBody?: string;
    threadTitle?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Pageable = {
    sort?: Sort;
    offset?: number;
    pageSize?: number;
    pageNumber?: number;
    paged?: boolean;
    unpaged?: boolean;
}

export type Sort = {
    empty?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
}
