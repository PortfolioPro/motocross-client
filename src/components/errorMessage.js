function ErrorMessage(props) {
  const message = props.error._message;
  const errors = props.error.errors;
  const errorList = Object.keys(errors).map(error =>
    <li key={errors[error].path}>{errors[error].message}</li>
  );

  return (
    <div className="validation-error">
      <h3>{message}!</h3>

      <ul>{errorList}</ul>
    </div>
  );
}

export default ErrorMessage;
