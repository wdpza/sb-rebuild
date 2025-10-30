import Link from 'next/link';

export default function Footer( footer: any) {

    return (
        <footer className="bg-neutral-strongest w-full gradient-border-top">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 py-8 px-6">
                {/* Column 1: Logo */}
                <div className="flex flex-col space-y-4 self-center">
                    {footer.footer.siteOptions.siteOptionsFields.siteLogo.node.mediaItemUrl && (
                        <Link href="/home"><img
                            src={footer.footer.siteOptions.siteOptionsFields.siteLogo.node.mediaItemUrl}
                            alt={footer.footer.siteOptions.siteOptionsFields.siteLogo.node.altText ?? ''}
                            className="w-60 h-auto"
                        /></Link>
                    )}
                </div>

                {/* Column 2: Address */}
                <div>
                    <h4 className="text-lg font-semibold mb-3 text-neutral-softest">
                        Contact Us
                    </h4>

                    <ul className="space-y-2 text-neutral-regular">
                        <li className="flex text-white gap-2 items-center"><img src="/images/phone-icon.png" /> {footer.footer.siteOptions.siteOptionsFields.footer.officeNumber}</li>
                        <li className="flex text-white gap-2 items-center"><img src="/images/whatsapp-icon.png" /> {footer.footer.siteOptions.siteOptionsFields.footer.whatsappNumber}</li>
                    </ul>

                </div>

                {/* Column 3: Contact */}
                <div>
                    <h4 className="text-lg font-semibold mb-3 text-neutral-softest">
                        Visit Us
                    </h4>
                    <p className="text-neutral-regular whitespace-pre-line text-white">
                        {footer.footer.siteOptions.siteOptionsFields.footer.address}
                    </p>
                </div>

                {/* Column 4: Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-3 text-neutral-softest">
                        Other Links
                    </h4>

                    <p className="text-neutral-regular whitespace-pre-line">
                        {footer.footer.otherLinks.menuItems.nodes.map(
                            (item: { uri: string; label: string }) => (
                            <a
                                key={item.uri}
                                href={item.uri}
                                className="block hover:text-neutral-softest transition-colors text-white"
                            >
                                {item.label}
                            </a>
                            )
                        )}
                    </p>
                </div>

                {/* Column 5: Socials */}
                <div>
                    <h4 className="text-lg font-semibold mb-3 text-neutral-softest">
                        Connect With Us
                    </h4>
                    <div className="flex items-center gap-3">
                        {footer.footer.siteOptions.siteOptionsFields.footer.socialMedia.map(
                            (item: {  icon: any;url: string }, index: number) => (
                            <a
                                key={index}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform hover:scale-105"
                            >
                                <img
                                src={item.icon.node.mediaItemUrl}
                                alt={item.icon.node.altText ?? ''}
                                className="w-6 h-6 object-contain"
                                />
                            </a>
                            )
                        )}
                    </div>

                </div>
            </div>
        </footer>
    );
}
