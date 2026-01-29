import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function createPageUrl(pageName) {
    if (pageName === 'Home') return '/';
    const [path, query] = pageName.split('?');
    const lowerPath = path.toLowerCase();
    return query ? `/${lowerPath}?${query}` : `/${lowerPath}`;
}
