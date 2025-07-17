interface InputFieldProps {
  label: string;
  placeholder?: string;
  helperText?: string | React.ReactNode;
  as?: "input" | "textarea"; // textarea 지원
}

function InputField({
  label,
  placeholder,
  helperText,
  as = "input",
}: InputFieldProps) {
  const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="mb-[27px]">
      <label className="pl-[7px] text-sub1 text-ct-black-200 mb-[8px] block">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          placeholder={placeholder}
          rows={1}
          onInput={handleAutoResize}
          className="text-body1 font-sans placeholder:text-ct-gray-300 text-ct-black-200 w-full min-h-[44px] rounded-[10px] pl-[26px] pt-[14px] pb-[12px] bg-ct-gray-100 resize-none overflow-hidden"
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="text-body1 font-sans placeholder:text-ct-gray-300 text-ct-black-200 w-full min-h-[44px] rounded-[10px] pl-[26px] bg-ct-gray-100"
        />
      )}
      {helperText && (
        <p className="mt-[12px] text-body2 text-ct-gray-300">{helperText}</p>
      )}
    </div>
  );
}

export default InputField;
