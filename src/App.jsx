import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const[length, setLength] = useState(8)
  const[isSpecialCharacterAllowed, setSpecialCharacter] = useState(false)
  const[isNumberAllowed, setNumber] = useState(false)
  const[password, setPassword] = useState("")

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (isNumberAllowed) str += "1234567890"
    if (isSpecialCharacterAllowed) str += "!@#$%^&*()~`/?<>*"

    for(let i =1; i<= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    
    setPassword(pass)

  } , [length, isNumberAllowed, isSpecialCharacterAllowed, setPassword])

  const pwdRef = useRef(null)
  const copyPassword = useCallback(()=>{
    pwdRef.current?.select()
    pwdRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{passwordGenerator()}, [length, isNumberAllowed, isSpecialCharacterAllowed, passwordGenerator])


  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>PassWord Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text" 
        value={password}
        placeholder='Passholder'
        className='outline-none w-full py-1 px-3 my-3 rounded-md'
        readOnly
        ref={pwdRef}
        />
        <button className="otline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyPassword}>Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
          type="range" 
          name="" 
          id=""
          max={50}
          min={6}
          value={length}
          className='cursor-pointer'
          onChange={(e)=> {setLength(e.target.value)}} />
          <label>Length: {length}</label>
          
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={isNumberAllowed} name="" id="numberInput" onChange={() => setNumber((prev)=> !prev)}/>
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={isSpecialCharacterAllowed} name="" id="scInput" onChange={() => setSpecialCharacter((prev)=> !prev)}/>
          <label htmlFor="scInput">Special Char</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
