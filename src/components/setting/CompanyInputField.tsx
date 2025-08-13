interface CompanyInputFieldProps {
  label: string;
  placeholder?: string;
  hintLabel?: string;
  hintDescription?: string;
  value?: string;
  onClick?: () => void;
  onChange?: (val: string) => void;
}

function CompanyInputField({
  label,
  placeholder,
  hintLabel,
  hintDescription,
  value,
  onClick,
  onChange,
}: CompanyInputFieldProps) {
  return (
    <div className="flex flex-col gap-[15px]">
      <label className="text-sub1 text-ct-black-200 ml-[12px]">{label}</label>
      <input
        type="text"
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
        placeholder={placeholder}
        className="text-[15px] font-[400] scrollbar-hide resize-none placeholder:text-ct-gray-300 text-ct-black-200 font-Pretendard min-h-[41px] w-[349px] rounded-[10px] pl-[26px] bg-ct-gray-100"
        onClick={onClick}
      />
      <div className="flex gap-[5px] ml-[12px]">
        <span className="text-body1 text-ct-gray-500">{hintLabel}</span>
        <span className="text-body1 text-ct-gray-300">{hintDescription}</span>
      </div>
    </div>
  );
}
export default CompanyInputField;
