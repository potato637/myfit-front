interface InputFieldProps {
  label: string;
  placeholder?: string;
  helperText?: string | React.ReactNode;
}

function InputField({ label, placeholder, helperText }: InputFieldProps) {
  return (
    <div className="mb-[27px]">
      <label className="pl-[7px] text-sub1 text-ct-black-200  mb-[8px] block">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="text-body1 font-sans placeholder:text-ct-gray-300 text-ct-black-200  w-full min-h-[44px] rounded-[10px] pl-[26px] bg-ct-gray-100"
      />
      {helperText && (
        <p className="mt-[12px] text-body2 text-ct-gray-300  ">{helperText}</p>
      )}
    </div>
  );
}
export default InputField;
