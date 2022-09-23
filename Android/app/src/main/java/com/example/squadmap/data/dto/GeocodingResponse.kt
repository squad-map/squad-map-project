package com.example.squadmap.data.dto


import com.example.squadmap.data.model.Coordinate
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class GeocodingResponse(
    @SerialName("addresses")
    val addresses: List<Addresse?>?,
    @SerialName("errorMessage")
    val errorMessage: String?,
    @SerialName("meta")
    val meta: Meta?,
    @SerialName("status")
    val status: String?
)

@Serializable
data class Meta(
    @SerialName("count")
    val count: Int?,
    @SerialName("page")
    val page: Int?,
    @SerialName("totalCount")
    val totalCount: Int?
)

@Serializable
data class Addresse(
    @SerialName("addressElements")
    val addressElements: List<AddressElement?>?,
    @SerialName("distance")
    val distance: Double?,
    @SerialName("englishAddress")
    val englishAddress: String?,
    @SerialName("jibunAddress")
    val jibunAddress: String?,
    @SerialName("roadAddress")
    val roadAddress: String?,
    @SerialName("x")
    val x: String?,
    @SerialName("y")
    val y: String?
)

@Serializable
data class AddressElement(
    @SerialName("code")
    val code: String?,
    @SerialName("longName")
    val longName: String?,
    @SerialName("shortName")
    val shortName: String?,
    @SerialName("types")
    val types: List<String?>?
)

fun GeocodingResponse.getCoordinate(): Coordinate {
    val long = addresses?.get(0)?.let { it.x?.toDouble() }
    val lat = addresses?.get(0)?.let { it.y?.toDouble() }
    return Coordinate(requireNotNull(long), requireNotNull(lat))
}