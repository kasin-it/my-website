---
author: Kacper Siniło
pubDatetime: 2024-01-08T14:00:00.816Z
title: Next.js rendering strategies explained
slug: "nextjs-rendering-strategies-explained"
featured: true
ogImage: ../../assets/images/nextjs.webp
tags:
  - nextjs
  - frontend
  - beginner
description: "We will examine the various rendering techniques provided by Next.js."
---

![Next.js](@assets/images/nextjs.webp)

Next.js is a robust React framework that gives considerable weight to rendering strategies to boost the performance and user experience of web applications. Comprehending the intricacies of rendering in Next.js is vital for developers seeking to develop fast, interactive, and SEO-optimized websites.

In this piece, we examine the various rendering techniques provided by Next.js and how they can be utilized to attain specific objectives. We cover Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), and Client-Side Rendering (CSR), each playing a unique role in shaping the behavior and efficiency of Next.js applications.

## Table of contents

# Static Site Generation (SSG)

Static Site Generation (SSG) is a potent rendering technique in Next.js that entails creating pages ahead of time during the build process. This methodology is ideal for content that remains relatively constant, leading to enhanced performance and scalability. By producing static HTML files, SSG facilitates rapid and efficient content distribution to users.

Developers have the ability to retrieve data during the build phase and produce static pages, guaranteeing a uniform user experience.

```tsx
export default function HomePage() {
  return (
    // Some content
  )
}
```

or

```tsx
export const dynamic = "force-static"

export default async function HomePage() {
  const featuredMovies = await getFeaturedMovies()
  return (
    // Some content
  )
}
```

## Pros

- Ideal for sites with static content, as every possible path of the application is generated at build time.
- Enables fast and efficient content delivery to users.

## Cons

- Doesn't work well with user-specific data or real-time updates.

# Server Site Rendering (SSR)

Server-Side Rendering (SSR) within Next.js involves the server preparing the pages before dispatching them to the client. This technique is advantageous for applications that necessitate real-time data or customized content. By gathering data on the server and dispatching a completely rendered page to the client, SSR guarantees quicker initial page loads and enhanced SEO.

There's no need to manually implement SSR in Next.js as it's already built-in for asynchronous components. This setup allows for data retrieval on every request, ensuring the content remains current.

```tsx
export default await function HomePage() {
  const featuredMovies = await getFeaturedMovies()
  return (
    // Some content
  )
}
```

or

```tsx

interface MoviePageProps {
  params: {
    movieId: string
  }
}

export default async function MoviePage({ params: { movieId } } : MoviePageProps) {

  const movie = await getMovie(movieId)

  return (
    // Some contetnt
  )
}

```

## Pros

- Improves SEO as search engines can easily crawl the fully rendered HTML.
- Provides faster initial page load times as the server sends a fully rendered page to the client.
- Ensures that the page content is always up-to-date as the server fetches the latest data on each request.

## Cons

- Can lead to slower subsequent interactions as the client must request updated HTML from the server.
- May increase server load as the server must render the page for each request.

# Incremental Static Regeneration (ISR)

Incremental Static Regeneration is a robust strategy in Next.js that effortlessly blends dynamic content into pages that are statically generated. This method allows for regular updates to static pages without the requirement to reconstruct the entire site, making it especially beneficial for applications with changing data.

Developers can utilize the generateStaticParams function to put ISR into practice, guaranteeing users access to the most recent content without sacrificing the advantages of static site generation.

Let's explore an example:

```tsx
export async function generateStaticParams() {
  const movies = await getMovies()

  return (
      movies.map((movie) => ({
          movieId: movie.id,
      })) || []
  )
}

export const revalidate = 3600 // refresh data every 1h

interface MoviePageProps {
  params: {
    movieId: string
  }
}

export default async function MoviePage({ params: { movieId } } : MoviePageProps) {

  const movie = await getMovie(movieId)

  return (
    // Some contetnt
  )
}

```

In this instance, the generateStaticParams function creates the paths for all recognized movies, whereas the fallback feature permits the rendering of unfamiliar movie IDs through Server-Side Rendering (SSR).

## Pros

- Allows for updating existing pages by re-rendering them in the background as traffic comes in.
- Combines the benefits of both SSR and SSG.

## Cons

- Might not be suitable for all types of websites. If the revalidation period is larger than the time it takes to rebuild the entire site, traditional static-site generation might be more appropriate.

# Client Site Rendering (CSR)

In Client-Side Rendering (CSR), the rendering happens on the client side, allowing for dynamic content updates without the requirement to refresh the whole page. Even though CSR offers a smooth user experience, it might lead to slower initial page loads compared to Server-Side Rendering (SSR) and Static Site Generation (SSG).

To implement CSR in Next.js, developers can leverage React's client-side rendering capabilities. Below is an example showcasing a button component using CSR:

```tsx
"use client";

import { useState } from "react";

export default function Button() {
  const [isActive, setIsActive] = useState(false);

  const label = isActive ? "Deactivate" : "Activate";

  const handleClick = () => {
    setIsActive(prev => !prev);
  };

  return <button onClick={handleClick}>{label}</button>;
}
```

CSR is applied wherever the "use client" appears. However, an exception is made when component is given a prop named children, allowing its children to be rendered using SSR:

```tsx
"use client";

import { useState } from "react";

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    setIsDeleted(true);
  };

  if (isDeleted) {
    return null; // If deleted, don't render anything
  }

  return (
    <div>
      {children} {/* Children may be rendered using SSR */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
```

## Pros

- Allows for dynamic content updates without the need to reload the entire page, providing a smoother user experience.
- Reduces the initial load time as the server sends a minimal HTML document and the client renders the rest of the page using JavaScript.

## Cons

- May lead to slower initial page loads as the client must download and parse the JavaScript before it can render the page.
- Can negatively impact SEO as search engines may struggle to crawl and index the content rendered on the client-side.

# Conclustion

By understanding the intricacies of Server-Side Rendering, Static Site Generation, Incremental Static Regeneration, and Client-Side Rendering in Next.js, developers can make informed decisions to optimize their applications for speed, SEO, and user engagement. Each rendering strategy comes with its strengths, and the choice depends on the specific requirements of the project.

[Kacper Siniło](https://satnaing.dev) <br/>
Fullstack Developer
