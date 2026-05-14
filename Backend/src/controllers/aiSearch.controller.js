    const model =
    require("../config/gemini.js");

    const hotelModel =
    require("../models/hotel.model.js");

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

        // AI PROMPT
        const aiPrompt = `

    You are a hotel search filter extractor AI.

    IMPORTANT RULES:

    Return ONLY raw valid JSON.

    Do NOT use markdown.
    Do NOT use \`\`\`json.
    Do NOT write explanations.
    Do NOT write extra text.
    Do NOT write comments.

    Only return JSON object.

    Possible fields:

    city
    hotelType
    amenities
    nearbyPlaces
    maxPrice
    tags
    rating

    Example:

    {
    "city":"goa",
    "hotelType":"luxury",
    "amenities":["pool","wifi"],
    "nearbyPlaces":["beach"],
    "maxPrice":5000
    }

    User Query:
    ${prompt}

    `;

        // GEMINI RESPONSE
        const result =
        await model.generateContent(
            aiPrompt
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

        // SAFE JSON PARSE
        let filters = {};

        try {

        filters =
            JSON.parse(
            cleanResponse
            );

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

        console.log(
        "FILTERS:"
        );

        console.log(filters);

        // BUILD QUERY
        const query = {};

        // CITY
        if (filters.city) {

        query.city = {
            $regex:
            filters.city,
            $options: "i",
        };
        }

        // HOTEL TYPE
        if (filters.hotelType) {

        query.hotelType = {
            $regex:
            filters.hotelType,
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