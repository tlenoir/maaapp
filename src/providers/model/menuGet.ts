

export interface Traiteur {
    id: number;
    nom: string;
    prenom: string;
}

export interface Meal {
    id: number;
    name: string;
    picture?: any;
}

export interface Datum {
    id: number;
    traiteur_id: number;
    meal_id: number;
    date: string;
    traiteur: Traiteur[];
    meal: Meal[];
}

export interface menuGetObject {
    current_page: number;
    data: Datum[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url?: any;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
}



