export type ThreadsPaginated = {
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
    userId?: number;
    title?: string;
    createdAt?: Date;
    username?: string;
}

export type Pageable = {
    sort?: Sort;
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    unpaged?: boolean;
    paged?: boolean;
}

export type Sort = {
    empty?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
}
