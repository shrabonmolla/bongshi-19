import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    bloodGroup: '',
    phone: '',
    school: '',
    college: '',
    presentAddress: '',
    permanentAddress: '',
    busStopage: '',
    photo: null,
    facebook: ''  // Add a state for Facebook link
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      console.log(result);
      alert('✅ Registration successful!');
    } catch (err) {
      console.error(err);
      alert('❌ Registration failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <input name="name" type="text" onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
      <input name="department" type="text" onChange={handleChange} placeholder="Department" className="w-full p-2 border rounded" />

      <select name="bloodGroup" onChange={handleChange} className="w-full p-2 border rounded">
        <option value="">Select Blood Group</option>
        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      <input name="phone" type="text" onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded" />
      <input name="school" type="text" onChange={handleChange} placeholder="School" className="w-full p-2 border rounded" />
      <input name="college" type="text" onChange={handleChange} placeholder="College" className="w-full p-2 border rounded" />

      <textarea name="presentAddress" onChange={handleChange} placeholder="Present Address" className="w-full p-2 border rounded"></textarea>
      <textarea name="permanentAddress" onChange={handleChange} placeholder="Permanent Address" className="w-full p-2 border rounded"></textarea>

      <select name="busStopage" onChange={handleChange} className="w-full p-2 border rounded">
        <option value="">Select Bus Stopage</option>
        {['Mirpur', 'Farmgate', 'Mohakhali', 'Jatrabari', 'Banani'].map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <input name="photo" type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />

      {/* New field for Facebook link */}
      <input
        name="facebook"
        type="text"
        onChange={handleChange}
        placeholder="Facebook Profile Link"
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default Register;
