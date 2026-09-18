This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Desiciones de Arquitectura y Cambios del parcial

1. El modelo cambio usando el return de CartContext provider y se agrupo en la logica de CartContextValue. Para la inmutabilidad se usaron metodos como map o filter.

2. Para los calculos se uso useState y para sincronizacion useEffect Se implemento totalItems y totalItems recorriendo los elementos con for, ademas se hizo use de useState y useEffect

3. Para la arquitectura del formulario se uso CheckoutPage se uso el estado local de cada campo con useState y se uso touched para mostrar los mensajes de error cuando cambian.

   Se uso Zod para la validacion de datos para hacer la validaciones , como la parte de caracteres o erroes de mensajes, y tambien usandolo para activar el boton ya validando los datos.
