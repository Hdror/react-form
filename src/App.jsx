import { useState } from 'react';
import './App.css';

function App() {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    id: '',
    email: '',
    isMale: false,
    isFemale: false,
    birthDayDate: '',
  })

  const clearForm = () => {
    setForm({
      firstName: '',
      lastName: '',
      id: '',
      email: '',
      isMale: false,
      isFemale: false,
      birthDayDate: '',
    })
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(form);
  }

  const personalFormFields =
    [
      { field: 'שם פרטי', type: 'text', fieldName: 'firstName' },
      { field: 'שם משפחה', type: 'text', fieldName: 'lastName' },
      { field: 'תעודת זהות', type: 'text', fieldName: 'id' },
      { field: 'דואר אלקטרוני', type: 'email', fieldName: 'email' }
    ]

  return (
    <div className="app">
      <form onSubmit={handleSubmit} className='form'>
        <div className="personal-details-container">
          {personalFormFields.map(fieldItem => {
            return <label key={fieldItem.field}>{fieldItem.field}
              <input onChange={handleChange} value={form[`${fieldItem.fieldName}`]} placeholder={fieldItem.field} name={fieldItem.fieldName} type={fieldItem.type} aria-label={fieldItem.field} required/>
            </label>
          })}
        </div>
        <div className="gender-birthday-container">
          <div className="gender-container">
            <label>זכר
              <input onChange={handleChange} placeholder='זכר' type="checkbox" aria-label='זכר' />
            </label>
            <label>נקבה
              <input onChange={handleChange} placeholder='נקבה' type="checkbox" aria-label='נקבה' />
            </label>
          </div>
          <label className='birthday-label'>תאריך לידה
            <input onChange={handleChange} value={form.birthDayDate} placeholder='תאריך לידה' name='birthDayDate' type="date" aria-label='תאריך לידה' required />
          </label>
        </div>
        <div className="buttons-container">
          <button  type='submit' aria-label='סיום'>סיום</button>
          <button onClick={clearForm} type='button' aria-label='איפוס טופס'>איפוס טופס</button>
        </div>
      </form>
    </div>
  );
}

export default App;
