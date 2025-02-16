# Patate mag

![License Badge](https://img.shields.io/badge/license-GPL--3.0-green.svg)


![Logo de patate-mag](client/public/patate.avif)

Lien vers la démonstration: [https://quentinsautiere.com/patate-mag](https://quentinsautiere.com/patate-mag)

# Front-end

## Description

Ce site web est un projet universitaire dans le cadre du reper de l’Université de La Rochelle. Il a pour but de
présenter
un magazine fictif sur les pommes de terre.
Le site est responsive et est composé de 2 pages, la homepage et les pages d’articles détaillés.

Les données sont stockées dans un fichier typescript car cela m'évite d'avoir à mettre en place une base de données sur un serveur payant.

## Stack technique

- **Front-end** : React.js
- **Database** : Données statiques stockées dans un fichier typescript
- **Mise en forme**: Tailwind CSS
- **Utilitaires**: [dompurify](https://www.npmjs.com/package/dompurify), [zod](https://www.npmjs.com/package/zod), [react-hook-form](https://www.npmjs.com/package/react-hook-form)
- **Déploiement**: Vercel

## Prérequis : 
- Nodejs 23.XX
- npm

## Installation

1) Cloner le projet sur votre machine: `git clone https://gitlab.univ-lr.fr/qsautier/patate-mag.git`
2) Installer les dépendances: `npm install`
3) configurer les variables d'environement (à placer dans `server/.env`) :
  - MONG_URI : Uri de connexion vers votre instance mongo_db (**obligatoire**)
  - PORT: Port utilisé par le serveur backend

## Lancer le projet
- Front-end : npm run dev
- Back-end (serveur) : cd server; npm run dev

## Auteurs
[Quentin SAUTIERE](https://gitlab.univ-lr.fr/qsautier)

## Road-Map 
-  Rédiger un Dockerfile

# Backend API Documentation

## Overview
This the repo of my patate-mag web site's api, it respect the format of REST api with GET,POST, PUT, DELETE routes. The project is licensed under Apache License 2.0.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites
- Node.js (v23.3.0 or higher)
- npm (v8.x or higher)
- MongoDB (v5.x or higher)

## Tech Stack
- express.js
- mongoose (ODM)
- multer (form images upload)

## Installation
```bash
# Clone the repository
git clone https://github.com/SautiereQDev/api-patate-mag.git

# Navigate to project directory
cd api-patate-mag

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the server
npm run start
```

## Configuration
Create a `.env` file in the root directory with the following variables:

# Server Configuration
PORT=3000    
NODE_ENV=development

# Database Configuration
MONGODB_URI=<your link>

## API Endpoints

### Articles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/patate-mag` | Get all articles |
| GET | `/patate-mag/:id` | Get article by ID |
| POST | `/patate-mag` | Post article |
| DELETE | `/patate-mag/:id` | Delete article |
| POST | `/patate-mag/images/upload` | Upload and image |

## Database
- MongoDB is used as the primary database
- Connection is managed through Mongoose ODM
- Database schemas are located in `/src/models`
- Uploads images are located in `/upload`folder and are accessibles from `https://cdn.quentinsautiere.com/patate-mag/`

## Error Handling
The API uses a centralized error handling mechanism:
- Standard HTTP status codes are used

## Deployment
### Production Setup
```bash
# Start production server
npm run start
```

### PM2 Configuration
```bash
# Start with PM2
pm2 start 

# Monitor processes
pm2 monit

# Display server console flux
pm2 logs

# Stop processes
pm2 delete <processes id>
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards
- Follow ESLint configuration
- Write tests for new features
- Update documentation as needed
- Follow conventional commits specification

## License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

```
Copyright 2025 Quentin Sautière

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

## Contact
- Project Link : [api-patate-mag](https://github.com/SautiereQDev/api-patate-mag)
- My email : contact@quentinsautiere.com
- My website : [quentinsautiere.com](https://quentinsautiere.com/)
---
*Last updated: February 2025*
