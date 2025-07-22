interface PersonalInputFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function PersonalInputField({
  label,
  placeholder,
  value,
  onClick,
  onChange,
  error,
}: PersonalInputFieldProps) {
  return (
    <div className="flex flex-col gap-[11px] w-full">
      <label className="ml-1 text-sub1 text-ct-black-200">{label}</label>
      <input
        type="text"
        value={value}
        readOnly={!!onClick}
        placeholder={placeholder}
        className="w-full flex text-body1 placeholder:text-ct-gray-300 text-ct-black-200 font-Pretendard min-h-[44px] rounded-[10px] pl-[26px] bg-ct-gray-100"
        onClick={onClick}
        onChange={onChange}
      />
      {error && (
        <span className="text-body2 text-ct-red-100 pl-[13px]">{error}</span>
      )}
    </div>
  );
}
export default PersonalInputField;
