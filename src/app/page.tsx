import Link from "next/link";

export default function Home() {
 return (
  <>
   <nav className="bg-gray-800 p-4">
    <ul className="flex space-x-4">
     <li>
      <Link className="text-white hover:text-gray-400" href="/dashboard">
       Dashboard
      </Link>
     </li>
     <li>
      <Link className="text-white hover:text-gray-400" href="/building">
       Building
      </Link>
     </li>
     <li>
      <Link className="text-white hover:text-gray-400" href="/customer">
       Customer
      </Link>
     </li>
     <li>
      <Link className="text-white hover:text-gray-400" href="/pricing">
       Pricing
      </Link>
     </li>
    </ul>
   </nav>
  </>
 );
}