import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <h1 className="font-heading text-3xl font-bold mb-6 text-center">O nás</h1>
      <p className="mb-4 text-lg text-center">
        Fryštátská Galerie je rodinná galerie v srdci Karviné, kterou vede paní Monika Letochová.
      </p>
      <p>
        Zaměřujeme se na prezentaci a prodej originálních obrazů, keramiky, skla a dárkových předmětů od místních umělců. Naším cílem je přinášet radost z umění a krásy do každodenního života.
      </p>
      <div className="flex justify-center mt-8">
        {/*TODO (NL): Přidat fotku maminky*/}
        <Image width={400} height={250} src="/galerie-general.jpg" alt="Galerie" className="rounded-lg object-cover" />
      </div>
    </div>
  );
}
