import React, { useState, useEffect } from 'react';
import './QualityControl.css';

function QualityControl() {
  const [inspections, setInspections] = useState([]);
  const [formData, setFormData] = useState({ inspectionDate: '', result: '', defectNotes: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/quality')
      .then((res) => res.json())
      .then((result) => setInspections(result?.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/quality', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => setInspections([...inspections, result?.newQuality]))
      .catch((err) => console.error(err));
  };

  return (
    <div className="quality-card">
      <h2 className="quality-title">Quality Control</h2>
      <form className="quality-form" onSubmit={handleSubmit}>
        <input
          type="date"
          value={formData.inspectionDate}
          onChange={(e) => setFormData({ ...formData, inspectionDate: e.target.value })}
          className="quality-input"
        />
        <input
          type="text"
          placeholder="Result"
          value={formData.result}
          onChange={(e) => setFormData({ ...formData, result: e.target.value })}
          className="quality-input"
        />
        <input
          type="text"
          placeholder="Defect Notes"
          value={formData.defectNotes}
          onChange={(e) => setFormData({ ...formData, defectNotes: e.target.value })}
          className="quality-input"
        />
        <button type="submit" className="quality-button">Add Inspection</button>
      </form>
      <ul className="quality-list">
        {inspections?.map((item) => (
          <li key={item._id} className="quality-item">
            {item.inspectionDate} - {item.result} ({item.defectNotes})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QualityControl;