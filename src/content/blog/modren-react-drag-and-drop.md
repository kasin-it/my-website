---
author: Kacper Siniło
pubDatetime: 2024-01-23T15:00:00.816Z
title: React modern Drag And Drop (DND) 2024
slug: "react-modern-drag-and-drop-dnd-2024"
featured: true
tags:
  - react
  - frontend
  - DND
description: "We will examine modern way to implement DND."
---

![Drag and drop](@assets/images/drag-and-drop-banner.webp)

Drag and drop functionality is an excellent method to empower users with the option to effortlessly sort or relocate content. However, while implementing this feature, I've encountered a challenge – many libraries offering drag and drop capabilities are outdated and lack support for React versions beyond 18. In this article, we will explore the dnd-kit library, which is designed to seamlessly integrate with the latest versions of React.

## Table of contents

# Installation

To get started with dnd-kit, install the library:

```bash
npm install @dnd-kit/core
```

and then install also

```bash
npm install @dnd-kit/sortable
```

# Basic setup

```tsx
// 🧰 Importing tools for drag and drop
import { DndContext } from "@dnd-kit/core";
import {
  arraySwap,
  rectSwappingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

export default function HomePage() {
  // 🍎🍊🍓 Setting up our collection
  const [items, setItems] = useState([
    "apple",
    "orange",
    "strawberry",
    "banana",
    "grape",
    "kiwi",
    "blueberry",
    "pineapple",
    "watermelon",
  ]);

  // 🔄 Updating positions after dragging
  const handleDragEnd = event => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arraySwap(items, oldIndex, newIndex); // 🚀 We can also use other techniques like arrayMove
      });
    }
  };

  // 🏞️ Creating a playground for sorting
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSwappingStrategy}>
        {/* Our collection goes here */}
        <div className="grid max-w-96 grid-cols-3 gap-5">
          {items.map(item => (
            <SortableItem key={item} id={item} value={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

const SortableItem = props => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <div
      className={
        "flex size-24 items-center justify-center rounded-lg bg-slate-200"
      }
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes} // 🖼️ These attributes make the image draggable
      {...listeners} // 🔊 These listeners help capture the dragging actions
    >
      <p>{props.value}</p>
    </div>
  );
};
```

# Result

![Result](@assets/images/drag-and-drop-result.webp)

# Conclustion

For more information, you can explore the [dnd-kit documentation](https://docs.dndkit.com/).

Kacper Siniło <br/>
Fullstack Developer
