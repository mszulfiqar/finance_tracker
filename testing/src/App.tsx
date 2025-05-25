import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { getTranscation } from "./services/api"
import { useState } from "react"


export const tableHeaders = [
  {
    value: "TITLE"
  },
  {
    value: "AMOUNT"
  },
  {
    value: "TYPE"
  },
  {
    value: "CATEGORY"
  },
  {
    value: "DATE"
  },
  // {
  //   value: "ACTIONS"
  // },
]

const App = () => {
  const [selectedType,setSelectedType] = useState<string>()
  const handleChange = (value:string) => {
    setSelectedType(value)
  }
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["table"],
    queryFn: getTranscation
  })
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(selectedType)
  const filteredData =selectedType? data?.transactions?.filter((item:any)=>item.type==selectedType): data?.transactions
  const sortedData = data?.transactions.sort()
  return (
    <div>
      <div>
        <Select onValueChange={handleChange} value={selectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Light</SelectItem>
            <SelectItem value="expense">Dark</SelectItem>
            {/* <SelectItem value="system">System</SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              {
                tableHeaders.map(item => (
                  <TableHead key={item.value} className="text-right">{item.value}</TableHead>
                ))
              }
              {/* */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              // isLoading ? null :
            filteredData?.map((item:any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))
            }

          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default App