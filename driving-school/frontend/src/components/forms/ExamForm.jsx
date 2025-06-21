import React from 'react'

const ExamForm = ({
  isEdit,
  isDisabled,
  date,
  result,
  name,
  students,
  checkedStudentId,
  changeDateHandler,
  changeResultHandler,
  changeNameHandler,
  changeStudentHandler,
  onSubmit
}) => {
  return (
    <div className="form">
      <div className="form__row">
        <div>
          <label>
            <input
              type="number"
              value={result}
              min={0}
              max={10}
              placeholder="Result"
              onInput={changeResultHandler}
            />
          </label>
          <select
            onChange={changeStudentHandler}
            value={checkedStudentId.toString()}
            disabled={isEdit}
            className="browser-default"
          >
            <option value="">Choose student</option>
            {students.map((s) => (
              <option key={s.id.toString()} value={s.id.toString()}>
                {s.firstName} {s.lastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onInput={changeNameHandler}
            />
          </label>
          <label>
            <input
              type="date"
              value={date}
              placeholder="Date"
              onInput={changeDateHandler}
            />
          </label>
        </div>
      </div>

      <button className="btn" onClick={onSubmit} disabled={isDisabled}>
        {isEdit ? 'Change ' : 'Create '}exam
      </button>
    </div>
  )
}

export default ExamForm
