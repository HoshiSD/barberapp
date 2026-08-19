import { redirect } from "next/navigation";

// La raíz redirige al booking flow
export default function Home() {
  redirect("/booking");
}
