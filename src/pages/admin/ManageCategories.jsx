import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminShell from './AdminShell';
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from '../../redux/api/productApi';
import { getApiError } from '../../redux/api/baseApi';
import { setSeo } from '../../utils/seo';

const empty = { name: '', description: '', imageUrl: '', isActive: true };

const ManageCategories = () => {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();
  const [form, setForm] = useState(empty);
  const [imageFile, setImageFile] = useState(null);
  const [editing, setEditing] = useState(null);
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  useEffect(() => setSeo('Manage Categories', 'Create and manage GOD WEAR product categories.'), []);

  const buildBody = () => {
    const body = new FormData();
    body.append('name', form.name);
    body.append('description', form.description);
    body.append('isActive', String(form.isActive));
    if (form.imageUrl) body.append('imageUrl', form.imageUrl);
    if (imageFile) body.append('image', imageFile);
    return body;
  };

  const resetForm = () => {
    setForm(empty);
    setImageFile(null);
    setEditing(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Category name is required.');
    try {
      if (editing) await updateCategory({ id: editing, body: buildBody() }).unwrap();
      else await createCategory(buildBody()).unwrap();
      toast.success(editing ? 'Category updated' : 'Category added');
      resetForm();
    } catch (err) {
      toast.error(getApiError(err, 'Could not save category.'));
    }
  };

  const startEdit = (category) => {
    setEditing(category._id);
    setForm({
      name: category.name,
      description: category.description || '',
      imageUrl: category.image?.startsWith('data:') ? '' : category.image || '',
      isActive: category.isActive,
    });
    setImageFile(null);
  };

  return (
    <AdminShell title="Categories">
      <form onSubmit={submit} className="grid gap-3 rounded-xl border border-god-border bg-god-card p-5 md:grid-cols-2">
        <input className="input-god" placeholder="Category name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input-god" placeholder="Optional image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
        <textarea className="input-god md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="input-god" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        <label className="flex items-center gap-2 text-sm text-god-muted">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          Active category
        </label>
        <div className="flex gap-3 md:col-span-2">
          <button className="btn-gold flex-1" disabled={isCreating || isUpdating}>{editing ? 'Update Category' : 'Add Category'}</button>
          {editing && <button type="button" className="btn-outline" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <div className="mt-8 grid gap-3">
        {isLoading && <div className="rounded-xl border border-god-border bg-god-card p-5 text-god-muted">Loading categories...</div>}
        {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-200">{getApiError(error, 'Could not load categories.')}</div>}
        {!isLoading && !categories.length && <div className="rounded-xl border border-god-border bg-god-card p-5 text-god-muted">No categories yet. Add your first category above.</div>}
        {categories.map((category) => (
          <article key={category._id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-god-border bg-god-card p-4">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-xl border border-god-border bg-black/30">
                {category.image ? <img src={category.image} alt={category.name} className="h-full w-full object-cover" /> : <span className="font-heading text-2xl text-god-gold">{category.name[0]}</span>}
              </div>
              <div>
                <h2 className="font-bold text-white">{category.name}</h2>
                <p className="text-sm text-god-muted">{category.isActive ? 'Active' : 'Hidden'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-outline" onClick={() => startEdit(category)}>Edit</button>
              <button className="btn-outline" onClick={async () => {
                try {
                  await deleteCategory(category._id).unwrap();
                  toast.success('Category deleted');
                } catch (err) {
                  toast.error(getApiError(err, 'Could not delete category.'));
                }
              }}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
};

export default ManageCategories;
