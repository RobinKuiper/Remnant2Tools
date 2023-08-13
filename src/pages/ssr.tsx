import * as React from "react"

const Page = ({ serverData }) => {
  const { dogImage } = serverData

  return <img src={dogImage.message} />
}

export async function getServerData() {
  const res = await fetch(`https://dog.ceo/api/breeds/image/random`)
  const data = await res.json()

  return {
    props: {
      dogImage: data,
    },
  }
}

export default Page