import React from 'react';

export const hasAnyAuthority = (authorities: string[], hasAnyAuthorities: string[]) => {
    if (authorities && authorities.length !== 0) {
        if (hasAnyAuthorities.length === 0) {
        return true;
        }
        return hasAnyAuthorities.some(auth => authorities.includes(auth));
    }
    return false;
};

export const truncateText = (text, length) => {
    if (text && text.length > length) {
        text = text.substring(0, length - 3) + "...";
    }
    return text;
}

export const isPromise = (value): boolean => {
    if (value !== null && typeof value === 'object') {
      return value && typeof value.then === 'function';
    }
    return false;
  };
  