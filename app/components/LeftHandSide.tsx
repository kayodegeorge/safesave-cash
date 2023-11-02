import { getAllAccounts } from "../backend";
import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";
import { useQuery } from "@tanstack/react-query";



const LeftHandSide = () => {
    const { data: accounts, isLoading } = useQuery({
        queryKey: ["accounts"],
        queryFn: getAllAccounts,
      });
    return ( <>
     <div className="p-6 font-semibold text-blue-700">
     <h1 className="text-2xl">SafeSave by AstraPolaris</h1>
      <p className="mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae pariatur vitae aut sapiente, inventore distinctio numquam soluta quasi hic exercitationem velit earum odio culpa obcaecati incidunt a amet, reiciendis explicabo.</p>
     </div>

     {/* <DataTable columns={columns} data={accounts} /> */}
    </> );
}
 
export default LeftHandSide;