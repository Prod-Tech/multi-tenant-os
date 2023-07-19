import React from "react"

export interface Props {
  children?: React.ReactNode
}

const Page: React.FC<Props> = (props) => {
  return (
    <>
      <div className="min-h-screen overflow-x-hidden relative">
        {props.children}
      </div>
    </>
  )
}

export default Page