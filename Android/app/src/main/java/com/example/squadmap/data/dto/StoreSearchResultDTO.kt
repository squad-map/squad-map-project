package com.example.squadmap.data.dto


import com.example.squadmap.data.model.ResultStore
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

fun StoreSearchResultDTO.toStoreSearch(): StoreSearchData {
    return StoreSearchData(
        documents?.mapNotNull { it?.toStoreSearchData() }.orEmpty(),
        requireNotNull(meta?.isEnd)
    )
}

fun Document.toStoreSearchData(): ResultStore {
    return ResultStore(
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
