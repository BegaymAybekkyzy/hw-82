export interface IArtistMutation {
    name: string;
    info?: string;
    photo?: string | null;
}

export interface IArtist extends IArtistMutation {
    id: string;
}