interface InputFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
  onClick,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-[13.15px] mb-[24.85px]">
      <label className="pl-[7px] text-sub1 text-ct-black-200 font-Pretendard">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="text-[15px] font-[400] placeholder:text-ct-gray-300 text-ct-black-200 font-Pretendard w-full min-h-[44px] rounded-[10px] pl-[26px] bg-ct-gray-100"
        value={value}
        onChange={onChange}
        onClick={onClick}
      />
    </div>
  );
}
export default InputField;
