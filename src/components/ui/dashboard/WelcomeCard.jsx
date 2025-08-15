import { useAuthData } from "../../../contexts/AuthContext";

export default function WelcomeCard() {
  const { authData } = useAuthData();
  return (
    <div className="lg:col-span-3">
      <div className="border-2 border-[#388E3C]/50 bg-[#388E3C]/5 rounded-lg p-6">
        <h2 className="font-headline text-3xl font-bold text-[#388E3C] mb-2">
          Welcome Back{" "}
          <sapn className="text-black">{authData?.user?.displayName}</sapn>
        </h2>
        <p className="text-base text-gray-500">
          Your journey of a thousand miles begins with a single step. What will
          you practice today?
        </p>
      </div>
    </div>
  );
}
