This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

TO DO - HERE:
Jest zrobiona już rejestracja usera z zabezpieczeniami aby było max 10 i na unikalność maila:
Zostało:

- sprawdzić co powinno się dziać po zalogowaniu - JWT token
- dodanie szyfrowanie hasła
  Dodanie strony Home:
- na /home
- widoczna po zalogowaniu
- możliwe do wejścia tylko jak JWT jest prawidłowe
- z lewej strony sidebar z linkami do: home, myprofile, notes
- z prawej/pośrodku będą wyświetlane wszystkie eventsy (domyślnie puste)
- możliwość dodania event na button klik:
  - wyskoczy modal gdzie będzie można dodać: nazwe eventa, date rozpoczęcia (opcjonalne), date zakończenia (opcjonalnie), textarea z opisem
- po kliknięciu w eventsa będzie przekierowanie do niego eg.: /event/:id

Dodanie strony events:id

- na /events/:id
- pojawi się na kliknięcie w /home w wybrany event
- po kliknięciu zostanie przekierowany na /events/:id gdzie zostanie wyświetlony
- będzie tam lista zadań (domyślnie puste)
- możliwość dodania zadania na button klik:
  - wyskoczy modal gdzię będzie można dodać: tytuł, textarea, jak ważny (trzy opcje podobnie jak w query CT)
- na /events/:id będzie można zaznaczać mark_as_done na klik wybranego zadania - będzie można to też odznaczyć
- będzie można usunąć zadanie
- będzie można usunąć event z poziomu /events/:id - razem z tym zostaną usunięte wszystkie podpięte do niego zadania (zastanowić się nad soft-delete)

Dodanie strony notes:

- na /notes
- będzie tam lista notatek (domyślnie pusta)
- możliwość dodania notatki na button klik:
  - wyskoczy modal gdzie będzie można dodać tytuł, textarea,
- można usuwać notatki

Dodać tabele w bazie danych:

- dodać tabele events
  - która będzie mieć w sobie relacje userId (many-to-one)
  - która będzie mieć w sobie relacje do wielu zadania (one-to-many)
- dodać tabele events
  - która będzie mieć w sobie relacje do zadania (many-to-one)
- dodać tabele notes
  - która będzie mieć w sobie relacje userId (many-to-one)
- dane są wyświetlane tylko w kontekście obecnie zalogowanego usera - tabele events/notes będą mieć w sobie userID nadany podczas tworzenia
  więc powinny wystarczyć przefiltrować dane z bazy na userId obecnie zalogowane (być może z JWT token)

INNE:
- Wprowadzenie theme - https://tailwindcss.com/docs/theme
- Zobaczyć czy można uderzyć postamen na endpointa - jeśli tak to zabezpieczyć aby JWT sę zgadzał
