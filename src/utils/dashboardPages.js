import property from "../../public/assets/icons/property.svg";
import nft from "../../public/assets/icons/nft.svg";
import credits from "../../public/assets/icons/credits.svg";
import mintNFT from "../../public/assets/icons/mintNFT.svg";
import tagNFT from "../../public/assets/icons/tagNFT.svg";

export const practitionarPages = [
  {
    id: 1,
    title: "Dashboard",
    nested: false,
    icon: property,
    path: "/dashboard/landing",
    // children: [
    //   { id: 1.1, icon: mintNFT,path:"/dashboard/mint-nft/", title: "Mint NFTs" },
    //   { id: 1.2, icon: tagNFT,path:"/dashboard/tag-nft/", title: "Tag NFTs" },
    // ],
  },

  {
    id: 2,
    title: "Property",
    nested: true,
    icon: "/assets/icons/mainProperty.svg",
    children: [
      {
        id: 2.1,
        icon: mintNFT,
        path: "/property/mint-nft/",
        title: "Mint NFTs",
      },
      // { id: 2.2, icon: tagNFT,path:"/property/tag-nft/", title: "Tag NFTs" },
    ],
  },
  {
    id: 3,
    title: "Practitioner NFTs",
    nested: true,
    icon: nft,
    children: [
      {
        id: 3.1,
        icon: mintNFT,
        path: "/practitionerNfts/mint-nft/",
        title: "Mint NFTs",
      },
      // { id: 3.2, icon: tagNFT,path:"/practitionerNfts/practitioner-child2/", title: "Practitioner 2" },
    ],
  },
  // {
  //   id: 4,
  //   title: "Credits",
  //   icon: credits,
  //   path: "/credits/credits",
  //   nested: false,

  //   children: [
  //     {
  //       id: 4.1,
  //       icon: mintNFT,
  //       path: "/credits/credits-child/",
  //       title: "Credits 1",
  //     },
  //     {
  //       id: 4.2,
  //       icon: tagNFT,
  //       path: "/credits/credits-child2/",
  //       title: "Credits 2",
  //     },
  //   ],
  // },
];

export const consumerPages = [
  {
    id: 1,
    title: "Dashboard",
    nested: false,
    icon: property,
    path: "/dashboard/landing",
    // children: [
    //   { id: 1.1, icon: mintNFT,path:"/dashboard/mint-nft/", title: "Mint NFTs" },
    //   { id: 1.2, icon: tagNFT,path:"/dashboard/tag-nft/", title: "Tag NFTs" },
    // ],
  },
  {
    id: 2,
    title: "Property",
    nested: true,
    icon: "/assets/icons/mainProperty.svg",
    children: [
      {
        id: 2.1,
        icon: mintNFT,
        path: "/property/mint-nft/",
        title: "Mint NFTs",
      },
      // { id: 2.2, icon: tagNFT,path:"/property/tag-nft/", title: "Tag NFTs" },
    ],
  },
  // {
  //   id: 3,
  //   title: "Practitioner NFTs",
  //   nested: true,
  //   icon: nft,
  //   children: [
  //     { id: 3.1, icon: mintNFT,path:"/dashboard/practitioner-child/", title: "Practitioner 1" },
  //     { id: 3.2, icon: tagNFT,path:"/dashboard/practitioner-child2/", title: "Practitioner 2" },
  //   ],
  // },
  // {
  //   id: 3,
  //   title: "Credits",
  //   icon: credits,
  //   path:"/credits/credits",
  //   nested: false,

  //   children: [
  //     { id: 3.1, icon: mintNFT,path:"/credits/credits-child/", title: "Credits 1" },
  //     { id: 3.2, icon: tagNFT,path:"/credits/credits-child2/", title: "Credits 2" },
  //   ],
  // },
];
