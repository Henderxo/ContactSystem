export interface GetAllDataOptions {
    collectionName: String;
    expand?: String | null;
    id?: String;
    page?: Number | null;
    perPage?: Number | null;
    search?: String | null;
    filter?: Filter| null | Filter[];
}

export interface Filter{
    variableName: String;
    variableId: String;
}