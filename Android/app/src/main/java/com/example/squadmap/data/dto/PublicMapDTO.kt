package com.example.squadmap.data.dto


import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class PublicMapDTO(
    @SerialName("content")
    val content: List<Content?> = emptyList(),
    @SerialName("first")
    val first: Boolean,
    @SerialName("last")
    val last: Boolean,
    @SerialName("page_number")
    val pageNumber: Int,
    @SerialName("size")
    val size: Int,
    @SerialName("total_elements")
    val totalElements: Int,
    @SerialName("total_pages")
    val totalPages: Int
)

@Serializable
data class Content(
    @SerialName("host_id")
    val hostId: Int,
    @SerialName("host_nickname")
    val hostNickname: String,
    @SerialName("id")
    val id: Int,
    @SerialName("map_emoji")
    val mapEmoji: String,
    @SerialName("map_name")
    val mapName: String,
    @SerialName("places_count")
    val placesCount: Int
)