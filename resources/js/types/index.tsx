// types.ts

export interface User {
    id: number;
    name: string;
    email: string;
    type?: string;
    roles?: string[];
    permissions?: string[];
    // tambahkan atribut lain yang ada di model User Anda
}

export interface PageProps<T = {}> {
    auth?: {
        user?: User;
    };
    // Tipe data lain bisa ditambahkan di sini jika dibutuhkan
    props?: T;
}
