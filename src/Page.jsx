import React,{useState} from 'react'
import { Button } from 'react-bootstrap'

function Page() {
    const[count, setCount] = useState(0)
    const click_ref = React.useRef(null);
    React.useEffect(()=>{
        
        click_ref.current = handleClick;
        function handleClick() {
           
          console.log("Running handleClick defined inside useEffect()...");
          setCount(count+1)
        }
        // console.log("Updating click_ref...");
        
      },[count]);
  return (
    <div>
        <Button onClick={()=>click_ref.current()}>Click me</Button>
        <Button onClick={()=>click_ref.current()}>Click me</Button>
        <Button onClick={()=>click_ref.current()}>Click me</Button>
        <Button onClick={()=>click_ref.current()}>Click me</Button>
        <Button onClick={()=>click_ref.current()}>Click me</Button>
        <Button onClick={()=>click_ref.current()}>Click me</Button>
        <Button onClick={()=>click_ref.current()}>Click me</Button>
        {count}
        {/* <Button onClick={()=>click_ref.current()}>Click me</Button> */}
    </div>
  )
}

export default Page