import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
      <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
        <Skeleton height={224} className="w-full" />
        <div className="absolute top-4 right-4">
          <Skeleton circle width={40} height={40} className="shadow-lg" />
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Skeleton width={70} height={28} className="rounded-full" />
          <Skeleton width={70} height={28} className="rounded-full" />
        </div>

        <div className="min-h-[3.5rem] mb-2">
          <Skeleton height={24} className="mb-1 w-4/5" />
          <Skeleton height={24} className="w-3/5" />
        </div>

        <div className="min-h-[2.5rem] mb-4">
          <Skeleton height={18} className="mb-1 w-full" />
          <Skeleton height={18} className="w-4/5" />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex flex-col gap-1">
            <Skeleton width={50} height={16} />
            <Skeleton width={100} height={24} />
          </div>
          <Skeleton width={100} height={38} className="rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
