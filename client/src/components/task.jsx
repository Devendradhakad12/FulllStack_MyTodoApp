import React, { useEffect, useState }  from "react";
 
const Task = ({task,setMytask, mytask,error, location }) => {
   // handle search
   const [searchInp, setSearchInp] = useState("");
   const handleSearch = (e) => {
     let regexp = new RegExp(e, "i");
     let searcht = task?.filter((t) => {
       return regexp.test(t.title) || regexp.test(t.description);
     });
 
     setMytask(searcht);
   };
   useEffect(() => {
     handleSearch(searchInp);
   }, [searchInp]);
  return (
    <>
        <div className="pb-4 flex justify-center"> 
        <input
          type="text"
          value={searchInp}
          onChange={(e) => {
            setSearchInp(e.target.value);
          }}
          className="px-4 py-1 rounded-lg outline-none "
          placeholder="Search Task.."
        />
      </div>
      {mytask[0] ? (
        <div className="bg flex gap-4 sm:gap-[40px] justify-center items-center flex-wrap py-5">
          {mytask?.map((t) => {
            return (
              <div className="homeTaskBox bg-orange-400 relative" key={t._id}>
                <div className="flex flex-col justify-center gap-5 px-3">
                  <div>
                   <h1 className=" capitalize text-[24px] font-semibold text-center">{location === "pending" ? <>❎</>: <>✅</>}</h1>
                  </div>{" "}
                  <div>
                    <h2 className=" font-semibold text-[20px] capitalize">{t.title}</h2>
                    <p>{t.description}</p>
                  </div>
                </div>
                <div className="absolute bottom-2">
                  <p className="text-[16px]">
                    <span className="font-bold">Created Date:</span>{" "}
                    {new Date(t?.createdAt).toDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center">
             <p className=" capitalize">  {error ? <> {error} </> : <> {location} Task Not Available  </>  }  </p>
        </div>
      )}
    </>
  );
};

export default Task;
