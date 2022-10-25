package com.example.squadmap.data.model

data class MapInfo(
    val owner: String,
    val store: List<StoreInfo>,
    val categories: List<CategoryInfo>
)
