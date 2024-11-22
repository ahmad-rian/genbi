import React, { useState, useEffect } from "react";
import { Head, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AdminLayout from "@/Layouts/AdminLayout";
import { Editor } from '@tinymce/tinymce-react';

export default function Edit({ artikel, kategori }) {
  const { data, setData, put, processing, errors } = useForm({
    title: artikel.title || '',
    content: artikel.content || '',
    kategori_id: artikel.kategori_id || '',
    excerpt: artikel.excerpt || '',
    is_published: artikel.is_published || false,
    thumbnail: artikel.thumbnail || null,  // Handle thumbnail separately
  });

  useEffect(() => {
    // Set initial thumbnail if exists
    setData('thumbnail', artikel.thumbnail);
  }, [artikel]);

  const handleSubmit = (e) => {
    e.preventDefault();

    put(route('admin.artikel.update', artikel.id), {
      onSuccess: () => {
        Inertia.visit(route('admin.artikel.index'));
      },
    });
  };

  const handleFileChange = (e) => {
    setData('thumbnail', e.target.files[0]);
  };

  const handleEditorChange = (content, editor) => {
    setData('content', content);
  };

  return (
    <AdminLayout>
        <Head title="Edit Artikel" />
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Edit Artikel</h1>

        {/* Edit Form */}
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

            {/* Thumbnail */}
            <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail</label>
                <input
                type="file"
                name="thumbnail"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                onChange={handleFileChange}
                />
                {artikel.thumbnail && (
                    <div className="mt-2">
                        <img src={`/storage/thumbnailArtikel/${artikel.thumbnail}`} alt="Thumbnail" className="w-32 h-32 object-cover" />
                    </div>
                )}
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


            {/* Excerpt */}
            <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
                <textarea
                name="excerpt"
                value={data.excerpt}
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                onChange={(e) => setData('excerpt', e.target.value)}
                />
                {errors.excerpt && <span className="text-red-600 text-xs">{errors.excerpt}</span>}
            </div>

            {/* WYSIWYG Editor for Content */}
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Konten Artikel</label>
                <Editor
                    apiKey="3h8tui8ygiso22g00spbehkvzadtjq9m99zwq2ld2o2pv8k2"
                    value={data.content}
                    init={{
                    height: 400,
                    menubar: false,
                    plugins: 'advlist autolink lists link image charmap print preview anchor',
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                    }}
                    onEditorChange={handleEditorChange}
                />
                {errors.content && <span className="text-red-600 text-xs">{errors.content}</span>}
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-end space-x-2">
            <button type="button" onClick={() => window.history.back()} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Batal</button>
            <button type="submit" disabled={processing} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Ubah Artikel</button>
            </div>
        </form>
        </div>
    </AdminLayout>
  );
}
