import { useRef, useEffect } from "react";

interface InputFieldProps {
  label: string;
  placeholder?: string;
  helperText?: string | React.ReactNode;
  as?: "input" | "textarea";
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick?: () => void;
  maxLength?: number;
  showCounter?: boolean;

  // 새로 추가
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
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

  error,
  containerClassName,
  inputClassName,
  inputProps,
  textareaProps,
}: InputFieldProps) {
  const currentLength = value?.length || 0;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAutoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "44px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 88)}px`;
  };

  useEffect(() => {
    if (textareaRef.current && as === "textarea") {
      handleAutoResize(textareaRef.current);
    }
  }, [value, as]);

  const baseInput =
    "text-sub2 font-sans placeholder:text-ct-gray-300 text-ct-black-200 w-full rounded-[10px] bg-ct-gray-100";
  const sizeInput =
    as === "textarea"
      ? "h-[44px] max-h-[88px] px-[26px] pt-[14px] pb-[12px] resize-none overflow-y-auto"
      : "min-h-[44px] px-[26px]";
  const errorRing = error
    ? "border border-ct-red-100"
    : "border border-transparent";

  return (
    <div className={containerClassName ?? "mb-[16px]"}>
      <div className="flex justify-between items-center mb-[6px]">
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
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
          className={`${baseInput} ${sizeInput} ${errorRing} ${
            inputClassName ?? ""
          }`}
          {...textareaProps}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onClick}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? `${label}-error` : undefined}
          className={`${baseInput} ${sizeInput} ${errorRing} ${
            inputClassName ?? ""
          }`}
          {...inputProps}
        />
      )}

      {error ? (
        <p
          id={`${label}-error`}
          className="mt-[6px] text-body2 text-ct-red-100 ml-[3px]"
        >
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-[6px] text-body2 text-ct-gray-300">{helperText}</p>
      ) : null}
    </div>
  );
}

export default InputField;
