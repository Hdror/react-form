import { useState } from 'react';
import './App.css';

function App() {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    id: '',
    email: '',
    birthDayDate: '',
    gender: ''
  })

  const [validation, setValidation] = useState({
    firstName: { isValid: false, message: '' },
    lastName: { isValid: false, message: '' },
    id: { isValid: false, message: '' },
    email: { isValid: false, message: '' },
    birthDayDate: { isValid: false, message: '' }
  });

  const clearForm = () => {
    setForm({
      firstName: '',
      lastName: '',
      id: '',
      email: '',
      gender: '',
      birthDayDate: '',
    });

    setValidation({
      firstName: { isValid: true, message: '' },
      lastName: { isValid: true, message: '' },
      id: { isValid: true, message: '' },
      email: { isValid: true, message: '' },
      birthDayDate: { isValid: true, message: '' },
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    console.log(name);
    console.log(`${event.target.checked}`);
    const value = event.target.type === 'radio' ? event.target.id : event.target.value;
    let isValid = true;
    let message = '';
    // Perform validation based on the field name
    switch (name) {
      case 'firstName':
        isValid = checkValidName(value);
        message = isValid ? '' : 'שם פרטי לא תקין';
        break;
      case 'lastName':
        isValid = checkValidName(value);
        message = isValid ? '' : 'שם משפחה לא תקין';
        break;
      case 'id':
        isValid = isIsraeliIdNumber(value);
        message = isValid ? '' : 'תעודת זהות לא תקינה';
        break;
      case 'email':
        isValid = validateEmail(value);
        message = isValid ? '' : 'דוא"ל לא תקין';
        break;
      case 'birthDayDate':
        isValid = validateBirthDate(value);
        message = isValid ? '' : 'עליך להיות מעל גיל 18';
        break;
      default:
        break;
    }

    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setValidation((prevValidation) => ({ ...prevValidation, [name]: { isValid, message } }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform final validation before submitting the form

    if (isFormValid()) {
      console.log('Form submitted:', form);
    } else {
      console.log('Form contains errors. Please fix them before submitting.');
    }
  };


  const checkValidName = (str) => {
    const reg = new RegExp('^[\u0590-\u05FF]+$')
    if (!reg.test(str) || str.length < 2) return false
    return true
  }

  const validateEmail = (email) => {
    console.log(email);
    var re = new RegExp('[/\S+@\S+\.\S+/]');
    return re.test(email);
  }

  const isIsraeliIdNumber = (id) => {
    id = String(id).trim();

    if (id.length > 9 || isNaN(id)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

    const sum = id.split('').reduce((counter, digit, i) => {
      const step = Number(digit) * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }, 0);

    return sum % 10 === 0;
  }

  function validateBirthDate(birthDate) {
    // Create a Date object for the current date
    const currentDate = new Date();
  
    // Create a Date object for the provided birth date
    const inputDate = new Date(birthDate);
  
    // Calculate the difference in years
    const ageDifference = currentDate.getFullYear() - inputDate.getFullYear();
  
    // Check if the user is above 18
    return (
      ageDifference > 18 ||
      (ageDifference === 18 &&
        currentDate.getMonth() >= inputDate.getMonth() &&
        currentDate.getDate() >= inputDate.getDate())
    );
  }

  const isFormValid = () => {
    return Object.values(validation).every((field) => field.isValid);
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
        <h3>פרטים אישיים</h3>
        <div className="personal-details-container">
          {personalFormFields.map(fieldItem => {
            return <label key={fieldItem.field}>{fieldItem.field}
              <input
                onChange={handleChange}
                value={form[`${fieldItem.fieldName}`]}
                placeholder={fieldItem.field}
                name={fieldItem.fieldName}
                type={fieldItem.type}
                aria-label={fieldItem.field}
                required />
              {!validation[fieldItem.fieldName].isValid && (
                <span className="error-message">{validation[fieldItem.fieldName].message}</span>
              )}
            </label>
          })}
        </div>
        <h3>מין</h3>
        <div className="gender-birthday-container">
          <div className="gender-container">
            <label className="gender-label">זכר
              <input
                id='male'
                checked={form.gender === 'male'}
                name="gender"
                onChange={handleChange}
                placeholder='זכר'
                type="radio"
                aria-label='זכר' />
            </label>
            <label className="gender-label">נקבה
              <input
                id='female'
                checked={form.gender === 'female'}
                name="gender"
                onChange={handleChange}
                placeholder='נקבה'
                type="radio"
                aria-label='נקבה' />
            </label>
          </div>
          <label className="birthday-label">תאריך לידה
            <input
              onChange={handleChange}
              value={form.birthDayDate}
              placeholder='תאריך לידה'
              name='birthDayDate'
              type="date"
              aria-label='תאריך לידה'
              required />
                 {!validation['birthDayDate'].isValid && (
                <span className="error-message">{validation['birthDayDate'].message}</span>
              )}
          </label>
        </div>
        <div className="buttons-container">
          <button
            className="submit-btn"
            disabled={!isFormValid()}
            type='submit'
            aria-label='סיום'>סיום</button>
          <button onClick={clearForm} type='button' aria-label='איפוס טופס'>איפוס טופס</button>
        </div>
      </form>
    </div>
  );
}

export default App;
