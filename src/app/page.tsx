
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3"><input type="checkbox" /></th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Notice Type</th>
                <th className="p-3 text-left">Department / Individual</th>
                <th className="p-3 text-left">Publish On</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>

                <tr className="border-t hover:bg-gray-50">
                  <td className="p-3"><input type="checkbox" /></td>
                  <td className="p-3 font-medium">lja  ljl lasj</td>
                  <td className="p-3">Borki chalao</td>
                  <td className="p-3">Indevidual</td>
                  <td className="p-3">sljlkjasl  ;ajf; la;jlkj</td>

                  <td className="p-3">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium`}>
                      published
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    khairul
                  </td>
                </tr>
            
            </tbody>

          </table>
        </div>
    </div>
  );
}
