import { Review } from "@/types/tmdb";
import { StarIcon } from "lucide-react";
import Image from "next/image";

export default function ReviewCard({
  author,
  author_details,
  content,
  created_at,
}: Review) {
  return (
    <div className="bg-muted rounded-lg shadow p-4  w-[250px] lg:w-1/3 shrink-0">
      {/* Header */}
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 relative rounded-full bg-gray-300 overflow-hidden">
          {author_details.avatar_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${author_details.avatar_path}`}
              alt="author"
              fill
              sizes="100"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-white flex items-center justify-center">
              <span className="text text-black">N/A</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">{author}</h3>
          <p className="text-xs text-muted-foreground">
            {new Date(created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-h-36 overflow-hidden">
        <p className="text-sm text-muted-foreground">{content}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-3">
        <StarIcon className="w-5 h-5 text-yellow-500" />
        <span className="text-sm font-bold">
          {author_details.rating ? author_details.rating.toFixed(1) : "N/A"}
        </span>
      </div>
    </div>
  );
}
