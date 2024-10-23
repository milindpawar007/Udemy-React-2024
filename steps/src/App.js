import { useState } from "react";

const message = [
  "Learn DSA",
  "Practice Leetcode",
  "Crack the Interview"

]

const App = () => {
  const [step, setSteps] = useState(1)
  const [close, setClose] = useState(true)
  const handelnext = () => {
    if (step < 3) {
      setSteps((s) => s + 1);
    }

  }
  const handelprevi = () => {
    if (step > 1) {
      setSteps((s) => s - 1);
    }
  }
  return (

    <div className="steps">
      <button className="close"onClick={()=>{setClose(!close)}}>✖️</button>
       {close?
          <>
          <div className="numbers">
            <div className={step === 1 ? "active" : ""}>1</div>
            <div className={step === 2 ? "active" : ""}>2</div>
            <div className={step === 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}: {message[step - 1]}
          </p>

          <div className="buttons">
            <button style={{ backgroundColor: '#7950f2', color: '#fff' }} onClick={handelprevi}>Previous</button>
            <button style={{ backgroundColor: '#7950f2', color: '#fff' }} onClick={handelnext}>Next</button>
          </div>
          </>
        :''
      }
       
      
    </div>

  )
}

export default App