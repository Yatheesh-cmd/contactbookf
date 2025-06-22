import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = 'https://backbb-2ode.onrender.com/api/contacts';

function ContactForm({ fetchContacts, editContact, setEditContact }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editContact) {
      setFormData(editContact);
    }
  }, [editContact]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editContact) {
        const response = await axios.put(`${baseURL}/${editContact._id}`, formData);
        toast.success(response.data.message);
        setEditContact(null);
      } else {
        const response = await axios.post(`${baseURL}`, formData);
        toast.success(response.data.message);
      }
      setFormData({ name: '', email: '', phone: '' });
      fetchContacts();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error submitting form');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md mb-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <svg
          className="w-6 h-6 text-blue-600 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
          />
        </svg>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          {editContact ? 'Edit Contact' : 'Add New Contact'}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={`w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className={`w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className={`w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200"
        >
          {editContact ? 'Update Contact' : 'Add Contact'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
