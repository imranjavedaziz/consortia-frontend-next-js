import localFont from "@next/font/local";
import { Poppins } from "@next/font/google";

export const graphik = localFont({
  src: [
    {
      path: "../../../public/fonts/graphikbold-webfont.woff2",
      weight: "600",
    },
  ],
});

export const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["sans-serif"],
  subsets: ["latin"],
});
