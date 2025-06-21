import React from 'react'

const ExamCard = ({ exam, students, isAdmin, onPick, onDelete }) => {
  const student = students.find(({ id }) => id === exam.student)

  return (
    <div className="card card--row" style={{ width: '600px' }}>
      <div>
        <p>Name: {exam.name}</p>
        <p>Date: {exam.date}</p>
        <p>Result: {exam.result}/10</p>
        {isAdmin && student && (<p>Student: {student.firstName} {student.lastName}</p>)}
      </div>
      {isAdmin && (
        <div className="card--column book__card-buttons">
          <button className="btn" onClick={() => onPick(exam)}>
            Change
          </button>
          <button className="btn" onClick={() => onDelete(exam)}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default ExamCard
