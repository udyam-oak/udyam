import React from 'react'

const Teacherqadd = () => {
  return (
    <div>
      <form action="">
        <label htmlFor="question">Question</label>
        <input type="text" placeholder='Enter the question here' name='question' value={""}/>
        <label htmlFor="answer">Answer</label>
        <input type="text" placeholder='Enter the answer here' name='answer' value={""}/>
        <button>Enter Next Question</button>
        <input type="submit" value={"Add all Questions"} />
        
      </form>
    </div>
  )
}

export default Teacherqadd
