import React  from "react";
 
const Task = ({ mytask,error, location }) => {
  return (
    <>
      {mytask[0] ? (
        <>
          {mytask?.map((t) => {
            return (
              <div className="homeTaskBox bg-orange-400 relative" key={t._id}>
                <div className="flex flex-col justify-center gap-5 px-3">
                  <div>
                   <h1 className=" capitalize text-[24px] font-semibold border-b border-black pb-1 text-center">Tasks {location === "pending" ? <>❎</>: <>✅</>}</h1>
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
        </>
      ) : (
        <div>
             <p className=" capitalize">  {error ? <> {error} </> : <> {location} Task Not Available  </>  }  </p>
        </div>
      )}
    </>
  );
};

export default Task;
