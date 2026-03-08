export interface CityEntry {
  city: string;
  country: string;
  flag: string;
}

export const cityDatabase: CityEntry[] = [
  // Switzerland
  { city: "Zurich", country: "Switzerland", flag: "🇨🇭" },
  { city: "Geneva", country: "Switzerland", flag: "🇨🇭" },
  { city: "Basel", country: "Switzerland", flag: "🇨🇭" },
  { city: "Bern", country: "Switzerland", flag: "🇨🇭" },
  { city: "Lausanne", country: "Switzerland", flag: "🇨🇭" },
  { city: "Lucerne", country: "Switzerland", flag: "🇨🇭" },
  { city: "Winterthur", country: "Switzerland", flag: "🇨🇭" },
  { city: "St. Gallen", country: "Switzerland", flag: "🇨🇭" },
  { city: "Lugano", country: "Switzerland", flag: "🇨🇭" },
  { city: "Zug", country: "Switzerland", flag: "🇨🇭" },

  // Germany
  { city: "Berlin", country: "Germany", flag: "🇩🇪" },
  { city: "Munich", country: "Germany", flag: "🇩🇪" },
  { city: "Hamburg", country: "Germany", flag: "🇩🇪" },
  { city: "Frankfurt", country: "Germany", flag: "🇩🇪" },
  { city: "Stuttgart", country: "Germany", flag: "🇩🇪" },
  { city: "Düsseldorf", country: "Germany", flag: "🇩🇪" },
  { city: "Cologne", country: "Germany", flag: "🇩🇪" },
  { city: "Leipzig", country: "Germany", flag: "🇩🇪" },
  { city: "Dresden", country: "Germany", flag: "🇩🇪" },
  { city: "Nuremberg", country: "Germany", flag: "🇩🇪" },

  // Austria
  { city: "Vienna", country: "Austria", flag: "🇦🇹" },
  { city: "Salzburg", country: "Austria", flag: "🇦🇹" },
  { city: "Innsbruck", country: "Austria", flag: "🇦🇹" },
  { city: "Graz", country: "Austria", flag: "🇦🇹" },
  { city: "Linz", country: "Austria", flag: "🇦🇹" },

  // France
  { city: "Paris", country: "France", flag: "🇫🇷" },
  { city: "Lyon", country: "France", flag: "🇫🇷" },
  { city: "Marseille", country: "France", flag: "🇫🇷" },
  { city: "Toulouse", country: "France", flag: "🇫🇷" },
  { city: "Nice", country: "France", flag: "🇫🇷" },
  { city: "Strasbourg", country: "France", flag: "🇫🇷" },
  { city: "Bordeaux", country: "France", flag: "🇫🇷" },

  // United Kingdom
  { city: "London", country: "United Kingdom", flag: "🇬🇧" },
  { city: "Manchester", country: "United Kingdom", flag: "🇬🇧" },
  { city: "Birmingham", country: "United Kingdom", flag: "🇬🇧" },
  { city: "Edinburgh", country: "United Kingdom", flag: "🇬🇧" },
  { city: "Glasgow", country: "United Kingdom", flag: "🇬🇧" },
  { city: "Bristol", country: "United Kingdom", flag: "🇬🇧" },
  { city: "Leeds", country: "United Kingdom", flag: "🇬🇧" },
  { city: "Cambridge", country: "United Kingdom", flag: "🇬🇧" },
  { city: "Oxford", country: "United Kingdom", flag: "🇬🇧" },

  // Netherlands
  { city: "Amsterdam", country: "Netherlands", flag: "🇳🇱" },
  { city: "Rotterdam", country: "Netherlands", flag: "🇳🇱" },
  { city: "The Hague", country: "Netherlands", flag: "🇳🇱" },
  { city: "Utrecht", country: "Netherlands", flag: "🇳🇱" },
  { city: "Eindhoven", country: "Netherlands", flag: "🇳🇱" },

  // Italy
  { city: "Rome", country: "Italy", flag: "🇮🇹" },
  { city: "Milan", country: "Italy", flag: "🇮🇹" },
  { city: "Florence", country: "Italy", flag: "🇮🇹" },
  { city: "Turin", country: "Italy", flag: "🇮🇹" },
  { city: "Naples", country: "Italy", flag: "🇮🇹" },
  { city: "Bologna", country: "Italy", flag: "🇮🇹" },
  { city: "Venice", country: "Italy", flag: "🇮🇹" },

  // Spain
  { city: "Madrid", country: "Spain", flag: "🇪🇸" },
  { city: "Barcelona", country: "Spain", flag: "🇪🇸" },
  { city: "Valencia", country: "Spain", flag: "🇪🇸" },
  { city: "Seville", country: "Spain", flag: "🇪🇸" },
  { city: "Malaga", country: "Spain", flag: "🇪🇸" },
  { city: "Bilbao", country: "Spain", flag: "🇪🇸" },

  // Portugal
  { city: "Lisbon", country: "Portugal", flag: "🇵🇹" },
  { city: "Porto", country: "Portugal", flag: "🇵🇹" },

  // Scandinavia
  { city: "Copenhagen", country: "Denmark", flag: "🇩🇰" },
  { city: "Aarhus", country: "Denmark", flag: "🇩🇰" },
  { city: "Stockholm", country: "Sweden", flag: "🇸🇪" },
  { city: "Gothenburg", country: "Sweden", flag: "🇸🇪" },
  { city: "Malmö", country: "Sweden", flag: "🇸🇪" },
  { city: "Oslo", country: "Norway", flag: "🇳🇴" },
  { city: "Bergen", country: "Norway", flag: "🇳🇴" },
  { city: "Helsinki", country: "Finland", flag: "🇫🇮" },
  { city: "Tampere", country: "Finland", flag: "🇫🇮" },
  { city: "Reykjavik", country: "Iceland", flag: "🇮🇸" },

  // Belgium & Luxembourg
  { city: "Brussels", country: "Belgium", flag: "🇧🇪" },
  { city: "Antwerp", country: "Belgium", flag: "🇧🇪" },
  { city: "Ghent", country: "Belgium", flag: "🇧🇪" },
  { city: "Luxembourg", country: "Luxembourg", flag: "🇱🇺" },

  // Ireland
  { city: "Dublin", country: "Ireland", flag: "🇮🇪" },
  { city: "Cork", country: "Ireland", flag: "🇮🇪" },

  // Eastern Europe
  { city: "Prague", country: "Czech Republic", flag: "🇨🇿" },
  { city: "Brno", country: "Czech Republic", flag: "🇨🇿" },
  { city: "Warsaw", country: "Poland", flag: "🇵🇱" },
  { city: "Krakow", country: "Poland", flag: "🇵🇱" },
  { city: "Wroclaw", country: "Poland", flag: "🇵🇱" },
  { city: "Gdansk", country: "Poland", flag: "🇵🇱" },
  { city: "Budapest", country: "Hungary", flag: "🇭🇺" },
  { city: "Bucharest", country: "Romania", flag: "🇷🇴" },
  { city: "Cluj-Napoca", country: "Romania", flag: "🇷🇴" },
  { city: "Sofia", country: "Bulgaria", flag: "🇧🇬" },
  { city: "Belgrade", country: "Serbia", flag: "🇷🇸" },
  { city: "Zagreb", country: "Croatia", flag: "🇭🇷" },
  { city: "Ljubljana", country: "Slovenia", flag: "🇸🇮" },
  { city: "Bratislava", country: "Slovakia", flag: "🇸🇰" },
  { city: "Tallinn", country: "Estonia", flag: "🇪🇪" },
  { city: "Riga", country: "Latvia", flag: "🇱🇻" },
  { city: "Vilnius", country: "Lithuania", flag: "🇱🇹" },

  // Greece & Turkey
  { city: "Athens", country: "Greece", flag: "🇬🇷" },
  { city: "Thessaloniki", country: "Greece", flag: "🇬🇷" },
  { city: "Istanbul", country: "Turkey", flag: "🇹🇷" },
  { city: "Ankara", country: "Turkey", flag: "🇹🇷" },
  { city: "Izmir", country: "Turkey", flag: "🇹🇷" },

  // North America
  { city: "New York", country: "United States", flag: "🇺🇸" },
  { city: "Los Angeles", country: "United States", flag: "🇺🇸" },
  { city: "Chicago", country: "United States", flag: "🇺🇸" },
  { city: "San Francisco", country: "United States", flag: "🇺🇸" },
  { city: "Seattle", country: "United States", flag: "🇺🇸" },
  { city: "Boston", country: "United States", flag: "🇺🇸" },
  { city: "Austin", country: "United States", flag: "🇺🇸" },
  { city: "Denver", country: "United States", flag: "🇺🇸" },
  { city: "Miami", country: "United States", flag: "🇺🇸" },
  { city: "Washington D.C.", country: "United States", flag: "🇺🇸" },
  { city: "Philadelphia", country: "United States", flag: "🇺🇸" },
  { city: "San Diego", country: "United States", flag: "🇺🇸" },
  { city: "Portland", country: "United States", flag: "🇺🇸" },
  { city: "Atlanta", country: "United States", flag: "🇺🇸" },
  { city: "Houston", country: "United States", flag: "🇺🇸" },
  { city: "Dallas", country: "United States", flag: "🇺🇸" },
  { city: "Nashville", country: "United States", flag: "🇺🇸" },
  { city: "Toronto", country: "Canada", flag: "🇨🇦" },
  { city: "Vancouver", country: "Canada", flag: "🇨🇦" },
  { city: "Montreal", country: "Canada", flag: "🇨🇦" },
  { city: "Calgary", country: "Canada", flag: "🇨🇦" },
  { city: "Ottawa", country: "Canada", flag: "🇨🇦" },
  { city: "Mexico City", country: "Mexico", flag: "🇲🇽" },
  { city: "Guadalajara", country: "Mexico", flag: "🇲🇽" },
  { city: "Monterrey", country: "Mexico", flag: "🇲🇽" },

  // South America
  { city: "São Paulo", country: "Brazil", flag: "🇧🇷" },
  { city: "Rio de Janeiro", country: "Brazil", flag: "🇧🇷" },
  { city: "Curitiba", country: "Brazil", flag: "🇧🇷" },
  { city: "Buenos Aires", country: "Argentina", flag: "🇦🇷" },
  { city: "Santiago", country: "Chile", flag: "🇨🇱" },
  { city: "Bogotá", country: "Colombia", flag: "🇨🇴" },
  { city: "Medellín", country: "Colombia", flag: "🇨🇴" },
  { city: "Lima", country: "Peru", flag: "🇵🇪" },
  { city: "Montevideo", country: "Uruguay", flag: "🇺🇾" },
  { city: "Quito", country: "Ecuador", flag: "🇪🇨" },

  // Asia
  { city: "Tokyo", country: "Japan", flag: "🇯🇵" },
  { city: "Osaka", country: "Japan", flag: "🇯🇵" },
  { city: "Kyoto", country: "Japan", flag: "🇯🇵" },
  { city: "Singapore", country: "Singapore", flag: "🇸🇬" },
  { city: "Hong Kong", country: "Hong Kong", flag: "🇭🇰" },
  { city: "Seoul", country: "South Korea", flag: "🇰🇷" },
  { city: "Busan", country: "South Korea", flag: "🇰🇷" },
  { city: "Shanghai", country: "China", flag: "🇨🇳" },
  { city: "Beijing", country: "China", flag: "🇨🇳" },
  { city: "Shenzhen", country: "China", flag: "🇨🇳" },
  { city: "Taipei", country: "Taiwan", flag: "🇹🇼" },
  { city: "Bangkok", country: "Thailand", flag: "🇹🇭" },
  { city: "Chiang Mai", country: "Thailand", flag: "🇹🇭" },
  { city: "Kuala Lumpur", country: "Malaysia", flag: "🇲🇾" },
  { city: "Jakarta", country: "Indonesia", flag: "🇮🇩" },
  { city: "Bali", country: "Indonesia", flag: "🇮🇩" },
  { city: "Ho Chi Minh City", country: "Vietnam", flag: "🇻🇳" },
  { city: "Hanoi", country: "Vietnam", flag: "🇻🇳" },
  { city: "Manila", country: "Philippines", flag: "🇵🇭" },
  { city: "Mumbai", country: "India", flag: "🇮🇳" },
  { city: "Bangalore", country: "India", flag: "🇮🇳" },
  { city: "New Delhi", country: "India", flag: "🇮🇳" },
  { city: "Hyderabad", country: "India", flag: "🇮🇳" },
  { city: "Pune", country: "India", flag: "🇮🇳" },

  // Middle East
  { city: "Dubai", country: "UAE", flag: "🇦🇪" },
  { city: "Abu Dhabi", country: "UAE", flag: "🇦🇪" },
  { city: "Doha", country: "Qatar", flag: "🇶🇦" },
  { city: "Riyadh", country: "Saudi Arabia", flag: "🇸🇦" },
  { city: "Tel Aviv", country: "Israel", flag: "🇮🇱" },
  { city: "Jerusalem", country: "Israel", flag: "🇮🇱" },
  { city: "Amman", country: "Jordan", flag: "🇯🇴" },
  { city: "Beirut", country: "Lebanon", flag: "🇱🇧" },
  { city: "Muscat", country: "Oman", flag: "🇴🇲" },
  { city: "Kuwait City", country: "Kuwait", flag: "🇰🇼" },

  // Africa
  { city: "Cape Town", country: "South Africa", flag: "🇿🇦" },
  { city: "Johannesburg", country: "South Africa", flag: "🇿🇦" },
  { city: "Nairobi", country: "Kenya", flag: "🇰🇪" },
  { city: "Lagos", country: "Nigeria", flag: "🇳🇬" },
  { city: "Cairo", country: "Egypt", flag: "🇪🇬" },
  { city: "Casablanca", country: "Morocco", flag: "🇲🇦" },
  { city: "Marrakech", country: "Morocco", flag: "🇲🇦" },
  { city: "Accra", country: "Ghana", flag: "🇬🇭" },
  { city: "Addis Ababa", country: "Ethiopia", flag: "🇪🇹" },
  { city: "Dar es Salaam", country: "Tanzania", flag: "🇹🇿" },
  { city: "Kigali", country: "Rwanda", flag: "🇷🇼" },
  { city: "Tunis", country: "Tunisia", flag: "🇹🇳" },

  // Oceania
  { city: "Sydney", country: "Australia", flag: "🇦🇺" },
  { city: "Melbourne", country: "Australia", flag: "🇦🇺" },
  { city: "Brisbane", country: "Australia", flag: "🇦🇺" },
  { city: "Perth", country: "Australia", flag: "🇦🇺" },
  { city: "Adelaide", country: "Australia", flag: "🇦🇺" },
  { city: "Auckland", country: "New Zealand", flag: "🇳🇿" },
  { city: "Wellington", country: "New Zealand", flag: "🇳🇿" },

  // Caribbean & Central America
  { city: "San José", country: "Costa Rica", flag: "🇨🇷" },
  { city: "Panama City", country: "Panama", flag: "🇵🇦" },
  { city: "Santo Domingo", country: "Dominican Republic", flag: "🇩🇴" },
  { city: "Kingston", country: "Jamaica", flag: "🇯🇲" },
];
