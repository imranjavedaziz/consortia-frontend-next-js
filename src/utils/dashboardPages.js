import property from "../../public/assets/icons/property.svg";
import nft from "../../public/assets/icons/nft.svg";
import credits from "../../public/assets/icons/credits.svg";
import mintNFT from "../../public/assets/icons/mintNFT.svg";
import tagNFT from "../../public/assets/icons/tagNFT.svg";

export const pages = [
  {
    id: 1,
    title: "Property",
    nested: true,
    icon: property,
    children: [
      { id: 1.1, icon: mintNFT,path:"/dashboard/mint-nft/", title: "Mint NFTs" },
      { id: 1.2, icon: tagNFT,path:"/dashboard/tag-nft/", title: "Tag NFTs" },
    ],
  },
  {
    id: 2,
    title: "Practitioner NFTs",
    nested: true,
    icon: nft,
    children: [
      { id: 2.1, icon: mintNFT,path:"/dashboard/practitioner-child/", title: "Practitioner 1" },
      { id: 2.2, icon: tagNFT,path:"/dashboard/practitioner-child2/", title: "Practitioner 2" },
    ],
  },
  {
    id: 3,
    title: "My Credits",
    icon: credits,
    nested: true,

    children: [
      { id: 3.1, icon: mintNFT,path:"/dashboard/credits-child/", title: "Credits 1" },
      { id: 3.2, icon: tagNFT,path:"/dashboard/credits-child2/", title: "Credits 2" },
    ],
  },
];
