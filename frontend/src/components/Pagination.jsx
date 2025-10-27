import React from "react";

export default function Pagination({ current, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const handleFirst = () => onChange(1);
  const handlePrev = () => onChange(Math.max(current - 1, 1));
  const handleNext = () => onChange(Math.min(current + 1, totalPages));
  const handleLast = () => onChange(totalPages);

  const pages = [];
  for (let p = 1; p <= totalPages; p++) pages.push(p);

  return (
    <nav aria-label="Student Pagination">
      <ul className="pagination pagination-sm mb-0">
        <li className={`page-item ${current === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={handleFirst}>
            « First
          </button>
        </li>
        <li className={`page-item ${current === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={handlePrev}>
            ‹ Prev
          </button>
        </li>

        {pages.map((p) => (
          <li key={p} className={`page-item ${p === current ? "active" : ""}`}>
            <button className="page-link" onClick={() => onChange(p)}>
              {p}
            </button>
          </li>
        ))}

        <li className={`page-item ${current === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={handleNext}>
            Next ›
          </button>
        </li>
        <li className={`page-item ${current === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={handleLast}>
            Last »
          </button>
        </li>
      </ul>
    </nav>
  );
}
