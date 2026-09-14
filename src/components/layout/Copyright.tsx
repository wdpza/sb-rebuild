import Link from "next/link";
import type { FooterData } from "@/types/footer";
import styles from "./Footer.module.css";

export default function Copyright({ footer }: { footer?: FooterData | null }) {
    const menuNodes = footer?.policiesMenu?.menuItems?.nodes ?? [];
    return (
        <div className={`copyright-text ${styles.copyright}`}>
            <div className={styles.container}>
                <div className={styles.copyrightRow}>
                    <p>Starbright © 2005 - {new Date().getFullYear()} - All Rights Reserved.</p>
                    <nav aria-label="Policies">
                        <ul className={styles.policies}>
                            {menuNodes.map((item, index) => item && (item.uri || item.url) ? (
                                <li key={item.id ?? index}>
                                    <Link href={item.uri || item.url!} target={item.target || undefined}
                                        rel={item.target === "_blank" ? "noopener noreferrer" : undefined}>
                                        {item.label}
                                    </Link>
                                </li>
                            ) : null)}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
