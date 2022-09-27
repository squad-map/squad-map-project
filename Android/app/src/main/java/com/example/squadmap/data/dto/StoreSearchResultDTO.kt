package com.example.squadmap.data.dto


import com.example.squadmap.data.model.ResultStore
import com.example.squadmap.data.model.StoreSearchData
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class StoreSearchResultDTO(
    @SerialName("display")
    val display: Int?,
    @SerialName("items")
    val items: List<Item?> = emptyList(),
    @SerialName("lastBuildDate")
    val lastBuildDate: String?,
    @SerialName("start")
    val start: Int?,
    @SerialName("total")
    val total: Int?
)

@Serializable
data class Item(
    @SerialName("address")
    val address: String?,
    @SerialName("category")
    val category: String?,
    @SerialName("description")
    val description: String?,
    @SerialName("link")
    val link: String?,
    @SerialName("mapx")
    val mapx: String?,
    @SerialName("mapy")
    val mapy: String?,
    @SerialName("roadAddress")
    val roadAddress: String?,
    @SerialName("telephone")
    val telephone: String?,
    @SerialName("title")
    val title: String?
)

fun StoreSearchResultDTO.toStoreSearchData(): StoreSearchData {
    return StoreSearchData(
        items = this.items.mapNotNull { it?.toResultStore() },
        start = requireNotNull(start),
        total = requireNotNull(total)
    )
}

fun Item.toResultStore(): ResultStore {
    return ResultStore(
        address.orEmpty(),
        category.orEmpty(),
        description.orEmpty(),
        link.orEmpty(),
        roadAddress.orEmpty(),
        telephone.orEmpty(),
        requireNotNull(title)
    )
}