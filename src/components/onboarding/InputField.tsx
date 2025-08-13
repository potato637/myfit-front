import { useRef, useEffect } from "react";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  helperText?: string | React.ReactNode;
  as?: "input" | "textarea"; // textarea 지원
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick?: () => void;
  maxLength?: number;
  showCounter?: boolean;
}

function InputField({
  label,
  placeholder,
  helperText,
  as = "input",
  value,
  onChange,
  onClick,
  maxLength,
  showCounter = false,
}: InputFieldProps) {
  const currentLength = value?.length || 0;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAutoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "44px"; // 최소 높이로 리셋
    textarea.style.height = `${Math.min(textarea.scrollHeight, 88)}px`; // 최대 88px로 제한
  };

  // value가 변경될 때마다 높이 조절
  useEffect(() => {
    if (textareaRef.current && as === "textarea") {
      handleAutoResize(textareaRef.current);
    }
  }, [value, as]);

  return (
    <div className="mb-[27px]">
      <div className="flex justify-between items-center mb-[8px]">
        <label className="pl-[7px] text-sub2 text-ct-black-200">{label}</label>
        {showCounter && maxLength && (
          <span className="text-body2 text-ct-gray-300">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
      {as === "textarea" ? (
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onClick}
          maxLength={maxLength}
          rows={1}
          onInput={(e) => handleAutoResize(e.target as HTMLTextAreaElement)}
          className="text-sub2 font-sans placeholder:text-ct-gray-300 text-ct-black-200 w-full h-[44px] max-h-[88px] rounded-[10px] px-[26px] pt-[14px] pb-[12px] bg-ct-gray-100 resize-none overflow-y-auto"
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onClick}
          maxLength={maxLength}
          className="text-sub2 font-sans placeholder:text-ct-gray-300 text-ct-black-200 w-full min-h-[44px] rounded-[10px] px-[26px] bg-ct-gray-100"
        />
      )}
      {helperText && (
        <p className="mt-[12px] text-body2 text-ct-gray-300">{helperText}</p>
      )}
    </div>
  );
}

export default InputField;
