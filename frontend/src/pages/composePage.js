
import React from 'react'

import ComposeForm from '../components/composeForm'
import composeCSS from './composePage.module.css'

const ComposePage = () => {
  return (
    <div className={composeCSS["form-div"]}>
		<ComposeForm />
    </div>
    
  )
}

export default ComposePage;