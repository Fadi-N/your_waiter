import Image from "next/image";
import Navbar from "@/app/[lng]/(protected)/_components/navbar";

export default function Home({params: {lng}}) {
  return (
    <Navbar/>
  );
}
