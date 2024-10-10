import { useTheme } from "next-themes"
import { Button } from "../components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faDesktop } from '@fortawesome/free-solid-svg-icons'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
        <FontAwesomeIcon icon={faSun} className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Light mode</span>
      </Button>
      <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
        <FontAwesomeIcon icon={faMoon} className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Dark mode</span>
      </Button>
      <Button variant="outline" size="icon" onClick={() => setTheme("system")}>
        <FontAwesomeIcon icon={faDesktop} className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">System mode</span>
      </Button>
    </div>
  )
}