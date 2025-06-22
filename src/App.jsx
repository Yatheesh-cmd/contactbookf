import { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = 'https://backbb-2ode.onrender.com/api/contacts'; // ✅ Define base URL here

function App() {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchContacts = async () => {
    try {
      const response = await axios.get(baseURL);
      setContacts(response.data);
    } catch (err) {
      toast.error('Error fetching contacts');
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const response = await axios.get(`${baseURL}/search?query=${query}`);
        setContacts(response.data);
      } catch (err) {
        toast.error('Error searching contacts');
      }
    } else {
      fetchContacts();
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">📗Contact Book</h1>
        <ContactForm
          fetchContacts={fetchContacts}
          editContact={editContact}
          setEditContact={setEditContact}
        />
        <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
        <ContactList
          contacts={contacts}
          fetchContacts={fetchContacts}
          setEditContact={setEditContact}
        />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default App;
