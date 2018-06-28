export interface Datum {
    id: number;
    name: string;
    picture: string;
}
export interface myMealsObject {
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
export interface createMeal {
    id: number;
    name: string;
    user_id: number;
    picture: string;
}