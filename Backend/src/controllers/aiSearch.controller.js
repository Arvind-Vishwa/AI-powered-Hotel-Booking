    const model =
    require("../config/gemini.js");

    const hotelModel =
    require("../models/hotel.model.js");

    async function aiSearchController(
    req,
    res
    ) {

    try {

        const { prompt } = req.body;

        // VALIDATION
        if (!prompt) {

        return res.status(400).json({

            success: false,

            message:
            "Search prompt required",

        });
        }

        // GEMINI PROMPT
        const aiPrompt = `

    You are a hotel search filter extractor.

    Extract hotel search filters from the user query.

    Return ONLY valid JSON.

    Possible fields:
    city
    hotelType
    amenities
    nearbyPlaces
    maxPrice
    tags
    rating

    Example:

    User:
    Need luxury hotel in Goa with pool near beach under 5000

    Output:
    {
    "city":"goa",
    "hotelType":"luxury",
    "amenities":["pool"],
    "nearbyPlaces":["beach"],
    "maxPrice":5000
    }

    Now process:

    ${prompt}

    `;

        // GEMINI RESPONSE
        const result =
        await model.generateContent(
            aiPrompt
        );

        const response =
        result.response.text();

        // CLEAN JSON
        const cleanResponse =
        response
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // PARSE JSON
        const filters =
        JSON.parse(cleanResponse);

        console.log(filters);

        // BUILD QUERY
        const query = {};

        // CITY
        if (filters.city) {

        query.city =
            filters.city.toLowerCase();
        }

        // HOTEL TYPE
        if (filters.hotelType) {

        query.hotelType =
            filters.hotelType;
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
        filters.amenities.length > 0
        ) {

        query.amenities = {
            $all: filters.amenities,
        };
        }

        // NEARBY PLACES
        if (
        filters.nearbyPlaces &&
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
        filters.tags.length > 0
        ) {

        query.tags = {
            $in: filters.tags,
        };
        }

        // FIND HOTELS
        const hotels =
        await hotelModel.find(query);

        // RESPONSE
        return res.status(200).json({

        success: true,

        filters,

        hotels,

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

        success: false,

        message:
            error.message ||
            "Server Error",

        });
    }
    }

    module.exports =
    {aiSearchController};