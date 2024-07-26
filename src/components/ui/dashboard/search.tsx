import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const search = () => {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="nom" />
          <Button type="submit" className="bg-sky-500 hover:bg-sky-600">rechercher</Button>
        </div>
      )
}

export default search;