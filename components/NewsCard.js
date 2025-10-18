import React from "react";

const NewsCard = ({ article }) => {
  if (!article) return null;

  const {
    title,
    link,
    description,
    image,
    source,
    pubDate,
  } = article;

  // Safe title & link handling
  const safeTitle = typeof title === "string" ? title : "Untitled Article";
  const safeLink = typeof link === "string" ? link : "#";

  // Handle missing or non-string images
  let imageUrl = null;
  if (typeof image === "string" && image.startsWith("http")) {
    imageUrl = image;
  } else {
    // Fallback to placeholder (you can replace with your logo)
    imageUrl = "/placeholder.jpg";
  }

  // Clean and limit description
  const cleanDescription =
    typeof description === "string"
      ? description.replace(/(<([^>]+)>)/gi, "").slice(0, 180) + "..."
      : "";

  return (
    <a
      href={safeLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[#0a0a0a]/70 hover:bg-[#1a1a1a] text-gray-200 border border-gray-800 rounded-2xl overflow-hidden shadow-md transition-transform transform hover:scale-[1.01]"
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={safeTitle}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.jpg";
          }}
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-100 mb-2 line-clamp-2">
          {safeTitle}
        </h2>
        <p className="text-gray-400 text-sm mb-3 line-clamp-3">
          {cleanDescription}
        </p>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{source || "Unknown Source"}</span>
          <span>
            {pubDate ? new Date(pubDate).toLocaleDateString() : ""}
          </span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;

