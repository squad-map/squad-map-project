package com.example.squadmap.data.dto


import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class GroupMapDTO(
    @SerialName("map_count")
    val mapCount: Int?,
    @SerialName("maps")
    val maps: List<Map?>?
)


@Serializable
data class Map(
    @SerialName("host_id")
    val hostId: Int?,
    @SerialName("host_nickname")
    val hostNickname: String?,
    @SerialName("id")
    val id: Int?,
    @SerialName("map_emoji")
    val mapEmoji: String?,
    @SerialName("map_name")
    val mapName: String?,
    @SerialName("places_count")
    val placesCount: Int?
)