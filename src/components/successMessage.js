function SuccessMessage(props) {
  const message = props.success;

  return (
    <div className="success">
      <p>{message}</p>
    </div>
  );
}

export default SuccessMessage;
