# SKE-PARK Backend

Bienvenue dans le projet SKE-PARK, une application de gestion de parking.

## Configuration

Pour faire fonctionner le backend, assurez-vous d'avoir PostgreSQL installé et en cours d'exécution sur votre machine. Vous pouvez utiliser la chaîne de connexion suivante dans un fichier .env pour configurer votre base de données :

```env
DATABASE_URL=postgres://park:login@127.0.0.1:5432/park?schema=public
```

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/caankaya/ske-park-api.git
   cd ske-park-api
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Démarrez le serveur :

   ```bash
   npm run dev
   ```

## Test

Si vous voulez voir le résultat des tests, veuillez d'abord réinitialiser la base de données avec la commande suivante :

```bash
npx prisma migrate reset
```

En suite pour voir le resultat des tests

```bash
npm run test
```

## Aide

Si vous avez besoin d'aide, n'hésitez pas à ouvrir un problème dans le dépôt ou à contacter les contributeurs.
