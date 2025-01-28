'use client';

import React, {useEffect, useCallback} from 'react';

export const useClickOutside = (
  component?: React.RefObject<HTMLElement | null>,
  callback?: () => unknown,
  excludeComponent?: React.RefObject<HTMLElement | null>
) => {
  if (!component) {
    throw new Error('A target component has to be provided.');
  }

  if (!callback) {
    throw new Error('A callback has to be provided.');
  }

  // Используем useCallback для предотвращения пересоздания listener при каждом рендере
  const listener = useCallback(
    (event: MouseEvent) => {
      if (
        event.target === component.current ||
        (component.current && event.composedPath().includes(component.current)) ||
        (excludeComponent && event.target === excludeComponent.current) ||
        (excludeComponent && excludeComponent.current && event.composedPath().includes(excludeComponent.current))
      ) {
        return;
      }
      if (typeof callback === 'function') {
        callback();
      }
    },
    [component, excludeComponent, callback]
  );

  useEffect(() => {
    window.addEventListener('click', listener);

    return () => {
      window.removeEventListener('click', listener);
    };
  }, [listener]);
};
