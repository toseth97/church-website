"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSermonsPage() {
  const router = useRouter();
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    speaker: "",
    date: "",
    audioUrl: "",
    videoUrl: "",
    imageUrl: "",
    category: "sunday",
    tags: "",
    isFeatured: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSermons();
  }, []);

  async function loadSermons() {
    try {
      const res = await fetch("/api/sermons");
      const data = await res.json();
      if (data.ok) setSermons(data.sermons);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({ title: "", description: "", speaker: "", date: "", audioUrl: "", videoUrl: "", imageUrl: "", category: "sunday", tags: "", isFeatured: false });
    setEditingId(null);
    setShowForm(false);
    setError("");
  }

  function editSermon(sermon) {
    setForm({
      title: sermon.title,
      description: sermon.description,
      speaker: sermon.speaker,
      date: sermon.date ? new Date(sermon.date).toISOString().split("T")[0] : "",
      audioUrl: sermon.audioUrl || "",
      videoUrl: sermon.videoUrl || "",
      imageUrl: sermon.imageUrl || "",
      category: sermon.category || "sunday",
      tags: Array.isArray(sermon.tags) ? sermon.tags.join(", ") : "",
      isFeatured: sermon.isFeatured || false,
    });
    setEditingId(sermon._id);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const body = {
        ...form,
        date: new Date(form.date).toISOString(),
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      };
      let res;

      if (editingId) {
        res = await fetch("/api/sermons", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: editingId, ...body }),
        });
      } else {
        res = await fetch("/api/sermons", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Failed to save sermon");
        return;
      }

      resetForm();
      await loadSermons();
    } catch (err) {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteSermon(id) {
    if (!confirm("Are you sure you want to delete this sermon?")) return;

    try {
      const res = await fetch(`/api/sermons?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.ok) await loadSermons();
    } catch (err) {
      console.error(err);
    }
  }

  const categories = ["sunday", "wednesday", "friday", "special", "series", "other"];

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
          <h1 className="text-3xl font-bold text-gray-900">Sermons</h1>
          <p className="text-gray-500 mt-1">Manage church sermons</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-gradient-to-r from-[#F2C79B] to-[#d4a574] text-black font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          + Add Sermon
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{editingId ? "Edit Sermon" : "Add Sermon"}</h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Speaker *</label>
                  <input
                    type="text"
                    value={form.speaker}
                    onChange={(e) => setForm({ ...form, speaker: e.target.value })}
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Audio URL</label>
                <input
                  type="text"
                  value={form.audioUrl}
                  onChange={(e) => setForm({ ...form, audioUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Video URL</label>
                <input
                  type="text"
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="faith, prayer, love"
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[#F2C79B] focus:ring-[#F2C79B]"
                />
                <label className="text-sm font-semibold text-gray-700">Featured Sermon</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-[#F2C79B] to-[#d4a574] text-black font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingId ? "Update Sermon" : "Create Sermon"}
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

      {/* Sermons List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {sermons.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">📖</span>
            <p className="text-gray-500 text-lg">No sermons yet</p>
            <p className="text-gray-400 text-sm mt-1">Click &quot;Add Sermon&quot; to create your first sermon</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Speaker</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sermons.map((sermon) => (
                  <tr key={sermon._id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{sermon.title}</div>
                      <div className="text-sm text-gray-500 mt-0.5 truncate max-w-xs">{sermon.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sermon.speaker}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {sermon.date ? new Date(sermon.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 capitalize">
                        {sermon.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => editSermon(sermon)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteSermon(sermon._id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
