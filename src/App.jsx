import { useState } from 'react';
import './App.css';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)

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
    gender: { isValid: false, message: '' },
    birthDayDate: { isValid: false, message: '' }
  });

  const clearForm = () => {
    setIsModalOpen(false)
    setForm({
      firstName: '',
      lastName: '',
      id: '',
      email: '',
      gender: '',
      birthDayDate: '',
    });

    setValidation({
      firstName: { isValid: false, message: '' },
      lastName: { isValid: false, message: '' },
      id: { isValid: false, message: '' },
      email: { isValid: false, message: '' },
      gender: { isValid: false, message: '' },
      birthDayDate: { isValid: false, message: '' }
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
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
      case 'gender':
        isValid = true;
        message = '';
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
      setIsModalOpen(true)
    }
  };


  const checkValidName = (str) => {
    //regex expression for name with hebrew letters only
    const reg = new RegExp('^[\u0590-\u05FF]+$')
    if (!reg.test(str) || str.length < 2) return false
    return true
  }

  const validateEmail = (email) => {
    //regex expression for valid email address
    var re = new RegExp('[/\S+@\S+\.\S+/]');
    return re.test(email);
  }

  const isIsraeliIdNumber = (id) => {
    id = String(id).trim();

    // Check if the ID length is greater than 9 or if it's not a number
    if (id.length > 9 || isNaN(id)) return false;

    // Adding to the ID leading zeros if its length is less than 9
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

    // Calculate the sum of the digits based on a specific formula
    const sum = id.split('').reduce((counter, digit, i) => {
      // Multiply each digit by a factor (1 or 2) depending on its position
      const step = Number(digit) * ((i % 2) + 1);

      // Add the result to the counter, adjusting if the result is greater than 9
      return counter + (step > 9 ? step - 9 : step);
    }, 0);

    // Check if the sum is divisible by 10
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
        currentDate.getMonth() > inputDate.getMonth() ||
        currentDate.getMonth() === inputDate.getMonth() &&
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
            <div className="radio-wrapper">
              <label htmlFor='male' className="gender-label">זכר
                <input
                  className="male-select"
                  id='male'
                  checked={form.gender === 'male'}
                  name="gender"
                  onChange={handleChange}
                  placeholder='זכר'
                  type="radio"
                  aria-label='זכר' />
              </label>
            </div>
            <div className="radio-wrapper">
              <label htmlFor='female' className="gender-label">נקבה
                <input
                  className="female-select"
                  id='female'
                  checked={form.gender === 'female'}
                  name="gender"
                  onChange={handleChange}
                  placeholder='נקבה'
                  type="radio"
                  aria-label='נקבה' />
              </label>
            </div>

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
      {isModalOpen &&
        <div className="modal-container">
          <h3>היי {form.firstName} {form.lastName} הטופס נשלח בהצלחה</h3>
        </div>
      }
    </div>
  );
}

export default App;
