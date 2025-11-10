---
author: Kacper Siniło
pubDatetime: 2025-11-04T15:00:00.816Z
title: Observer pattern in React
slug: "observer-pattern-in-react"
featured: true
tags:
  - react
  - frontend
  - observer pattern
  - reactivity
description: "A clear guide to observer pattern in React."
---

![Observer pattern](@assets/images/observer.png)

The observer pattern is widely used in software development. Recently, I was building an app where I needed to use it and wanted to fully understand how it works. Here is my understanding of it.

We have a publisher and subscribers that listen to what the publisher publishes.

This service allows subscribers to subscribe to the publisher by using `subscribe` and passing a function (for example, a state setter). Invoking that function triggers a re-render. There is also a `notify` function that executes each callback and updates each subscriber using the callback they previously passed.

```ts
type ObserverCallback = (message: string) => void;

export class ObserverService {
  private callbacks: ObserverCallback[] = [];

  subscribe(callback: ObserverCallback) {
    this.callbacks.push(callback);

    // Important: we are not executing the function here; we're returning it for later use
    return () => {
      // Filter out the callback that was passed to subscribe; this works because callbacks are compared by reference
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  notify(message: string) {
    // Invoke all callbacks to trigger a re-render in subscribed components
    this.callbacks.forEach(callback => callback(message));
  }
}
```

Here is the implementation of the hook

```tsx
import { ObserverService } from "@/services/observer-service";
import { useState, useEffect } from "react";

const observerService = new ObserverService();

export function useObserver() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const callback = (message: string) => {
      // This triggers a re-render when called by the notify function inside the observer service
      setMessage(message);
    };

    // subscribe returns an unsubscribe function that allows us to unsubscribe from the publisher
    const unsubscribe = observerService.subscribe(callback);

    return () => {
      unsubscribe();
    };
  }, [observerService]);

  function onClick(message: string) {
    observerService.notify(message);
  }

  return { message, onClick };
}
```

The following two components both use the same `useObserver` hook. Because the hook holds a module‑scoped `ObserverService` instance, each component subscribes to the same publisher. Clicking "Notify" in either component broadcasts a message that both components receive, causing both to re-render with the latest message.

```tsx
// Observer 1
import { useObserver } from "@/hooks/use-observer";
import React from "react";

export default function Observer1() {
  const { message, onClick } = useObserver();
  return (
    <div>
      observer1: {message}{" "}
      <button onClick={() => onClick("Hello from observer1")}>Notify</button>
    </div>
  );
}
```

Expected behavior of the examples:

- On mount, each component subscribes and registers its state setter as a callback.
- Clicking "Notify" in Observer1 calls `notify("Hello from observer1")`; both Observer1 and Observer2 update and display the new message.
- The same happens when clicking in Observer2.
- On unmount, the effect cleanup in the hook unsubscribes to avoid memory leaks.

```tsx
// Observer 2
import { useObserver } from "@/hooks/use-observer";
import React from "react";

export default function Observer2() {
  const { message, onClick } = useObserver();
  return (
    <div>
      observer2: {message}{" "}
      <button onClick={() => onClick("Hello from observer2")}>Notify</button>
    </div>
  );
}
```

Kacper Siniło <br/>
Fullstack Developer
