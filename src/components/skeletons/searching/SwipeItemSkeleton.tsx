interface Props {
  mode?: 'vertical' | 'horizontal';
}

function SwipeItemSkeleton({ mode = 'vertical' }: Props) {
  // 모드에 따른 스타일 설정
  const getSkeletonStyles = () => {
    const baseStyles = "rounded-[16px] border border-gray-100 py-[16px] px-[10px] animate-pulse";
    
    if (mode === 'horizontal') {
      return `${baseStyles} w-[300px] min-h-[520px] shadow-lg`;
    } else {
      return `${baseStyles} w-[340px] min-h-[570px] shadow-xl`;
    }
  };

  // 모드에 따른 이미지 높이 설정
  const getImageHeight = () => {
    return mode === 'horizontal' ? 'h-[380px]' : 'h-[430px]';
  };

  return (
    <div className={getSkeletonStyles()}>
      <div className="w-full flex flex-col gap-[8px]">
        {/* 이름과 상태 */}
        <div className="flex justify-start items-end">
          <div className="h-6 bg-ct-gray-100 rounded w-24"></div>
          <div className="h-5 bg-ct-gray-100 rounded w-16 ml-[5px]"></div>
        </div>
        
        {/* 키워드 태그들 */}
        <div className="w-full flex gap-[4px] justify-start items-center flex-wrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="px-[9px] py-[2px] bg-ct-gray-100 rounded-[5px]">
              <div className="h-4 bg-ct-gray-100 rounded w-12"></div>
            </div>
          ))}
        </div>
        
        {/* 카드 이미지 */}
        <div className={`w-full ${getImageHeight()} bg-ct-gray-100 rounded-[8px]`}></div>
        
        {/* 한줄 소개 박스 */}
        <div className="w-full p-[12px] bg-ct-gray-100 flex flex-col rounded-[5px] gap-2">
          <div className="h-4 bg-ct-gray-100 rounded w-16"></div>
          <div className="h-3 bg-ct-gray-100 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default SwipeItemSkeleton;