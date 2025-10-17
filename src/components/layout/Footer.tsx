export default function Footer({ footer, logo }: any) {
    const { address, officeNumber, whatsappNumber } = footer;
    const {altText, mediaItemUrl} = logo;

    return (
        <footer className="bg-neutral-strongest w-full">
            <div className="max-w-[1690px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 py-8 px-6">
                {/* Column 1: Logo */}
                <div className="flex flex-col space-y-4 self-center">
                    {logo && (
                        <img
                            src={mediaItemUrl}
                            alt={altText}
                            className="w-40 h-auto"
                        />
                    )}
                </div>

                {/* Column 2: Address */}
                <div>
                    <h4 className="text-lg font-semibold mb-3 text-neutral-softest">
                        Contact Us
                    </h4>

                    <ul className="space-y-2 text-neutral-regular">
                        <li>Office: {officeNumber}</li>
                        <li>WhatsApp: {whatsappNumber}</li>
                    </ul>

                </div>

                {/* Column 3: Contact */}
                <div>
                    <h4 className="text-lg font-semibold mb-3 text-neutral-softest">
                        Visit Us
                    </h4>
                    <p className="text-neutral-regular whitespace-pre-line">
                        {address}
                    </p>
                </div>

                {/* Column 4: Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-3 text-neutral-softest">
                        Quick Links
                    </h4>
                    
                </div>

                {/* Column 5: Socials */}
                <div>
                    <h4 className="text-lg font-semibold mb-3 text-neutral-softest">
                        Connect
                    </h4>
                    
                </div>
            </div>
        </footer>
    );
}
