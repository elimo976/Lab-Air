export interface IProduct {
    id: number;
    nome: string;
    categoria: string;
    prezzo: number;
    taglie_disponibili: string[];
    colori_disponibili: string[];
    descrizione: string;
    immagine: string;
    nuovi_arrivi: boolean;
    best_seller: number,
    thumbnails: IThumbnails,
    quantity: number;
}

export interface IThumbnails {
    thumb: string,
}

export class ProductDTO {
    id: number = 0;
    nome: string = "";
    categoria: string = "";
    prezzo: number = 0;
    taglie_disponibili: string[] = [];
    colori_disponibili: string[] = [];
    descrizione: string = "";
    immagine: string = "";
    nuovi_arrivi: boolean = false;
    best_seller: number = 0;
    thumbnails: ThumbnailsDTO = new ThumbnailsDTO();
    quantity: number = 0;
}

export class ThumbnailsDTO {
    thumb: string = "";
}