export interface Success {
    id: number;
    lname: string;
    fname: string;
    email: string;
    token: string;
    userstype_id: number;
}

export interface loginModel {
    success: Success;
}

