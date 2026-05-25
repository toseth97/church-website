"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "other",
    isFeatured: false,
    image: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (data.ok) setEvents(data.events);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({ title: "", description: "", date: "", time: "", location: "", category: "other", isFeatured: false, image: "" });
    setEditingId(null);
    setShowForm(false);
    setError("");
  }

  function editEvent(event) {
    setForm({
      title: event.title,
      description: event.description,
      date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
      time: event.time || "",
      location: event.location || "",
      category: event.category || "other",
      isFeatured: event.isFeatured || false,
      image: event.image || "",
    });
    setEditingId(event._id);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const body = { ...form, date: new Date(form.date).toISOString() };
      let res;

      if (editingId) {
        res = await fetch("/api/events", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: editingId, ...body }),
        });
      } else {
        res = await fetch("/api/events", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      const data = await res.json();
      if (!data.ok) {
        setError(data.error || "Failed to save event");
        return;
      }

      resetForm();
      await loadEvents();
    } catch (err) {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteEvent(id) {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.ok) await loadEvents();
    } catch (err) {
      console.error(err);
    }
  }

  const categories = ["worship", "fellowship", "outreach", "conference", "charity", "other"];

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
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-500 mt-1">Manage church events</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-gradient-to-r from-[#F2C79B] to-[#d4a574] text-black font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          + Add Event
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{editingId ? "Edit Event" : "Add Event"}</h2>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    placeholder="e.g. 9:00 AM - 12:00 PM"
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                  />
                </div>
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
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#F2C79B] transition"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[#F2C79B] focus:ring-[#F2C79B]"
                />
                <label className="text-sm font-semibold text-gray-700">Featured Event</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-[#F2C79B] to-[#d4a574] text-black font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingId ? "Update Event" : "Create Event"}
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

      {/* Events List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {events.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">📅</span>
            <p className="text-gray-500 text-lg">No events yet</p>
            <p className="text-gray-400 text-sm mt-1">Click &quot;Add Event&quot; to create your first event</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{event.title}</div>
                      <div className="text-sm text-gray-500 mt-0.5 truncate max-w-xs">{event.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {event.date ? new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                        {event.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {event.isFeatured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">Featured</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => editEvent(event)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEvent(event._id)}
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
