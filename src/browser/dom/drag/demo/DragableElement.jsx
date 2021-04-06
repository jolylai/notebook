import React from 'react';

function DragableElement() {
  return (
    <article className="p-4 flex space-x-4">
      <img
        src="https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/jucy-beef-burger.jpg"
        alt=""
        className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
        width="144"
        height="144"
      />
      <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
        <h2 className="text-lg font-semibold text-black mb-0.5">
          <a href="#">Hank’s Juiciest Beef Burger</a>
        </h2>
        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
          <div className="flex-none w-full mt-0.5 font-normal">
            <dt className="inline">By</dt>{' '}
            <dd className="inline text-black">Franecki</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default DragableElement;
