import { Link } from '@tanstack/react-router'
import { JSX } from 'react'

export function Header(): JSX.Element {
  return (
    <header className="p-4 flex flex-1 gap-2 app-region sticky top-0 inset-x-0 border-b bg-white z-50">
     <div className='[&>*]:app-no-region flex gap-4'>
       <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>

      <Link to="/notes" className="[&.active]:font-bold">
        Notes
      </Link>
     </div>
    </header>
  )
}
