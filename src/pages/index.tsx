import {Inter} from "next/font/google"
import Dashboard from '@/modules'

const inter= Inter ({subsets:["latin"] });

export default  function Home  ()  {
  return (
    <main>
      <Dashboard />
    </main>
  )
}

