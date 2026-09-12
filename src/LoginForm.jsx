import { useState, useEffect } from "react";

// bu fonksiyon, parametre olarak aldığı email geçerliyse true, değilse false döner
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
}

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const initialErrors = {
  email: false,
  password: false,
  terms: false,
};

const errorMessages = {
  email: "Geçerli bir email adresi yaz",
  password: "Şifre en az 4 karakterden oluşmalı",
};

export default function LoginForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = formData.password.length >= 4;
    const isTermsValid = formData.terms;

    if (isEmailValid && isPasswordValid && isTermsValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === "checkbox" ? event.target.checked : value;

    // Hata kontrolleri
    let hasError = false;
    if (name === "email") {
      hasError = !validateEmail(value);
    } else if (name === "password") {
      hasError = value.length < 4;
    } else if (name === "terms") {
      hasError = !value;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: hasError });
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <div className="form">
      <h1>Kayıt ol</h1>
      <form onSubmit={handleSubmit}>
        {/* eğer email ile ilgili bir hata varsa label'a hasError class'ı ekle */}
        <label
          className={`form-input-line ${errors.email ? "hasError" : ""}`}
          data-testid="email-label"
        >
          <span className="form-label">Email</span>
          <input
            className="form-input"
            name="email"
            onChange={handleChange}
            value={formData.email}
            data-testid="email"
            type="text"
          />

          {/* Email ile ilgili bir hata yoksa alttaki spani hiç gösterme */}
          {errors.email && (
            <span className="error-message" role="email-error">
              {errorMessages.email}
            </span>
          )}
        </label>

        {/* eğer password ile ilgili bir hata varsa label'a hasError class'ı ekle */}
        <label
          data-testid="password-label"
          className={`form-input-line ${errors.password ? "hasError" : ""}`}
        >
          <span className="form-label">Şifre</span>
          <input
            className="form-input"
            name="password"
            onChange={handleChange}
            value={formData.password}
            data-testid="password"
            type="text"
          />

          {/* Password ile ilgili bir hata yoksa alttaki spani hiç gösterme */}
          {errors.password && (
            <span className="error-message" role="password-error">
              {errorMessages.password}
            </span>
          )}
        </label>

        {/* eğer terms ile ilgili bir hata varsa label'a hasError class'ı ekle */}
        <label className={`form-ch-line ${errors.terms ? "hasError" : ""}`}>
          <input
            type="checkbox"
            name="terms"
            data-testid="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <span className="ch-label">Kullanım koşullarını kabul ediyorum.</span>
        </label>

        {/* formdaki hata durumuna göre bu button disabled olmalı ya da olmamalı */}
        <button
          className="send-button"
          data-testid="send"
          disabled={!isValid}
        >
          Gönder
        </button>
      </form>
    </div>
  );
}