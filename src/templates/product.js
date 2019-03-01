import React from "react"
import { ResponsiveContainer } from "../components/layout"

export default function product(props) {
  return (
    <ResponsiveContainer>
      <div>{props.pageContext.product_name}</div>
    </ResponsiveContainer>
  )
}
