import React from 'react'

const Task = ({today}) => {
  return (
    <div className="homeTaskBox bg-orange-400 relative">
    <div className="flex justify-center gap-5 px-3">
      <div>
        <input type="checkbox" className=" w-[30px] h-[30px]" />{" "}
      </div>{" "}
      <div>
        <h2 className=" font-semibold text-[20px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Ducimus voluptas laudantium necessitatibus exercitationem eos
          obcaecati accusamus odio optio impedit officia?
        </p>
      </div>
    </div>
    <div className="absolute bottom-2">
      <p className="text-[16px]">
        <span className="font-bold">Date:</span> {today}{" "}
      </p>
    </div>
  </div>
  )
}

export default Task
