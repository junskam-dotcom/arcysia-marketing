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

Strona ma osobną wersję dla bezpłatnego GitHub Pages, korzystającą z tych samych komponentów i materiałów. Docelowy adres: https://junskam-dotcom.github.io/arcysia-marketing/.

Jednorazowo w repozytorium otwórz **Settings → Pages → Build and deployment → Source** i wybierz **GitHub Actions**. Po wysłaniu zmian do `main` publikacja uruchomi się automatycznie. Jej wynik znajdziesz w zakładce **Actions**, w zadaniu „Publish portfolio to GitHub Pages”. Możesz też uruchomić je ręcznie przyciskiem **Run workflow**. Zielony wynik zadania `deploy` potwierdza publikację.

Lokalne sprawdzenie wersji GitHub Pages:

```bash
pnpm build:pages
pnpm preview:pages
```

Otwórz adres podany w terminalu ze ścieżką `/arcysia-marketing/`. Gotowe pliki znajdują się w `dist-pages` — nie dodawaj tego folderu do repozytorium, ponieważ GitHub sam go buduje. Konfiguracja `vite.pages.config.ts` określa ścieżkę strony; zmień ją, jeśli zmienisz nazwę repozytorium. Publikacja obejmuje stronę marketingową; link do osobnego portfolio eventowego zachowuje dotychczasowy adres.

Dotychczasowe polecenie `pnpm build` nadal przygotowuje wersję Vinext/Cloudflare. GitHub Pages korzysta wyłącznie z `pnpm build:pages` i nie wymaga kluczy ani płatnych usług.

Ścieżki do zdjęć, plansz i filmów są względne, dzięki czemu materiały nie odwołują się do lokalnego dysku ani do ścieżek `/Users/...`.

## Zasady pracy z materiałami

- dodawaj nowe obrazy i filmy do `public/media`;
- aktualizuj opis realizacji w `app/portfolio-data.ts`;
- nie dodawaj plików `.env`, kluczy, tokenów, logów, folderów `node_modules`, `.next`, `dist` ani `.wrangler`;
- po zmianie materiałów uruchom `pnpm check:assets`.

## Kontakt i portfolio eventowe

Kontakt na stronie: `junskam@gmail.com`, `510 875 101`. Portfolio eventowe jest połączone osobnym adresem z sekcji „O mnie”.
