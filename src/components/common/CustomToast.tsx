function CustomToast({ message }: { message: string }) {
  return (
    <div className="w-[80%] rounded-[60px] bg-ct-white bottom-[60px]">
      {message}
    </div>
  );
}

export default CustomToast;
