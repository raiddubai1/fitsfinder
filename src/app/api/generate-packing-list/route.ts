import { NextRequest, NextResponse } from 'next/server';

interface TripDetails {
  destination: string;
  arrivalDate: string;
  departureDate: string;
  accommodation: string;
  transportation: string[];
}

interface TravelerProfile {
  id: string;
  ageRange: string;
  gender: string;
}

interface TripStyle {
  tripType: string;
  climate: string;
  luggage: string;
  packingStyle: number[];
}

interface PackingItem {
  id: string;
  name: string;
  category: string;
  essential: boolean;
}

interface PackingCategory {
  name: string;
  items: PackingItem[];
}

// Base packing items database
const baseItems: Record<string, PackingItem[]> = {
  "Clothing": [
    { id: "clothing-1", name: "T-shirts", category: "Clothing", essential: true },
    { id: "clothing-2", name: "Pants/Jeans", category: "Clothing", essential: true },
    { id: "clothing-3", name: "Underwear", category: "Clothing", essential: true },
    { id: "clothing-4", name: "Socks", category: "Clothing", essential: true },
    { id: "clothing-5", name: "Pajamas", category: "Clothing", essential: false },
    { id: "clothing-6", name: "Light jacket", category: "Clothing", essential: false },
    { id: "clothing-7", name: "Heavy jacket", category: "Clothing", essential: false },
    { id: "clothing-8", name: "Sweater", category: "Clothing", essential: false },
    { id: "clothing-9", name: "Shorts", category: "Clothing", essential: false },
    { id: "clothing-10", name: "Swimwear", category: "Clothing", essential: false },
    { id: "clothing-11", name: "Formal outfit", category: "Clothing", essential: false },
    { id: "clothing-12", name: "Raincoat", category: "Clothing", essential: false }
  ],
  "Toiletries": [
    { id: "toiletries-1", name: "Toothbrush & toothpaste", category: "Toiletries", essential: true },
    { id: "toiletries-2", name: "Shampoo & conditioner", category: "Toiletries", essential: true },
    { id: "toiletries-3", name: "Deodorant", category: "Toiletries", essential: true },
    { id: "toiletries-4", name: "Soap or body wash", category: "Toiletries", essential: false },
    { id: "toiletries-5", name: "Sunscreen", category: "Toiletries", essential: false },
    { id: "toiletries-6", name: "Lip balm", category: "Toiletries", essential: false },
    { id: "toiletries-7", name: "Razor", category: "Toiletries", essential: false },
    { id: "toiletries-8", name: "Hair brush/comb", category: "Toiletries", essential: false },
    { id: "toiletries-9", name: "First aid kit", category: "Toiletries", essential: false },
    { id: "toiletries-10", name: "Hand sanitizer", category: "Toiletries", essential: false }
  ],
  "Documents": [
    { id: "documents-1", name: "Passport", category: "Documents", essential: true },
    { id: "documents-2", name: "ID/Driver's license", category: "Documents", essential: true },
    { id: "documents-3", name: "Boarding passes", category: "Documents", essential: true },
    { id: "documents-4", name: "Travel insurance", category: "Documents", essential: false },
    { id: "documents-5", name: "Hotel reservations", category: "Documents", essential: false },
    { id: "documents-6", name: "Visa (if required)", category: "Documents", essential: false },
    { id: "documents-7", name: "Credit cards/cash", category: "Documents", essential: false },
    { id: "documents-8", name: "Emergency contacts", category: "Documents", essential: false }
  ],
  "Electronics": [
    { id: "electronics-1", name: "Phone & charger", category: "Electronics", essential: true },
    { id: "electronics-2", name: "Power bank", category: "Electronics", essential: true },
    { id: "electronics-3", name: "Headphones", category: "Electronics", essential: false },
    { id: "electronics-4", name: "Camera", category: "Electronics", essential: false },
    { id: "electronics-5", name: "Travel adapter", category: "Electronics", essential: false },
    { id: "electronics-6", name: "Laptop & charger", category: "Electronics", essential: false },
    { id: "electronics-7", name: "E-reader", category: "Electronics", essential: false },
    { id: "electronics-8", name: "Smartwatch", category: "Electronics", essential: false }
  ],
  "Health & Medical": [
    { id: "health-1", name: "Prescription medications", category: "Health & Medical", essential: true },
    { id: "health-2", name: "Pain relievers", category: "Health & Medical", essential: false },
    { id: "health-3", name: "Motion sickness pills", category: "Health & Medical", essential: false },
    { id: "health-4", name: "Band-aids", category: "Health & Medical", essential: false },
    { id: "health-5", name: "Antiseptic cream", category: "Health & Medical", essential: false },
    { id: "health-6", name: "Allergy medication", category: "Health & Medical", essential: false },
    { id: "health-7", name: "Cold medicine", category: "Health & Medical", essential: false },
    { id: "health-8", name: "Thermometer", category: "Health & Medical", essential: false }
  ],
  "Miscellaneous": [
    { id: "misc-1", name: "Sunglasses", category: "Miscellaneous", essential: false },
    { id: "misc-2", name: "Travel pillow", category: "Miscellaneous", essential: false },
    { id: "misc-3", name: "Umbrella", category: "Miscellaneous", essential: false },
    { id: "misc-4", name: "Reusable water bottle", category: "Miscellaneous", essential: false },
    { id: "misc-5", name: "Snacks", category: "Miscellaneous", essential: false },
    { id: "misc-6", name: "Books/magazines", category: "Miscellaneous", essential: false },
    { id: "misc-7", name: "Travel games", category: "Miscellaneous", essential: false },
    { id: "misc-8", name: "Laundry bag", category: "Miscellaneous", essential: false }
  ]
};

