import Image from "next/image";
import InvoiceStatus from "@/app/ui/invoices/status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredInvoices } from "@/app/lib/invoices/data";
import { InvoicesTable as InvoicesTableTableType } from "@/app/lib/invoices/definitions";
import { DeleteItemButton, UpdateItemButton } from "../dashboard/buttons";
import { deleteInvoice } from "@/app/lib/invoices/actions";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  const TableItem = ({ item }: { item: InvoicesTableTableType }) => (
    <tr
      key={item.id}
      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
    >
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <Image
            src={item.image_url}
            className="rounded-full"
            width={28}
            height={28}
            alt={`${item.name}'s profile picture`}
          />
          <p>{item.name}</p>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">{item.email}</td>
      <td className="whitespace-nowrap px-3 py-3">
        {formatCurrency(item.amount)}
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        {formatDateToLocal(item.date)}
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <InvoiceStatus status={item.status} />
      </td>
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <UpdateItemButton id={item.id} parentUrl="invoices" />
          <DeleteItemButton
            id={item.id}
            onDelete={deleteInvoice.bind(null, item.id)}
          />
        </div>
      </td>
    </tr>
  );

  const TableMobileItem = ({ item }: { item: InvoicesTableTableType }) => (
    <div key={item.id} className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="mb-2 flex items-center">
            <Image
              src={item.image_url}
              className="mr-2 rounded-full"
              width={28}
              height={28}
              alt={`${item.name}'s profile picture`}
            />
            <p>{item.name}</p>
          </div>
          <p className="text-sm text-gray-500">{item.email}</p>
        </div>
        <InvoiceStatus status={item.status} />
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <p className="text-xl font-medium">{formatCurrency(item.amount)}</p>
          <p>{formatDateToLocal(item.date)}</p>
        </div>
        <div className="flex justify-end gap-2">
          <UpdateItemButton id={item.id} parentUrl="invoices" />
          <DeleteItemButton
            id={item.id}
            onDelete={deleteInvoice.bind(null, item.id)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <TableMobileItem key={invoice.id} item={invoice} />
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <TableItem key={invoice.id} item={invoice} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
