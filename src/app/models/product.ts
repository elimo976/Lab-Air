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
}

export interface IProductWithSize extends Omit<IProduct, 'selectedSize'> {
    selectedSize: { sizeId: number; num: string };
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
}

export class ThumbnailsDTO {
    thumb: string = "";
}