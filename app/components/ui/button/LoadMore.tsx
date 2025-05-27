import { Button } from "@/app/components/ui/button/Button";

interface LoadMoreProps {
  onLoadMore: () => Promise<void>;
  loading: boolean;
}

export const LoadMore = ({ onLoadMore, loading }: LoadMoreProps) => {
  return (
    <div className="flex justify-center my-8 relative z-20">
      <div className=" rounded-full p-2">
        <Button
          onClick={onLoadMore}
          disabled={loading}
          className="!w-auto border-2 border-black"
        >
          {loading ? "Loading..." : "Load More"}
        </Button>
      </div>
    </div>
  );
};
