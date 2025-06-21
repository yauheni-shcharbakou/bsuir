import React, { useEffect, useState } from 'react'
import { examRepository, studentRepository } from '../repositories'
import ExamForm from '../components/forms/ExamForm'
import ExamCard from '../components/cards/ExamCard'

const ExamPage = () => {
  const [students, setStudents] = useState([])
  const [exams, setExams] = useState([])
  const [date, setDate] = useState('')
  const [result, setResult] = useState('')
  const [name, setName] = useState('')
  const [checkedStudent, setCheckedStudent] = useState(-1)
  const [checked, setChecked] = useState(-1)
  const [isEdit, setIsEdit] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    studentRepository.getAll().then((response) => setStudents(() => response))
    examRepository.getAll().then((response) => setExams(() => response))
  }, [])
  useEffect(() => {
    setIsDisabled(() => !date || !name || !result || (!isEdit && checkedStudent === -1))
  }, [isEdit, date, name, result, checkedStudent])

  const changeDateHandler = (e) => setDate(() => e.target.value)
  const changeResultHandler = (e) => setResult(() => +e.target.value || '')
  const changeNameHandler = (e) => setName(() => e.target.value)
  const changeCheckedStudentHandler = (e) => setCheckedStudent(() => +e.target.value || -1)

  const clearForm = () => {
    setName(() => '')
    setResult(() => '')
    setDate(() => '')
    setCheckedStudent(() => -1)
    setChecked(() => -1)
    setIsEdit(() => false)
  }

  const onSubmit = async () => {
    const dto = { name, date: date.toString(), result: +result }

    const response = isEdit
      ? await examRepository.change(checked, dto)
      : await examRepository.create({ ...dto, student: +checkedStudent })

    setExams((prev) =>
      isEdit ? prev.map((s) => (s.id === response.id ? response : s)) : prev.concat([response])
    )
    clearForm()
  }

  const onPick = (exam) => {
    setName(() => exam.name)
    setResult(() => exam.result)
    setDate(() => exam.date)
    setIsEdit(() => true)
    setChecked(() => exam.id)
  }

  const onDelete = (exam) => {
    examRepository.delete(exam.id).then((id) => setExams((prev) => prev.filter((e) => e.id !== id)))
  }

  return (
    <div className="content">
      <h2>Exams</h2>
      <ExamForm
        date={date}
        isEdit={isEdit}
        isDisabled={isDisabled}
        name={name}
        result={result}
        students={students}
        onSubmit={onSubmit}
        changeNameHandler={changeNameHandler}
        changeResultHandler={changeResultHandler}
        changeStudentHandler={changeCheckedStudentHandler}
        changeDateHandler={changeDateHandler}
        checkedStudentId={checkedStudent}
      />
      <div>
        {exams.map((exam) => (
          <ExamCard
            key={exam.id.toString()}
            exam={exam}
            students={students}
            isAdmin={true}
            onPick={onPick}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default ExamPage