// Activity-specific items
const activityItems: Record<string, PackingItem[]> = {
  "Hiking": [
    { id: "hiking-1", name: "Hiking boots", category: "Clothing", essential: true },
    { id: "hiking-2", name: "Backpack", category: "Miscellaneous", essential: true },
    { id: "hiking-3", name: "Map/compass", category: "Miscellaneous", essential: true },
    { id: "hiking-4", name: "Insect repellent", category: "Toiletries", essential: true }
  ],
  "Swimming": [
    { id: "swimming-1", name: "Swimwear", category: "Clothing", essential: true },
    { id: "swimming-2", name: "Towel", category: "Toiletries", essential: true },
    { id: "swimming-3", name: "Flip flops", category: "Clothing", essential: false },
    { id: "swimming-4", name: "Goggles", category: "Miscellaneous", essential: false }
  ],
  "Business Meetings": [
    { id: "business-1", name: "Formal outfit", category: "Clothing", essential: true },
    { id: "business-2", name: "Dress shoes", category: "Clothing", essential: true },
    { id: "business-3", name: "Laptop", category: "Electronics", essential: true },
    { id: "business-4", name: "Business cards", category: "Documents", essential: false }
  ],
  "Fine Dining": [
    { id: "dining-1", name: "Formal outfit", category: "Clothing", essential: true },
    { id: "dining-2", name: "Dress shoes", category: "Clothing", essential: true },
    { id: "dining-3", name: "Jewelry (optional)", category: "Miscellaneous", essential: false }
  ],
  "Beach": [
    { id: "beach-1", name: "Swimwear", category: "Clothing", essential: true },
    { id: "beach-2", name: "Beach towel", category: "Miscellaneous", essential: true },
    { id: "beach-3", name: "Sun hat", category: "Clothing", essential: true },
    { id: "beach-4", name: "Beach bag", category: "Miscellaneous", essential: false }
  ],
  "Camping": [
    { id: "camping-1", name: "Sleeping bag", category: "Miscellaneous", essential: true },
    { id: "camping-2", name: "Flashlight", category: "Electronics", essential: true },
    { id: "camping-3", name: "Insect repellent", category: "Toiletries", essential: true },
    { id: "camping-4", name: "Portable stove", category: "Miscellaneous", essential: false }
  ]
};

function generatePackingList(
  tripDetails: TripDetails,
  travelerProfile: TravelerProfile[],
  tripStyle: TripStyle,
  activities: string[],
  specialRequirements: string[]
): PackingCategory[] {
  const result: PackingCategory[] = [];
  
  // Start with base items
  Object.entries(baseItems).forEach(([categoryName, items]) => {
    const categoryItems: PackingItem[] = [];
    
    items.forEach(item => {
      let shouldInclude = true;
      let isEssential = item.essential;
      
      // Adjust based on climate
      if (tripStyle.climate === "hot" && item.name.includes("Heavy jacket")) {
        shouldInclude = false;
      }
      if (tripStyle.climate === "cold" && (item.name.includes("Shorts") || item.name.includes("Swimwear"))) {
        shouldInclude = false;
      }
      if (tripStyle.climate === "cold" && item.name.includes("Light jacket")) {
        shouldInclude = false;
        categoryItems.push({ ...item, name: "Heavy jacket", essential: true });
      }
      
      // Adjust based on trip type
      if (tripStyle.tripType === "business" && item.name === "Formal outfit") {
        isEssential = true;
      }
      
      // Adjust based on luggage type
      if (tripStyle.luggage === "carry-on" && item.name === "Heavy jacket") {
        shouldInclude = false;
      }
      
      // Adjust based on packing style
      if (tripStyle.packingStyle[0] <= 20 && !isEssential) {
        shouldInclude = false; // Minimalist packing
      }
      
      if (shouldInclude) {
        categoryItems.push({ ...item, essential: isEssential });
      }
    });
    
    if (categoryItems.length > 0) {
      result.push({ name: categoryName, items: categoryItems });
    }
  });
  
  // Add activity-specific items
  activities.forEach(activity => {
    const activityKey = Object.keys(activityItems).find(key => 
      activity.toLowerCase().includes(key.toLowerCase())
    );
    
    if (activityKey) {
      const activitySpecificItems = activityItems[activityKey];
      activitySpecificItems.forEach(item => {
        const targetCategory = result.find(cat => cat.name === item.category);
        if (targetCategory) {
          if (!targetCategory.items.find(existing => existing.name === item.name)) {
            targetCategory.items.push(item);
          }
        } else {
          result.push({ name: item.category, items: [item] });
        }
      });
    }
  });
  
  // Add special requirements items
  specialRequirements.forEach(requirement => {
    if (requirement.toLowerCase().includes("medical")) {
      const medicalCategory = result.find(cat => cat.name === "Health & Medical");
      if (medicalCategory) {
        medicalCategory.items.push({
          id: `medical-${Date.now()}`,
          name: "Medical supplies",
          category: "Health & Medical",
          essential: true
        });
      }
    }
    if (requirement.toLowerCase().includes("allergies")) {
      const medicalCategory = result.find(cat => cat.name === "Health & Medical");
      if (medicalCategory) {
        medicalCategory.items.push({
          id: `allergy-${Date.now()}`,
          name: "Allergy medication",
          category: "Health & Medical",
          essential: true
        });
      }
    }
  });
  
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { tripDetails, travelerProfile, tripStyle, activities, specialRequirements } = body;
    
    if (!tripDetails || !travelerProfile || !tripStyle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    const packingList = generatePackingList(
      tripDetails,
      travelerProfile,
      tripStyle,
      activities || [],
      specialRequirements || []
    );
    
    return NextResponse.json({ packingList });
  } catch (error) {
    console.error('Error generating packing list:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}