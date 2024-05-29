import { DashboardIcon, Grocery,  } from "@/icons"



export const sidebar_data=[
    {
        menu:"Menu",
        navigation: [
            {
              nav: "Dashboard",
              href: "/",
              icon: <DashboardIcon />,
            },
        ]
    },

    {
        menu:"Gift Impact Services",
        navigation:[{
            nav: "Grocery",
            href: "/grocery",
            icon: <Grocery /> ,
        }]
    }
        ]