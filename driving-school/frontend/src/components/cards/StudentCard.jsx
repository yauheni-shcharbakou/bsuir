import React from 'react'

const StudentCard = ({ student, onOpen, onPick, onDelete }) => {
  return (
    <div className="card card--row" style={{ width: '600px' }}>
      <div>
        <p>FirstName: {student.firstName}</p>
        <p>LastName: {student.lastName}</p>
        <p>Address: {student.address}</p>
        <p>Passport: {student.passport}</p>
      </div>
      <div className="card--column book__card-buttons">
        <button className="btn" onClick={() => onOpen(student)}>
          Open
        </button>
        <button className="btn" onClick={() => onPick(student)}>
          Change
        </button>
        <button className="btn" onClick={() => onDelete(student)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default StudentCard
