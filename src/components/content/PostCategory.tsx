import React from "react"

export const PostCategory: React.FC<{
  category: string
  className?: string
}> = ({ category, className }) => {
  return (
    <div
      className={`${
        "text-gray-500 bg-gray-50"
        // eslint-disable-next-line
      } font-bold px-1.5 py-1 rounded max-w-max text-xs uppercase ${className}`}
    >
      {category}
    </div>
  )
}
