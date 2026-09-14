import Link from "next/link";
import Image from "next/image";
import type { FooterData, FooterMenu } from "@/types/footer";
import styles from "./Footer.module.css";

function MenuColumn({ title, menu }: { title: string; menu?: FooterMenu | null }) {
    const items = menu?.menuItems?.nodes ?? [];
    return (
        <nav aria-label={title}>
            <h2 className={styles.heading}>{title}</h2>
            <ul className={styles.links}>
                {items.map((item, index) => item && (item.uri || item.url) ? (
                    <li key={item.id ?? index}>
                        <Link href={item.uri || item.url!} target={item.target || undefined}
                            rel={item.target === "_blank" ? "noopener noreferrer" : undefined}>
                            {item.label}
                        </Link>
                    </li>
                ) : null)}
            </ul>
        </nav>
    );
}

export default function Footer({ footer }: { footer?: FooterData | null }) {
    const fields = footer?.siteOptions?.siteOptionsFields;
    const contact = fields?.footer;
    const whatsappNumber = contact?.whatsappNumber?.replace(/\D+/g, "").replace(/^0/, "27");

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.columns}>
                    <MenuColumn title="Company" menu={footer?.CompanyMenu} />
                    <MenuColumn title="Top Rated Services" menu={footer?.topRatedServices} />
                    <div>
                        <h2 className={styles.heading}>Contact Us</h2>
                        <ul className={styles.contactLinks}>
                            {contact?.officeNumber && <li>
                                <Image src="/images/phone-icon.png" alt="" width={14} height={14} />
                                <a href={`tel:${contact.officeNumber.replace(/\s+/g, "")}`}>{contact.officeNumber}</a>
                            </li>}
                            {whatsappNumber && <li>
                                <Image src="/images/whatsapp-icon.png" alt="" width={14} height={14} />
                                <a href={`https://wa.me/${whatsappNumber}?text=Hello%20Starbright`} target="_blank" rel="noopener noreferrer">{contact?.whatsappNumber}</a>
                            </li>}
                        </ul>
                        {contact?.address && <address className={styles.address}>
                            {contact.googleMapsLink ? <a href={contact.googleMapsLink} target="_blank" rel="noopener noreferrer">{contact.address}</a> : contact.address}
                        </address>}
                    </div>
                    <MenuColumn title="Other Links" menu={footer?.otherLinks} />
                </div>
                <div className={styles.brandRow}>
                    <Link href="/home" aria-label="Starbright home" className={styles.brand}>
                        <Image src="/logo.png" alt={fields?.siteLogo?.node?.altText || "Starbright"} width={291} height={56} />
                    </Link>
                    <div className={styles.socials}>
                        {contact?.socialMedia?.map((item, index) => {
                            const icon = item?.icon?.node;
                            if (!item?.url || !icon?.mediaItemUrl) return null;
                            const label = icon.altText?.replace(/icon/gi, "").trim() || "Social media";
                            return <a key={`${item.url}-${index}`} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={label}>
                                <Image src={icon.mediaItemUrl} alt="" width={28} height={28} />
                            </a>;
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
