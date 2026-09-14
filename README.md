# Arcysia Marketing — portfolio Marceliny Juńskiej

Portfolio marketingowe z rolkami, grafikami i sekcją o Marcelinie Juńskiej. Materiały znajdują się w `public/media`, a dane opisujące realizacje w `app/portfolio-data.ts`.

## Uruchomienie lokalne

Wymagany jest Node.js 22.13 lub nowszy oraz pnpm 11.19.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Strona będzie dostępna pod adresem pokazanym w terminalu. Przed wysłaniem zmian warto uruchomić:

```bash
pnpm check:assets
pnpm lint
pnpm build
```

## Publikacja i repozytorium GitHub

Repozytorium `junskam-dotcom/arcysia-marketing` przechowuje kod źródłowy i wszystkie materiały portfolio. Po zmianach wysyłaj je do gałęzi `main`:

```bash
git add .
git commit -m "Opis zmian"
git push origin main
```

Ta aplikacja korzysta z buildu Vinext/Cloudflare, więc GitHub jest miejscem przechowywania kodu i historii zmian. Do uruchomienia produkcyjnego użyj hostingu obsługującego ten build; obecna opublikowana strona działa pod adresem `https://arcysia-marketing-portfolio.arcysia.chatgpt.site/`. Samo włączenie GitHub Pages nie jest tu automatycznie dodane, ponieważ wymagałoby osobnej wersji aplikacji przygotowanej wyłącznie jako statyczny HTML.

Ścieżki do zdjęć, plansz i filmów są względne, dzięki czemu materiały nie odwołują się do lokalnego dysku ani do ścieżek `/Users/...`.

## Zasady pracy z materiałami

- dodawaj nowe obrazy i filmy do `public/media`;
- aktualizuj opis realizacji w `app/portfolio-data.ts`;
- nie dodawaj plików `.env`, kluczy, tokenów, logów, folderów `node_modules`, `.next`, `dist` ani `.wrangler`;
- po zmianie materiałów uruchom `pnpm check:assets`.

## Kontakt i portfolio eventowe

Kontakt na stronie: `junskam@gmail.com`, `510 875 101`. Portfolio eventowe jest połączone osobnym adresem z sekcji „O mnie”.
