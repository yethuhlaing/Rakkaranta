import { FeatureLdg, InfoLdg, TestimonialType } from "@/types";

export const infos: InfoLdg[] = [
    {
        title: "Enhance Resort Experience",
        description:
        "",
        image: "/_static/illustrations/image.png",
        list: [
            {
                title: "Real-Time Monitoring",
                description:
                "Get instant alerts and insights from sauna conditions to water systems through our advanced sensor network.",
                icon: 'Eye',
            },
            {
                title: "Energy Optimization",
                description:
                    "Leverage smart analytics to reduce energy consumption while maintaining perfect guest comfort.",
                icon: 'Zap',
            },
            {
                title: "Resort-wide Mapping",
                description:
                    "Navigate your facilities virtually and access real-time information on all amenities.",
                icon: 'Map',
            },
            {
                title: "Smart Resource Management",
                description:
                "Monitor wood storage levels, water usage, and heating systems from a central dashboard.",
                icon: 'BarChart', 
            },
        ]
    },
    {
        title: "Seamless Integration for Nordic Resorts",
        description:
          "Integrate our IoT platform effortlessly into your existing resort operations. Connect with your current systems for a comprehensive solution that enhances guest experience and operational efficiency.",
        image: "/_static/illustrations/resort-integration.jpg",
        list: [
          {
            title: "Sauna Monitoring",
            description:
              "Track temperature, humidity, and occupancy in sauna facilities for optimal guest experience and safety.",
            icon: 'Thermometer',
          },
          {
            title: "Water System Management",
            description:
              "Monitor water levels, temperature, and quality in pools, hot tubs, and water supply systems.",
            icon: 'Droplet',
          },
          {
            title: "Energy Efficiency",
            description:
              "Reduce operational costs with smart monitoring of heating, lighting, and power consumption.",
            icon: 'Battery',
          },
          {
            title: "Guest Experience Enhancement",
            description:
              "Use occupancy data and environmental monitoring to maintain perfect comfort conditions for guests.",
            icon: 'Heart',
          },
          {
            title: "Seasonal Adaptability",
            description:
              "Automatically adjust systems based on weather conditions and seasonal requirements.",
            icon: 'Cloud',
          },
          {
            title: "Maintenance Alerts",
            description:
              "Receive proactive notifications when systems require attention or maintenance.",
            icon: 'Bell', 
          },
        ],
      }
];


export const features: FeatureLdg[] = [
    {
      title: "Real-Time Sauna Analytics",
      description:
        "Monitor sauna conditions in real-time with temperature and humidity sensors, ensuring perfect heat levels and alerting staff to maintenance needs.",
      link: "/analytics",
      icon: "Thermometer",
    },
    {
      title: "Wood Storage Management",
      description:
        "Track firewood inventory levels and moisture content to ensure optimal burning conditions and timely replenishment for your resort's heating needs.",
      link: "/wood-management",
      icon: 'LogIn',
    },
    {
      title: "Water System Monitoring",
      description:
        "Keep track of water temperature, levels, and flow rates in pools, hot tubs, and drinking water systems for guest comfort and safety.",
      link: "/water-systems",
      icon: 'Droplet',
    },  
    {
      title: "Occupancy Optimization",
      description:
        "Use real-time occupancy data to efficiently manage staff resources, energy usage, and guest facilities throughout your resort.",
      link: "/occupancy",
      icon: 'Users',
    },
    {
      title: "Predictive Maintenance",
      description:
        "Leverage advanced algorithms to predict maintenance needs for sauna heaters, water systems, and climate control before failures occur.",
      link: "/maintenance",
      icon: 'PenTool',
    },
    {
      title: "Energy Consumption Analysis",
      description:
        "Visualize and optimize energy usage patterns across your resort to reduce costs while maintaining excellent guest comfort.",
      link: "/energy",
      icon: 'Battery',
    },
  ]

export const testimonials: TestimonialType[] = [
    {
        name: "Matti Virtanen",
        job: "Resort Manager",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        review: "The sauna monitoring system has transformed our guest experience. Our staff receives alerts before temperature issues affect guests, and our energy costs have decreased by 30%.",
    },
    {
        name: "Liisa Korhonen",
        job: "Facilities Director",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        review: "The wood storage management feature has eliminated our supply issues. We always know exactly when to order more firewood, and the moisture tracking ensures optimal burning efficiency.",
    },
    {
        name: "Juhani Mäkinen",
        job: "Maintenance Supervisor",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        review: "The predictive maintenance alerts have saved us countless emergency repairs. We now address issues before they become problems that affect our guests.",
    },
    {
        name: "Anna Järvinen",
        job: "Guest Experience Manager",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
        review: "Our guests have noticed the difference in comfort and consistency. The water temperature in our hot tubs remains perfect regardless of outdoor conditions.",
    },
    {
        name: "Pekka Niemi",
        job: "Sustainability Officer",
        image: "https://randomuser.me/api/portraits/men/6.jpg",
        review: "The energy consumption analysis has been invaluable for our sustainability efforts. We've reduced our carbon footprint while actually improving guest comfort.",
    },
    {
        name: "Sari Koskinen",
        job: "Restaurant Manager",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
        review: "The occupancy tracking helps us perfectly time our meal preparations. We've reduced food waste by 25% while ensuring we're always ready for busy periods.",
    },
    {
        name: "Timo Laine",
        job: "Owner",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        review: "Implementing this system has not only enhanced our guest experience but also significantly improved our operational efficiency. The return on investment was achieved within the first year.",
    },
    {
        name: "Elena Heikkinen",
        job: "Head of Housekeeping",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        review: "The cabin occupancy sensors have revolutionized our cleaning schedule. We know exactly when guests have departed and can prepare rooms efficiently without disturbing anyone who's extended their stay.",
    },
    {
        name: "Mikko Lahtinen",
        job: "Winter Activities Coordinator",
        image: "https://randomuser.me/api/portraits/men/12.jpg",
        review: "The weather station integration helps us plan outdoor activities with confidence. We can anticipate changing conditions and ensure guest safety while maximizing enjoyment of our winter offerings.",
    },
];
