import Image from "next/image";
import Link from "next/link";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

export default function Home() {
  return (
    <main className="flex flex-col sm:flex-row w-full justify-center items-center min-h-screen text-[16px] font-poppins text-white bg-red-400 bg-cover bg-[url(../public/astra-masked.jpg)] sm:bg-[url(../public/astra-masked.jpg)]">
      <LoginForm />
    </main>
  );
}
