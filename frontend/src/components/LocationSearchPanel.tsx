
interface LocationSearchPanelProps {
    setVehiclePanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationSearchPanel = ({setVehiclePanel}:LocationSearchPanelProps) => {

    const locations:string[] = [
        "24B, New Delhi",
        "24B, New Delhi",
        "24B, New Delhi",
    ]

  return (
    <>
   { locations.map((location:string,index:number)=>(
        <div onClick={()=>setVehiclePanel(true)} key={index} className=" p-5 pt-2 flex items-center gap-2 justify-start border-2   border-gray-100 active:border-black hover:bg-gray-50 cursor-pointer" >
            <h2 className="bg-[#eee] h-8 w-9 flex items-center justify-center rounded-full" ><i className=" text-xl  ri-map-pin-fill"></i></h2>
            <h4 className="text- font-medium" >{location}</h4>
        </div>

    ))}

    
    </>
  )
}

export default LocationSearchPanel