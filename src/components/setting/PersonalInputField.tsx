interface PersonalInputFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onClick?: () => void;
  error?: string;
}

function PersonalInputField({
  label,
  placeholder,
  value,
  onClick,
  error,
}: PersonalInputFieldProps) {
  return (
    <div className="flex flex-col gap-[11px]">
      <label className="ml-[10px] text-sub1 text-ct-black-300">{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="flex text-[15px] font-[400] placeholder:text-ct-gray-300 text-ct-black-200 font-Pretendard min-h-[44px] w-[344px] rounded-[10px] pl-[26px] bg-ct-gray-100"
        onClick={onClick}
      />
      {error && (
        <span className="text-body2 text-ct-red-100 pl-[13px]">{error}</span>
      )}
    </div>
  );
}
export default PersonalInputField;
