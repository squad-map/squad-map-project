package com.example.squadmap.data.dto


import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class DetailMapDTO(
    @SerialName("categorized_places")
    val categorizedPlaces: List<CategorizedPlace> = emptyList(),
    @SerialName("host_id")
    val hostId: Int,
    @SerialName("host_nickname")
    val hostNickname: String,
    @SerialName("map_emoji")
    val mapEmoji: String,
    @SerialName("map_id")
    val mapId: Int,
    @SerialName("map_name")
    val mapName: String,
    @SerialName("places_count")
    val placesCount: Int
)

@Serializable
data class CategorizedPlace(
    @SerialName("category_info")
    val categoryInfo: CategoryInfo?,
    @SerialName("places")
    val places: List<Place?>
)

@Serializable
data class Place(
    @SerialName("address")
    val address: String,
    @SerialName("place_id")
    val placeId: Int,
    @SerialName("place_name")
    val placeName: String,
    @SerialName("position")
    val position: Position
)


@Serializable
data class CategoryInfo(
    @SerialName("category_color")
    val categoryColor: String,
    @SerialName("category_id")
    val categoryId: Int,
    @SerialName("category_name")
    val categoryName: String
)
