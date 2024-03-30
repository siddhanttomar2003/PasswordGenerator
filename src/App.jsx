import { useState, useCallback, useEffect,useRef } from 'react'



function App() {
  const [length, Setlength] = useState(8);
  const [havenum, Sethavenum] = useState(false);
  const [havechar, Sethavechar] = useState(false);
  const [password, Setpassword] = useState("");
  const passwordRef=useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (havenum) str += "0123456789";
    if (havechar) str += "~!@#$%^&*(()-_=+{}[]";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    Setpassword(pass);
  }, [length, havenum, havechar, Setpassword]);
   const copypassToclipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,length);
       window.navigator.clipboard.writeText(password)
   },[password])
  useEffect(() => {
    passwordGenerator()
  }, [length, havenum, havechar, passwordGenerator]);
  return (
    <div className='w-full h-screen absolute flex flex-col justify-center items-center
    bg-black'>
      <div className='w-[40%] h-[40%]  rounded-lg bg-slate-800 flex flex-col gap-3 items-evenly  justify-evenly  '>
        <h1 className='text-center text-4xl px-3 py-2 text-white md:text-3xl sm:text-2xl '> Password Generator</h1>
        <div className='flex justify-center items center gap-2'><input type="text" value={password} className='outline-none rounded-lg px-3 py-2' placeholder='password' ref={passwordRef} readOnly />
          <button className='bg-blue-700 text-white text-md rounded-lg px-3 py-2 hover:bg-blue-600' onClick={copypassToclipboard}>Copy</button></div>
        <div className='flex gap-6 justify-evenly items-center duration-200'>
          <div className='flex gap-2 justify-center items-center'>
            <input type="range" min={5} max={20} value={length} className='cursor-pointer' onChange={(e) => Setlength(e.target.value)} />
            <label className='text-white text-lg'>Length:{length}</label>
          </div>
          <div className='flex gap-2 justify-center items-center'><input type="checkbox" defaultChecked={havenum} onChange={() => { Sethavenum((prev) => !prev); }} />
            <label className='text-white text-lg'>Numbers</label></div>
          <div className='flex gap-2 justify-center items-center'><input type="checkbox" defaultChecked={havechar} onChange={() => { Sethavechar((prev) => !prev); }} />
            <label className='text-white text-lg'>Characters</label></div>

        </div>


      </div>
    </div>
  )
}

export default App
