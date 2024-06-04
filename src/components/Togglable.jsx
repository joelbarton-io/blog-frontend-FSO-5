import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visibility, setVisibility] = useState(false)
  const hide = { display: visibility ? 'none' : '' }
  const show = { display: visibility ? '' : 'none' }

  const toggleVisibility = () => setVisibility((prev) => !prev)

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })
  return (
    <div>
      <div style={hide}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={show}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable
