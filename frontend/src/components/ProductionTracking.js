import React, { useState, useEffect } from 'react';
import './ProductionTracking.css';

function ProductionTracking() {
  const [productions, setProductions] = useState([]);
  const [formData, setFormData] = useState({ material: '', status: '', quantity: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/production')
      .then((res) => res.json())
      .then((result) => setProductions(result?.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/production', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => setProductions([...productions, result.newProduction]))
      .catch((err) => console.error(err));
  };

  return (
    <div className="production-card">
      <h2 className="production-title">Production Tracking</h2>
      <form className="production-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Material"
          value={formData.material}
          onChange={(e) => setFormData({ ...formData, material: e.target.value })}
          className="production-input"
        />
        <input
          type="text"
          placeholder="Status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="production-input"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className="production-input"
        />
        <button type="submit" className="production-button">Add Production</button>
      </form>
      <ul className="production-list">
        {productions?.map((item) => (
          <li key={item._id} className="production-item">
            {item.material} - {item.status} ({item.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductionTracking;  