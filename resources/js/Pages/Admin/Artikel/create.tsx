import { Head, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminLayout from "@/Layouts/AdminLayout";
import { Editor } from '@tinymce/tinymce-react';

export default function Create({kategori}) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        kategori_id: '',
        excerpt: '',
        is_published: false,
        thumbnail: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('admin.artikel.store'), {
        onSuccess: () => {
            // Optional: Redirect to artikel index page after successful submission
            Inertia.visit(route('admin.artikel.index'));
        },
        });
    };

  const handleFileChange = (e) => {
    setData('thumbnail', e.target.files[0]);
  };

  const handleEditorChange = (content) => {
    setData('content', content); // Update content with the editor's value
  };

  return (
    <AdminLayout>
        <Head title="Tambah Artikel" />
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Tambah Artikel</h1>

        {/* Create Form */}
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            {/* Title */}
            <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Artikel</label>
            <input
                type="text"
                id="title"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                placeholder="Masukkan judul artikel"
            />
            {errors.title && <span className="text-red-600 text-xs">{errors.title}</span>}
            </div>

            <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail</label>
                <input
                type="file"
                name="thumbnail"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                onChange={handleFileChange}
                />
            </div>

            {/* Category */}
            <div>
                <label htmlFor="kategori_id" className="block text-sm font-medium text-gray-700">Kategori Artikel</label>
                <select
                id="kategori_id"
                value={data.kategori_id}
                onChange={(e) => setData('kategori_id', e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                >
                <option value="">Pilih Kategori</option>
                {kategori.map((ktg) => (
                    <option key={ktg.id} value={ktg.id}>
                    {ktg.nama}
                    </option>
                ))}
                </select>
                {errors.kategori_id && <span className="text-red-600 text-xs">{errors.kategori_id}</span>}
            </div>

            {/* Publish Status */}
            <div className="flex items-center">
            <label htmlFor="is_published" className="block text-sm font-medium text-gray-700 mr-2">Publikasikan</label>
            <input
                type="checkbox"
                id="is_published"
                checked={data.is_published}
                onChange={(e) => setData('is_published', e.target.checked)}
                className="form-checkbox h-4 w-4 text-green-500"
            />
            </div>

            <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
                <textarea
                name="excerpt"
                value={data.excerpt}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                onChange={(e) => setData('excerpt', e.target.value)}
                />
            </div>

            {/* WYSIWYG Editor for Content */}
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Konten Artikel</label>
                <Editor
                    apiKey="3h8tui8ygiso22g00spbehkvzadtjq9m99zwq2ld2o2pv8k2" // You can use the free TinyMCE API key, or use your own
                    value={data.content}
                    init={{
                    height: 400,
                    menubar: false,
                    plugins: 'advlist autolink lists link image charmap print preview anchor',
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                    }}
                    onEditorChange={handleEditorChange} // Handle editor change event
                />
                {errors.content && <span className="text-red-600 text-xs">{errors.content}</span>}
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => window.history.back()} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Batal</button>
            <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Simpan Artikel</button>
            </div>
        </form>
        </div>
    </AdminLayout>
  );
}
