import React, { createContext, useState } from 'react'
import View from '../Components/View/View'
import Option from '../Components/Option/Option'

export const optionContext = createContext('')
export default function Home() {
  const [option, setOption] = useState('')
  return (
    <>
      <optionContext.Provider value={option}>
        {/* {!option ? <Option  /> : <View />} */}
      </optionContext.Provider>
    </>
  )
}
