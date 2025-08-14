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
}: PersonalInputFieldProps) {
  const currentLength = value?.length || 0;

  const inputBase =
    "w-full flex text-sub2 placeholder:text-ct-gray-300 text-ct-black-200 font-Pretendard rounded-[10px] bg-ct-gray-100";
  const inputError = error
    ? "border border-ct-red-100"
    : "border border-transparent";

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
        // 변경 ①: 래퍼 추가 (WebKit 스크롤바 숨김)
        <div className="[&>textarea::-webkit-scrollbar]:hidden">
          <textarea
            value={value || ""}
            readOnly={!!onClick}
            placeholder={placeholder}
            maxLength={maxLength}
            // 기존 클래스 유지 + overflow 강제 숨김
            className={`${inputBase} ${inputError} h-[44px] max-h-[88px] px-[26px] py-[12px] !overflow-hidden`}
            // 변경 ②: rows=1 명시
            rows={1}
            // 변경 ③: Firefox/IE 계열 스크롤바 숨김
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onClick={onClick}
            onChange={onChange}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "44px";
              target.style.height = `${Math.min(target.scrollHeight, 88)}px`;
            }}
          />
        </div>
      ) : (
        <input
          type="text"
          value={value || ""}
          readOnly={!!onClick}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`${inputBase} ${inputError} min-h-[44px] pl-[26px]`}
          onClick={onClick}
          onChange={onChange}
        />
      )}

      {error && (
        <span className="text-body2 text-ct-red-100 pl-[13px]">{error}</span>
      )}
    </div>
  );
}
export default PersonalInputField;
