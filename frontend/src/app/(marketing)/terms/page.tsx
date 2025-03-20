import Link from "next/link"

export default function Terms() {
    return (
        <div className="container max-w-4xl py-12 mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6 text-center">Terms of Service</h1>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="mb-3">
            Welcome to Rakkaranta Resort. These Terms of Service govern your use of our resort facilities, accommodations,
            and services.
            </p>
            <p className="mb-3">
            By making a reservation or using any of Rakkaranta Resort&apos;s services, you acknowledge that you have read,
            understood, and agree to be bound by these terms and conditions.
            </p>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Booking & Reservation Terms</h2>

            <h3 className="text-xl font-medium mb-2">Deposits</h3>
            <p className="mb-3">
            A deposit of 30% of the total reservation amount is required to confirm your booking. The reservation is not
            confirmed until the deposit payment has been received.
            </p>

            <h3 className="text-xl font-medium mb-2">Cancellation Policy</h3>
            <ul className="list-disc pl-6 mb-3 space-y-1">
            <li>
                Cancellations made 30 days or more before arrival date: Full refund of deposit minus a €50 administrative
                fee
            </li>
            <li>Cancellations made 15-29 days before arrival date: 50% of deposit refunded</li>
            <li>Cancellations made 14 days or less before arrival date: No refund of deposit</li>
            <li>No-shows: Full reservation amount will be charged</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">Modification Policy</h3>
            <p className="mb-3">
            Modifications to existing bookings are subject to availability and may incur additional charges. Requests for
            modifications must be made in writing at least 14 days prior to arrival.
            </p>

            <h3 className="text-xl font-medium mb-2">Check-in/Check-out</h3>
            <p className="mb-3">
            Check-in time is from 15:00 to 20:00. Check-out time is by 11:00. Early check-in or late check-out may be
            available upon request for an additional fee, subject to availability.
            </p>

            <h3 className="text-xl font-medium mb-2">Minimum Stay</h3>
            <p className="mb-3">
            A minimum stay of 2 nights is required for all bookings. During peak seasons and holidays, a minimum stay of
            3-7 nights may be required.
            </p>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>

            <h3 className="text-xl font-medium mb-2">Accepted Payment Methods</h3>
            <p className="mb-3">We accept Visa, Mastercard, bank transfers, and mobile payment methods (MobilePay).</p>

            <h3 className="text-xl font-medium mb-2">Currency</h3>
            <p className="mb-3">All rates are quoted and charged in Euros (€).</p>

            <h3 className="text-xl font-medium mb-2">Final Payment</h3>
            <p className="mb-3">
            The remaining balance of your reservation is due 14 days prior to arrival. For bookings made within 14 days of
            arrival, full payment is required at the time of booking.
            </p>

            <h3 className="text-xl font-medium mb-2">Additional Charges</h3>
            <p className="mb-3">
            Additional services, activities, and any damages to property will be charged separately. A valid credit card
            is required at check-in for incidental charges.
            </p>

            <h3 className="text-xl font-medium mb-2">Taxes</h3>
            <p className="mb-3">
            All rates include applicable VAT (currently 10% for accommodation services and 24% for other services in
            Finland).
            </p>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Guest Conduct & Policies</h2>

            <h3 className="text-xl font-medium mb-2">Age Requirements</h3>
            <p className="mb-3">
            The primary guest making the reservation must be at least 18 years of age and must be present during the stay.
            </p>

            <h3 className="text-xl font-medium mb-2">Occupancy Limits</h3>
            <p className="mb-3">
            Each accommodation has a maximum occupancy limit as specified in the booking details. Exceeding this limit is
            not permitted and may result in additional charges or termination of stay without refund.
            </p>

            <h3 className="text-xl font-medium mb-2">Quiet Hours</h3>
            <p className="mb-3">
            Quiet hours are from 22:00 to 07:00. Please respect other guests by keeping noise to a minimum during these
            hours.
            </p>

            <h3 className="text-xl font-medium mb-2">Smoking Policy</h3>
            <p className="mb-3">
            All indoor areas are strictly non-smoking. Smoking is only permitted in designated outdoor areas. A cleaning
            fee of €300 will be charged for violations of this policy.
            </p>

            <h3 className="text-xl font-medium mb-2">Pet Policy</h3>
            <p className="mb-3">
            Select accommodations are pet-friendly with prior approval and additional fee of €25 per night. Pet owners are
            responsible for any damages caused by their pets.
            </p>

            <h3 className="text-xl font-medium mb-2">Wood Storage and Sauna Operation</h3>
            <p className="mb-3">
            Instructions for proper wood storage and sauna operation are provided in each accommodation. Guests are
            required to follow these guidelines for safety reasons.
            </p>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Property Use & Safety</h2>

            <h3 className="text-xl font-medium mb-2">Sauna Safety</h3>
            <p className="mb-3">
            Detailed sauna safety instructions are provided in each accommodation. Children must be supervised at all
            times when using the sauna. Do not place any items on the sauna stove other than water for steam.
            </p>

            <h3 className="text-xl font-medium mb-2">Wood-Burning Stove/Fireplace Usage</h3>
            <p className="mb-3">
            Instructions for safe operation of wood-burning stoves and fireplaces are provided. Never leave fires
            unattended and ensure the fire is completely extinguished before leaving the accommodation or going to sleep.
            </p>

            <h3 className="text-xl font-medium mb-2">Water System Rules</h3>
            <p className="mb-3">
            Hot tubs and other water facilities must be used according to provided instructions. Children must be
            supervised at all times when using these facilities.
            </p>

            <h3 className="text-xl font-medium mb-2">Winter Safety</h3>
            <p className="mb-3">
            During winter months, paths may be slippery. Use caution when walking outside and wear appropriate footwear.
            Ice thickness on lakes should never be assumed safe without verification.
            </p>

            <h3 className="text-xl font-medium mb-2">Wildlife Awareness</h3>
            <p className="mb-3">
            The resort is located in a natural setting where wildlife may be present. Do not approach or feed wild
            animals. Store food properly to avoid attracting wildlife to your accommodation.
            </p>

            <h3 className="text-xl font-medium mb-2">Emergency Procedures</h3>
            <p className="mb-3">
            Emergency contact information and procedures are posted in each accommodation. In case of emergency, dial 112
            for Finnish emergency services.
            </p>
        </section>

        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Liability & Disclaimer</h2>

            <h3 className="text-xl font-medium mb-2">Limitation of Liability</h3>
            <p className="mb-3">
            Rakkaranta Resort is not liable for any injury, accident, illness, death, loss, damage, expense, or
            inconvenience caused by conditions beyond our reasonable control, including but not limited to natural
            disasters, acts of government, civil unrest, or failure of third-party services.
            </p>

            <h3 className="text-xl font-medium mb-2">Weather-Dependent Activities</h3>
            <p className="mb-3">
            Many activities at the resort are weather-dependent. No refunds will be provided for activities canceled due
            to inclement weather, but we will make reasonable efforts to reschedule when possible.
            </p>

            <h3 className="text-xl font-medium mb-2">Force Majeure</h3>
            <p className="mb-3">
            Rakkaranta Resort shall not be liable for any failure or delay in performance due to circumstances beyond our
            reasonable control, including but not limited to acts of God, natural disasters, pandemic, government
            restrictions, or supplier failures.
            </p>

            <h3 className="text-xl font-medium mb-2">Insurance Recommendations</h3>
            <p className="mb-3">
            We strongly recommend that all guests obtain comprehensive travel insurance to cover potential losses,
            including trip cancellation, medical emergencies, and personal belongings.
            </p>
        </section>

        <div className="border-t pt-6 mt-12">
            <p className="text-sm text-muted-foreground">Last updated: March 20, 2025</p>
            <p className="text-sm text-muted-foreground mt-2">
            For questions regarding these terms, please contact us at{" "}
            <Link href="mailto:info@rakkaranta.fi" className="underline">
                info@rakkaranta.fi
            </Link>
            </p>
        </div>
        </div>
    )
}

