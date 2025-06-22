import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = 'http://localhost:5001/api/contacts';

function ContactList({ contacts, fetchContacts, setEditContact }) {
  const handleDeleteContact = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      toast.success(response.data.message);
      fetchContacts();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error deleting contact');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">{contact.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{contact.email}</p>
              <p className="text-gray-600 text-sm">{contact.phone}</p>
              <p className="text-gray-400 text-xs mt-2">
                Added: {new Date(contact.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setEditContact(contact)}
                className="text-cyan-600 border border-cyan-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-50 hover:text-cyan-700 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteContact(contact._id)}
                className="text-red-600 border border-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
