import { AuthButton, SideImage } from "@/components";
import registerImg from "../../public/register_img.jpg";

export default function Home() {
  return (
    <main>
      <AuthButton>Sign Up</AuthButton>
      <SideImage alt="Register" src={registerImg} />
    </main>
  );
}
