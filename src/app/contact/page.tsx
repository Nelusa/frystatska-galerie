//TODO (NL): Upravit adresu, e-mail a číslo

export default function ContactsPage() {
  return (
    <div className="container py-12 max-w-xl mx-auto">
      <h1 className="font-heading text-3xl font-bold mb-6 text-center">Kontakt</h1>
      <div className="mb-8 text-center">
        <p>Fryštátská Galerie</p>
        <p>Fryštátská 123, Karviná</p>
        <p>Tel: <a href="tel:+420123456789" className="text-primary underline">+420 XXX XXX XXX</a></p>
        <p>Email: <a href="mailto:info@frystatskagalerie.cz" className="text-primary underline">info@frystatskagalerie.cz</a></p>
      </div>
      <form className="space-y-4 bg-card p-6 rounded-lg shadow">
        <input type="text" placeholder="Vaše jméno" className="w-full border rounded px-3 py-2" />
        <input type="email" placeholder="Váš email" className="w-full border rounded px-3 py-2" />
        <textarea placeholder="Zpráva" className="w-full border rounded px-3 py-2" rows={4}></textarea>
        <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded font-semibold hover:bg-primary/90 transition">Odeslat</button>
      </form>
    </div>
  );
}
