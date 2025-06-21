import React from 'react'

const StudentForm = ({
  isEdit,
  isDisabled,
  passport,
  firstName,
  lastName,
  address,
  changeAddressHandler,
  changePassportHandler,
  changeFirstNameHandler,
  changeLastNameHandler,
  onSubmit
}) => {
  return (
    <div className="form">
      <label>
        <input
          type="text"
          value={firstName}
          placeholder="FirstName"
          onInput={changeFirstNameHandler}
        />
      </label>
      <label>
        <input
          type="text"
          value={lastName}
          placeholder="LastName"
          onInput={changeLastNameHandler}
        />
      </label>
      <label>
        <input
          type="text"
          value={passport}
          placeholder="Passport"
          onInput={changePassportHandler}
        />
      </label>
      <label>
        <input
          type="text"
          value={address}
          placeholder="Address"
          onInput={changeAddressHandler}
        />
      </label>

      <div>
        <button className="btn" onClick={onSubmit} disabled={isDisabled}>
          {isEdit ? 'Change ' : 'Create '}student
        </button>
      </div>
    </div>
  )
}

export default StudentForm
