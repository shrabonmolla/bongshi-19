import React, { useState, useRef } from 'react';

const Register = () => {
  const fileInputRef = useRef(null); // <-- Add this ref

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
    facebook: ''
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
      const res = await fetch('https://bongshi-19-backend.onrender.com/submit', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      console.log(result);
      alert('✅ Registration successful!');

      // ✅ Reset the form
      setFormData({
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
        facebook: ''
      });

      // ✅ Clear the file input manually
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (err) {
      console.error(err);
      alert('❌ Registration failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
      <input name="department" type="text" value={formData.department} onChange={handleChange} placeholder="Department" className="w-full p-2 border rounded" />

      <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="">Select Blood Group</option>
        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      <input name="phone" type="text" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded" />
      <input name="school" type="text" value={formData.school} onChange={handleChange} placeholder="School" className="w-full p-2 border rounded" />
      <input name="college" type="text" value={formData.college} onChange={handleChange} placeholder="College" className="w-full p-2 border rounded" />

      <textarea name="presentAddress" value={formData.presentAddress} onChange={handleChange} placeholder="Present Address" className="w-full p-2 border rounded"></textarea>
      <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} placeholder="Permanent Address" className="w-full p-2 border rounded"></textarea>

      <select name="busStopage" value={formData.busStopage} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="">Select Bus Stop</option>
        {[
          "Jagannath University", "Gulisthan", "Shahbag", "Bata Signal Bus Stop",
          "Elephant Road", "Kalabagan", "Shyamoli", "Technical", "Gabtoli",
          "Hemayetpur", "Savar Bus Stand", "Nobinagar",
        ].map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <input
        name="photo"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef} // <-- Use the ref
        className="w-full p-2 border rounded"
      />

      <input
        name="facebook"
        type="text"
        value={formData.facebook}
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
