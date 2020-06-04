export interface Task {
    taskId?: number,
    taskName: string,
    startTime: Date,
    endTime: Date,
    finished?: boolean,
    status?: status
    account_id?: status
}

export interface FindMany {
    taskId?: number
    taskName?: string,
    startTime?: Date,
    endTime?: Date,
    finished?: boolean,
    status?: status,
    account_id?: number,
}

export interface Filter {
    keySearch: string,
    account_id: number,
}

export interface UpdateOne {
    taskName?: string,
    startTime?: Date,
    endTime?: Date,
    finished?: boolean,
    status?: status,
}

export interface FindOne {
    taskId?: number
}
export enum status {
    IN_PROGRESS = 'IN_PROGRESS',
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
    BLOCK = 'BLOCK',
}