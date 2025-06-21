import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { studentRepository } from '../repositories'
import ExamCard from '../components/cards/ExamCard'

const StudentPage = () => {
  const { pathname } = useLocation()
  const studentId = +pathname.replace('/students/', '') || -1

  const [student, setStudent] = useState(null)
  const [exams, setExams] = useState([])

  useEffect(() => {
    if (studentId > -1) {
      studentRepository.getById(studentId).then((response) => setStudent(() => response))
      studentRepository.getStudentExams(studentId).then((response) => setExams(() => response))
    }
  }, [])

  return (
    <div className="content">
      <h2>Student exams info</h2>
      <div>
        {student ? (
          <p>
            {student.firstName} {student.lastName}
          </p>
        ) : (
          <p>Student data loading...</p>
        )}
      </div>
      <div>
        {exams.map((exam) => (
          <ExamCard key={exam.id.toString()} students={[]} exam={exam} isAdmin={false} />
        ))}
      </div>
    </div>
  )
}

export default StudentPage
