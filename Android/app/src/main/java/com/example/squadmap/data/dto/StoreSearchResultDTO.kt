package com.example.squadmap.data.dto


import com.example.squadmap.data.model.Coordinate
import com.example.squadmap.data.model.StoreSearchData
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class StoreSearchResultDTO(
    @SerialName("documents")
    val documents: List<Document?>?,
    @SerialName("meta")
    val meta: Meta?
)

@Serializable
data class Meta(
    @SerialName("is_end")
    val isEnd: Boolean?,
    @SerialName("pageable_count")
    val pageableCount: Int?,
    @SerialName("same_name")
    val sameName: SameName?,
    @SerialName("total_count")
    val totalCount: Int?
)

@Serializable
data class SameName(
    @SerialName("keyword")
    val keyword: String?,
    @SerialName("region")
    val region: List<String?>?,
    @SerialName("selected_region")
    val selectedRegion: String?
)

@Serializable
data class Document(
    @SerialName("address_name")
    val addressName: String?,
    @SerialName("category_group_code")
    val categoryGroupCode: String?,
    @SerialName("category_group_name")
    val categoryGroupName: String?,
    @SerialName("category_name")
    val categoryName: String?,
    @SerialName("distance")
    val distance: String?,
    @SerialName("id")
    val id: String?,
    @SerialName("phone")
    val phone: String?,
    @SerialName("place_name")
    val placeName: String?,
    @SerialName("place_url")
    val placeUrl: String?,
    @SerialName("road_address_name")
    val roadAddressName: String?,
    @SerialName("x")
    val x: String?,
    @SerialName("y")
    val y: String?
)

fun StoreSearchResultDTO.getCoordinate(): Coordinate {
    val long = documents?.get(0)?.let { it.x?.toDouble() }
    val lat = documents?.get(0)?.let { it.y?.toDouble() }
    return Coordinate(requireNotNull(long), requireNotNull(lat))
}

fun StoreSearchResultDTO.toStoreSearch(): List<StoreSearchData> {
    return documents?.mapNotNull { it?.toStoreSearchData() }.orEmpty()
}

fun Document.toStoreSearchData(): StoreSearchData {
    return StoreSearchData(
        addressName.orEmpty(),
        categoryName.orEmpty(),
        placeUrl.orEmpty(),
        roadAddressName.orEmpty(),
        phone.orEmpty(),
        requireNotNull(placeName),
        x?.toDouble() ?: 0.0,
        y?.toDouble() ?: 0.0
    )
}
// 카카오 검색에 맞게 변경하기