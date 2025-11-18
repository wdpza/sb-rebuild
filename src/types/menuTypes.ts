// Basic menu item from WordPress
export interface MenuItem {
  id?: string | number | null;
  label?: string | null;
  url?: string | null;
  uri?: string | null;
  target?: "_blank" | null;
  cssClasses?: string[] | null;
  parentId?: string | number | null;
  order?: number | null;
  connectedObject?: {
    slug?: string | null;
  } | null;
}

// Mega menu specific types
export interface CategoryGroup {
  name: string;
  databaseId: number;
}

export interface MainMenuFields {
  backgroundImage?: {
    node?: {
      altText?: string;
      mediaItemUrl: string;
    } | null;
  } | null;
  categoryGrouping?: {
    nodes?: CategoryGroup[] | null;
  } | null;
}

export interface MegaMenuChild extends MenuItem {
  mainMenuFields?: MainMenuFields | null;
}

// Tree node used across desktop, mobile, mega menu etc
export interface MenuNode extends MenuItem {
  children?: (MenuItem | MegaMenuChild)[];
}