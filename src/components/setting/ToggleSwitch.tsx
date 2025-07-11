import { useState } from "react";

function ToggleSwitch() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div
      className={`w-[59px] h-[30px] flex items-center rounded-[15px] cursor-pointer transition-colors duration-300 ${
        enabled ? "bg-ct-blue-gray-100" : "bg-ct-gray-100"
      }`}
      onClick={() => setEnabled(!enabled)}
    >
      <div
        className={`w-[28px] h-[30px] rounded-full bg-ct-white transition-transform duration-300 ${
          enabled ? "translate-x-[31px]" : "translate-x-0"
        }`}
      />
    </div>
  );
}
export default ToggleSwitch;
