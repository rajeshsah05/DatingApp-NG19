export type Member = {
    id: string
    dateOfBirth: string
    imageUrl?: string
    displayName: string
    created: string
    lastActive: string
    gender: string
    description?: any
    city: string
    country: string
}

export type Photo = {
    id: number;
    url: string;
    publicId?: string;
    memberId: string;
}