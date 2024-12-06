import { MegamenuItem, NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import { Route } from "@/routers/types";
import __megamenu from "./jsons/__megamenu.json";

const megaMenuDemo: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Company",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.Company,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "App Name",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.AppName,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "City",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.City,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Contruction",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.Contruction,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Country",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.Country,
    })),
  },
];

const demoChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Online booking",
  },
  {
    id: ncNanoId(),
    href: "/home-2",
    name: "Real estate",
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/home-3",
    name: "Home 3",
    isNew: true,
  },
];

const otherPageChildMenus: NavItemType[] = [
  { id: ncNanoId(), href: "/blog", name: "Blog page" },
  { id: ncNanoId(), href: "/blog/single" as Route, name: "Blog single" },
  { id: ncNanoId(), href: "/about", name: "About" },
  { id: ncNanoId(), href: "/contact", name: "Contact us" },
  { id: ncNanoId(), href: "/login", name: "Login" },
  { id: ncNanoId(), href: "/signup", name: "Signup" },
];

const templatesChildrenMenus: NavItemType[] = [
  //
  {
    id: ncNanoId(),
    href: "tel:+918645663143",
    name: "+91 8645663143",
    icon: "las la-phone",
  },
  {
    id: ncNanoId(),
    href: "wa.me://918800150924",
    name: "+91 8800150924",
    icon: "lab la-whatsapp",
  },
  //
  // { id: ncNanoId(), href: "/author", name: "Author page" },
  // { id: ncNanoId(), href: "/account", name: "Account page" },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  // {
  //   id: ncNanoId(),
  //   href: "/",
  //   name: "Home",
  //   type: "dropdown",
  //   // children: demoChildMenus,
  //   isNew: true,
  // },
  {
    id: ncNanoId(),
    href: "/subscription",
    name: "Become a Pro",
    type: "megaMenu",
    // megaMenu: megaMenuDemo,
  },
  {
    id: ncNanoId(),
    href: "/corporate-enquiries",
    name: "Corporate Enquires",
    type: "dropdown",
    // children: [
    //   {
    //     id: ncNanoId(),
    //     href: "/listing-stay",
    //     name: "Stay listings",
    //     type: "dropdown",
    //     children: [
    //       { id: ncNanoId(), href: "/listing-stay", name: "Stay page" },
    //       {
    //         id: ncNanoId(),
    //         href: "/listing-stay-map",
    //         name: "Stay page (map)",
    //       },
    //       { id: ncNanoId(), href: "/listing-stay-detail", name: "Stay Detail" },
    //     ],
    //   },

    //   //
    //   {
    //     id: ncNanoId(),
    //     href: "/listing-experiences",
    //     name: "Holiday Package listings",
    //     type: "dropdown",
    //     children: [
    //       {
    //         id: ncNanoId(),
    //         href: "/listing-experiences",
    //         name: "Holiday Package page",
    //       },
    //       {
    //         id: ncNanoId(),
    //         href: "/listing-experiences-map",
    //         name: "Holiday Package page (map)",
    //       },
    //       {
    //         id: ncNanoId(),
    //         href: "/listing-experiences-detail",
    //         name: "Holiday Package Detail",
    //       },
    //     ],
    //   },

    //   //
    //   {
    //     id: ncNanoId(),
    //     href: "/listing-car",
    //     name: "Cars listings",
    //     type: "dropdown",
    //     children: [
    //       { id: ncNanoId(), href: "/listing-car", name: "Cars page" },
    //       { id: ncNanoId(), href: "/listing-car-map", name: "Cars page (map)" },
    //       { id: ncNanoId(), href: "/listing-car-detail", name: "Car Detail" },
    //     ],
    //   },

    //   //
    //   {
    //     id: ncNanoId(),
    //     href: "/listing-real-estate",
    //     name: "Real Estate Listings",
    //     type: "dropdown",
    //     children: [
    //       {
    //         id: ncNanoId(),
    //         href: "/listing-real-estate",
    //         name: "Real Estate Listings",
    //       },
    //       {
    //         id: ncNanoId(),
    //         href: "/listing-real-estate-map",
    //         name: "Real Estate Maps",
    //       },
    //     ],
    //   },
    //   //
    //   {
    //     id: ncNanoId(),
    //     href: "/listing-flights",
    //     name: "Flights listings",
    //   },
    // ],
  },
  {
    id: ncNanoId(),
    href: "/contact",
    name: "24X7 Support",
    type: "dropdown",
    children: templatesChildrenMenus,
  },

  // {
  //   id: ncNanoId(),
  //   href: "/blog",
  //   name: "Other pages",
  //   type: "dropdown",
  //   children: otherPageChildMenus,
  // },
];
export const CORPORATE_NAVIGATION: NavItemType[] = [
  // {
  //   id: ncNanoId(),
  //   href: "/",
  //   name: "Home",
  //   type: "dropdown",
  //   // children: demoChildMenus,
  //   isNew: true,
  // },
  {
    id: ncNanoId(),
    href: "/corporate-booking",
    name: "Booking",
    // type: "megaMenu",
    // megaMenu: megaMenuDemo,
  },
  {
    id: ncNanoId(),
    href: "/company-details",
    name: "Company & Employees",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/company-details",
        name: "Company Details",
      },

      //
      {
        id: ncNanoId(),
        href: "/employees",
        name: "Employees",
      },

      //
      // {
      //   id: ncNanoId(),
      //   href: "/groups",
      //   name: "Groups",
      // },
    ],
  },
  {
    id: ncNanoId(),
    href: "/wallet",
    name: "Wallet",
  },
  {
    id: ncNanoId(),
    href: "/company-details",
    name: "Travel Management",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/travel-report",
        name: "Travel Report",
      },

      //
      {
        id: ncNanoId(),
        href: "/travel-invoice",
        name: "Travel Invoice",
      },

      //
      // {
      //   id: ncNanoId(),
      //   href: "/travel policy",
      //   name: "Travel Policy",
      // },
    ],
  },
  // {
  //   id: ncNanoId(),
  //   href: "/contact",
  //   name: "24X7 Support",
  //   type: "dropdown",
  //   children: templatesChildrenMenus,
  // },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    type: "dropdown",
    children: demoChildMenus,
    isNew: true,
  },

  //
  {
    id: ncNanoId(),
    href: "/listing-stay",
    name: "Listing pages",
    children: [
      { id: ncNanoId(), href: "/listing-stay", name: "Stay listings" },
      {
        id: ncNanoId(),
        href: "/listing-stay-map",
        name: "Stay listings (map)",
      },
      { id: ncNanoId(), href: "/listing-stay-detail", name: "Stay detail" },

      //
      {
        id: ncNanoId(),
        href: "/listing-experiences",
        name: "Holiday Package listings",
      },
      {
        id: ncNanoId(),
        href: "/listing-experiences-map",
        name: "Holiday Package (map)",
      },
      {
        id: ncNanoId(),
        href: "/listing-experiences-detail",
        name: "Holiday Package detail",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/listing-car",
    name: "Listing pages",
    children: [
      { id: ncNanoId(), href: "/listing-car", name: "Cars listings" },
      { id: ncNanoId(), href: "/listing-car-map", name: "Cars listings (map)" },
      { id: ncNanoId(), href: "/listing-car-detail", name: "Car detail" },

      //
      {
        id: ncNanoId(),
        href: "/listing-real-estate",
        name: "Real estate listings",
      },
      {
        id: ncNanoId(),
        href: "/listing-real-estate-map",
        name: "Real estate (map)",
      },
      //
      {
        id: ncNanoId(),
        href: "/listing-flights",
        name: "Flights listings",
      },
    ],
  },

  //
  {
    id: ncNanoId(),
    href: "/author",
    name: "Templates",
    type: "dropdown",
    children: templatesChildrenMenus,
  },

  //
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Other pages",
    type: "dropdown",
    children: otherPageChildMenus,
  },
];
