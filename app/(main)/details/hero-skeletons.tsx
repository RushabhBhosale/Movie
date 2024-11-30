import { Skeleton } from "@/components/ui/skeleton";

export const DetailsSkeleton = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Poster and details skeleton */}
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Poster skeleton */}
          <Skeleton className="w-full h-[350px] md:h-[250px] lg:w-[350px] lg:h-[450px] rounded-lg" />

          {/* Movie details skeleton */}
          <div className="flex-1 space-y-4">
            {/* Title skeleton */}
            <Skeleton className="h-8 w-3/4 rounded-md" />

            {/* Details skeleton */}
            <div className="flex gap-5 text-lg">
              <Skeleton className="h-6 w-12 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-12 rounded-md" />
              <Skeleton className="h-6 w-6 rounded-md" />
            </div>

            {/* Genre skeleton */}
            <div className="flex flex-wrap gap-3">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="h-6 w-20 rounded-md" />
                ))}
            </div>

            {/* Seasons & Episodes skeleton */}
            <div className="flex gap-4">
              <Skeleton className="h-6 w-24 rounded-md" />
              <Skeleton className="h-6 w-24 rounded-md" />
            </div>

            {/* Status skeleton */}
            <div className="flex gap-4">
              <Skeleton className="h-6 w-16 rounded-md" />
            </div>

            {/* Overview skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-6 w-3/4 rounded-md" />
            </div>

            {/* Created By skeleton */}
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-6 w-32 rounded-md" />
            </div>

            {/* Cast skeleton */}
            <div className="flex flex-wrap gap-4">
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="h-6 w-20 rounded-md" />
                ))}
            </div>

            {/* Production skeleton */}
            <div className="flex flex-wrap gap-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="h-6 w-32 rounded-md" />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`lg:flex gap-4 max-w-7xl mx-auto mt-6 md:px-6 lg:px-0`}>
        {/* Main Card */}
        <div className="w-full lg:w-8/12">
          {/* TV Details */}
          <div className="lg:flex lg:flex-row gap-4 md:p-0 flex flex-col-reverse">
            <div className="bg-muted rounded-lg shadow-lg lg:w-4/6 p-6 flex flex-col gap-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2 my-2" />
              <Skeleton className="h-16 w-full my-4" />
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-4 w-10" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            <div className="bg-muted rounded-lg shadow-lg lg:w-2/6 p-4 flex flex-col gap-4">
              <Skeleton className="h-5 w-1/3 mb-2" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-5 w-1/3 my-4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-5 w-1/3 my-4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>

          {/* Trailers Section */}
          <div className="lg:flex gap-10 my-4">
            <div>
              <Skeleton className="h-6 w-1/3 mb-4" />
              <div className="flex gap-4 overflow-x-auto">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="w-[200px] h-[150px] rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Most Popular Section */}
        <div className="w-full lg:w-4/12 rounded-md bg-muted p-4 z-10">
          <Skeleton className="h-6 w-1/3 mb-4" />
          {Array.from({ length: 10 }).map((_, idx) => (
            <div key={idx} className="flex gap-3 my-4">
              <Skeleton className="w-16 h-20 rounded-md" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
