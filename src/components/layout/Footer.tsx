import Link from 'next/link';
import Image from "next/image";

export default function Footer( footer: any) {

    return (
        <footer className="bg-neutral-strongest w-full gradient-border-top text-center md:text-left">
            <div className="layout-wrapper">
                <div className="grid grid-cols-1 md:grid-cols-6 md:gap-12 py-8 font-extralight">
                    {/* Column 1: Logo */}
                    <div className="flex flex-col col-span-2 self-center mb-8 md:mb-0">
                        {footer.footer.siteOptions.siteOptionsFields.siteLogo.node.mediaItemUrl && (
                            <Link 
                                href="/home"
                                className='flex justify-center md:justify-start'
                            >
                                <Image
                                    src={'/logo.png'}
                                    alt={"Starbright"}
                                    className=""
                                    width={290}
                                    height={56}
                                    priority
                                />
                            </Link>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between col-span-3">
                        {/* Column 2: Address */}
                        <div className="mb-6 md:mb-0">
                            <h4 className="text-lg font-semibold mb-3 text-neutral-softest mb-5">
                                Contact Us
                            </h4>

                            <ul className="space-y-2 text-neutral-regular flex flex-col justify-center md:justify-start">
                                <li className="flex text-neutral-softest gap-2 items-center self-center md:self-start"><img src="/images/phone-icon.png" alt="Phone Icon"/> <a href={`tel:${footer.footer.siteOptions.siteOptionsFields.footer.officeNumber.replace(/\s+/g, "")}`}>{footer.footer.siteOptions.siteOptionsFields.footer.officeNumber}</a></li>
                                <li className="flex text-neutral-softest gap-2 items-center self-center md:self-start"><img src="/images/whatsapp-icon.png" alt="Whatsapp Icon" /> <a href={`https://wa.me/${footer.footer.siteOptions.siteOptionsFields.footer.whatsappNumber.replace(/\s+/g, "")}`} target="_blank">{footer.footer.siteOptions.siteOptionsFields.footer.whatsappNumber}</a></li>
                            </ul>

                        </div>

                        {/* Column 3: Contact */}
                        <div className='mb-6 md:mb-0'>
                            <h4 className="text-lg font-semibold mb-3 text-neutral-softest mb-5">
                                Visit Us
                            </h4>
                            <p  className="text-neutral-regular whitespace-pre-line text-neutral-softest">
                                <a href={footer.footer.siteOptions.siteOptionsFields.footer.googleMapsLink} target="_blank">{ footer.footer.siteOptions.siteOptionsFields.footer.address }</a>
                            </p>
                        </div>

                        {/* Column 4: Quick Links */}
                        <div className='mb-6 md:mb-0'>
                            <h4 className="text-lg font-semibold mb-3 text-neutral-softest mb-5">
                                Other Links
                            </h4>

                            <p className="text-neutral-regular whitespace-pre-line">
                                {footer.footer.otherLinks.menuItems.nodes.map(
                                    (item: { uri: string; label: string }) => (
                                    <Link
                                        key={item.uri}
                                        href={item.uri}
                                        className="block hover:text-neutral-softest transition-colors text-neutral-softest"
                                    >
                                        {item.label}
                                    </Link>
                                    )
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Column 5: Socials */}
                    <div className='col-span-1 flex flex-col'>
                        <h4 className="text-lg font-semibold self-center md:self-end mb-5 text-neutral-softest text-left md:text-right">
                            Connect With Us
                        </h4>
                        <div className="flex items-center self-center  md:self-end gap-3 justify-start md:justify-end">
                            {footer.footer.siteOptions.siteOptionsFields.footer.socialMedia.map(
                                (item: {  icon: any; url: string }, index: number) => (
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
            </div>
        </footer>
    );
}
