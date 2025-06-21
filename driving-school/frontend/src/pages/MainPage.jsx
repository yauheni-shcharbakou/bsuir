import React, { useEffect, useState } from 'react'
import StudentForm from '../components/forms/StudentForm'
import StudentCard from '../components/cards/StudentCard'
import { studentRepository } from '../repositories'
import { useHistory } from 'react-router-dom'

const MainPage = () => {
  const { push } = useHistory()

  const [students, setStudents] = useState([])
  const [passport, setPassport] = useState('')
  const [address, setAddress] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [checked, setChecked] = useState(-1)
  const [isEdit, setIsEdit] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    studentRepository.getAll().then((response) => setStudents(() => response))
  }, [])
  useEffect(() => {
    setIsDisabled(() => !passport || !address || !firstName || !lastName)
  }, [passport, address, firstName, lastName])

  const changeAddressHandler = (e) => setAddress(() => e.target.value)
  const changePassportHandler = (e) => setPassport(() => e.target.value)
  const changeFirstNameHandler = (e) => setFirstName(() => e.target.value)
  const changeLastNameHandler = (e) => setLastName(() => e.target.value)

  const clearForm = () => {
    setPassport(() => '')
    setAddress(() => '')
    setFirstName(() => '')
    setLastName(() => '')
    setChecked(() => -1)
    setIsEdit(() => false)
  }

  const onSubmit = async () => {
    const dto = { passport, address, firstName, lastName }

    const response = isEdit
      ? await studentRepository.change(checked, dto)
      : await studentRepository.create(dto)

    setStudents((prev) =>
      isEdit ? prev.map((s) => (s.id === response.id ? response : s)) : prev.concat([response])
    )
    clearForm()
  }

  const onOpen = (student) => {
    push(`students/${student.id}`)
  }

  const onPick = (student) => {
    setPassport(() => student.passport)
    setAddress(() => student.address)
    setFirstName(() => student.firstName)
    setLastName(() => student.lastName)
    setIsEdit(() => true)
    setChecked(() => student.id)
  }

  const onDelete = (student) => {
    studentRepository
      .delete(student.id)
      .then((id) => setStudents((prev) => prev.filter((s) => s.id !== id)))
  }

  return (
    <div className="content">
      <h2>Students</h2>
      <StudentForm
        address={address}
        passport={passport}
        firstName={firstName}
        lastName={lastName}
        isEdit={isEdit}
        isDisabled={isDisabled}
        changeAddressHandler={changeAddressHandler}
        changeFirstNameHandler={changeFirstNameHandler}
        changeLastNameHandler={changeLastNameHandler}
        changePassportHandler={changePassportHandler}
        onSubmit={onSubmit}
      />
      <div>
        {students.map((student) => (
          <StudentCard
            key={student.id.toString()}
            student={student}
            onOpen={onOpen}
            onPick={onPick}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default MainPage
