import { Button } from '@/components/ui/button'
import Search from "@/components/ui/dashboard/search"
import Link from 'next/link'
import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"


export default function page() {
  return (
        <main className="flex flex-col items-center justify-between p-16">
          <Search/>
          <div className="z-10 mt-8 w-full max-w-5xl items-center justify-evenly font-mono text-sm lg:flex">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Nom</TableHead>
                  <TableHead>Prenom</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Categorie</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Ismail</TableCell>
                  <TableCell>Ismail</TableCell>
                  <TableCell>2006</TableCell>
                  <TableCell>
                  <Badge variant="outline" className='text-xl font-bold'>A</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex-row-reverse space-x-2">
                      <button className='px-4 py-2 bg-sky-700 rounded-lg text-white hover:bg-sky-600'>
                          <svg className='w-4 h-4 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 21 21" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd"><g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)"><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]"></path></g></g></g></svg>
                      </button>
                      <button className='px-4 py-2 bg-red-700 rounded-lg text-white hover:bg-red-600'>
                          <svg className='w-4 h-4 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="-3 0 32 32" version="1.1"><g id="Page-1" stroke-width="2"  fill-rule="evenodd"><g id="Icon-Set" transform="translate(-259.000000, -203.000000)"><path d="M282,211 L262,211 C261.448,211 261,210.553 261,210 C261,209.448 261.448,209 262,209 L282,209 C282.552,209 283,209.448 283,210 C283,210.553 282.552,211 282,211 L282,211 Z M281,231 C281,232.104 280.104,233 279,233 L265,233 C263.896,233 263,232.104 263,231 L263,213 L281,213 L281,231 L281,231 Z M269,206 C269,205.447 269.448,205 270,205 L274,205 C274.552,205 275,205.447 275,206 L275,207 L269,207 L269,206 L269,206 Z M283,207 L277,207 L277,205 C277,203.896 276.104,203 275,203 L269,203 C267.896,203 267,203.896 267,205 L267,207 L261,207 C259.896,207 259,207.896 259,209 L259,211 C259,212.104 259.896,213 261,213 L261,231 C261,233.209 262.791,235 265,235 L279,235 C281.209,235 283,233.209 283,231 L283,213 C284.104,213 285,212.104 285,211 L285,209 C285,207.896 284.104,207 283,207 L283,207 Z M272,231 C272.552,231 273,230.553 273,230 L273,218 C273,217.448 272.552,217 272,217 C271.448,217 271,217.448 271,218 L271,230 C271,230.553 271.448,231 272,231 L272,231 Z M267,231 C267.552,231 268,230.553 268,230 L268,218 C268,217.448 267.552,217 267,217 C266.448,217 266,217.448 266,218 L266,230 C266,230.553 266.448,231 267,231 L267,231 Z M277,231 C277.552,231 278,230.553 278,230 L278,218 C278,217.448 277.552,217 277,217 C276.448,217 276,217.448 276,218 L276,230 C276,230.553 276.448,231 277,231 L277,231 Z" id="trash"></path></g></g></svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Hassan</TableCell>
                  <TableCell>Hassan</TableCell>
                  <TableCell>2013</TableCell>
                  <TableCell>
                  <Badge variant="outline" className='text-xl font-bold'>B</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex-row-reverse space-x-2">
                      <button className='px-4 py-2 bg-sky-700 rounded-lg text-white hover:bg-sky-600'>
                          <svg className='w-4 h-4 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 21 21" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd"><g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)"><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]"></path></g></g></g></svg>
                      </button>
                      <button className='px-4 py-2 bg-red-700 rounded-lg text-white hover:bg-red-600'>
                          <svg className='w-4 h-4 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="-3 0 32 32" version="1.1"><g id="Page-1" stroke-width="2"  fill-rule="evenodd"><g id="Icon-Set" transform="translate(-259.000000, -203.000000)"><path d="M282,211 L262,211 C261.448,211 261,210.553 261,210 C261,209.448 261.448,209 262,209 L282,209 C282.552,209 283,209.448 283,210 C283,210.553 282.552,211 282,211 L282,211 Z M281,231 C281,232.104 280.104,233 279,233 L265,233 C263.896,233 263,232.104 263,231 L263,213 L281,213 L281,231 L281,231 Z M269,206 C269,205.447 269.448,205 270,205 L274,205 C274.552,205 275,205.447 275,206 L275,207 L269,207 L269,206 L269,206 Z M283,207 L277,207 L277,205 C277,203.896 276.104,203 275,203 L269,203 C267.896,203 267,203.896 267,205 L267,207 L261,207 C259.896,207 259,207.896 259,209 L259,211 C259,212.104 259.896,213 261,213 L261,231 C261,233.209 262.791,235 265,235 L279,235 C281.209,235 283,233.209 283,231 L283,213 C284.104,213 285,212.104 285,211 L285,209 C285,207.896 284.104,207 283,207 L283,207 Z M272,231 C272.552,231 273,230.553 273,230 L273,218 C273,217.448 272.552,217 272,217 C271.448,217 271,217.448 271,218 L271,230 C271,230.553 271.448,231 272,231 L272,231 Z M267,231 C267.552,231 268,230.553 268,230 L268,218 C268,217.448 267.552,217 267,217 C266.448,217 266,217.448 266,218 L266,230 C266,230.553 266.448,231 267,231 L267,231 Z M277,231 C277.552,231 278,230.553 278,230 L278,218 C278,217.448 277.552,217 277,217 C276.448,217 276,217.448 276,218 L276,230 C276,230.553 276.448,231 277,231 L277,231 Z" id="trash"></path></g></g></svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Hicham</TableCell>
                  <TableCell>Hicham</TableCell>
                  <TableCell>2018</TableCell>
                  <TableCell>
                  <Badge variant="outline" className='text-xl font-bold'>D</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex-row-reverse space-x-2">
                      <button className='px-4 py-2 bg-sky-700 rounded-lg text-white hover:bg-sky-600'>
                          <svg className='w-4 h-4 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 21 21" version="1.1"><g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd"><g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)"><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]"></path></g></g></g></svg>
                      </button>
                      <button className='px-4 py-2 bg-red-700 rounded-lg text-white hover:bg-red-600'>
                          <svg className='w-4 h-4 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="-3 0 32 32" version="1.1"><g id="Page-1" stroke-width="2"  fill-rule="evenodd"><g id="Icon-Set" transform="translate(-259.000000, -203.000000)"><path d="M282,211 L262,211 C261.448,211 261,210.553 261,210 C261,209.448 261.448,209 262,209 L282,209 C282.552,209 283,209.448 283,210 C283,210.553 282.552,211 282,211 L282,211 Z M281,231 C281,232.104 280.104,233 279,233 L265,233 C263.896,233 263,232.104 263,231 L263,213 L281,213 L281,231 L281,231 Z M269,206 C269,205.447 269.448,205 270,205 L274,205 C274.552,205 275,205.447 275,206 L275,207 L269,207 L269,206 L269,206 Z M283,207 L277,207 L277,205 C277,203.896 276.104,203 275,203 L269,203 C267.896,203 267,203.896 267,205 L267,207 L261,207 C259.896,207 259,207.896 259,209 L259,211 C259,212.104 259.896,213 261,213 L261,231 C261,233.209 262.791,235 265,235 L279,235 C281.209,235 283,233.209 283,231 L283,213 C284.104,213 285,212.104 285,211 L285,209 C285,207.896 284.104,207 283,207 L283,207 Z M272,231 C272.552,231 273,230.553 273,230 L273,218 C273,217.448 272.552,217 272,217 C271.448,217 271,217.448 271,218 L271,230 C271,230.553 271.448,231 272,231 L272,231 Z M267,231 C267.552,231 268,230.553 268,230 L268,218 C268,217.448 267.552,217 267,217 C266.448,217 266,217.448 266,218 L266,230 C266,230.553 266.448,231 267,231 L267,231 Z M277,231 C277.552,231 278,230.553 278,230 L278,218 C278,217.448 277.552,217 277,217 C276.448,217 276,217.448 276,218 L276,230 C276,230.553 276.448,231 277,231 L277,231 Z" id="trash"></path></g></g></svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        <div className="relative z-[-1] flex place-items-center">
          
        </div>
      </main>
  )
}
