import React from 'react';

export default () => {
  const onChange = e => {
    console.log('files: ', e.target.files);
    console.log('value: ', e.target.value);
  };

  return (
    <section className="shadow px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
      <form className="relative">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
        <input
          className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
          type="text"
          aria-label="Filter projects"
          placeholder="Filter projects"
        />
      </form>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <li>
          <a className="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200">
            <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
              <div>
                <dt className="sr-only">Title</dt>
                <dd className="group-hover:text-white leading-6 font-medium text-black"></dd>
              </div>
              <div>
                <dt className="sr-only">Category</dt>
                <dd className="group-hover:text-light-blue-200 text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4"></dd>
              </div>
              <div className="col-start-2 row-start-1 row-end-3">
                <dt className="sr-only">Users</dt>
                <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-2">
                  <img
                    x-for="user in item.users"
                    width="48"
                    height="48"
                    className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white"
                  />
                </dd>
              </div>
            </dl>
          </a>
        </li>
      </ul>
    </section>
  );
};
