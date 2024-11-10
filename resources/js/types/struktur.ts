export interface Struktur {
    id: number;
    nama_lengkap: string;
    foto: string | null;
    foto_url: string | null;
    jabatan: string;
    universitas: string;
    komisariat: string;
    quote: string | null;
    periode: string | null;
    is_active: boolean;
    urutan: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
  }
  
  export interface StrukturFormData {
    nama_lengkap: string;
    foto: File | null;
    jabatan: string;
    universitas: string;
    komisariat: string;
    quote: string | null;
    periode: string | null;
    is_active: boolean;
    urutan: number;
  }
  
  export interface StrukturFilters {
    search?: string;
    status?: string;
  }