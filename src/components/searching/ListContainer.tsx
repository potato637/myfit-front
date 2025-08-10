import { useRef, useCallback } from "react";
import { SectorBaseSearchingItem } from "../../apis/searchingAPI";
import SearchingListItem from "./SearchingListItem";
import ListItemSkeleton from "../skeletons/searching/ListItemSkeleton";

function ListContainer({
  cards,
  isLoading,
  hasNextPage,
  fetchNextPage,
}: {
  cards: SectorBaseSearchingItem[];
  isLoading: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const observer = useRef<IntersectionObserver>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      const options = {
        threshold: 0.1,
        rootMargin: "20px",
      };

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      }, options);

      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, fetchNextPage]
  );

  // Initial loading state
  if (isLoading && cards.length === 0) {
    return (
      <div className="w-full ct-center">
        <div className="grid grid-cols-2 gap-[8px]">
          {[...Array(4)].map((_, index) => (
            <ListItemSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full ct-center">
      <div className="grid grid-cols-2 gap-[8px]">
        {cards.map((card, index) => {
          // Add ref to the last item for infinite scroll
          if (index === cards.length - 1) {
            return (
              <div key={card.card_id} ref={lastItemRef}>
                <SearchingListItem card={card} />
              </div>
            );
          }
          return <SearchingListItem key={card.card_id} card={card} />;
        })}

        {/* Show loading skeletons at the bottom when loading more */}
        {isLoading && hasNextPage && (
          <>
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
          </>
        )}
      </div>
    </div>
  );
}

export default ListContainer;
