import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { HeaderSection } from "../shared/header-section";

const pricingFaqData = [
    {
        id: "item-1",
        question: "What is included in the Nordic Essentials package?",
        answer: "Our Nordic Essentials package includes a 3-night stay in a standard cabin, daily sauna access (1 hour), complimentary firewood, a welcome drink on arrival, and access to our hiking trails. It's perfect for first-time visitors wanting to experience the Finnish wilderness.",
    },
    {
        id: "item-2",
        question: "What additional amenities does the Aurora Experience package offer?",
        answer: "The Aurora Experience package enhances your stay with 5 nights in a premium cabin, unlimited sauna access, private hot tub sessions (2 hours daily), a Northern Lights viewing tour, daily breakfast buffet, a traditional Finnish dinner, and complimentary snowshoe rental.",
    },
    {
        id: "item-3",
        question: "Is airport transfer included in any of the packages?",
        answer: "Airport transfers are included in our Wilderness Luxury package. For the Nordic Essentials and Aurora Experience packages, airport transfers can be arranged for an additional fee based on your arrival location.",
    },
    {
        id: "item-4",
        question: "Are there seasonal pricing differences?",
        answer: "Yes, our packages may have seasonal variations in pricing. Winter (December-March) is our peak season with Northern Lights visibility, while summer (June-August) offers midnight sun experiences. Spring and autumn packages may include special seasonal activities at adjusted rates.",
    },
    {
        id: "item-5",
        question: "Can I add extra nights to my package?",
        answer: "Absolutely! Additional nights can be added to any package at a discounted rate compared to our standard nightly pricing. Please specify your desired length of stay when booking, and we'll provide a custom quote.",
    },
    {
        id: "item-6",
        question: "What meal options are available with each package?",
        answer: "The Nordic Essentials includes a welcome drink only, the Aurora Experience includes daily breakfast and one traditional dinner, and the Wilderness Luxury includes full board dining with all meals. Additional dining options can be added to any package.",
    },
    {
        id: "item-7",
        question: "Are activities and equipment rentals included?",
        answer: "The Nordic Essentials includes self-guided activities with equipment rentals available for an additional fee. The Aurora Experience includes a Northern Lights tour and basic equipment. The Wilderness Luxury includes a daily activity of your choice and all equipment rentals.",
    },
];

export function PricingFaq() {
    return (
        <section className="container max-w-4xl py-2">
            <HeaderSection
                label="FAQ"
                title="Frequently Asked Questions"
                subtitle="Explore our comprehensive FAQ to find quick answers to common
          inquiries. If you need further assistance, don't hesitate to
          contact us for personalized help."
            />

            <Accordion type="single" collapsible className="my-12 w-full">
                {pricingFaqData.map((faqItem) => (
                    <AccordionItem key={faqItem.id} value={faqItem.id}>
                        <AccordionTrigger>{faqItem.question}</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
                            {faqItem.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
