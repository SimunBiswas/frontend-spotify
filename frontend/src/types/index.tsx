export interface Song {
    _id: string;
    title : string;
    artist : string;
    albumId : string | null;
    imageUrl : string;
    audioUrl : string;
    duration : number;
    createdAt : string;
    updatedAt : string;
    error : string | null;
}


export interface Album {
    _id: string;
    title : string;
    artist : string;
    imageUrl : string;
    releaseYear : number
    songs : Song[];
    error : string | null;
}

export interface User {
    _id: string;
    email: string;
    fullName: string;
    lastName: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    error: string | null;
    clerkId : string
    currentUserId : string | null;
    userId: string | "user_2y5rl2EZu6zM96vRGbOY4p5DVmW";

}

export interface Stats{
    totalSongs : number;
    totalAlbums : number;
    totalUsers : number;
    totalArtists : number;
}

export interface Message{
    _id : string;
    senderId  : string;
    receiverId : string;
    content :string;
    createdAt : string;
    updatedAt : string;
    userId: string | null;

}