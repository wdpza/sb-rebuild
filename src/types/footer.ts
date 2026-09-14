import type { MediaItem } from "./common";

export type FooterMenu = {
  menuItems?: { nodes?: ({ id?: string; label?: string | null; uri?: string | null; url?: string | null; target?: string | null } | null)[] | null } | null;
};

export type FooterData = {
  CompanyMenu?: FooterMenu | null;
  topRatedServices?: FooterMenu | null;
  otherLinks?: FooterMenu | null;
  policiesMenu?: FooterMenu | null;
  siteOptions?: {
    siteOptionsFields?: {
      siteLogo?: MediaItem | null;
      footer?: {
        address?: string | null;
        officeNumber?: string | null;
        whatsappNumber?: string | null;
        googleMapsLink?: string | null;
        socialMedia?: ({ url?: string | null; icon?: MediaItem | null } | null)[] | null;
      } | null;
    } | null;
  } | null;
};
