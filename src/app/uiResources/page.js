import { PrimaryButton, SecondaryButton, ThirdButton, ForthButton } from "@/components/buttons";
import { BaseCard } from "@/components/cards";

export default function UiResources() {
  return (
    <div className="min-h-full">
      <h1 className="text-4xl font-bold text-center">UI Resources</h1>

      <h2 className="text-2xl font-bold text-center"> Buttons </h2>
      <div className="flex flex-col items-center justify-center gap-2 my-5">
        <PrimaryButton text="Primary Button" />
        <SecondaryButton text="Secondary Button" />
        <ThirdButton text="Third Button" />
        <ForthButton text="Forth Button" />
      </div>

      <h2 className="text-2xl font-bold text-center"> Cards </h2>
      <div className="flex flex-row items-center justify-center gap-2 my-5">
        <BaseCard title="Pauta Base" text="Esta es una pauta base para una card" image="/logo.jpeg" link="https://www.google.com" isClickable={true} hasImage={true} />
      </div>
    </div>
  )
}