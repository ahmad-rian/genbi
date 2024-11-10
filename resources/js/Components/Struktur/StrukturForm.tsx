import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Switch } from '@/Components/ui/switch';
import { toast } from 'sonner';

interface Struktur {
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
}

interface Props {
  initialData?: Struktur;
  isEdit?: boolean;
}

export default function StrukturForm({ initialData, isEdit = false }: Props) {
  const [preview, setPreview] = useState<string>('');
  
  const form = useForm({
    nama_lengkap: initialData?.nama_lengkap || '',
    foto: null as File | null,
    jabatan: initialData?.jabatan || '',
    universitas: initialData?.universitas || '',
    komisariat: initialData?.komisariat || '',
    quote: initialData?.quote || '',
    periode: initialData?.periode || '',
    is_active: initialData?.is_active ?? true,
    urutan: initialData?.urutan ?? 0,
  });

  useEffect(() => {
    if (initialData?.foto_url) {
      setPreview(initialData.foto_url);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const routeName = isEdit 
      ? route('admin.struktur.update', initialData?.id)
      : route('admin.struktur.store');

    const method = isEdit ? 'put' : 'post';

    form.submit(method, routeName, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        toast.success(isEdit ? 'Pengurus berhasil diperbarui' : 'Pengurus berhasil ditambahkan');
        router.visit(route('admin.struktur'));
      },
      onError: (errors) => {
        toast.error('Gagal memproses data', {
          description: Object.values(errors).join('\n')
        });
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi ukuran file (2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Error', {
          description: 'Ukuran file tidak boleh lebih dari 2MB'
        });
        e.target.value = '';
        return;
      }

      // Validasi tipe file
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Error', {
          description: 'Tipe file harus berupa JPG, PNG, atau GIF'
        });
        e.target.value = '';
        return;
      }
      
      form.setData('foto', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-md">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <CardHeader>
          <CardTitle>
            {isEdit ? 'Edit' : 'Tambah'} Pengurus
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
            <Input
              id="nama_lengkap"
              value={form.data.nama_lengkap}
              onChange={e => form.setData('nama_lengkap', e.target.value)}
              className={form.errors.nama_lengkap ? 'border-red-500' : ''}
              required
            />
            {form.errors.nama_lengkap && (
              <p className="text-sm text-red-500">{form.errors.nama_lengkap}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="foto">
              Foto
              <span className="text-sm text-muted-foreground ml-2">
                (Max 2MB, Format: JPG, PNG, GIF)
              </span>
            </Label>
            <Input
              id="foto"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={form.errors.foto ? 'border-red-500' : ''}
            />
            {form.errors.foto && (
              <p className="text-sm text-red-500">{form.errors.foto}</p>
            )}
            {form.progress && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all"
                  style={{ width: `${form.progress.percentage}%` }}
                />
              </div>
            )}
            {preview && (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jabatan">Jabatan</Label>
            <Input
              id="jabatan"
              value={form.data.jabatan}
              onChange={e => form.setData('jabatan', e.target.value)}
              className={form.errors.jabatan ? 'border-red-500' : ''}
              required
            />
            {form.errors.jabatan && (
              <p className="text-sm text-red-500">{form.errors.jabatan}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="universitas">Universitas</Label>
            <Input
              id="universitas"
              value={form.data.universitas}
              onChange={e => form.setData('universitas', e.target.value)}
              className={form.errors.universitas ? 'border-red-500' : ''}
              required
            />
            {form.errors.universitas && (
              <p className="text-sm text-red-500">{form.errors.universitas}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="komisariat">Komisariat</Label>
            <Input
              id="komisariat"
              value={form.data.komisariat}
              onChange={e => form.setData('komisariat', e.target.value)}
              className={form.errors.komisariat ? 'border-red-500' : ''}
              required
            />
            {form.errors.komisariat && (
              <p className="text-sm text-red-500">{form.errors.komisariat}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote">Quote</Label>
            <Textarea
              id="quote"
              value={form.data.quote || ''}
              onChange={e => form.setData('quote', e.target.value)}
              className={`min-h-[100px] ${form.errors.quote ? 'border-red-500' : ''}`}
            />
            {form.errors.quote && (
              <p className="text-sm text-red-500">{form.errors.quote}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="periode">Periode</Label>
            <Input
              id="periode"
              value={form.data.periode || ''}
              onChange={e => form.setData('periode', e.target.value)}
              placeholder="Contoh: 2023-2024"
              className={form.errors.periode ? 'border-red-500' : ''}
            />
            {form.errors.periode && (
              <p className="text-sm text-red-500">{form.errors.periode}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="urutan">Urutan</Label>
            <Input
              id="urutan"
              type="number"
              value={form.data.urutan}
              onChange={e => form.setData('urutan', parseInt(e.target.value))}
              min="0"
              className={form.errors.urutan ? 'border-red-500' : ''}
              required
            />
            {form.errors.urutan && (
              <p className="text-sm text-red-500">{form.errors.urutan}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={form.data.is_active}
              onCheckedChange={checked => form.setData('is_active', checked)}
            />
            <Label htmlFor="is_active">Active</Label>
            {form.errors.is_active && (
              <p className="text-sm text-red-500">{form.errors.is_active}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.visit(route('admin.struktur'))}
            disabled={form.processing}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={form.processing}
            className="min-w-[100px]"
          >
            {form.processing ? 'Loading...' : (isEdit ? 'Update' : 'Simpan')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}