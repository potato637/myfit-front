interface Props {
  keyword: string;
}

const mockPosts = [
  "/public/assets/feed/post1.svg",
  "/public/assets/feed/post2.svg",
  "/public/assets/feed/post3.svg",
  "/public/assets/feed/post1.svg",
  "/public/assets/feed/post2.svg",
  "/public/assets/feed/post3.svg",
  "/public/assets/feed/post4.svg",
  "/public/assets/feed/post5.svg",
  "/public/assets/feed/post6.svg",
  "/public/assets/feed/post4.svg",
  "/public/assets/feed/post5.svg",
  "/public/assets/feed/post6.svg",
  "/public/assets/feed/post4.svg",
  "/public/assets/feed/post5.svg",
  "/public/assets/feed/post6.svg",
  "/public/assets/feed/post4.svg",
  "/public/assets/feed/post5.svg",
  "/public/assets/feed/post6.svg",
  "/public/assets/feed/post4.svg",
  "/public/assets/feed/post5.svg",
  "/public/assets/feed/post6.svg",
];

const PostResult = ({ keyword }: Props) => {
  // keyword를 이용해 실제 필터링하려면 여기에 조건 추가 가능
  const filteredPosts = mockPosts; // 현재는 전부 사용

  return (
    <div className="-mx-[22px] grid grid-cols-3 gap-2">
      {filteredPosts.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`post-${idx}`}
          className="aspect-square object-cover w-full rounded-sm"
        />
      ))}
    </div>
  );
};

export default PostResult;
