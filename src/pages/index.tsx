import {Inter} from "next/font/google"
import HomeModule from "@/modules";

const inter= Inter ({subsets:["latin"] });

export default  function Home  ()  {
  return (
    <main>
      <HomeModule />
    </main>
  )
}

