export interface IArtistMutation {
    name: string;
    info?: string;
    photo?: string | null;
}

export interface IArtist  {
    _id: string;
}

export interface IAlbumMutation {
    artist: string ;
    title: string;
    album_year: number;
    cover?: string | null;
}

export interface IAlbum  {
    _id: string;
}

export interface ITrackMutation {
    title: string;
    album: string;
    duration?: string;
}
