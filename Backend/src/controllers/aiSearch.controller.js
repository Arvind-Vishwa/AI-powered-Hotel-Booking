const model =
require("../config/gemini");

const hotelModel =
require("../models/hotel.model.js");


// ESCAPE REGEX
function escapeRegex(text) {

  return text.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}


async function aiSearchController(
  req,
  res
) {

  try {

    // GET PROMPT
    const { prompt } = req.body;

    // VALIDATION
    if (!prompt) {

      return res.status(400).json({

        success: false,

        message:
          "Search prompt required",

      });
    }

    // PROMPT LENGTH LIMIT
    if (prompt.length > 500) {

      return res.status(400).json({

        success: false,

        message:
          "Prompt too long",

      });
    }

    // AI PROMPT
    const aiPrompt = `

You are a hotel search query parser.

Your ONLY task is to extract structured hotel filters from user input.

Return ONLY valid raw JSON.

Never explain anything.
Never add markdown.
Never add extra text.

Allowed JSON fields only:

- city
- hotelType
- amenities
- nearbyPlaces
- maxPrice
- tags
- rating

Rules:

- amenities must be array
- nearbyPlaces must be array
- tags must be array
- maxPrice must be number
- rating must be number

If field not found, omit it.

Example:

{
  "city":"goa",
  "hotelType":"luxury",
  "amenities":["pool","wifi"],
  "nearbyPlaces":["beach"],
  "maxPrice":5000
}

User Query:
"${prompt}"

`;

    // GEMINI RESPONSE
    const result =
    await model.generateContent(
    aiPrompt
    );
    
    console.log(
      "FULL GEMINI RESULT:"
    );
    
    console.log(
      JSON.stringify(result, null, 2)
    );

    // RAW RESPONSE
    const response =
    result.response.text();

    console.log(
      "RAW AI RESPONSE:"
    );

    console.log(response);

    // CLEAN RESPONSE
    const cleanResponse =
    response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log(
      "CLEAN RESPONSE:"
    );

    console.log(cleanResponse);

    // PARSE JSON
    let filters = {};

    try {

      filters =
      JSON.parse(cleanResponse);

    } catch (parseError) {

      console.log(
        "JSON PARSE ERROR:"
      );

      console.log(parseError);

      return res.status(500).json({

        success: false,

        message:
          "Invalid AI response format",

      });
    }

    // ALLOWED FIELDS
    const allowedFields = [

      "city",
      "hotelType",
      "amenities",
      "nearbyPlaces",
      "maxPrice",
      "tags",
      "rating",

    ];

    // REMOVE INVALID FIELDS
    Object.keys(filters).forEach((key) => {

      if (
        !allowedFields.includes(key)
      ) {

        delete filters[key];
      }
    });

    console.log(
      "FILTERS:"
    );

    console.log(filters);

    // BUILD MONGODB QUERY
    const query = {};

    // CITY
    if (filters.city) {

      query.city = {

        $regex:
        escapeRegex(filters.city),

        $options: "i",

      };
    }

    // HOTEL TYPE
    if (filters.hotelType) {

      query.hotelType = {

        $regex:
        escapeRegex(
          filters.hotelType
        ),

        $options: "i",

      };
    }

    // MAX PRICE
    if (filters.maxPrice) {

      query.price = {

        $lte: Number(
          filters.maxPrice
        ),

      };
    }

    // AMENITIES
    if (

      filters.amenities &&

      Array.isArray(
        filters.amenities
      ) &&

      filters.amenities.length > 0

    ) {

      query.amenities = {

        $all:
        filters.amenities,

      };
    }

    // NEARBY PLACES
    if (

      filters.nearbyPlaces &&

      Array.isArray(
        filters.nearbyPlaces
      ) &&

      filters.nearbyPlaces.length > 0

    ) {

      query.nearbyPlaces = {

        $in:
        filters.nearbyPlaces,

      };
    }

    // TAGS
    if (

      filters.tags &&

      Array.isArray(
        filters.tags
      ) &&

      filters.tags.length > 0

    ) {

      query.tags = {

        $in:
        filters.tags,

      };
    }

    // RATING
    if (filters.rating) {

      query.rating = {

        $gte: Number(
          filters.rating
        ),

      };
    }

    console.log(
      "MONGODB QUERY:"
    );

    console.log(query);

    // FIND HOTELS
    const hotels =
    await hotelModel
      .find(query)
      .lean()
      .sort({
        createdAt: -1,
      });

    // RESPONSE
    return res.status(200).json({

      success: true,

      message:
        "Hotels fetched successfully",

      filters,

      totalHotels:
        hotels.length,

      hotels,

    });

  } catch (error) {

    console.error(
      "AI SEARCH ERROR:"
    );

    console.error(error);

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Server Error",

    });
  }
}

module.exports = {
  aiSearchController,
};