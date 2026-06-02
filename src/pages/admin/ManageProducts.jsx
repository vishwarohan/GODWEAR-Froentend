import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';
import AdminShell from './AdminShell';
import { useCreateProductMutation, useDeleteProductMutation, useGetCategoriesQuery, useGetProductsQuery, useUpdateProductMutation } from '../../redux/api/productApi';
import { getApiError } from '../../redux/api/baseApi';
import { setSeo } from '../../utils/seo';

const empty = { name: '', description: '', price: '', discountPrice: '', category: '', sizes: 'S,M,L,XL', colors: 'Black,Gold', imageUrls: '', stock: 10, isFeatured: false };

const ManageProducts = () => {
  const { data } = useGetProductsQuery({ limit: 200 });
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery();
  const [form, setForm] = useState(empty);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  useEffect(() => setSeo('Manage Products', 'Create, edit, delete, upload, and feature GOD WEAR products.'), []);
  const products = data?.products || data || [];

  const body = () => {
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value ?? ''));
    payload.append('existingImages', JSON.stringify(existingImages));
    imageFiles.forEach((file) => payload.append('images', file));
    return payload;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.category) return toast.error('Please choose a category.');
    try {
      editing ? await updateProduct({ id: editing, body: body() }).unwrap() : await createProduct(body()).unwrap();
      toast.success(editing ? 'Product updated' : 'Product created');
      setForm(empty); setImageFiles([]); setExistingImages([]); setEditing(null);
    } catch (err) {
      toast.error(getApiError(err, 'Could not save product.'));
    }
  };

  const startEdit = (product) => {
    setEditing(product._id);
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      discountPrice: product.discountPrice || '',
      category: product.category || '',
      sizes: product.sizes?.join(',') || '',
      colors: product.colors?.join(',') || '',
      imageUrls: '',
      stock: product.stock ?? 0,
      isFeatured: Boolean(product.isFeatured),
    });
    setExistingImages(product.images || []);
    setImageFiles([]);
  };

  return (
    <AdminShell title="Products">
      {categoriesError && <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">{getApiError(categoriesError, 'Could not load categories.')}</div>}
      <form onSubmit={submit} className="grid gap-3 rounded-xl border border-god-border bg-god-card p-5 md:grid-cols-2">
        <input className="input-god" placeholder="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <select className="input-god" value={form.category} disabled={categoriesLoading} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="">{categoriesLoading ? 'Loading categories...' : 'Choose category'}</option>
          {form.category && !categories.some((category) => category.name === form.category) && <option value={form.category}>{form.category}</option>}
          {categories.map((category) => <option key={category._id} value={category.name}>{category.name}{category.isActive ? '' : ' (hidden)'}</option>)}
        </select>
        {['price', 'discountPrice', 'stock', 'sizes', 'colors', 'imageUrls'].map((field) => <input key={field} className="input-god" placeholder={field === 'imageUrls' ? 'Optional image URLs, comma separated' : field} value={form[field] ?? ''} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />)}
        <input className="input-god md:col-span-2" type="file" accept="image/*" multiple onChange={(e) => setImageFiles(Array.from(e.target.files || []))} />
        {existingImages.length > 0 && (
          <div className="flex flex-wrap gap-3 md:col-span-2">
            {existingImages.map((image, index) => (
              <div key={`${image.slice(0, 40)}-${index}`} className="relative h-20 w-20 overflow-hidden rounded-xl border border-god-border bg-black/30">
                <img src={image} alt={`Product ${index + 1}`} className="h-full w-full object-cover" />
                <button type="button" className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/75 text-xs text-white hover:text-red-300" onClick={() => setExistingImages((images) => images.filter((_, imageIndex) => imageIndex !== index))} aria-label="Remove image"><FaTimes /></button>
              </div>
            ))}
          </div>
        )}
        <textarea className="input-god md:col-span-2" placeholder="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <label className="flex items-center gap-2 text-sm text-god-muted"><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} /> Featured</label>
        <button className="btn-gold">{editing ? 'Update Product' : 'Add Product'}</button>
      </form>
      <div className="mt-8 grid gap-3">{products.map((product) => <div key={product._id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-god-border bg-god-card p-4"><div className="flex items-center gap-3">{product.images?.[0] && <img src={product.images[0]} alt={product.name} className="h-14 w-14 rounded-xl object-cover" />}<span>{product.name} <span className="text-sm text-god-muted">/ {product.category}</span></span></div><div className="flex gap-2"><button className="btn-outline" onClick={() => startEdit(product)}>Edit</button><button className="btn-outline" onClick={async () => {
        try {
          await deleteProduct(product._id).unwrap();
          toast.success('Deleted');
        } catch (err) {
          toast.error(getApiError(err, 'Could not delete product.'));
        }
      }}>Delete</button></div></div>)}</div>
    </AdminShell>
  );
};

export default ManageProducts;
