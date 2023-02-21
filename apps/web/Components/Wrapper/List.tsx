import Link from 'next/link'
import React from 'react'

const List = ({ global, trees }: any) => {
  return (
    <div className="px-6 lg:px-8">
      <div className="mt-2 flow-root">
        <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className=" ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <p className="text-lg text-gray-500"></p>
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-ylw-palette">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    {global && (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        User
                      </th>
                    )}

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y overflow-y-auto divide-gray-200 bg-white">
                  {trees.map((tree: any) => (
                    <tr key={tree._id}>
                      <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-left text-gray-900">
                        <Link
                          href={`/trees/${tree._id}`}
                          className="no-underline text-gray-900"
                        >
                          {tree.treeName}
                        </Link>
                      </td>
                      {global && (
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-left text-gray-500">
                          {tree.username?.split(' ')[0]}
                        </td>
                      )}
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        123
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
