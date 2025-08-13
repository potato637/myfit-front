interface PersonalInputFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onClick?: () => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  multiline?: boolean;
  maxLength?: number;
  showCounter?: boolean;
  disallowSpecialChars?: boolean; // ← 추가
}

function PersonalInputField({
  label,
  placeholder,
  value,
  onClick,
  onChange,
  error,
  multiline = false,
  maxLength,
  showCounter = false,
  disallowSpecialChars = false,
}: PersonalInputFieldProps) {
  const currentLength = value?.length || 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (disallowSpecialChars) {
      e.target.value = e.target.value.replace(/[^a-zA-Z0-9가-힣]/g, "");
    }
    onChange?.(e);
  };

  return (
    <div className="flex flex-col gap-[11px] w-full mb-[10px]">
      <div className="flex justify-between items-center">
        <label className="ml-1 text-sub2 text-ct-black-200">{label}</label>
        {showCounter && maxLength && (
          <span className="text-body2 text-ct-gray-300">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
      {multiline ? (
        <textarea
          value={value || ""}
          readOnly={!!onClick}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full flex text-sub2 placeholder:text-ct-gray-300 text-ct-black-200 font-Pretendard h-[44px] max-h-[88px] rounded-[10px] px-[26px] py-[12px] bg-ct-gray-100 resize-none overflow-y-auto"
          onClick={onClick}
          onChange={handleChange}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "44px";
            target.style.height = `${Math.min(target.scrollHeight, 88)}px`;
          }}
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          readOnly={!!onClick}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full flex text-sub2 placeholder:text-ct-gray-300 text-ct-black-200 font-Pretendard min-h-[44px] rounded-[10px] pl-[26px] bg-ct-gray-100"
          onClick={onClick}
          onChange={handleChange}
        />
      )}
      {error && (
        <span className="text-body2 text-ct-red-100 pl-[13px]">{error}</span>
      )}
    </div>
  );
}
export default PersonalInputField;
