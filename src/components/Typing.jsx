import React from 'react'
import { TypeAnimation } from 'react-type-animation';

const Typing = () => {
  return (
    <>
      <TypeAnimation
        sequence={[
          'angry',
          1500,
          'sad',
          1500,
          'hopeless',
          1500,
          'lonely',
          1500,
          'anxious',
          1500,
          'ashamed',
          1500,
          'guilty',
          1500,
        ]}
        wrapper="span"
        speed={30}
        repeat={Infinity}
        cursor={false}
      />
    </>
  )
}

export default Typing