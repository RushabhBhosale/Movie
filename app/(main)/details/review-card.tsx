import { StarIcon } from "lucide-react";

interface ReviewProps {
  author: string;
  authorDetails: {
    name: string;
    avatarPath: string;
    rating: number;
  };
  content: string;
  createdAt: string;
}

export default function ReviewCard({
  author,
  authorDetails,
  content,
  createdAt,
}: ReviewProps) {
  return (
    <div className="bg-muted rounded-lg shadow p-4  w-[250px] lg:w-1/3 shrink-0">
      {/* Header */}
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${authorDetails.avatarPath}`}
            alt={author}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">{author}</h3>
          <p className="text-xs text-muted-foreground">
            {new Date(createdAt).toLocaleDateString()}
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
          {authorDetails.rating ? authorDetails.rating.toFixed(1) : "N/A"}
        </span>
      </div>
    </div>
  );
}
