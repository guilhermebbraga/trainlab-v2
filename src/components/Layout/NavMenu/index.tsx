import Link from "next/link";
import { RiHome2Line } from "react-icons/ri";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";


type Menu = {
  path: string
  icon: React.ReactNode
}

export default function NavMenu() {

  const menuItems: Menu[] = [
    {
      path: '/home',
      icon: <RiHome2Line/>
    },
    {
      path: '/treinos',
      icon: <FaBarsStaggered/>
    },
    {
      path: '/perfil',
      icon: <FaUser/>
    },
  ]
  
  return (
    <div
          className="
          fixed bottom-0 bg-background/20 backdrop-blur-2xl
          h-12 w-full border-t border-border-custom/10"
        >
          <nav className="grid grid-cols-3 place-items-center h-full">
            {menuItems.map((item, index) => (
              <Link
                href={item.path}
                key={index}
                className="
                grid place-items-center text-xl text-text-muted
                cursor-pointer hover:text-text-main rounded-sm"
              >
                {item.icon}
              </Link>
            ))}

          </nav>

          
        </div>
  )
}