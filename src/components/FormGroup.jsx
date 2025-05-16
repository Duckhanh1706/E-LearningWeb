export default function FormGroup({
  label,
  type,
  placeholder,
  disabled = false,
  value,
  onChange,
  reffer,
  name,
  autoComplete = "off", // <-- thêm default
}) {
  return (
    <div className="form-group">
      <label className="text-primary">{label}</label>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        ref={reffer}
        name={name}
        autoComplete={autoComplete} // <-- sử dụng ở đây
      />
    </div>
  );
}
