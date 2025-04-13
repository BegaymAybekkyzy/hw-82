export interface IArtistMutation {
    name: string;
    info?: string;
    photo?: string | null;
}

export interface IArtist extends IArtistMutation {
    _id: string;
}

export interface IAlbumMutation {
    artist: string;
    title: string;
    album_year: number;
    cover?: string | null;
}

export interface IAlbum extends IAlbumMutation {
    _id: string;
}