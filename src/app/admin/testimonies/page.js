"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminTestimoniesPage() {
  const router = useRouter();
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    title: "",
    testimony: "",
    imageUrl: "",
    role: "Member",
    rating: 5,
    isApproved: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTestimonies();
  }, []);

  async function loadTestimonies() {
    try {
      const res = await fetch("/api/testimonies?approved=false");
      const data = await res.json();
      if (data.ok) setTestimonies(data.testimonies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({ name: "", title: "", testimony: "", imageUrl: "", role: "Member", rating: 5, isApproved: true });
    setEditingId(null);
    setShowForm(false);
    setError("");
  }

  function editTestimony(t) {
    setForm({
      name: t.name,
      title: t.title,
      testimony: t.testimony,
      imageUrl: t.imageUrl || "",
      role: t.role || "Member",
      rating: t.rating || 5,
      isApproved: t.isApproved !== false,
    });
    setEditingId(t._id);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      let res;
      if (editingId) {
        res = await fetch("/api/testimonies", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: editingId, ...form }),
        });
      } else {
        res = await fetch("/api/testimonies", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Failed to save testimony");
        return;
      }

      resetForm();
      await loadTestimonies();
    } catch (err) {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteTestimony(id) {
    if (!confirm("Are you sure you want to delete this testimony?")) return;

    try {
      const res = await fetch(`/api/testimonies?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.ok) await loadTestimonies();
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F2C79B]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonies</h1>
          <p className="text-gray-500 mt-1">Manage church testimonies</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-gradient-to-r from-[#F2C79B] to-[#d4a574] text-black font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          + Add Testimony
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{editingId ? "Edit Testimony" : "Add Testimony"}</h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                    placeholder="e.g. Member, Deacon"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Testimony *</label>
                <textarea
                  value={form.testimony}
                  onChange={(e) => setForm({ ...form, testimony: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                  rows={5}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Rating (1-5)</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                  >
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isApproved}
                      onChange={(e) => setForm({ ...form, isApproved: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#F2C79B] focus:ring-[#F2C79B]"
                    />
                    <span className="text-sm font-semibold text-gray-700">Approved</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-[#F2C79B] to-[#d4a574] text-black font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingId ? "Update Testimony" : "Create Testimony"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonies Grid */}
      {testimonies.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center py-16">
          <span className="text-5xl block mb-4">💬</span>
          <p className="text-gray-500 text-lg">No testimonies yet</p>
          <p className="text-gray-400 text-sm mt-1">Click &quot;Add Testimony&quot; to create your first testimony</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonies.map((t) => (
            <div key={t._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F2C79B] to-[#d4a574] flex items-center justify-center text-black font-bold text-lg">
                    {t.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{t.name}</h3>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {t.isApproved ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">Approved</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">Pending</span>
                  )}
                </div>
              </div>

              <h4 className="font-semibold text-gray-800 mb-2">{t.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">{t.testimony}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < t.rating ? "text-amber-400" : "text-gray-200"}>★</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => editTestimony(t)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTestimony(t._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
